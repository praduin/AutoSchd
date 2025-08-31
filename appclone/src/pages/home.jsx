import { motion } from "framer-motion";
import Cart from "../components/cart";

const Home = () => {
  return (
    <div className="min-h-screen w-full ">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full text-center mb-10"
      ></motion.div>
      <Cart />
    </div>
  );
};

export default Home;
