import { useQuery } from "@tanstack/react-query"
import background from "../../assets/images/bg-home.jpg"
import diary from "../../assets/images/diary.svg"
import axios from "axios"
import moment from "moment"
import { API_URL } from "../../config/generalHelper"
import { Link } from "react-router"

const HomePage = () => {
  const fetchUserActivity = async () => {
    const { data } = await axios.get(
      `${API_URL}/api/user-activity`
    )
    return data.data
  }

  const {
    isPending,
    isError,
    data: activities,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchUserActivity,
  })

  if (isPending) return <span>Loading...</span>

  if (isError) return <span>Error: {error.message}</span>

  console.log("data ", activities)

  return (
    <div className="relative min-h-screen">
      <div>
        <div className="absolute top-0 right-0 -z-10">
        <Link to={'/'}>
            <img
              src={background}
              alt="Background Home"
              className="w-[496px] h-[750px] object-cover rounded-bl-[56px]"
            />
        </Link>
        </div>

        <div className="pt-44 pl-[160px] pr-[615px] flex flex-col gap-2">
          <div className="flex items-center">
            <h2 className="text-lg text-secondary font-medium uppercase">
              — Inovasi, Efisiensi, dan Performa Maksimal
            </h2>
          </div>
          <h1 className="text-4xl text-primary font-bold relative z-10 leading-12 mb-4">
            Transformasi Digital untuk Masa Depan: Mewujudkan Inovasi,
            Efisiensi, dan Keunggulan Teknologi
          </h1>
          <p className="text-gray mb-6">
            Membangun solusi teknologi yang mendorong pertumbuhan dan efisiensi
            bisnis. Kami adalah tim profesional di bidang pengembangan perangkat
            lunak, dengan fokus pada aplikasi web, mobile, dan sistem backend
            yang scalable. Dengan pengalaman luas di industri teknologi, kami
            membantu bisnis dan individu menciptakan solusi digital yang
            inovatif, andal, dan berkelanjutan.
          </p>
          <button className="bg-secondary text-white w-fit py-4 px-8 cursor-pointer">
            Selengkapnya
          </button>
        </div>
      </div>

      <div className="relative h-[267px] bg-primary mt-64 flex justify-center items-center overflow-hidden">
        {/* Background Images */}
        <img
          src={diary}
          alt="Diary Image"
          className="absolute w-[300px] left-5 -top-15"
          style={{ clipPath: "inset(0 0 0 0)" }}
        />
        <img
          src={diary}
          alt="Diary Image"
          className="absolute w-[300px] left-85 top-30"
          style={{ clipPath: "inset(0 0 0 0)" }}
        />
        <img
          src={diary}
          alt="Diary Image"
          className="absolute w-[300px] right-85 -bottom-20"
          style={{ clipPath: "inset(0 0 0 0)" }}
        />
        <img
          src={diary}
          alt="Diary Image"
          className="absolute w-[300px] right-5 bottom-25"
          style={{ clipPath: "inset(0 0 0 0)" }}
        />

        {/* Main Content */}
        <div className="relative z-10 text-center text-white">
          <p className="text-xl font-semibold uppercase text-gray-400 mb-2">
            Jumlah Diary Saat Ini
          </p>
          <h2 className="text-4xl font-bold">{activities ?.total_diary ?? 0}</h2>
        </div>
      </div>

      <div className="px-[160px] mt-28">
        <h2 className="text-lg text-secondary font-medium uppercase mb-5">
          — Live Activity
        </h2>

        <div className="flex flex-col w-full items-center my-6">
          {activities?.data?.length > 0 ? activities?.data?.map((activity, index) => (
            <div
              className="p-11 shadow-[0px_4px_57px_rgba(0,0,0,0.07)] flex flex-col space-y-4 my-2 w-full"
              key={index}
            >
              <div className="flex items-center space-x-3">
                <img src={activity.user.image_url} alt={activity.user.name} className="w-12 h-12 object-cover rounded-full" />
                <span className="text-xl text-primary font-semibold">{activity.user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray text-sm">{activity.activities}</span>
                <span className="text-gray text-sm">
                  {moment(activity.created_at).startOf('hour').fromNow()}
                </span>
              </div>
            </div>
          )) : <div className="bg-secondary rounded-full text-white px-3 py-2">Tidak ada data</div>}
        </div>
      </div>
    </div>
  )
}

export default HomePage
