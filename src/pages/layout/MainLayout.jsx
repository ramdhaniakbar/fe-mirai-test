import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-fit">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout