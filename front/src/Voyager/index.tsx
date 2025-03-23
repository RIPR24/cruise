import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CruiseContext } from "../Context/AppContext";
import "./voy.css";
import Popup from "../Reusable/Popup";

const Voyind = () => {
  const { user, setUser, pop } = useContext(CruiseContext);
  const navigate = useNavigate();

  const logOut = () => {
    if (setUser) setUser(null);
    localStorage.removeItem("tok");
    navigate("/");
  };

  useEffect(() => {
    if (!user?.room) {
      navigate("/");
    }
  }, []);
  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <div className="logout">
        <button onClick={logOut}>LogOut</button>
      </div>
      {pop && <Popup />}
      <Outlet />
    </div>
  );
};

export default Voyind;
