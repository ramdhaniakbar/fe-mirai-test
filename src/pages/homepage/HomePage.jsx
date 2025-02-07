import background from "../../assets/images/bg-home.jpg"

const HomePage = () => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-0 right-0 -z-10">
        <img
          src={background}
          alt="Background Home"
          className="w-[496px] h-[750px] object-cover rounded-bl-[56px]"
        />
      </div>

      <div className="pt-44 pl-[160px] pr-[615px] flex flex-col gap-2">
        <div className="flex items-center">
          <h2 className="text-lg text-secondary font-medium uppercase">
            — Inovasi, Efisiensi, dan Performa Maksimal
          </h2>
        </div>
        <h1 className="text-4xl text-primary font-bold relative z-10 leading-12 mb-4">
          Transformasi Digital untuk Masa Depan: Mewujudkan Inovasi, Efisiensi,
          dan Keunggulan Teknologi
        </h1>
        <p className="text-gray mb-6">
          Membangun solusi teknologi yang mendorong pertumbuhan dan efisiensi
          bisnis. Kami adalah tim profesional di bidang pengembangan perangkat
          lunak, dengan fokus pada aplikasi web, mobile, dan sistem backend yang
          scalable. Dengan pengalaman luas di industri teknologi, kami membantu
          bisnis dan individu menciptakan solusi digital yang inovatif, andal,
          dan berkelanjutan.
        </p>
        <button className="bg-secondary text-white w-fit py-4 px-8 cursor-pointer">Selengkapnya</button>
      </div>
    </div>
  )
}

export default HomePage
