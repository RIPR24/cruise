import React, { useState } from "react";

type props<T> = {
  state: T[];
  setState: React.Dispatch<React.SetStateAction<T>>;
};

const SrchdrpDown = <T,>({ state, setState }: props<T>) => {
  const [srch, setSrch] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const val = e.code;
    if (val === )
  };

  return (
    <div className="srch-drop-con">
      <input
        type="text"
        value={srch}
        onChange={(e) => {
          setSrch(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SrchdrpDown;
