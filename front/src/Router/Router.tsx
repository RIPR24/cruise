import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Home";
import Login from "../Login";
import AdminInd from "../Admin";
import OptionAdmin from "../Admin/OptionAdmin";
import AddStaItems from "../Admin/AddStaItems";
import ModStaItems from "../Admin/ModStaItems";
import AddFoodItems from "../Admin/AddFoodItems";
import ModFoodItems from "../Admin/ModFoodItems";
import AddVoy from "../Admin/AddVoy";
import VoyagerInfo from "../Admin/VoyagerInfo";

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
        element: <AddStaItems />,
      },
      {
        path: "/admin/modsta",
        element: <ModStaItems />,
      },
      {
        path: "/admin/addfood",
        element: <AddFoodItems />,
      },
      {
        path: "/admin/modfood",
        element: <ModFoodItems />,
      },
      {
        path: "/admin/addvoy",
        element: <AddVoy />,
      },
      {
        path: "/admin/voy",
        element: <VoyagerInfo />,
      },
    ],
  },
]);
