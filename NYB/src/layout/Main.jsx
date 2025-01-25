import { Outlet } from "react-router-dom";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default Main;