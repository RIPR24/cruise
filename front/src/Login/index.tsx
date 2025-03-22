import { useContext, useEffect, useState } from "react";
import "./log.css";
import logo from "../assets/cruise.svg";
import { useNavigate } from "react-router-dom";
import { postReq } from "../Utils/request";
import { CruiseContext } from "../Context/AppContext";

type info = {
  username: string;
  password: string;
};

const Login = ({ voy }: { voy: boolean }) => {
  const [disable, setDisable] = useState(false);
  const { setUser } = useContext(CruiseContext);
  const navigate = useNavigate();
  const [prob, setProb] = useState("");
  const [info, setInfo] = useState<info>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInfo({ ...info, [e.target.id]: val });
  };

  const login = async () => {
    setDisable(false);
    const res = await postReq(voy ? "voy/login" : "stuff/login", info);
    if (res) {
      if (res.status !== "success") {
        setProb(res.status);
      } else {
        if (setUser) setUser(res.user);
        if (res.user?.room) {
          navigate("/voy");
          localStorage.setItem("tok", res.user.token || "");
        } else if (res.user?.role === "admin") navigate("/admin");
        else if (res.user?.role === "manager") navigate("/manager");
        else if (res.user?.role === "headcook") navigate("/headcook");
        else if (res.user?.role === "supervisor") navigate("/supervisor");
      }
    }
  };

  const loginTok = async (tok: string) => {
    const res = await postReq("voy/logintok", { tok });
    if (res.user?.room) {
      if (setUser) setUser(res.user);
      localStorage.setItem("tok", res.user.token || "");
      navigate("/voy");
    }
  };

  useEffect(() => {
    if (voy) {
      const tok = localStorage.getItem("tok");
      if (tok) {
        localStorage.removeItem("tok");
        loginTok(tok);
      }
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <div className="con">
        <h1>{voy ? "VOYAGER LOGIN" : "STUFF LOGIN"}</h1>
        <div className="logcon">
          <img src={logo} style={{ height: 45, width: 45 }} />
          <input
            type="username"
            placeholder="Username"
            onChange={handleChange}
            name="username"
            id="username"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            id="password"
          />
          <p style={{ color: "red" }}>{prob}</p>
          <p>
            {voy ? "Not a voyager ?" : "Not a stuff ?"}
            <span
              onClick={() => {
                navigate(voy ? "/stufflogin" : "/voylogin");
              }}
            >
              {voy ? " Stuff login" : " Voyager login"}
            </span>
          </p>
          <button
            disabled={disable}
            className={disable ? "disb" : ""}
            onClick={() => {
              if (!disable) {
                login();
              }
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
