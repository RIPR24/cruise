import { motion } from "framer-motion";
import vid from "../assets/ed1.mp4";

const fdin = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: (d: number = 0.05) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: d,
    },
  }),
};

const Hero = () => {
  return (
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
  );
};

export default Hero;
