import React, { useState } from "react";

type info = {
  _id: string;
  name: string;
  price: number;
  tags: string[];
  description: string;
  food: boolean;
};

type props = {
  state: info[];
  setState: React.Dispatch<React.SetStateAction<info>>;
};

const SrchdrpDown = ({ state, setState }: props) => {
  const [srch, setSrch] = useState("");
  const [pnt, setPnt] = useState(0);
  const [srharr, setSrharr] = useState<info[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const val = e.code;
    if (val === "Enter") {
      if (srharr.length > 0) {
        setState(srharr[pnt]);
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
      setSrharr(
        [...state].filter(
          (el) =>
            el.name.toLowerCase().includes(val.toLowerCase()) ||
            el.tags.includes(val.toLowerCase())
        )
      );
    } else {
      setSrharr([]);
    }
  };

  return (
    <div className="srch-drop-con">
      <input
        type="text"
        value={srch}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <div className="drp-dwn">
        {srharr.map((el, i) => (
          <p
            key={el._id}
            onClick={() => {
              setState(el);
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
