import { useContext, useState } from "react";
import logo from "../assets/cruise.svg";
import { postReq } from "../Utils/request";
import { useNavigate } from "react-router-dom";
import { CruiseContext } from "../Context/AppContext";

type info = {
  _id: string;
  password: string;
  name: string;
  address: string;
  age: number;
  credType: string;
  cred: string;
  ph: number;
  room: number;
};

const AddVoy = () => {
  const [disable, setDisable] = useState(false);
  const { user, setUser } = useContext(CruiseContext);
  const navigate = useNavigate();
  const [prob, setProb] = useState("");
  const [info, setInfo] = useState<info>({
    _id: "",
    password: "",
    name: "",
    address: "",
    age: 0,
    credType: "",
    cred: "",
    ph: 0,
    room: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInfo((pre) => ({ ...pre, [e.target.id]: val }));
  };

  const addVoyager = async () => {
    setDisable(true);
    const res = await postReq("admin/voyager", {
      ...info,
      token: user?.token,
      username: user?.username,
      role: user?.role,
    });
    if (res?.status === "success") {
      navigate("/admin");
    }
    if (res?.status) setProb(res.status);
    if (res?.code === 401) {
      if (setUser) setUser(null);
      navigate("/stufflogin");
    }
    setDisable(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        maxWidth: 1100,
        width: "90%",
        textAlign: "center",
      }}
    >
      <div className="admin-con">
        <h1>REGISTER VOYAGER</h1>
        <div className="regcon">
          <img src={logo} style={{ height: 45, width: 45 }} />
          <div className="voy-inp-con">
            <label htmlFor="name">NAME :</label>
            <input
              type="text"
              placeholder="NAME"
              onChange={handleChange}
              name="name"
              id="name"
            />
            <label htmlFor="address">ADDRESS :</label>
            <input
              type="text"
              placeholder="ADDRESS"
              onChange={handleChange}
              name="address"
              id="address"
            />
            <label htmlFor="_id">USER ID:</label>
            <input
              type="text"
              placeholder="id"
              onChange={handleChange}
              name="_id"
              id="_id"
            />
            <label htmlFor="password"> PASSWORD :</label>
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              id="password"
            />
            <label htmlFor="age">AGE : </label>
            <input
              type="number"
              placeholder="age"
              onChange={handleChange}
              name="age"
              id="age"
            />
            <label htmlFor="ph">PH NO. : </label>
            <input
              type="number"
              placeholder="Phone number"
              onChange={handleChange}
              name="ph"
              id="ph"
            />
            <label htmlFor="credType"> DOCUMENT TYPE :</label>
            <input
              type="text"
              placeholder="DOC TYPE"
              onChange={handleChange}
              name="credType"
              id="credType"
            />
            <label htmlFor="cred"> DOCUMENT NO :</label>
            <input
              type="text"
              placeholder="DOC TYPE"
              onChange={handleChange}
              name="cred"
              id="cred"
            />
            <label htmlFor="room">ROOM NO. : </label>
            <input
              type="number"
              placeholder="room number"
              onChange={handleChange}
              name="room"
              id="room"
            />
          </div>
          <p style={{ color: "red" }}>{prob}</p>
          <button
            disabled={disable}
            className={disable ? "disb" : ""}
            onClick={() => {
              if (!disable) {
                addVoyager();
              }
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVoy;
