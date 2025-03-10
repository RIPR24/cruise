import { motion } from "framer-motion";
import vid from "../assets/ed1.mp4";
import { fdin } from "./data";

const Hero = () => {
  return (
    <>
      <div className="hero-div">
        <video src={vid} autoPlay muted loop />
        <motion.h3
          variants={fdin}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          custom={0.2}
        >
          ENJOY EVRY MOMENT
        </motion.h3>
        <motion.h1
          variants={fdin}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          custom={0.4}
        >
          GET UPTO 20% OFF
        </motion.h1>
      </div>
      <div
        style={{
          backgroundColor: "#214fd9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 25,
          gap: 20,
        }}
      >
        <p style={{ fontSize: "1.6rem", color: "aliceblue" }}>
          60% OFF SECOND GUEST + KIDS SAIL FREE*
        </p>
        <button className="prm">SHOP NOW</button>
      </div>
    </>
  );
};

export default Hero;
