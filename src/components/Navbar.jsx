import { Link } from "react-router"
import mirai from '../assets/images/mirai.png'

const Navbar = () => {
  return (
    <nav className="w-full bg-white/30 backdrop-blur-2xl flex gap-12 border-b border-[#8C8C8C]">
      <div className="py-3 px-5 border-r border-[#8C8C8C]">
        <img src={mirai} alt="Mirai Technologies" className="w-30" />
      </div>
      <ul className="flex items-center space-x-10">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/diary"}>List Diaries</Link>
        </li>
        <li>
          <Link to={"/kodepos"}>Kodepos</Link>
        </li>
        <li>
          <Link to={"/profile"}>Profile</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
