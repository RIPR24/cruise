import { useContext, useEffect, useState } from "react";
import { order } from "../Stuff/WatchItems";
import { CruiseContext } from "../Context/AppContext";
import { postReq } from "../Utils/request";
import { useNavigate } from "react-router-dom";

const Myorders = ({ food }: { food: boolean }) => {
  const [arr, setArr] = useState<order[]>([]);
  const { user } = useContext(CruiseContext);
  const navigate = useNavigate();

  const getData = async () => {
    const dat = await postReq("voy/myorders", {
      food,
      uid: user?._id,
    });
    setArr(dat.orders);
  };

  useEffect(() => {
    if (!user?._id) {
      navigate("/");
    }
    getData();
  }, []);

  return (
    <div className="book-card-con">
      {arr.length > 0 &&
        arr.map((el) => {
          return (
            <div key={el._id} className="book-card" style={{ maxWidth: 500 }}>
              <p>ID :</p>
              <p>{el._id}</p>
              <p>Time of booking :</p>
              <p>{el.time && el.time.substring(0, 24)}</p>
              <p>Items :</p>
              <div>
                {el.items.map((e) => (
                  <p key={e._id}>{e.name + " X" + e.qnt}</p>
                ))}
              </div>
              <p>Total :</p>
              <p>{"₹ " + el.total}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Myorders;
