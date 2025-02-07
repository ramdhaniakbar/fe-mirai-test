import mirai from "../assets/images/mirai.png"
import mail from "../assets/images/mail.png"
import global from "../assets/images/global.png"

const Footer = () => {
  return (
    <div className="px-[160px] mt-24 border-t border-gray">
      <div className="flex justify-between items-center">
       <div className="flex flex-col">
       <img src={mirai} alt="Mirai Technologies" className="w-30" />
        <span className="text-gray text-sm">
          New Media Tower Lv. 12 - ORION, <br /> Jl. Scientia Boulevard, Gading
          Serpong, <br /> Tangerang, Banten
        </span>
       </div>

        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2">
            <img src={mail} alt="Mail Image" className="w-6" />
            <span className="text-gray text-sm">contact@mirai.co.id</span>
          </div>
          <div className="flex space-x-2">
            <img src={global} alt="Global Image" className="w-6" />
            <span className="text-gray text-sm">www.mirai.co.id</span>
          </div>
        </div>
      </div>
      <div className="mt-10 mb-6">
        <span>Copyright @ 2025 Mirai Technologies. All Right Reserved</span>
      </div>
    </div>
  )
}

export default Footer
