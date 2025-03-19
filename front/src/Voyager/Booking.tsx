import { useContext, useEffect, useRef, useState } from "react";
import { postReq, site } from "../Utils/request";
import { CruiseContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { rs } from "../Admin/ModBookingCenter";

type slt = {
  sid: string;
  slot: string;
};

const Booking = () => {
  const [rs, setRs] = useState<rs>({ name: "", slots: [] });
  const [slt, setSlt] = useState<slt>({ sid: "", slot: "" });
  const [prob, setProb] = useState("");
  const [rslist, setRslist] = useState<rs[]>([]);
  const datref = useRef<HTMLInputElement>(null);
  const { user } = useContext(CruiseContext);
  const navigate = useNavigate();

  const getData = async () => {
    const res = await fetch(site + "rs/");
    const data = await res.json();
    setRslist(data.rcs);
    setRs(data.rcs[0]);
  };

  const bookSlt = async () => {
    const date = datref.current?.value;
    if (date && slt.sid.length > 0) {
      const data = await postReq("voy/book", {
        ...slt,
        rsid: rs._id,
        uid: user?._id,
        cname: user?.name,
        name: rs.name,
        date,
      });
      if (data.status === "success") {
        navigate("/voy/");
      } else {
        setProb(data.status);
      }
    } else {
      setProb("Select date and slot");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="book-con">
      <div className="in-line">
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
      <h2>{rs.name.toUpperCase() || ""}</h2>
      <div className="in-line">
        <h3>SELECT DATE :</h3>
        <input type="date" ref={datref} />
      </div>
      <div className="slt-con">
        {rs &&
          rs.slots.map((el) => {
            return (
              <div
                className={slt.sid === el.sid ? "slt sel" : "slt"}
                key={el.sid}
                onClick={() => {
                  setSlt({ sid: el.sid, slot: el.from + " - " + el.to });
                }}
              >
                <p>{el.from + " - " + el.to}</p>
                <p>{"₹ " + el.price}</p>
              </div>
            );
          })}
      </div>
      <p style={{ color: "red" }}>{prob}</p>
      <button onClick={bookSlt} className="prm">
        BOOK
      </button>
    </div>
  );
};

export default Booking;
