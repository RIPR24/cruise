import { useContext, useEffect, useState } from "react";
import { CruiseContext } from "../Context/AppContext";
import { postReq } from "../Utils/request";
import QRCode from "react-qr-code";

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

const MyBookings = () => {
  const { user } = useContext(CruiseContext);
  const [arr, setArr] = useState<booking[]>([]);

  const getData = async () => {
    const data = await postReq("voy/reservation", { uid: user?._id });
    setArr(data.bk);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="book-card-con">
      {arr.length > 0 &&
        arr.map((el) => {
          return (
            <div className="book-card" key={el._id}>
              <p>CENTER :</p>
              <p>{el.name}</p>
              <p>ID :</p>
              <p>{el._id}</p>
              <p>TIME :</p>
              <p>{el.date + " " + el.slot}</p>
              <p>Time of booking :</p>
              <p>{el.time && el.time.substring(0, 24)}</p>
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

export default MyBookings;
