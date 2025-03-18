import { useContext, useEffect, useRef, useState } from "react";
import { CruiseContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/cruise.svg";
import clo from "../assets/close.svg";
import { delReq, postReq, putReq, site } from "../Utils/request";
import SrchdrpDown from "../Reusable/SrchdrpDown";

type info = {
  _id: string;
  name: string;
  price: number;
  tags: string[];
  description: string;
  food: boolean;
};

const ModFoodItems = ({ food }: { food: boolean }) => {
  const def = {
    _id: "",
    name: "",
    price: 0,
    tags: [],
    description: "",
    food,
  };
  const [disable, setDisable] = useState(false);
  const { user, setUser } = useContext(CruiseContext);
  const navigate = useNavigate();
  const [prob, setProb] = useState("");
  const [img, setImg] = useState(false);
  const [info, setInfo] = useState<info>(def);
  const [starr, setStarr] = useState<info[]>([]);
  const imgref = useRef<HTMLInputElement | null>(null);
  const tagref = useRef<HTMLInputElement | null>(null);

  const getData = async () => {
    const data = await postReq("item/getsta", { food });
    setStarr(data.sta);
  };

  const addTag = () => {
    setInfo((pre) => {
      if (tagref.current) {
        const val = tagref.current.value;
        if (val.length > 0 && !pre.tags.includes(val)) {
          const tags = [...pre.tags, val];
          tagref.current.value = "";
          return { ...pre, tags };
        }
      }
      return pre;
    });
  };

  const removeTag = (el: string) => {
    setInfo((pre) => {
      const tags = pre.tags.filter((e) => e !== el);
      return { ...pre, tags };
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = e.target.value;
    setInfo((pre) => ({ ...pre, [e.target.id]: val }));
  };

  const modStationary = async () => {
    setDisable(true);
    if (info._id.length > 0) {
      let data;
      if (img && imgref.current?.files && imgref.current.files[0]) {
        const dat = new FormData();
        dat.append("_id", info._id);
        dat.append("token", user?.token || "");
        dat.append("username", user?.username || "");
        dat.append("role", user?.role || "");
        dat.append("file", imgref.current.files[0]);

        const res = await fetch(site + "admin/staimg", {
          method: "PUT",
          body: dat,
        });
        data = await res.json();
      } else {
        const dat = {
          _id: info._id,
          token: user?.token,
          username: user?.username,
          role: user?.role,
          img: imgref.current?.value || "",
        };
        data = await putReq("admin/stalink", dat);
      }
      if (data.status === "success") {
        navigate("/admin");
      } else {
        if (data.code === 401) {
          if (setUser) setUser(null);
          navigate("/stufflogin");
        }
        setProb(data.status || "");
      }
    } else {
      console.log(info);
      setProb("enter name and price");
    }

    setDisable(false);
  };

  const delEl = async () => {
    const res = await delReq("admin/sta", {
      _id: info._id,
      token: user?.token,
      username: user?.username,
      role: user?.role,
    });
    if (res.status === "success") {
      setInfo(def);
    } else {
      if (res.code === 401) {
        if (setUser) setUser(null);
        navigate("/stufflogin");
      }
      setProb(res.status || "");
    }
  };

  const modEl = async () => {
    const res = await putReq("admin/sta", {
      ...info,
      token: user?.token,
      username: user?.username,
      role: user?.role,
    });
    if (res.status === "success") {
      setInfo(def);
    } else {
      if (res.code === 401) {
        if (setUser) setUser(null);
        navigate("/stufflogin");
      }
      setProb(res.status || "");
    }
  };

  useEffect(() => {
    getData();
  });

  return (
    <div
      style={{
        height: "100vh",
        maxWidth: 1100,
        width: "90%",
        textAlign: "center",
      }}
    >
      <div className="admin-con">
        <h1>MODIFY ITEM</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2>SELECT ITEM</h2>
          <SrchdrpDown state={starr} setState={setInfo} />
        </div>
        <div className="regcon">
          <img src={logo} style={{ height: 45, width: 45 }} />
          <div className="sta-inp-con">
            {info._id.length > 5 && (
              <button onClick={delEl} className="prm rc">
                DELETE
              </button>
            )}
            <label htmlFor="name">NAME :</label>
            <input
              type="text"
              placeholder="NAME"
              onChange={handleChange}
              value={info.name}
              name="name"
              id="name"
            />
            <label htmlFor="price">PRICE : </label>
            <input
              type="number"
              placeholder="price"
              onChange={handleChange}
              value={info.price}
              name="price"
              id="price"
            />
            <label htmlFor="tag"> TAGS :</label>
            <div style={{ display: "flex", gap: 20 }}>
              <input type="text" placeholder="ENTER TAG" ref={tagref} />
              <button onClick={addTag} className="prm">
                ADD
              </button>
            </div>
            <div className="tag-con">
              {info.tags &&
                info.tags.map((el) => (
                  <div key={el} className="tag">
                    <p>{el}</p>
                    <img src={clo} onClick={() => removeTag(el)} />
                  </div>
                ))}
            </div>
            <label htmlFor="description"> DESCRIPTION :</label>
            <textarea
              placeholder="DESCRIPTION"
              value={info.description}
              onChange={handleChange}
              name="description"
              id="description"
            />
          </div>
          {info._id.length > 5 && (
            <button onClick={modEl} className="prm">
              UPDATE
            </button>
          )}
        </div>
        <div className="regcon">
          <div style={{ display: "flex", gap: 10 }}>
            <p>IMAGE </p>
            <select
              name="imglnk"
              onChange={(e) => {
                setImg(e.target.value === "img");
              }}
              id="imglnk"
            >
              <option value="link">LINK</option>
              <option value="img">IMG</option>
            </select>
            <input ref={imgref} type={img ? "file" : "text"} />
          </div>
          <p style={{ color: "red" }}>{prob}</p>
          {info._id.length > 5 && (
            <button
              disabled={disable}
              className={disable ? "disb" : "prm"}
              onClick={() => {
                if (!disable) {
                  modStationary();
                }
              }}
            >
              MODIFY IMAGE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModFoodItems;
