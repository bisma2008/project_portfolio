import React, { useState } from 'react';

const AdminDashboard = () => {
  // Data Buket dengan Ulasan dan Tanggal Penjualan
  const [buketData, setBuketData] = useState([
    {
      id: 1,
      name: 'Buket Pernikahan',
      price: 250000,
      sold: 150,
      rating: 4.5,
      reviews: 'Sangat indah dan elegan untuk acara pernikahan!',
      soldDate: '2024-12-26', // Tanggal penjualan
    },
    {
      id: 2,
      name: 'Buket Ulang Tahun',
      price: 150000,
      sold: 200,
      rating: 4.0,
      reviews: 'Buket ini sempurna untuk merayakan ulang tahun.',
      soldDate: '2024-12-25',
    },
    {
      id: 3,
      name: 'Buket Kasih Sayang',
      price: 180000,
      sold: 120,
      rating: 4.7,
      reviews: 'Buket yang penuh dengan makna, sangat disukai oleh penerima.',
      soldDate: '2024-12-26',
    },
    {
      id: 4,
      name: 'Buket Romantis',
      price: 220000,
      sold: 180,
      rating: 4.3,
      reviews: 'Romantis dan manis, cocok untuk hadiah pasangan.',
      soldDate: '2024-12-24',
    },
  ]);

  // Menghitung total penjualan dan buket terjual
  const totalSales = buketData.reduce((total, buket) => total + buket.sold * buket.price, 0);
  const totalBuketTerjual = buketData.reduce((total, buket) => total + buket.sold, 0);
  const averageRating = (buketData.reduce((total, buket) => total + buket.rating, 0) / buketData.length).toFixed(1);

  // Menghitung total penjualan hari ini (untuk tanggal yang sama dengan hari ini)
  const today = new Date().toISOString().split('T')[0]; // Mendapatkan tanggal hari ini dalam format YYYY-MM-DD
  const totalSalesToday = buketData
    .filter((buket) => buket.soldDate === today)
    .reduce((total, buket) => total + buket.sold * buket.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary text-center mb-8">Dashboard Admin Toko Buket Bunga</h1>

        {/* Card Summary */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
          <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-center">Total Penjualan</h3>
            <p className="text-lg font-bold text-primary text-center mt-3">Rp {totalSales.toLocaleString()}</p>
          </div>

          <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-center">Total Buket Terjual</h3>
            <p className="text-lg font-bold text-primary text-center mt-3">{totalBuketTerjual} buket</p>
          </div>

          <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-center">Rata-Rata Rating</h3>
            <p className="text-lg font-bold text-primary text-center mt-3">{averageRating} / 5</p>
          </div>

          {/* Card Total Penjualan Hari Ini */}
          <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-center">Total Penjualan Hari Ini</h3>
            <p className="text-lg font-bold text-primary text-center mt-3">Rp {totalSalesToday.toLocaleString()}</p>
          </div>
        </div>

        {/* Daftar Buket */}
        <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-center mb-6">Daftar Buket Bunga</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto block sm:table">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Nama Buket</th>
                  <th className="py-3 px-4 text-left">Harga</th>
                  <th className="py-3 px-4 text-left">Terjual</th>
                  <th className="py-3 px-4 text-left">Rating</th>
                  <th className="py-3 px-4 text-left">Ulasan</th>
                  <th className="py-3 px-4 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {buketData.map((buket) => (
                  <tr key={buket.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="py-3 px-4">{buket.name}</td>
                    <td className="py-3 px-4">Rp {buket.price.toLocaleString()}</td>
                    <td className="py-3 px-4">{buket.sold} buket</td>
                    <td className="py-3 px-4">{buket.rating} / 5</td>
                    <td className="py-3 px-4">{buket.reviews}</td>
                    <td className="py-3 px-4 flex space-x-2">
                      <button className="bg-yellow-500 text-white py-1 px-4 rounded-md hover:bg-yellow-400 focus:outline-none">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-400 focus:outline-none">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tombol Aksi Lainnya */}
        <div className="flex justify-center mt-8">
          <button className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark">
            Lihat Laporan Penjualan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
