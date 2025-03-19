import { useEffect, useState } from "react";
import { postReq } from "../Utils/request";
import SrchdrpDown from "../Reusable/SrchdrpDown";
import crt from "../assets/cart.svg";
import Cart from "./Cart";
import ItemCard from "./ItemCard";

export type cart = {
  _id: string;
  name: string;
  qnt: number;
  price: number;
};

export type item = {
  _id: string;
  name: string;
  img: string;
  description: string;
  tags: string[];
  price: number;
  food: boolean;
};

const Order = ({ food }: { food: boolean }) => {
  const [items, setItems] = useState<item[]>([]);
  const [fil, setFil] = useState<item[]>([]);
  const [cart, setCart] = useState<cart[]>([]);
  const [cartpop, setCartpop] = useState(false);

  const getData = async () => {
    const dat = await postReq("item/getsta", { food });
    setItems(dat.sta);
    setFil(dat.sta);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="nav-ord">
        <SrchdrpDown state={items} setArr={setFil} setState={null} />
        <img
          src={crt}
          className="im-btn"
          onClick={() => {
            setCartpop((p) => !p);
          }}
        />
      </div>
      {cartpop && (
        <Cart
          setCart={setCart}
          setCartpop={setCartpop}
          cart={cart}
          food={food}
        />
      )}
      <div className="items-con">
        {fil &&
          fil.map((el) => <ItemCard key={el._id} el={el} setCart={setCart} />)}
      </div>
    </>
  );
};

export default Order;
