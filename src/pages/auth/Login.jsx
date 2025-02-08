import { Mail, Eye, EyeOff } from "lucide-react"
import background from "../../assets/images/bg-home.jpg"
import mirai from "../../assets/images/mirai.png"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { API_URL } from "../../config/generalHelper"
import toast from "react-hot-toast"
import { useState } from "react"
import { useNavigate } from "react-router"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data) => {
      const response = await axios.post(`${API_URL}/api/login`, data, {
        headers: { "Content-Type": "application/json" },
      })
      return response.data
    },
    onSuccess: (result) => {
      console.log("result", result)

      const token = result?.data?.access_token
      const user = result?.data?.user

      if (token && user) {
        localStorage.setItem("auth-token", token)
        localStorage.setItem("user-profile", JSON.stringify(user))
      }

      toast.success(result?.message || "Login successful!")
      setFormData({ email: "", password: "" })

      navigate("/")
    },
    onError: (error) => {
      console.error("Login error:", error)
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
    console.log("form data", formData)
    mutate(formData)
  }

  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      {/* Container */}
      <div className="w-1/2 flex flex-col gap-y-52 p-8">
        <img src={mirai} alt="Mirai Technologies" className="w-30" />
        <div className="px-20">
          <div className="flex flex-col space-y-2 mb-6">
            <h2 className="text-3xl font-bold text-primary">
              Selamat Datang! 👋
            </h2>
            <span className="text-gray">Silahkan masukan data masuk</span>
          </div>
          <form onSubmit={handleSubmit}>
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
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
              )}
            </div>
            <div className="mb-8">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full p-3 pr-12 border border-gray focus:border-secondary focus:outline-secondary ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Masukkan password kamu"
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      password: e.target.value,
                    }))
                  }
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.password[0]}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-secondary text-white py-4 hover:bg-primary transition cursor-pointer"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
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

export default Login
