import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { API_BUKET } from "../../utils/BaseUrl";

const EditBuketForm = () => {
  const [buketData, setBuketData] = useState({
    id: "",
    namaBuket: "",
    hargaBuket: "",
    fotoUrl: "",
  });
  const [idAdmin, setIdAdmin] = useState("");
  const [image, setImage] = useState(null);
  const { id: routeId } = useParams();
  const currentId = routeId;

  useEffect(() => {
    if (!currentId) {
      console.error("ID tidak tersedia");
      Swal.fire({
        title: "Gagal!",
        text: "ID buket tidak ditemukan.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      const parsedAdminData = JSON.parse(adminData);
      setIdAdmin(parsedAdminData?.id || "");
    }

    axios
      .get(`${API_BUKET}/getById/${currentId}`)
      .then((response) => {
        if (response.status === 200 && response.data) {
          setBuketData(response.data);
        } else {
          Swal.fire({
            title: "Gagal!",
            text: "Data buket tidak ditemukan.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching buket data:", error);
        Swal.fire({
          title: "Gagal!",
          text: "Tidak dapat memuat data buket.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  }, [currentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuketData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImage(file);
    } else {
      Swal.fire({
        title: "Gagal!",
        text: "Hanya file JPG atau PNG yang diperbolehkan.",
        icon: "error",
        confirmButtonText: "OK",
      });
      setImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("buket", JSON.stringify(buketData));
    if (image) {
      formData.append("file", image);
    }

    try {
      const response = await axios.put(
        `http://localhost:9090/api/admin/buket/editById/${buketData.id}?idAdmin=${idAdmin}`,
        formData,
        {
          headers: {
            // Do not set Content-Type, let FormData handle it
          },
        }
      );
      Swal.fire({
        title: "Berhasil!",
        text: "Buket berhasil diperbarui.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: error.response?.data?.message || "Gagal memperbarui buket.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-gray-200 p-8 rounded-lg shadow-md max-w-md mx-auto mt-12">
      <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-100 text-center mb-6">
        Edit Buket
      </h3>
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
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
            value={buketData.namaBuket}
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
            value={buketData.hargaBuket}
            onChange={handleInputChange}
            placeholder="Masukkan harga buket"
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1"
          >
            Foto Buket (Ganti jika perlu)
          </label>
          {buketData.fotoUrl && (
            <img
              src={buketData.fotoUrl}
              alt="Foto Buket"
              className="w-32 h-32 object-cover rounded-md mb-2"
            />
          )}
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gray-700 dark:bg-gray-600 text-white py-2 px-6 rounded-md shadow hover:bg-gray-800 dark:hover:bg-gray-500 focus:ring-2 focus:ring-gray-500 transition duration-300"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBuketForm;
