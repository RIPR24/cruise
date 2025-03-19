import { useNavigate } from "react-router-dom";

const route = [
  {
    name: "Fitness Center",
    path: "/mng/fc",
  },
  {
    name: "Beauty Salon",
    path: "/mng/bs",
  },
  {
    name: "Party Hall",
    path: "/mng/ph",
  },
];

const SelectMgr = () => {
  const navigate = useNavigate();
  return (
    <div className="sel-con">
      {route.map((el, i) => {
        return (
          <button
            key={i}
            onClick={() => {
              navigate(el.path);
            }}
          >
            {el.name}
          </button>
        );
      })}
    </div>
  );
};

export default SelectMgr;
