import { useContext, useEffect, useState } from "react";
import { getReq, postReq } from "../Utils/request";
import { CruiseContext } from "../Context/AppContext";

type ele = {
  _id: string;
  name: string;
  ph: string;
  room: number;
};

type info = {
  _id: string;
  password: string;
  name: string;
  address: string;
  age: number;
  credType: string;
  cred: string;
  ph: number;
  room: number;
} | null;

const VoyagerInfo = () => {
  const [list, setlist] = useState<ele[]>([]);
  const [voy, setVoy] = useState<info>(null);
  const { user } = useContext(CruiseContext);

  const getData = async () => {
    const res = await getReq("voy/all");
    setlist(res);
  };

  const selectVoy = async (id: string) => {
    const res = await postReq("admin/voyinfo", {
      vid: id,
      username: user?.username,
      token: user?.token,
      role: user?.role,
    });
    setVoy(res.user);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {voy && (
        <>
          <div className="voy-front-con">
            <p>NAME :</p>
            <p>{voy.name}</p>
            <p>PH NO :</p>
            <p>{voy.ph}</p>
            <p>ADDRESS :</p>
            <p>{voy.address}</p>
            <p>{voy.credType} :</p>
            <p>{voy.cred}</p>
          </div>
          <div
            className="back-con"
            onClick={() => {
              setVoy(null);
            }}
          ></div>
        </>
      )}
      <h1 style={{ textAlign: "center", padding: 10 }}>Voyager List</h1>
      {list.map((el) => {
        return (
          <div
            className="voy-el"
            onClick={() => {
              selectVoy(el._id);
            }}
            key={el._id}
          >
            <p>{el.name}</p>
            <p>{el._id}</p>
            <p>{el.room}</p>
            <p>{el.ph}</p>
          </div>
        );
      })}
    </div>
  );
};

export default VoyagerInfo;
