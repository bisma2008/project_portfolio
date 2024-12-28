import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";  // Import SweetAlert
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons"; // Import ikon

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form
    if (!username || !password || !confirmPassword || !email) {
      setError("Semua kolom harus diisi");
      Swal.fire({
        title: "Gagal!",
        text: "Semua kolom harus diisi",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      Swal.fire({
        title: "Gagal!",
        text: "Password dan konfirmasi password tidak cocok",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    // Validasi format email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setError("Email harus berupa alamat Gmail yang valid");
      Swal.fire({
        title: "Gagal!",
        text: "Email harus berupa alamat Gmail yang valid",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      // Mengirim data registrasi ke API
      const response = await axios.post("http://localhost:9090/api/admin/register", {
        username,
        email,
        password,
      });

      // Menampilkan pesan sukses dengan SweetAlert
      Swal.fire({
        title: "Sukses!",
        text: "Registrasi berhasil! Silakan login.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form after successful registration
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setEmail("");
      setError("");

      // Redirect to login page
      navigate("/login"); // Navigate to login page after successful registration
    } catch (error) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      console.error("Error during registration:", error);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan. Silakan coba lagi.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center dark:bg-gray-800"
      style={{
        backgroundImage: "url('http://1.bp.blogspot.com/-B_KROwO51Bg/Th_Qttau8fI/AAAAAAAAAAM/fShHnBT679U/s1600/gambar_taman_bunga_tulip.jpg')",
      }}
    >
      <div
        className="bg-white bg-opacity-40 dark:bg-opacity-40 dark:bg-gray-900 p-10 rounded-lg shadow-lg w-96 sm:w-128 backdrop-blur-lg"
        style={{
          backdropFilter: "blur(10px)", // Optional: untuk efek blur latar belakang
        }}
      >
        <h2 className="text-2xl font-semibold text-center text-primary mb-6">
          <FontAwesomeIcon icon={faUserTie} className="mr-2" />
          <br />
          Register Admin
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Masukkan username"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Gmail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Masukkan Gmail"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Masukkan password"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Konfirmasi Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Konfirmasi password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
