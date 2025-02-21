import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "~/components/widgets/Footer";
import Navbar from "~/components/widgets/Navbar";

function BaseLayout() {
  return (
    <>
      <ToastContainer
        hideProgressBar
        position="top-right"
        toastClassName="font-normal text-base text-base-content !font-sans"
        autoClose={3000}
      />
      <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default BaseLayout;
