import { Mail, Eye, EyeOff } from "lucide-react"
import background from "../../assets/images/bg-home.jpg"
import mirai from "../../assets/images/mirai.png"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { API_URL } from "../../config/generalHelper"
import toast from "react-hot-toast"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router"

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data) => {
      const response = await axios.post(`${API_URL}/api/register`, data, {
        headers: { "Content-Type": "application/json" },
      })
      return response.data
    },
    onSuccess: (result) => {
      setFormData({ name: "", email: "", password: "", password_confirmation: "" })
      toast.success(result?.message || "Register successful!");
      navigate('/login')
    },
    onError: (error) => {
      console.error("Registration error:", error)
      const apiErrors = error?.response?.data?.errors
      if (apiErrors && typeof apiErrors === "object") {
        setErrors(apiErrors)
      } else {
        setErrors({})
        toast.error(error?.response?.data?.message || "An error occurred")
      }
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('form data', formData)
    mutate(formData)
  }

  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      {/* Container */}
      {/* Left Section - Form */}
      <div className="w-1/2 flex flex-col gap-y-28 p-8">
      <Link to={'/'}>
        <img src={mirai} alt="Mirai Technologies" className="w-30" />
      </Link>
        <div className="px-20">
          <div className="flex flex-col space-y-2 mb-6">
            <h2 className="text-3xl font-bold text-primary">
              Selamat Datang! 👋
            </h2>
            <span className="text-gray">
              Silahkan masukan data untuk membuat akun
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <input
                type="text"
                className={`w-full p-3 border border-gray focus:border-secondary focus:outline-secondary ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Masukkan nama kamu"
                onChange={(e) => setFormData((prevData) => ({
                  ...prevData,
                  name: e.target.value 
                }))}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
              )}
            </div>
            <div className="mb-5">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
                  size={24}
                />
                <input
                  type="email"
                  className={`w-full p-3 pl-12 border border-gray focus:border-secondary focus:outline-secondary ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Masukkan email kamu"
                  onChange={(e) => setFormData((prevData) => ({
                    ...prevData,
                    email: e.target.value
                  }))}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
              )}
            </div>
            <div className="mb-5">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full p-3 pr-12 border border-gray focus:border-secondary focus:outline-secondary ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Masukkan password kamu"
                  onChange={(e) => setFormData((prevData) => ({
                    ...prevData,
                    password: e.target.value
                  }))}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
              )}
            </div>
            <div className="mb-8 relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full p-3 pr-12 border border-gray focus:border-secondary focus:outline-secondary"
                placeholder="Konfirmasi password"
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    password_confirmation: e.target.value
                  }))
                }
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary cursor-pointer"
                onClick={() => setConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-secondary text-white py-4 hover:bg-primary transition cursor-pointer"
              disabled={isPending}
            >
              {isPending ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-1/2">
        <img
          src={background}
          alt="Signup Illustration"
          className="w-full h-full object-cover"
        />
      </div>
      {/* </div> */}
    </div>
  )
}

export default Register
