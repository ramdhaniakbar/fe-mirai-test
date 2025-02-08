import { useState, useEffect } from "react"
import { API_URL, getProfile, getToken } from "../../config/generalHelper"
import { Edit, Eye, EyeOff, LogOut, Trash } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"

const Profile = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [name, setName] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    date_of_birth: "",
    photo: "",
    old_password: "",
    password: "",
    password_confirmation: "",
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState({
    old_password: false,
    password: false,
    password_confirmation: false,
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewImage, setPreviewImage] = useState("")

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: async (data) => {
      const newData = new FormData();

      Object.keys(data).forEach((key) => {
        if (data[key]) {
          newData.append(key, data[key]);
        }
      });

      if (selectedFile) {
        newData.append("photo", selectedFile);
      }

      const response = await axios.post(
        `${API_URL}/api/user?_method=PUT`,
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
      console.log("result", result)

      if (result.status == "success") {
        setFormData((prevData) => ({
          ...prevData,
          old_password: "",
          password: "",
          password_confirmation: "",
        }))
        localStorage.setItem("user-profile", JSON.stringify(result.data.user))
        queryClient.invalidateQueries(["updateProfile"])
      }

      toast.success(result?.message || "Update profile successfull!")
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

  // get user profile from local storage
  useEffect(() => {
    const userProfile = JSON.parse(getProfile())
    if (userProfile) {
      setName(userProfile?.name)
      setFormData((prevData) => ({
        ...prevData,
        name: userProfile?.name,
        email: userProfile?.email,
        gender: userProfile?.gender,
        date_of_birth: userProfile?.date_of_birth,
        photo: userProfile?.image_url,
      }))
      setPreviewImage(userProfile?.image_url)
    }
  }, [])

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleSubmit = () => {
    mutate(formData)
  }

  const handleLogout = () => {
    localStorage.clear();

    navigate("/login")
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleRemoveFile = () => {
    setFormData((prevData) => ({
      ...prevData,
      photo: ''
    }))
    setSelectedFile(null);
    setPreviewImage(''); 
    document.getElementById("fileInput").value = "";
  };

  console.log(previewImage)

  return (
    <div className="pt-44 px-[160px]">
      <div className="p-11 shadow-[0px_4px_57px_rgba(0,0,0,0.07)] bg-white">
        {/* User Info Section */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-6">
            <img
              src={previewImage}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border"
            />
            <div>
              <h2 className="text-xl font-bold text-primary">{name}</h2>
            </div>
          </div>
          <div className="flex gap-4">
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange} // Function to handle file selection
            />
            <button
              onClick={() => document.getElementById("fileInput").click()}
              className="flex gap-2 h-fit font-semibold border-2 border-secondary text-primary py-2 px-3 cursor-pointer transition-all duration-300 hover:bg-secondary hover:text-white"
            >
              <Edit className="w-5" />
              Ubah Foto
            </button>
            <button
              onClick={handleRemoveFile}
             className="flex gap-2 h-fit font-semibold border-2 border-red-500 text-red-500 py-2 px-3 cursor-pointer transition-all duration-300 hover:bg-red-500 hover:text-white">
              <Trash className="w-5" />
              Hapus Foto
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left Section - Profile Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Edit Profil</h3>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block font-medium text-gray-700 mb-2"
              >
                Nama kamu
              </label>
              <input
                type="text"
                className={`w-full p-3 border border-gray focus:border-secondary focus:outline-secondary ${
                  errors.name ? "border-red-500" : ""
                }`}
                name="name"
                value={formData.name}
                placeholder="Nama kamu"
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    name: e.target.value,
                  }))
                }
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full p-3 border border-gray focus:border-secondary focus:outline-secondary bg-gray-300"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="gender"
                className="block font-medium text-gray-700 mb-2"
              >
                Jenis Kelamin
              </label>
              <select
                id="gender"
                name="gender"
                className={`w-full p-3 border border-gray focus:border-secondary focus:outline-secondary ${
                  errors.gender ? "border-red-500" : ""
                }`}
                value={formData.gender}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    gender: e.target.value,
                  }))
                }
              >
                <option value="" disabled selected>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender[0]}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="date_of_birth"
                className="block font-medium text-gray-700 mb-2"
              >
                Tanggal Lahir
              </label>
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    date_of_birth: e.target.value,
                  }))
                }
                className={`w-full p-3 border border-gray focus:border-secondary focus:outline-secondary ${
                  errors.date_of_birth ? "border-red-500" : ""
                }`}
              />
              {errors.date_of_birth && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.date_of_birth[0]}
                </p>
              )}
            </div>
          </div>

          {/* Right Section - Password Update */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Password</h3>
            {["old_password", "password", "password_confirmation"].map(
              (field, index) => (
                <div className="mb-6" key={index}>
                  <div className="relative">
                    <label className="block font-medium text-gray-700 mb-2">
                      {field === "old_password"
                        ? "Password Lama"
                        : field === "password"
                        ? "Password Baru"
                        : "Konfirmasi Password Baru"}
                    </label>
                    <input
                      type={showPassword[field] ? "text" : "password"}
                      name={field}
                      value={formData[field]}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          [e.target.name]: e.target.value,
                        }))
                      }
                      className={`w-full p-3 border border-gray focus:border-secondary focus:outline-secondary ${
                        errors[field] ? "border-red-500" : ""
                      }`}
                      placeholder="********"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(field)}
                      className="absolute right-3 top-11 cursor-pointer text-primary"
                    >
                      {showPassword[field] ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {errors[field] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[field][0]}
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-6">
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 font-semibold cursor-pointer">
            <LogOut size={20} />
            Keluar
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-secondary text-white py-2 px-6 hover:bg-primary transition cursor-pointer"
          >
            {isPending ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
