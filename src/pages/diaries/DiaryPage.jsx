import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ChevronLeft, ChevronRight, Edit, Plus, Trash } from "lucide-react"
import { API_URL, getProfile, getToken } from "../../config/generalHelper"
import { Link } from "react-router"
import moment from "moment"
import { useState, useEffect } from "react"
import Modal from "../../components/modal/Modal"
import toast from "react-hot-toast"
import FormLoading from "../../components/loading/FormLoading"

const DiaryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState({
    name: "",
    photo: "",
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDiaryId, setSelectedDiaryId] = useState(null)

  const fetchDiaries = async ({ queryKey }) => {
    const page = queryKey[1];
    const { data } = await axios.get(`${API_URL}/api/diaries?page=${page}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return data.data
  }

  const {
    data: diaries,
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["diaries", currentPage],
    queryFn: fetchDiaries,
    placeholderData: keepPreviousData,
  })

  const { mutate, isPending: deletePending } = useMutation({
    mutationKey: ['deleteDiary'],
    mutationFn: async (id) => {
      const response = await axios.delete(`${API_URL}/api/diaries/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response.data
    },
    onSuccess: (result) => {
      console.log("Delete result", result)

      if (result.status === "success") {
        setIsModalOpen(false)
        toast.success(result?.message || "Diary deleted successfully!")
        refetch()
      }
    },
    onError: (error) => {
      console.error("Delete error:", error)
      toast.error(error?.response?.data?.message || "An error occurred")
    },
  })

  useEffect(() => {
    const userProfile = JSON.parse(getProfile())
    if (userProfile) {
      setUser((prevData) => ({
        ...prevData,
        name: userProfile?.name,
        photo: userProfile?.image_url,
      }))
    }
  }, [])

  const openDeleteModal = (id) => {
    setSelectedDiaryId(id); // Store the correct ID
    setIsModalOpen(true);
  }

  const handleDelete = () => {
    if (selectedDiaryId) {
      console.log("Deleting diary with ID:", selectedDiaryId)
      mutate(selectedDiaryId)
    }
  }

  console.log('diaries ', diaries)

  return (
    <div className="pt-44 px-[160px] min-h-screen">
    {deletePending || isPending ? (
      <FormLoading />
    ) : (
      <>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Diary Terbaru Kamu!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
          {/* Reports Section */}
          <div className="md:col-span-2 space-y-6">
            {diaries?.data?.length > 0 ? (
              diaries?.data?.map((diary, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-[0px_4px_57px_rgba(0,0,0,0.07)]"
                >
                  {diary.image && (
                    <img
                      src={diary.image}
                      alt={diary.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="w-full flex justify-between items-end gap-28">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {diary.title}
                      </h2>
                      <p className="text-gray-600 text-sm mt-2">
                        {diary.description}
                      </p>
                    </div>
                    <span className="text-gray-500 text-sm text-right">
                      {moment(diary.date).format("LL")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <img
                        src={user.photo}
                        alt={diary.user.name}
                        className="w-10 h-10 rounded-full border object-cover"
                      />
                      <span className="ml-3 font-medium text-gray-900">
                        {diary.user.name}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/diary/edit/${diary.id}`}
                        className="bg-yellow-400 hover:bg-yellow-600 text-primary p-2 rounded-md transition"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => openDeleteModal(diary.id)}
                        className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-md transition cursor-pointer"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                      {/* MODAL */}
                      {isModalOpen && (
                        <Modal
                          isOpen={isModalOpen}
                          onClose={() => setIsModalOpen(false)}
                          title="Konfirmasi Hapus"
                          description="Apakah engkau yakin ingin menghapus diary ini? Tindakan ini tidak dapat dibatalkan."
                          confirmText="Hapus"
                          cancelText="Batal"
                          onConfirm={handleDelete}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-secondary rounded-full text-white px-3 py-2 text-center">
                Tidak ada data
              </div>
            )}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                disabled={!diaries.prev_page_url}
                onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 transition-all rounded-md disabled:opacity-50 cursor-pointer"
              >
                <ChevronLeft />
              </button>
              <span>Halaman {currentPage}</span>
              <button
                disabled={!diaries.next_page_url}
                onClick={() => setCurrentPage((old) => old + 1)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 transition-all rounded-md disabled:opacity-50 cursor-pointer"
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="flex flex-col bg-white h-fit p-6 rounded-lg shadow text-center items-center">
            <img
              src={user.photo}
              alt={user.name}
              className="w-20 h-20 mx-auto rounded-full border object-cover"
            />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {user.name}
            </h3>
            <Link
              to="/diary/create"
              className="flex gap-2 bg-secondary hover:bg-primary transition px-4 py-2 text-white cursor-pointer mt-2"
            >
              <Plus />
              Tambah Diary
            </Link>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-700">
                Total Diary Kamu:
              </h4>
              <p className="text-2xl font-bold text-gray-900">
                {diaries?.data?.length}
              </p>
            </div>
          </div>
        </div>
      </>
    )}
    </div>
  )
}

export default DiaryPage
