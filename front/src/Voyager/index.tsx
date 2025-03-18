import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CruiseContext } from "../Context/AppContext";
import "./voy.css";

const Voyind = () => {
  const { user } = useContext(CruiseContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.room) {
      navigate("/");
    }
  }, []);
  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <Outlet />
    </div>
  );
};

export default Voyind;
