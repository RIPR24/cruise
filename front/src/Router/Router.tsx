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
        path: "/admin/select",
        element: <OptionAdmin />,
        index: true,
      },
      {
        path: "/admin/addsta",
        element: <AddStaItems />,
        index: true,
      },
      {
        path: "/admin/modsta",
        element: <ModStaItems />,
        index: true,
      },
      {
        path: "/admin/addfood",
        element: <AddFoodItems />,
        index: true,
      },
      {
        path: "/admin/modfood",
        element: <ModFoodItems />,
        index: true,
      },
      {
        path: "/admin/addvoy",
        element: <AddVoy />,
        index: true,
      },
    ],
  },
]);
