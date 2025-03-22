import { useContext, useEffect, useRef, useState } from "react";
import { CruiseContext } from "../Context/AppContext";
import { postReq } from "../Utils/request";
import { useNavigate } from "react-router-dom";

type booking = {
  uid: string;
  rsid: string;
  cname: string;
  name: string;
  time: string;
  slot: string;
  sid: string;
  date: string;
  _id: string;
};

const WatchBook = ({ rsid }: { rsid: string }) => {
  const datref = useRef<HTMLInputElement>(null);
  const [arr, setArr] = useState<booking[]>([]);
  const { user, setUser } = useContext(CruiseContext);
  const navigate = useNavigate();

  const getData = async () => {
    const date = datref.current?.value;
    if (date) {
      const dat = await postReq("stuff/bookings", {
        rsid,
        token: user?.token,
        username: user?.username,
        role: user?.role,
        date,
      });
      if (dat?.code && dat.code === 401) {
        if (setUser) setUser(null);
        navigate("/stufflogin");
      } else {
        setArr(dat.bk);
      }
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/stufflogin");
    }
  }, []);

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <div className="orders-con">
        <h1>WATCH BOOKINGS</h1>
        <div className="in-line">
          <h3>SELECT DATE :</h3>
          <input type="date" onChange={getData} ref={datref} />
        </div>
        <div className="item-grid headings">
          <p>Name</p>
          <p>user id</p>
          <p>Booking Time</p>
          <p>Slot</p>
        </div>
        {arr &&
          arr.map((el) => (
            <div key={el._id} className="item-grid">
              <p>{el.cname}</p>
              <p>{el.uid}</p>
              <p>{el.time.substring(0, 24)}</p>
              <p>{el.slot}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WatchBook;
