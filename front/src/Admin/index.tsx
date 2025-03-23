import { useContext, useEffect } from "react";
import { CruiseContext } from "../Context/AppContext";
import { Outlet, useNavigate } from "react-router-dom";
import "./admin.css";
import Popup from "../Reusable/Popup";

const AdminInd = () => {
  const { user, pop } = useContext(CruiseContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "manager") navigate("/manager");
    } else {
      navigate("/stufflogin");
    }
  }, []);
  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      {pop && <Popup />}
      <Outlet />
    </div>
  );
};

export default AdminInd;
