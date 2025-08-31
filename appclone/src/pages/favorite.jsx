import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Favorite = () => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [time, setTime] = useState("");
  const [expenses, setExpenses] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://autoschd.onrender.com/log/check", { withCredentials: true })
      .then((res) => {
        if (!res.data.loggedIn) {
          navigate("/login");
        }
      });
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://autoschd.onrender.com/carting/cart", {
        title,
        duration,
        time,
        expenses,
      })
      .then((response) => {
        console.log("Favorite added:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding favorite:", error);
      });
  };

  return (
    <div className="min-h-screen w-full  flex flex-col items-center justify-center py-10 px-2">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-lg border border-gray-100 hover:border-blue-300 transition">
        <h2 className="text-3xl font-extrabold text-blue-800 mb-6 text-center drop-shadow-lg">
          Add Favorite
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-amber-100 rounded-xl h-12 px-4 w-full text-lg focus:ring-2 focus:ring-blue-300 outline-none transition"
            required
          />
          <input
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="bg-amber-100 rounded-xl h-12 px-4 w-full text-lg focus:ring-2 focus:ring-blue-300 outline-none transition mt-2"
            required
          />
          <input
            type="text"
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-amber-100 rounded-xl h-12 px-4 w-full text-lg focus:ring-2 focus:ring-blue-300 outline-none transition  mt-2"
            required
          />
          <input
            type="text"
            placeholder="Expenses"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            className="bg-amber-100 rounded-xl h-12 px-4 w-full text-lg focus:ring-2 focus:ring-blue-300 outline-none transition mt-2"
            required
          />
          <button
            type="submit"
            className="w-full h-12 rounded-full bg-gradient-to-r from-blue-400 to-amber-400 text-white font-semibold mt-4  text-lg shadow hover:from-blue-500 hover:to-amber-500 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Favorite;
