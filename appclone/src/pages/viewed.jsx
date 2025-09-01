import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Viewed = () => {
  const [viewedItems, setViewedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://autoschd.onrender.com/log/check?t=${Date.now()}`, { withCredentials: true })
      .then((res) => {
        if (!res.data.loggedIn) {
          navigate("/login");
        } else {
          axios
            .get("https://autoschd.onrender.com/viewed/viewed", { withCredentials: true })
            .then((response) => {
              setViewedItems(response.data.data || []);
            })
            .catch((error) => {
              console.error("Error fetching viewed items:", error);
            });
        }
      });
  }, [navigate]);

  return (
    <div className="min-h-screen w-full  py-10 px-2">
      <div className="w-full text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-2 drop-shadow-lg">
          Viewed Items
        </h2>
        <p className="text-lg text-gray-500">
          All your recently viewed favorites in one place
        </p>
      </div>
      {viewedItems.length === 0 ? (
        <div className="text-center text-gray-400 text-xl mt-20">
          No viewed items yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
          {viewedItems.map((item, idx) => (
            <div
              key={item._id || idx}
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
              <button
                className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-red-500 hover:to-pink-600 transition mb-2"
                onClick={() => {
                  axios
                    .delete(
                      `https://autoschd.onrender.com/viewed/viewed/${item._id}`,
                      { withCredentials: true }
                    )
                    .then(() => {
                      setViewedItems((prev) =>
                        prev.filter((i) => i._id !== item._id)
                      );
                      Swal.fire({
                        title: "Removed 🗑️",
                        text: "Item removed from viewed!",
                        icon: "success",
                        confirmButtonText: "OK",
                      });
                    })
                    .catch((error) => {
                      console.error("Error removing viewed item:", error);
                      Swal.fire({
                        title: "Error",
                        text: "Failed to remove item.",
                        icon: "error",
                        confirmButtonText: "OK",
                      });
                    });
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Viewed;
