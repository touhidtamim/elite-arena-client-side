import { Outlet, useNavigation } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ScrollToTop from "./../Components/Shared/ScrollToTop";
import Spinner from "../Components/Shared/Spinner";

const MainLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      <Navbar />
      <ScrollToTop />

      {navigation.state === "loading" && <Spinner />}

      <div className="bg-gray-900 min-h-[90vh] text-white">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default MainLayout;
