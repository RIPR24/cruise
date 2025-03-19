import { site } from "../Utils/request";
import { cart, item } from "./Order";

type props = {
  el: item;
  setCart: React.Dispatch<React.SetStateAction<cart[]>>;
};

const ItemCard = ({ el, setCart }: props) => {
  const addCart = () => {
    setCart((pre) => {
      if (pre.some((e) => e._id === el._id)) return pre;
      return [...pre, { _id: el._id, name: el.name, qnt: 1, price: el.price }];
    });
  };

  return (
    <div className="item-card">
      <img
        src={el.img.substring(0, 9) === "cruiseimg" ? site + el.img : el.img}
      />
      <h2>{el.name}</h2>
      <p style={{ flexGrow: 1 }}>{el.description}</p>
      <button onClick={addCart}>ADD TO CART</button>
    </div>
  );
};

export default ItemCard;
