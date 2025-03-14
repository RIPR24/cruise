import { useContext, useRef, useState } from "react";
import { CruiseContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/cruise.svg";
import clo from "../assets/close.svg";
import { postReq, site } from "../Utils/request";

type info = {
  _id: string;
  name: string;
  price: number;
  tags: string[];
  description: string;
  food: boolean;
};

const def = {
  _id: "",
  name: "",
  price: 0,
  tags: [],
  description: "",
  food: false,
};

const ModFoodItems = () => {
  const [disable, setDisable] = useState(false);
  const { user, setUser } = useContext(CruiseContext);
  const navigate = useNavigate();
  const [prob, setProb] = useState("");
  const [img, setImg] = useState(false);
  const [info, setInfo] = useState<info>(def);
  const imgref = useRef<HTMLInputElement | null>(null);
  const tagref = useRef<HTMLInputElement | null>(null);

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

  const addStationary = async () => {
    setDisable(true);
    if (info._id.length > 0) {
      let data;
      if (img && imgref.current?.files && imgref.current.files[0]) {
        const dat = new FormData();
        dat.append("_id", info._id);
        dat.append("file", imgref.current.files[0]);

        const res = await fetch(site + "admin/staimg", {
          method: "POST",
          body: dat,
        });
        data = await res.json();
      } else {
        const dat = {
          _id: info._id,
          token: user?.token,
          username: user?.name,
          role: user?.role,
          img: imgref.current?.value || "",
        };
        data = await postReq("admin/sta", dat);
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
      setProb("enter name and price");
    }

    setDisable(false);
  };
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
        <h1>ADD STATIONARY ITEM</h1>
        <div className="regcon">
          <img src={logo} style={{ height: 45, width: 45 }} />
          <div className="sta-inp-con">
            <label htmlFor="name">NAME :</label>
            <input
              type="text"
              placeholder="NAME"
              onChange={handleChange}
              name="name"
              id="name"
            />
            <label htmlFor="price">PRICE : </label>
            <input
              type="number"
              placeholder="price"
              onChange={handleChange}
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
            <label htmlFor="description"> DOCUMENT NO :</label>
            <textarea
              placeholder="DESCRIPTION"
              onChange={handleChange}
              name="description"
              id="description"
            />
          </div>
          <div>
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
          <button
            disabled={disable}
            className={disable ? "disb" : "prm"}
            onClick={() => {
              if (!disable) {
                addStationary();
              }
            }}
          >
            ADD ITEM
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModFoodItems;
