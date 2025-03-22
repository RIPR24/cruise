import chr from "../assets/seat.svg";
import chrd from "../assets/seatdis.svg";
import scr from "../assets/screen.svg";
import { getReq, postReq } from "../Utils/request";
import { useContext, useEffect, useState } from "react";
import { CruiseContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

type seat = {
  char: string;
  no: number;
};

type slt = {
  from: string;
  to: string;
  sid: string;
};

type tht = {
  name: string;
  price: number;
  seat: seat[];
  slots: slt[];
  _id: string;
};

const Theater = () => {
  const [booked, setBooked] = useState<string[]>([]);
  const [tht, setTht] = useState<tht>({
    name: "",
    price: 0,
    seat: [],
    slots: [],
    _id: "",
  });
  const [slt, setSlt] = useState<slt | null>(null);
  const [date, setDate] = useState("");
  const [seat, setSeat] = useState("");
  const { user } = useContext(CruiseContext);
  const navigate = useNavigate();

  const getData = async () => {
    const dat = await getReq("movie/seat");
    setTht(dat);
  };

  const getBooked = async (d: string = date, sid: string = slt?.sid || "") => {
    if (date.length === 10 && sid.length > 0) {
      const dat = await postReq("movie/booked", { date: d, sid });
      setBooked(dat);
    }
  };

  const dateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      setDate(val);
      getBooked(val);
    }
  };

  const bookTicket = async () => {
    const bok = await postReq("voy/bookmov", {
      name: tht.name,
      cname: user?.name,
      uid: user?._id,
      sid: slt?.sid,
      price: tht.price,
      from: slt?.from,
      seat,
      date,
    });
    if (bok.status === "success") {
      navigate("/voy/");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      {slt && date ? (
        <div>
          <div className="flt-con">
            <div className="in-line">
              <p>{date}</p>
              <p>{slt.from}</p>
              <button
                className="prm"
                onClick={() => {
                  setSlt(null);
                  setSeat("");
                }}
              >
                change
              </button>
            </div>
            <button onClick={bookTicket} className={seat ? "prm" : ""}>
              BOOK
            </button>
          </div>
          <img src={scr} className="scr" />
          <div className="row-con">
            {tht.seat &&
              tht.seat.map((el) => {
                const st = [...Array(el.no + 1).keys()].slice(1);
                return (
                  <div key={el.char} className="seat-row">
                    {st &&
                      st.map((e) => {
                        const sn = el.char + "-" + e.toString();
                        const chk = booked.includes(sn);
                        return (
                          <p
                            key={e}
                            style={{
                              color: sn === seat ? "aquamarine" : "black",
                              backgroundImage: `url("${chk ? chr : chrd}")`,
                              cursor: chk ? "not-allowed" : "pointer",
                            }}
                            onClick={() => {
                              if (!chk) {
                                setSeat(sn);
                              }
                            }}
                          >
                            {sn}
                          </p>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => {
              navigate("/voy/mybook");
            }}
            className="prm rc"
          >
            My Bookings
          </button>
          <h2>SELECT TIME & DATE</h2>
          <input type="date" onChange={dateChange} />
          <div style={{ display: "flex", gap: 20, padding: 20 }}>
            {tht.slots &&
              tht.slots.map((el) => {
                return (
                  <div
                    className={slt?.sid === el.sid ? "slt prm" : "slt"}
                    key={el.sid}
                    onClick={() => {
                      setSlt(el);
                      getBooked(date, el.sid);
                    }}
                  >
                    <p>{el.from + " - " + el.to}</p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Theater;
