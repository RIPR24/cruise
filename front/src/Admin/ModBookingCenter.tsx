import { useState } from "react";
import logo from "../assets/cruise.svg";

type slot = {
  from: string;
  to: string;
  price: number;
  max: number;
};

type rs = {
  _id?: string;
  name: string;
  slots: slot[];
};

const ModBookingCenter = () => {
  const [rs, setRs] = useState<rs>({ name: "", slots: [] });
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
          <img src={logo} style={{ height: 45, width: 45 }} />
          <div className="sta-inp-con">
            <label htmlFor="tag"> TAGS :</label>
            <div style={{ display: "flex", gap: 20 }}>
              <input type="text" placeholder="ENTER TAG" />
              <button onClick={addTag} className="prm">
                ADD
              </button>
            </div>
            <div className="tag-con">
              {rs.slots &&
                rs.slots.map((el) => (
                  <div key={el} className="tag">
                    <p>{el}</p>
                    <img src={clo} onClick={() => removeTag(el)} />
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
                addStationary();
              }
            }}
          >
            ADD ITEM
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModBookingCenter;
