import { useState } from "react";

export type cart = {
  _id: string;
  name: string;
  qnt: number;
  price: number;
};

const Order = () => {
  const [cart, setCart] = useState<cart[]>([]);
  return <div>Order</div>;
};

export default Order;
