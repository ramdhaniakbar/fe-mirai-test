import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { API_URL, getToken } from "../../config/generalHelper"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router"
import FormLoading from "../../components/loading/FormLoading"

const EditDiaryPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    date: "",
  })
  const [errors, setErrors] = useState({})

  // Fetch existing diary data
  const fetchDiary = async () => {
    const { data } = await axios.get(`${API_URL}/api/diaries/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return data
  }
  const {
    data: diaryData,
    isPending,
  } = useQuery({
    queryKey: ["diary", id],
    queryFn: fetchDiary,
  })

  console.log("data ", diaryData)

  useEffect(() => {
    if (diaryData) {
      setFormData((prevData) => ({
        ...prevData,
        title: diaryData?.data?.title || "",
        description: diaryData?.data?.description || "",
        image: diaryData?.data?.image_url || null,
        date: diaryData?.data?.date || "",
      }))
    }
  }, [diaryData])

  console.log('form data ', formData)

  const { mutate, isPending: mutatePending } = useMutation({
    mutationKey: ["updateDiary", id],
    mutationFn: async (data) => {
      const newData = new FormData()
      Object.keys(data).forEach((key) => {
        if (data[key]) {
          newData.append(key, data[key])
        }
      })

      const response = await axios.post(
        `${API_URL}/api/diaries/${id}?_method=PUT`, // Laravel uses _method=PUT for updating
        newData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      return response.data
    },
    onSuccess: (result) => {
      console.log("Update result", result)

      if (result.status === "success") {
        queryClient.invalidateQueries(["diary", id]) // Refresh updated data
        toast.success(result?.message || "Diary updated successfully!")
        navigate("/diary")
      }
    },
    onError: (error) => {
      console.error("Update error:", error)
      const apiErrors = error?.response?.data?.errors
      if (apiErrors && typeof apiErrors === "object") {
        setErrors(apiErrors)
      } else {
        setErrors({})
        toast.error(error?.response?.data?.message || "An error occurred")
      }
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    mutate(formData)
  }

  console.log('diary ', diaryData)

  return (
    <div className="mt-44">
      {isPending ? (
        <FormLoading />
      ) : (
        <div className="px-8 py-10 max-w-xl mx-auto bg-white shadow-[0px_4px_57px_rgba(0,0,0,0.07)]">
          <h2 className="text-2xl font-bold mb-4">Edit Diary</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-2">
                Judul
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full p-3 border border-gray focus:border-secondary focus:outline-secondary ${
                  errors.title ? "border-red-500" : ""
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className={`w-full p-3 border border-gray focus:border-secondary focus:outline-secondary ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description[0]}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-2">
                Gambar
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={`w-full p-3 border border-gray focus:border-secondary focus:outline-secondary ${
                  errors.image ? "border-red-500" : ""
                }`}
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image[0]}</p>
              )}
              {formData.image && (
                <img
                  src={
                    typeof formData.image === "string"
                      ? formData.image
                      : URL.createObjectURL(formData.image)
                  }
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded"
                />
              )}
            </div>
            <div className="mb-8">
              <label className="block font-medium text-gray-700 mb-2">
                Tanggal
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full p-3 border border-gray focus:border-secondary focus:outline-secondary ${
                  errors.date ? "border-red-500" : ""
                }`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date[0]}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-secondary text-white py-3 px-6 hover:bg-primary transition cursor-pointer"
              disabled={mutatePending}
            >
              {mutatePending ? "Menyimpan Perubahan..." : "Update Diary"}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default EditDiaryPage
