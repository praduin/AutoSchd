import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect as useReactEffect } from "react";
const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      axios
          .post(
            "https://autoschd.onrender.com/auth/signup",
            {
              username,
              email,
              password,
            },
            { withCredentials: true }
          )
          .then((response) => {
            console.log("Signup successful:", response.data);
            Swal.fire({
              title: "Success 🎉",
              text: "Signup successful!",
              icon: "success",
              confirmButtonText: "Login now",
            }).then(() => navigate("/login"));
          })
          .catch((error) => {
            console.error("Signup error:", error);
            Swal.fire({
              title: "Error",
              text: "Signup failed. Please try again!",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
    } else {
      // Handle password mismatch
      Swal.fire({
        title: "Password Mismatch",
        text: "Passwords do not match!",
        icon: "warning",
        confirmButtonText: "Try Again",
      });
    }
  };

  // Hide global video when on signup page
  useReactEffect(() => {
    const globalVideo = document.querySelector("video.fixed");
    if (globalVideo) globalVideo.style.display = "none";
    return () => {
      if (globalVideo) globalVideo.style.display = "";
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Signup page specific background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/images/2182-155747492.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md z-10">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-amber-100 rounded-xl h-10 px-3 w-full"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-amber-100 rounded-xl h-10 px-3 w-full mt-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-amber-100 rounded-xl h-10 px-3 w-full mt-2"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-amber-100 rounded-xl h-10 px-3 w-full mt-2"
            required
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded-full bg-amber-400 w-full h-12 font-semibold hover:bg-amber-500 transition mt-4"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
