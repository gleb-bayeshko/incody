import { Outlet } from "react-router";
import Footer from "~/components/widgets/Footer";
import Navbar from "~/components/widgets/Navbar";

function BaseLayout() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default BaseLayout;
