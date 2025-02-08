import axios from "axios"
import { API_URL, getToken } from "../../config/generalHelper"

const Profile = () => {
  const getProfile = async () => {
    const { data } = await axios.get(
      `${API_URL}/api/user`, {
        headers: {
          Authorization: 'Bearer ' + getToken()
        }
      }
    )
    return data
  }
  return (
    <div className="pt-44 px-[160px]">
      <div className="p-11 shadow-[0px_4px_57px_rgba(0,0,0,0.07)]">
        Muhamad Ramdhani Akbar
      </div>
    </div>
  )
}

export default Profile