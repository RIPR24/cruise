import React, { useState } from "react";
import { item } from "../Voyager/Order";

type props = {
  state: item[];
  setState: React.Dispatch<React.SetStateAction<item>> | null;
  setArr: React.Dispatch<React.SetStateAction<item[]>> | undefined;
};

const SrchdrpDown = ({ state, setState, setArr }: props) => {
  const [srch, setSrch] = useState("");
  const [pnt, setPnt] = useState(0);
  const [srharr, setSrharr] = useState<item[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const val = e.code;
    if (val === "Enter") {
      if (srharr.length > 0) {
        if (setState) setState(srharr[pnt]);
        setPnt(0);
        setSrch("");
        setSrharr([]);
      }
    } else if (val === "ArrowUp") {
      setPnt((p) => (p === 0 ? p : p - 1));
    } else if (val === "ArrowUp") {
      setPnt((p) => (p === srharr.length - 1 ? p : p + 1));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSrch(val);
    if (val.length > 0) {
      const copy = [...state].filter(
        (el) =>
          el.name.toLowerCase().includes(val.toLowerCase()) ||
          el.tags.includes(val.toLowerCase())
      );
      setSrharr(copy);
      if (setArr) setArr(copy);
    } else {
      setSrharr([]);
      if (setArr) setArr(state);
    }
  };

  return (
    <div className="srch-drop-con">
      <input
        type="text"
        value={srch}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search item"
      />
      <div className="drp-dwn">
        {srharr.map((el, i) => (
          <p
            key={el._id}
            onClick={() => {
              if (setState) setState(el);
              setSrch("");
              setSrharr([]);
            }}
            className={i === pnt ? "fcs dd" : "dd"}
          >
            {el.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SrchdrpDown;
