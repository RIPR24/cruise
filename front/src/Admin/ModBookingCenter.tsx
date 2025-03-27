import { useContext, useEffect, useState } from "react";
import logo from "../assets/cruise.svg";
import clo from "../assets/close.svg";
import { putReq, site } from "../Utils/request";
import { CruiseContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

export type slot = {
  from: string;
  to: string;
  price: number;
  max: number;
  sid: string;
};

export type rs = {
  _id?: string;
  name: string;
  slots: slot[];
};

const def: slot = {
  from: "",
  to: "",
  price: 0,
  max: 1,
  sid: "",
};

const ModBookingCenter = () => {
  const [rs, setRs] = useState<rs>({ name: "", slots: [] });
  const [rslist, setRslist] = useState<rs[]>([]);
  const [prob, setProb] = useState("");
  const [info, setInfo] = useState<slot>(def);
  const [disable, setDisable] = useState(false);
  const { user, setUser, setPop } = useContext(CruiseContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInfo((pre) => ({ ...pre, [e.target.id]: val }));
  };

  const getData = async () => {
    const res = await fetch(site + "rs/");
    const data = await res.json();
    setRslist(data.rcs);
    setRs(data.rcs[0]);
  };

  const addSlot = () => {
    if (info.from.length > 0) {
      setRs((pre) => {
        const slots = [...pre.slots, { ...info, sid: Date.now().toString() }];
        return { ...pre, slots };
      });
      setInfo((pre) => ({ ...pre, from: "", to: "" }));
    }
  };

  const removeSlot = (e: string) => {
    setRs((pre) => {
      const slots = pre.slots.filter((el) => el.sid !== e);
      return { ...pre, slots };
    });
  };

  const modifyRs = async () => {
    setDisable(true);
    const data = await putReq("admin/rs", {
      ...rs,
      token: user?.token,
      username: user?.username,
      role: user?.role,
    });
    if (data.status === "success") {
      if (setPop) setPop("Booking Center Modified");
      setInfo((pre) => ({ ...pre, price: 0 }));
    } else {
      if (data.code === 401) {
        if (setUser) setUser(null);
        navigate("/stufflogin");
      }
      setProb(data.status || "");
    }
    setDisable(false);
  };

  useEffect(() => {
    getData();
  }, []);

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
        <h1>ADD STATIONARY ITEM</h1>
        <div className="regcon">
          <div>
            <h3>SELECT BOOKING SPOTS</h3>
            <select
              onChange={(e) => {
                setRs(rslist[Number(e.target.value)]);
              }}
              name="rs"
              id="rs"
            >
              {rslist.map((el, i) => (
                <option value={i} key={el._id}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
          <img src={logo} style={{ height: 45, width: 45 }} />
          <h2>{rs.name || ""}</h2>
          <div>
            <div style={{ display: "flex", gap: 20 }}>
              <label htmlFor="from">
                FROM/NAME :
                <input
                  value={info.from}
                  type="text"
                  placeholder="FROM"
                  id="from"
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="to">
                TO :
                <input
                  value={info.to}
                  type="text"
                  onChange={handleChange}
                  placeholder="TO"
                  id="to"
                />
              </label>
              <label htmlFor="price">
                PRICE :
                <input
                  value={info.price}
                  onChange={handleChange}
                  type="text"
                  placeholder="PRICE"
                  id="price"
                />
              </label>
              <label htmlFor="max">
                MAX :
                <input
                  value={info.max}
                  onChange={handleChange}
                  type="text"
                  placeholder="MAX"
                  id="max"
                />
              </label>
              <button onClick={addSlot} className="prm">
                ADD
              </button>
            </div>
            <div className="tag-con">
              {rs?.slots &&
                rs.slots.map((el) => (
                  <div key={el.from} className="tag">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <p>{el.from}</p>
                      <p>{el.to}</p>
                      <p>{el.price}</p>
                      <p>{el.max}</p>
                    </div>
                    <img src={clo} onClick={() => removeSlot(el.sid)} />
                  </div>
                ))}
            </div>
          </div>
          <p style={{ color: "red" }}>{prob}</p>
          <button
            disabled={disable}
            className={disable ? "disb" : "prm"}
            onClick={() => {
              if (!disable) {
                modifyRs();
              }
            }}
          >
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModBookingCenter;
