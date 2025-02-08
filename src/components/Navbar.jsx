import { Link } from "react-router"
import mirai from '../assets/images/mirai.png'
import { getToken } from "../config/generalHelper";

const Navbar = () => {
  const token = getToken()
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/20 backdrop-blur-md flex gap-12 border-b border-[#8C8C8C] z-50">
      <div className="py-3 px-5 border-r border-[#8C8C8C]">
        <img src={mirai} alt="Mirai Technologies" className="w-30" />
      </div>
      <ul className="flex items-center space-x-10">
        <li>
          <Link to={"/"} className="text-primary">Home</Link>
        </li>
        <li>
          <Link to={"/diary"} className="text-primary">List Diaries</Link>
        </li>
        <li>
          <Link to={"/kodepos"} className="text-primary">Kodepos</Link>
        </li>
        <li>
          <Link to={token ? "/profile" : '/login'} className="text-primary">{token ? 'Profile' : 'Login'}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar
