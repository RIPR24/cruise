import { useContext, useEffect } from "react";
import { CruiseContext } from "../Context/AppContext";
import { Outlet, useNavigate } from "react-router-dom";
import "./admin.css";

const AdminInd = () => {
  const { user } = useContext(CruiseContext);
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
      <Outlet />
    </div>
  );
};

export default AdminInd;
