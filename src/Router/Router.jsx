import { createBrowserRouter } from "react-router";
import MainLayout from "./../Layouts/MainLayout";
import NotFound from "../Components/Shared/NotFound";
import Home from "./../Pages/Home/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [{ index: true, element: <Home /> }],
  },
]);

export default Router;
