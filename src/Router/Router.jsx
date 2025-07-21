import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import NotFound from "../Components/Shared/NotFound";

import Home from "../Pages/Home/Home";
import Courts from "../Pages/Courts/Courts";
import Events from "../Pages/Events/Events";
import Gallery from "../Pages/Gallery/Gallery";
import Membership from "../Pages/Membership/Membership";
import About from "../Pages/About/About";

import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";

import PrivacyPolicy from "../Components/Legal/PrivacyPolicy";
import TermsAndConditions from "../Components/Legal/TermsAndConditions";

import PrivateRouter from "./PrivateRouter";

// Dashboard pages
import DashboardProfile from "../Pages/Dashboard/DashboardProfile";
import AddCourtPage from "../Pages/Dashboard/Admin/AddCourtPage";
import PendingBookings from "../Pages/Dashboard/Shared/PendingBookings";
import ManageBookings from "../Pages/Dashboard/Admin/ManageBookings";
// import DashboardManageCourts from "../Pages/Dashboard/Courts/ManageCourts";
// import DashboardBookings from "../Pages/Dashboard/Bookings/Bookings";
// import DashboardMembers from "../Pages/Dashboard/Members/Members";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "courts", element: <Courts /> },
      { path: "events", element: <Events /> },
      { path: "gallery", element: <Gallery /> },
      { path: "membership", element: <Membership /> },
      { path: "about", element: <About /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-and-conditions", element: <TermsAndConditions /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayouts />
      </PrivateRouter>
    ),
    errorElement: <NotFound />,
    children: [
      { path: "profile", element: <DashboardProfile /> },
      { path: "courts/add", element: <AddCourtPage /> },
      // { path: "courts", element: <DashboardManageCourts /> },
      // { path: "bookings", element: <DashboardBookings /> },
      // { path: "members", element: <DashboardMembers /> },
      { path: "bookings/pending", element: <PendingBookings /> },
      { path: "bookings/manage", element: <ManageBookings /> },
    ],
  },
]);

export default Router;
