import { useNavigate } from "react-router-dom";
import logo from "../assets/cruise.svg";

const Nav = () => {
  const navigate = useNavigate();
  const onClick = (b: boolean = false) => {
    if (b) {
      navigate("/stufflogin");
    } else {
      navigate("/voylogin");
    }
  };
  return (
    <div className="nav">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src={logo} style={{ height: 45, width: 45 }} />
        <p style={{ fontSize: "1.4rem" }}>XYZ Cruise</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={() => onClick()}>SIGN IN</button>
        <button onClick={() => onClick(true)}>STUFF LOG IN</button>
      </div>
    </div>
  );
};

export default Nav;
