import React from 'react';

const Hero = () => {
  return (
    <main className="w-full bg-secondary dark:bg-gray-900 dark:text-white">
      <div className="container py-8 sm:py-0 sm:h-[600px] flex flex-col sm:flex-row items-center justify-between">
        
        {/* Teks dan Deskripsi */}
        <div className="space-y-4 sm:w-1/2">
          <p className="uppercase text-lg text-primary dark:text-white">Selamat Datang</p>
          <h1 className="text-4xl md:text-5xl font-bold">Toko Buket Bunga</h1>
          <p className="text-xl text-gray-700 dark:text-white">
            Temukan buket bunga terbaik untuk berbagai momen spesial Anda.
          </p>
          <p className="text-black/75 dark:text-white">
            Kami menyediakan berbagai jenis buket bunga untuk pernikahan, ulang tahun, dan acara spesial lainnya.
          </p>
          <a href="/About" className="inline-block primary-btn !px-6">Menu</a>
        </div>

        {/* Gambar atau Menu Buket */}
        <div className="sm:w-1/2 mt-6 sm:mt-0">
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Card 1: Buket Pernikahan */}
            <div className="bg-white dark:bg-gray-900 dark:text-white p-4 rounded-lg shadow-lg w-full sm:w-56 mx-auto">
              <img
                src="https://tse1.mm.bing.net/th?id=OIP.BC5r2UjjHhIuOp8ZfpqLbgHaFU&pid=Api&P=0&h=180"
                alt="Buket Pernikahan"
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold text-center">Buket Pernikahan</h3>
              <p className="text-sm text-slate-500 text-center mt-2">
                Buket bunga yang elegan dan romantis untuk hari istimewa Anda.
              </p>
            </div>

            {/* Card 2: Buket Ulang Tahun */}
            <div className="bg-white dark:bg-gray-900 dark:text-white p-4 rounded-lg shadow-lg w-full sm:w-56 mx-auto">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.ZWHy-ejrFl-pU1A4cSQ0zgHaHa&pid=Api&P=0&h=180"
                alt="Buket Ulang Tahun"
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold text-center">Buket Ulang Tahun</h3>
              <p className="text-sm text-slate-500 text-center mt-2">
                Buket bunga ceria dan penuh warna untuk merayakan ulang tahun.
              </p>
            </div>

            {/* Card 3: Buket Kasih Sayang */}
            <div className="bg-white dark:bg-gray-900 dark:text-white p-4 rounded-lg shadow-lg w-full sm:w-56 mx-auto">
              <img
                src="https://tse1.mm.bing.net/th?id=OIP.O4MRPCff-aThsIg-twaBRQHaHa&pid=Api&P=0&h=180"
                alt="Buket Kasih Sayang"
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold text-center">Buket Kasih Sayang</h3>
              <p className="text-sm text-slate-500 text-center mt-2">
                Buket coklat manis sebagai tanda kasih sayang untuk orang tercinta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
