import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Import eye icons
import { API_LOGIN } from "../../utils/BaseUrl";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }

    try {
      const response = await axios.post(`${API_LOGIN}/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Login Berhasil!",
          text: "Selamat datang di dashboard.",
          icon: "success",
          confirmButtonText: "OK",
        });
        setError("");

        const { token, adminData } = response.data;

        if (token && adminData?.id) {
          localStorage.setItem("authToken", token);
          localStorage.setItem("adminData", JSON.stringify(adminData));
          localStorage.setItem("id", adminData.id);
          
          setIsAuthenticated(true);
          navigate("/dashboard");
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Login Gagal!",
        text: error.response?.data || "Email atau password salah.",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center dark:bg-gray-800"
      style={{
        backgroundImage:
          "url('http://bunganusantara.files.wordpress.com/2013/02/beautiful2bflower2bgarden2bwallpapers2b2525286252529.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-20 dark:bg-opacity-20 dark:bg-gray-900 p-8 rounded-lg shadow-lg w-96 backdrop-blur-lg">
        <h2 className="text-2xl font-semibold text-center text-primary mb-6">
          <FontAwesomeIcon icon={faUserTie} className="mr-2" />
          <br />
          Login Admin
        </h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Masukkan email"
            />
          </div>

          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Masukkan password"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye} // Toggle icon based on password visibility state
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 cursor-pointer text-gray-500 transition-transform transform hover:scale-110 duration-200 ease-in-out"
              size="lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
