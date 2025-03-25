import { useContext, useEffect, useState } from "react";
import { postReq } from "../Utils/request";
import { cart } from "../Voyager/Order";
import { CruiseContext } from "../Context/AppContext";
import "./stuff.css";
import { useNavigate } from "react-router-dom";

export type order = {
  _id: string;
  items: cart[];
  status: string;
  total: number;
  user_Name: string;
  room: string;
  time: string;
  uid: string;
};

const WatchItems = ({ food }: { food: boolean }) => {
  const [arr, setArr] = useState<order[]>([]);
  const { user, setUser } = useContext(CruiseContext);
  const navigate = useNavigate();

  const getData = async () => {
    const dat = await postReq("stuff/orders", {
      food,
      token: user?.token,
      username: user?.username,
      role: user?.role,
    });
    if (dat?.code && dat.code === 401) {
      if (setUser) setUser(null);
      navigate("/stufflogin");
    } else {
      setArr(dat.orders);
    }
  };

  useEffect(() => {
    if (user?.role && ["supervisor", "headcook"].includes(user.role)) {
      getData();
    } else {
      navigate("/stufflogin");
    }
  }, []);

  return (
    <div className="orders-con">
      <h1>WATCH RECENT ORDERS</h1>
      <div className="item-grid headings">
        <p>NAME</p>
        <p>user id</p>
        <p>ROOM</p>
        <p>ITEMS</p>
      </div>
      {arr &&
        arr.map((el) => (
          <div key={el._id} className="item-grid">
            <p>{el.user_Name}</p>
            <p>{el.uid}</p>
            <p>{el.room}</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {el.items &&
                el.items.map((e, i) => (
                  <p key={i}>{e.name + "  x " + e.qnt}</p>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default WatchItems;
