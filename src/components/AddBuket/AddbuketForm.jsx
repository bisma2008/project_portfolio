import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { API_BUKET } from "../../utils/BaseUrl";

const uploadImageToS3 = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      "https://s3.lynk2.co/api/s3/test",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    // Ambil URL file dari response.data.data.url_file
    const fotoUrl = response.data?.data?.url_file;
    if (fotoUrl) {
      console.log("Respons S3:", response.data);
      return fotoUrl;
    } else {
      console.error("Respons tidak valid:", response);
      return null;
    }
  } catch (error) {
    console.error("Upload ke S3 gagal:", error);
    return null;
  }
};

const AddBuketForm = () => {
  const [newBuket, setNewBuket] = useState({ namaBuket: "", hargaBuket: "" });
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [idAdmin, setIdAdmin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      const parsedAdminData = JSON.parse(adminData);
      setIdAdmin(parsedAdminData?.id || "");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBuket((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newBuket.namaBuket || !newBuket.hargaBuket || !foto) {
      Swal.fire({
        icon: "error",
        title: "Form tidak lengkap",
        text: "Harap lengkapi semua kolom dan unggah foto!",
      });
      return;
    }

    setLoading(true);

    try {
      // Upload foto ke S3 dan dapatkan URL-nya
      const fotoUrl = await uploadImageToS3(foto);
      if (!fotoUrl) {
        Swal.fire({
          icon: "error",
          title: "Upload Gagal",
          text: "Tidak dapat mengunggah foto ke S3.",
        });
        setLoading(false);
        return;
      }

      const buketWithFoto = { ...newBuket, fotoUrl };

      console.log("Data yang dikirim ke backend:", buketWithFoto);

      // Kirim data ke backend
      const response = await axios.post(
        `${API_BUKET}/tambah/${idAdmin}`,
        buketWithFoto
      );

      console.log("Respons dari server:", response.data);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Buket berhasil ditambahkan.",
      }).then(() => navigate("/dashboard"));

      setNewBuket({ namaBuket: "", hargaBuket: "" });
      setFoto(null);
    } catch (error) {
      console.error("Error dari server:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal Menambahkan Buket",
        text: error.response?.data?.error || "Terjadi kesalahan.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-gray-200 p-8 rounded-lg shadow-md max-w-md mx-auto mt-12">
      <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-100 text-center mb-6">
        Tambah Buket Baru
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="namaBuket"
            className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1"
          >
            Nama Buket
          </label>
          <input
            type="text"
            id="namaBuket"
            name="namaBuket"
            value={newBuket.namaBuket}
            onChange={handleInputChange}
            placeholder="Masukkan nama buket"
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="hargaBuket"
            className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1"
          >
            Harga Buket
          </label>
          <input
            type="number"
            id="hargaBuket"
            name="hargaBuket"
            value={newBuket.hargaBuket}
            onChange={handleInputChange}
            placeholder="Masukkan harga buket"
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="fotoBuket"
            className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1"
          >
            Foto Buket
          </label>
          {foto && (
            <img
              src={URL.createObjectURL(foto)}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md mb-2"
            />
          )}
          <input
            type="file"
            id="fotoBuket"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-700 dark:bg-gray-600 text-white py-2 px-6 rounded-md shadow hover:bg-gray-800 dark:hover:bg-gray-500 focus:ring-2 focus:ring-gray-500 transition duration-300"
          >
            {loading ? "Loading..." : "Tambah Buket"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBuketForm;
