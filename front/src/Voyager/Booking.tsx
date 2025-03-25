import { useContext, useEffect, useRef, useState } from "react";
import { postReq, site } from "../Utils/request";
import { CruiseContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { rs } from "../Admin/ModBookingCenter";
import MyBookings from "./MyBookings";

type slt = {
  sid: string;
  slot: string;
};

type booked = {
  _id: string;
  no: number;
};

const Booking = () => {
  const [rs, setRs] = useState<rs>({ name: "", slots: [] });
  const [slt, setSlt] = useState<slt>({ sid: "", slot: "" });
  const [book, setBook] = useState<booked[]>([]);
  const [prob, setProb] = useState("");
  const [rslist, setRslist] = useState<rs[]>([]);
  const datref = useRef<HTMLInputElement>(null);
  const { user, setPop } = useContext(CruiseContext);
  const [myord, setMyord] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    const res = await fetch(site + "rs/");
    const data = await res.json();
    setRslist(data.rcs);
    setRs(data.rcs[0]);
  };

  const getBooked = async (rsid: string = rs._id || "") => {
    const date = datref.current?.value;
    if (date && rsid) {
      const bok = await postReq("rs/booked", { rsid, date });
      setBook(bok.rb);
    }
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
        if (setPop) setPop("Slot booked");
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
    <div style={{ width: "100%" }}>
      <button
        onClick={() => {
          setMyord((p) => !p);
        }}
        className="prm rc"
      >
        {myord ? "Back" : "My Bookings"}
      </button>
      {myord ? (
        <MyBookings />
      ) : (
        <div className="book-con">
          <div className="in-line">
            <h3>SELECT BOOKING SPOTS</h3>
            <select
              onChange={(e) => {
                const r = rslist[Number(e.target.value)];
                setRs(r);
                getBooked(r._id);
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
            <input onChange={() => getBooked()} type="date" ref={datref} />
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
                    <p>{`Slot left : ${
                      el.max - (book.find((e) => e._id === el.sid)?.no || 0)
                    }`}</p>
                  </div>
                );
              })}
          </div>
          <p style={{ color: "red" }}>{prob}</p>
          <button onClick={bookSlt} className="prm">
            BOOK
          </button>
        </div>
      )}
    </div>
  );
};

export default Booking;
