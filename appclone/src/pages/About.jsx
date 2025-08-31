import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-gray-50 rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          About This Project
        </h2>
        <p className="text-lg text-gray-700 mb-6 text-center">
          This is a modern MERN stack web application featuring authentication,
          cart, viewed/favorite functionality, and a beautiful responsive UI. It
          demonstrates secure session-based login, protected routes, and
          seamless user experience.
        </p>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Tech Stack
          </h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              <b>Frontend:</b> React, Axios, Tailwind CSS, Framer Motion,
              SweetAlert2
            </li>
            <li>
              <b>Backend:</b> Node.js, Express, MongoDB, Mongoose,
              express-session, CORS
            </li>
            <li>
              <b>Authentication:</b> Session-based login/logout, protected API
              routes
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Author</h3>
          <p className="text-gray-700">
            This project was created by a passionate developer as a learning and
            portfolio project. For questions or feedback, please contact the
            author.
          </p>
        </div>
        <div className="text-center mt-6">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            &copy; {new Date().getFullYear()} MERN App
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
