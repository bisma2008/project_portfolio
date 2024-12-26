import React, { useState } from "react";
import Swal from "sweetalert2";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cek validasi (misal, jika username dan password kosong)
    if (!username || !password) {
      setError("Username dan password harus diisi");
      return;
    }

    // Lakukan validasi ke backend atau logika lain
    if (username === "admin" && password === "admin123") {
      // Jika berhasil, tampilkan SweetAlert
      Swal.fire({
        title: "Login Berhasil!",
        text: "Selamat datang di dashboard.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setError("");
      // Redirect atau lakukan tindakan lain jika perlu
    } else {
      // Jika gagal, tampilkan SweetAlert error
      Swal.fire({
        title: "Login Gagal!",
        text: "Username atau password salah.",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-primary mb-6">Login Admin</h2>

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

          <div className="mb-6">
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
