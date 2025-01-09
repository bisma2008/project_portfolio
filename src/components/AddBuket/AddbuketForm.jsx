import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert2
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { API_BUKET } from '../../utils/BaseUrl';

const AddBuketForm = ({ onAddBuket }) => {
  const [newBuket, setNewBuket] = useState({
    namaBuket: '',
    hargaBuket: '',
  });
  const [idAdmin, setIdAdmin] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate

  // Mengambil IdAdmin dari localStorage saat komponen pertama kali di-render
  useEffect(() => {
    const adminData = localStorage.getItem('adminData');
    if (adminData) {
      const parsedAdminData = JSON.parse(adminData);
      setIdAdmin(parsedAdminData?.id || '');  // Menyimpan IdAdmin dari localStorage
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBuket((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validasi input sebelum submit
    if (!newBuket.namaBuket || !newBuket.hargaBuket) {
      Swal.fire({
        icon: 'error',
        title: 'Form tidak lengkap',
        text: 'Pastikan semua field diisi.',
      });
      return;  // Tidak lanjutkan submit jika ada data kosong
    }
  
    try {
      const response = await axios.post(
        `${API_BUKET}/tambah/${idAdmin}`,
        newBuket
      );
  
      // Call onAddBuket to update the parent component
      if (onAddBuket) {
        onAddBuket(response.data); // Make sure onAddBuket is a valid function
      } else {
        console.error("onAddBuket is not a function");
      }
  
      Swal.fire({
        icon: 'success',
        title: 'Buket berhasil ditambahkan!',
        text: 'Data buket baru telah ditambahkan.',
      });
  
      // Navigate to dashboard after successful submission
      navigate('/dashboard'); // Replace with the correct route to your dashboard
  
      setNewBuket({
        namaBuket: '',
        hargaBuket: '',
      });
    } catch (error) {
      console.error('Error adding buket:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal menambahkan buket',
        text: 'Terjadi kesalahan saat menambahkan buket.',
      });
    }
  };
  

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-gray-200 p-8 rounded-lg shadow-md max-w-md mx-auto mt-12">
      <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-100 text-center mb-6">
        Tambah Buket Baru
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Nama Buket */}
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

        {/* Input Harga Buket */}
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

        {/* Tombol Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gray-700 dark:bg-gray-600 text-white py-2 px-6 rounded-md shadow hover:bg-gray-800 dark:hover:bg-gray-500 focus:ring-2 focus:ring-gray-500 transition duration-300"
          >
            Tambah Buket
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBuketForm;
