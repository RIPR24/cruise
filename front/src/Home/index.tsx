import { useContext, useEffect } from "react";
import { postReq } from "../Utils/request";
import { CruiseContext } from "../Context/AppContext";
import Hero from "./Hero";
import "./home.css";
import Nav from "../Nav";
import { card_data, fdinup } from "./data";
import Card from "./Card";
import { motion } from "framer-motion";

const Home = () => {
  const { setUser } = useContext(CruiseContext);

  const chkTok = async () => {
    const tok = localStorage.getItem("voytok");
    if (tok) {
      localStorage.removeItem("voytok");
      const res = await postReq("logintok/", { tok });
      if (setUser) setUser(res);
    }
  };

  useEffect(() => {
    chkTok;
  }, []);
  return (
    <div className="home">
      <Nav />
      <Hero />
      <div className="card-div">
        {card_data.map((el, i) => {
          return (
            <motion.div
              style={{ height: "100%", width: "100%", padding: 10 }}
              key={i}
              variants={fdinup}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={0.1 * i + 0.2}
            >
              <Card prop={el} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
