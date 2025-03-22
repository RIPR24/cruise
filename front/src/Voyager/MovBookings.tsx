import { useContext, useEffect, useState } from "react";
import { CruiseContext } from "../Context/AppContext";
import { postReq } from "../Utils/request";
import QRCode from "react-qr-code";

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

const MovBookings = () => {
  const { user } = useContext(CruiseContext);
  const [arr, setArr] = useState<booking[]>([]);

  const getData = async () => {
    const data = await postReq("voy/tickets", { uid: user?._id });
    setArr(data.booked);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="book-card-con">
      {arr.length > 0 &&
        arr.map((el) => {
          return (
            <div className="book-card">
              <p>ID :</p>
              <p>{el._id}</p>
              <p>TIME :</p>
              <p>{el.date + " " + el.from}</p>
              <p>Time of booking :</p>
              <p>{el.time.substring(0, 24)}</p>
              <p>SEAT :</p>
              <p>{el.seat}</p>
              <div
                style={{
                  gridColumn: "1/3",
                  display: "grid",
                  placeItems: "center",
                  padding: 20,
                }}
              >
                <QRCode value={el._id} bgColor="#f5f4f4" />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MovBookings;
