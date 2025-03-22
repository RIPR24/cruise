import { useContext, useEffect, useState } from "react";
import { CruiseContext } from "../Context/AppContext";
import { getReq, postReq } from "../Utils/request";
import { useNavigate } from "react-router-dom";

type booking = {
  uid: string;
  cname: string;
  name: string;
  time: string;
  from: string;
  sid: string;
  date: string;
  _id: string;
  price: number;
  seat: string;
};

type slt = {
  from: string;
  to: string;
  sid: string;
};

type tht = {
  name: string;
  price: number;
  slots: slt[];
  _id: string;
};

const WatchMovBook = () => {
  const [slt, setSlt] = useState<slt | null>(null);
  const [tht, setTht] = useState<tht>({
    name: "",
    price: 0,
    slots: [],
    _id: "",
  });
  const [date, setDate] = useState("");
  const [arr, setArr] = useState<booking[]>([]);
  const { user, setUser } = useContext(CruiseContext);
  const navigate = useNavigate();

  const getData = async () => {
    const dat = await getReq("movie/seat");
    setTht(dat);
  };

  const getBooked = async (d: string = date, sid: string = slt?.sid || "") => {
    if (date.length === 10 && sid.length > 0) {
      const dat = await postReq("stuff/bookingsmov", {
        date: d,
        sid,
        token: user?.token,
        username: user?.username,
        role: user?.role,
      });
      if (dat?.code && dat.code === 401) {
        if (setUser) setUser(null);
        navigate("/stufflogin");
      } else {
        setArr(dat.booked);
      }
    }
  };

  const dateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      setDate(val);
      getBooked(val);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/stufflogin");
    } else {
      getData();
    }
  }, []);

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <div className="orders-con">
        <h1>WATCH BOOKINGS</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
        <div className="item-grid headings">
          <p>Name</p>
          <p>user id</p>
          <p>Seat</p>
          <p>Time</p>
        </div>
        {arr &&
          arr.map((el) => (
            <div key={el._id} className="item-grid">
              <p>{el.cname}</p>
              <p>{el.uid}</p>
              <p>{el.seat}</p>
              <p>{el.from}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WatchMovBook;
