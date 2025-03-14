import { useNavigate } from "react-router-dom";

const route = [
  {
    name: "ADD STATIONARY ITEMS",
    path: "/admin/addsta",
  },
  {
    name: "MODIFY STATIONARY ITEMS",
    path: "/admin/modsta",
  },
  {
    name: "ADD FOOD ITEMS",
    path: "/admin/addfood",
  },
  {
    name: "MODIFY FOOD ITEMS",
    path: "/admin/modfood",
  },
  {
    name: "ADD VOYAGER",
    path: "/admin/addvoy",
  },
  {
    name: "VOYAGER INFO",
    path: "/admin/voy",
  },
];

const OptionAdmin = () => {
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

export default OptionAdmin;
