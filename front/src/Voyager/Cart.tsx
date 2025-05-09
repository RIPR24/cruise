import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { cart } from "./Order";
import close from "../assets/close.svg";
import { postReq } from "../Utils/request";
import { CruiseContext } from "../Context/AppContext";

type props = {
  cart: cart[];
  setCart: React.Dispatch<React.SetStateAction<cart[]>>;
  setCartpop: React.Dispatch<React.SetStateAction<boolean>>;
  food: boolean;
};

const Cart = ({ cart, setCart, setCartpop, food }: props) => {
  const [tot, setTot] = useState(0);
  const { user, setPop } = useContext(CruiseContext);

  const incQnt = (i: number) => {
    setCart((pre) => {
      const copy = [...pre];
      copy[i].qnt += 1;
      return copy;
    });
  };

  const order = async () => {
    const dat = await postReq("voy/order", {
      items: cart,
      room: user?.room,
      user_Name: user?.name,
      uid: user?._id,
      food,
      total: tot,
    });
    if (dat.status === "success") {
      setCart([]);
      if (setPop) setPop("Items Ordered");
      setCartpop(false);
    }
  };

  const decQnt = (i: number) => {
    setCart((pre) => {
      const copy = [...pre];
      if (copy[i].qnt === 1) {
        copy.splice(i, 1);
      } else {
        copy[i].qnt -= 1;
      }
      return copy;
    });
  };

  useEffect(() => {
    const t = cart.reduce((a: number, e) => a + e.price * e.qnt, 0);
    setTot(t);
  }, [cart]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "fixed",
        zIndex: 1,
        top: 0,
        left: 0,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          backdropFilter: "blur(5px)",
          zIndex: 0,
        }}
        onClick={() => {
          setCartpop(false);
        }}
      ></motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="cart-con"
      >
        <img
          src={close}
          alt=""
          onClick={() => {
            setCartpop(false);
          }}
          style={{ position: "absolute", top: 5, right: 5, cursor: "pointer" }}
        />
        {cart ? (
          <div style={{ width: "95%", height: "95%" }}>
            <div
              style={{
                height: "84%",
                width: "95%",
                overflowY: "auto",
                scrollbarGutter: "stable",
              }}
            >
              {cart.map((el, i) => {
                return (
                  <div
                    key={el.name}
                    style={{
                      position: "relative",
                      width: "100%",
                      padding: 6,
                      height: 90,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div>
                      <p>{el.name}</p>
                      <p>{"₹ " + el.price + "/-"}</p>
                    </div>
                    <div className="inc-dec-s">
                      <p
                        onClick={() => {
                          decQnt(i);
                        }}
                      >
                        -
                      </p>
                      <p
                        style={{
                          width: 30,
                          borderLeft: "none",
                          borderRight: "none",
                          cursor: "auto",
                        }}
                      >
                        {el.qnt}
                      </p>
                      <p
                        onClick={() => {
                          incQnt(i);
                        }}
                      >
                        +
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "0 10px",
              }}
            >
              <p>TOTAL :₹</p>
              <p>{tot}</p>
            </div>
            <div
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                padding: 10,
                gap: 30,
              }}
            >
              <button
                onClick={() => {
                  setCart([]);
                }}
              >
                CLEAR
              </button>
              <button onClick={order}>ORDER</button>
            </div>
          </div>
        ) : (
          <p>No Items in your cart</p>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;
