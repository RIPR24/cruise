import { useContext, useEffect } from "react";
import { postReq } from "../Utils/request";
import { CruiseContext } from "../Context/AppContext";
import Hero from "./hero";
import "./home.css";
import Nav from "../Nav";

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
      <Hero />
      <Nav />
    </div>
  );
};

export default Home;
