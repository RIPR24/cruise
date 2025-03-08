import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./Router/Router.tsx";
import AppContext from "./Context/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AppContext>
    <RouterProvider router={AppRouter} />
  </AppContext>
);
