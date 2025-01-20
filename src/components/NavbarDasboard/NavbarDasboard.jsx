import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { API_BUKET } from '../../utils/BaseUrl';
import NavbarDashboard from './NavbarDashboard'; // Import NavbarDashboard

const Dashboard = () => {
  const adminData = localStorage.getItem("adminData");
  let idAdmin = null;

  try {
    if (adminData) {
      const parsedAdminData = JSON.parse(adminData);
      idAdmin = parsedAdminData.id;
    }
  } catch (error) {
    console.error("Error parsing admin data:", error);
  }

  const [buketData, setBuketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idAdmin) {
      setError("ID Admin tidak ditemukan. Silakan login kembali.");
      setLoading(false);
      return;
    }

    const fetchBuketData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BUKET}/getAllByAdmin/${idAdmin}`);
        setBuketData(response.data || []);
        setLoading(false);
      } catch (err) {
        setError("Gagal memuat data. Silakan coba lagi.");
        setLoading(false);
      }
    };

    fetchBuketData();
  }, [idAdmin]);

  const deleteBuket = async (id) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data buket ini akan dihapus!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_BUKET}/delete/${id}`);
        setBuketData(buketData.filter((buket) => buket.id !== id));
        Swal.fire('Terhapus!', 'Buket telah berhasil dihapus.', 'success');
      } catch (error) {
        console.error("Failed to delete Buket:", error);
        Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus buket.', 'error');
      }
    }
  };

  const totalSales = buketData.reduce((total, buket) => total + (buket.sold * buket.hargaBuket || 0), 0);
  const totalBuketsSold = buketData.reduce((total, buket) => total + (buket.sold || 0), 0);
  const averageRating = (
    buketData.reduce((total, buket) => total + (buket.rating || 0), 0) / buketData.length
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Navbar Dashboard */}
      <NavbarDashboard />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary text-center mb-8">Info Admin Toko Buket</h1>

        {loading && <p className="text-center text-primary">Memuat data...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mb-12">
              <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-center">Total Penjualan</h3>
                <p className="text-lg font-bold text-primary text-center mt-3">Rp {totalSales.toLocaleString()}</p>
              </div>

              <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-center">Total Buket Terjual</h3>
                <p className="text-lg font-bold text-primary text-center mt-3">{totalBuketsSold} buket</p>
              </div>

              <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-center">Rata-Rata Rating</h3>
                <p className="text-lg font-bold text-primary text-center mt-3">{averageRating} / 5</p>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <Link to="/AddbuketForm">
                <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-400">
                  <FontAwesomeIcon icon={faSquarePlus} className="mr-2" />
                  Tambah Buket
                </button>
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-center mb-6">Daftar Buket</h3>
              <table className="min-w-full table-auto">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Nama Buket</th>
                    <th className="py-3 px-4 text-left">Harga</th>
                    <th className="py-3 px-4 text-left">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {buketData.map((buket) => (
                    <tr key={buket.id} className="border-b">
                      <td className="py-3 px-4">{buket.namaBuket || "N/A"}</td>
                      <td className="py-3 px-4">Rp {(buket.hargaBuket || 0).toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <Link to={`/EditBuketForm/${buket.id}`}>
                          <button className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-400 mr-2">
                            <FontAwesomeIcon icon={faPen} className="mr-2" />
                            Edit
                          </button>
                        </Link>
                        <button
                          className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-400"
                          onClick={() => deleteBuket(buket.id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
