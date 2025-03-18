import { useState } from "react";
import { crbt } from "./SelectVoy";
import { useNavigate } from "react-router-dom";

const Crdbtn = ({ el }: { el: crbt }) => {
  const [hov, setHov] = useState(false);
  const navigate = useNavigate();
  return (
    <button
      style={{ backgroundImage: `url(${el.img})` }}
      onClick={() => {
        navigate(el.path);
      }}
      onMouseOver={() => {
        setHov(true);
      }}
      onMouseLeave={() => {
        setHov(false);
      }}
    >
      {hov ? el.description : el.name}
    </button>
  );
};

export default Crdbtn;
