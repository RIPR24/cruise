import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Home";
import Login from "../Login";
import AdminInd from "../Admin";
import OptionAdmin from "../Admin/OptionAdmin";
import AddStaItems from "../Admin/AddStaItems";
import ModFoodItems from "../Admin/ModFoodItems";
import AddVoy from "../Admin/AddVoy";
import VoyagerInfo from "../Admin/VoyagerInfo";
import ModBookingCenter from "../Admin/ModBookingCenter";
import Voyind from "../Voyager";
import SelectVoy from "../Voyager/SelectVoy";
import Order from "../Voyager/Order";
import Booking from "../Voyager/Booking";
import WatchItems from "../Stuff/WatchItems";
import SelectMgr from "../Stuff/SelectMgr";
import WatchBook from "../Stuff/WatchBook";
import Theater from "../Voyager/Theater";
import WatchMovBook from "../Stuff/WatchMovBook";
import MovBookings from "../Voyager/MovBookings";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/voylogin",
        element: <Login voy={true} />,
      },
      {
        path: "/stufflogin",
        element: <Login voy={false} />,
      },
    ],
  },
  {
    path: "/voy",
    element: <Voyind />,
    children: [
      {
        path: "/voy/",
        element: <SelectVoy />,
        index: true,
      },
      {
        path: "/voy/food",
        element: <Order food={true} />,
      },
      {
        path: "/voy/items",
        element: <Order food={false} />,
      },
      {
        path: "/voy/book",
        element: <Booking />,
      },
      {
        path: "/voy/movie",
        element: <Theater />,
      },
      {
        path: "/voy/mybook",
        element: <MovBookings />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminInd />,
    children: [
      {
        path: "/admin/",
        element: <OptionAdmin />,
        index: true,
      },
      {
        path: "/admin/addsta",
        element: <AddStaItems food={false} />,
      },
      {
        path: "/admin/modsta",
        element: <ModFoodItems food={false} />,
      },
      {
        path: "/admin/addfood",
        element: <AddStaItems food={true} />,
      },
      {
        path: "/admin/modfood",
        element: <ModFoodItems food={true} />,
      },
      {
        path: "/admin/addvoy",
        element: <AddVoy />,
      },
      {
        path: "/admin/voy",
        element: <VoyagerInfo />,
      },
      {
        path: "/admin/rs",
        element: <ModBookingCenter />,
      },
    ],
  },
  {
    path: "/manager",
    element: <SelectMgr />,
  },
  {
    path: "/mng/movie",
    element: <WatchMovBook />,
  },
  {
    path: "/mng/fc",
    element: <WatchBook rsid="67d6e97194622f6645f5cce4" />,
  },
  {
    path: "/mng/bs",
    element: <WatchBook rsid="67d6e9262386dce3289d9052" />,
  },
  {
    path: "/mng/ph",
    element: <WatchBook rsid="67d6e98d60574ebd09e46835" />,
  },
  {
    path: "/headcook",
    element: <WatchItems food />,
  },
  {
    path: "/supervisor",
    element: <WatchItems food={false} />,
  },
]);
