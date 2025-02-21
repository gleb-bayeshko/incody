import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "~/components/widgets/Footer";
import Navbar from "~/components/widgets/Navbar";
import { failData } from "~/utils/mock/failData";
import { initialData } from "~/utils/mock/initialData";
import { productData } from "~/utils/mock/productData";
import { successData } from "~/utils/mock/successData";

function BaseLayout() {
  const location = useLocation();
  const isDev = import.meta.env.MODE === "development";

  useEffect(() => {
    if (isDev) {
      // @ts-ignore
      window.__INITIAL_DATA__ = getData(location.pathname);
    }
  }, [location]);

  if (isDev) {
    // @ts-ignore
    window.__INITIAL_DATA__ = getData(location.pathname);
  }

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
        <div className="h-full w-full">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default BaseLayout;

function getData(pathname: string = "") {
  let data = {};

  if (pathname === "/") {
    data = initialData;
  } else if (pathname.startsWith("/product/")) {
    data = productData;
  } else if (pathname === "/pay/success") {
    data = successData;
  } else if (pathname === "/pay/fail") {
    data = failData;
  }

  return data;
}
