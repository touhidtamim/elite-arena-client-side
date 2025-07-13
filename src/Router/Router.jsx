import { createBrowserRouter } from "react-router";
import MainLayout from "./../Layouts/MainLayout";
import NotFound from "../Components/Shared/NotFound";
import Home from "./../Pages/Home/Home";
import Courts from "../Pages/Courts/Courts";
import Events from "../Pages/Events/Events";
import Gallery from "../Pages/Gallery/Gallery";
import Membership from "../Pages/Membership/Membership";
import About from "../Pages/About/About";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },

      { path: "/courts", element: <Courts /> },

      { path: "/events", element: <Events /> },

      { path: "/gallery", element: <Gallery /> },

      { path: "/membership", element: <Membership /> },

      { path: "/about", element: <About /> },
    ],
  },
]);

export default Router;
