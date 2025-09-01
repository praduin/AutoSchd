import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchCartItems = () => {
    axios
      .get(`https://autoschd.onrender.com/carting/cart?t=${Date.now()}`, {
        withCredentials: true,
      })
      .then((response) => {
        setCartItems(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  };

  useEffect(() => {
    axios
      .get("https://autoschd.onrender.com/log/check", { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(res.data.loggedIn);
        console.log("cart.jsx server sent successfully", isLoggedIn);
      });
    fetchCartItems();
  }, []);

  const handleRemove = (id) => {
    if (!isLoggedIn) return;
    axios
      .delete(`https://autoschd.onrender.com/carting/cart/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        setCartItems((prev) => prev.filter((item) => item._id !== id));
        Swal.fire({
          title: "Removed 🗑️",
          text: "Item removed from cart!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.error("Error removing cart item:", error);
      });
  };

  return (
    <div className="min-h-screen w-full  ">
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-400 text-xl ">
          No items in cart.
        </div>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center -mt-16 ml-4"
        >
          {cartItems.map((item, idx) => (
            <motion.div
              key={item._id || idx}
              variants={{
                hidden: { opacity: 99, y: 90 },
                visible: { opacity: 99, y: 99 },
              }}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center border border-gray-100 hover:border-blue-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-amber-200 rounded-full flex items-center justify-center mb-4 shadow-md">
                <span className="text-2xl font-bold text-blue-700">
                  {item.title?.charAt(0) || "?"}
                </span>
              </div>
              <div className="text-xl font-bold mb-1 text-center text-blue-800">
                {item.title}
              </div>
              <div className="mb-1 text-gray-600 text-center">
                <span className="font-semibold">Duration:</span> {item.duration}
              </div>
              <div className="mb-1 text-gray-600 text-center">
                <span className="font-semibold">Time:</span> {item.time}
              </div>
              <div className="mb-4 text-gray-600 text-center">
                <span className="font-semibold">Expenses:</span> ₹
                {item.expenses}
              </div>
              <motion.button
                whileHover={isLoggedIn ? { scale: 1.5 } : {}}
                whileTap={isLoggedIn ? { scale: 1.2 } : {}}
                className={`bg-gradient-to-r from-red-400 to-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-red-500 hover:to-pink-600 transition mb-2 ${
                  !isLoggedIn ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => handleRemove(item._id)}
                disabled={!isLoggedIn}
              >
                Remove
              </motion.button>
              <motion.button
                whileHover={isLoggedIn ? { scale: 1.5 } : {}}
                whileTap={isLoggedIn ? { scale: 1.2 } : {}}
                className={`bg-gradient-to-r from-blue-400 to-amber-400 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-blue-500 hover:to-amber-500 transition ${
                  !isLoggedIn ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => {
                  if (!isLoggedIn) return;
                  axios
                    .post(
                      "https://autoschd.onrender.com/viewed/viewed",
                      {
                        title: item.title,
                        duration: item.duration,
                        time: item.time,
                        expenses: item.expenses,
                      },
                      { withCredentials: true }
                    )
                    .then(() => {
                      Swal.fire({
                        title: "Success 🎉",
                        text: "Added to viewed!",
                        icon: "success",
                        confirmButtonText: "Cool 😎",
                      });
                    })
                    .catch((error) => {
                      console.error("Error adding to viewed:", error);
                    });
                }}
                disabled={!isLoggedIn}
              >
                Viewed
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
