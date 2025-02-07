import background from "../../assets/images/bg-home.jpg"

const HomePage = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image Positioned on the Top-Right */}
      <div className="absolute top-0 right-0 -z-10">
        <img
          src={background}
          alt="Background Home"
          className="w-[496px] h-[700px] object-cover rounded-bl-[56px]"
        />
      </div>

      {/* Content of HomePage */}
      <h1 className="text-3xl font-bold relative z-10 p-6">HomePage</h1>
    </div>
  )
}

export default HomePage
