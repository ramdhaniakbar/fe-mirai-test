import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Plus } from "lucide-react"
import { API_URL, getProfile, getToken } from "../../config/generalHelper"
import { Link } from "react-router"
import moment from "moment"
import { useState, useEffect } from "react"

const DiaryPage = () => {
  const [user, setUser] = useState({
    name: '',
    photo: ''
  })
  const fetchDiaries = async () => {
    const { data } = await axios.get(`${API_URL}/api/diaries`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return data.data
  }
  const {
    data: diaries,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["diaries"],
    queryFn: fetchDiaries,
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

  if (isPending) return <span>Loading...</span>

  if (isError) return <span>Error: {error.message}</span>

  return (
    <div className="pt-44 px-[160px] min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Diary Terbaru Kamu!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
        {/* Reports Section */}
        <div className="md:col-span-2 space-y-6">
          {diaries?.data?.length > 0 ? (
            diaries?.data?.map((diary, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-[0px_4px_57px_rgba(0,0,0,0.07)]">
                {diary.image && (
                  <img
                    src={diary.image}
                    alt={diary.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-lg font-semibold text-gray-900">
                  {diary.title}
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                  {diary.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <img
                      src={user.photo}
                      alt={diary.user.name}
                      className="w-10 h-10 rounded-full border"
                    />
                    <span className="ml-3 font-medium text-gray-900">
                      {diary.user.name}
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {moment(diary.date).format('LL')}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-secondary rounded-full text-white px-3 py-2 text-center">
              Tidak ada data
            </div>
          )}
        </div>

        {/* User Profile Section */}
        <div className="flex flex-col bg-white h-fit p-6 rounded-lg shadow text-center items-center">
          <img
            src={user.photo}
            alt={user.name}
            className="w-20 h-20 mx-auto rounded-full border"
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
    </div>
  )
}

export default DiaryPage
