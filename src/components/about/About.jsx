import React from 'react';

const About = () => {
  return (
    <>
      <section
        id="about"
        className="bg-white dark:bg-slate-800 dark:text-white py-12"
      >
        <div className="container md:w-[70%]">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary dark:text-white">
              Menu Buket Bunga
            </h1>
            <p className="text-lg text-slate-500 mt-4">
              Temukan buket bunga terbaik untuk berbagai momen spesial Anda.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Card 1 */}
            <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg">
              <div className="relative">
                <img
                  src="https://tse1.mm.bing.net/th?id=OIP.ccTnWHm-U_7quDQ4cSOwlwHaHa&pid=Api&P=0&h=180"
                  alt="Buket Pernikahan"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-0 right-0 bg-primary text-white py-2 px-4 rounded-bl-lg text-xs">
                  Promo
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-4 text-center">Buket Pernikahan</h3>
              <p className="text-lg font-bold text-primary text-center mt-3">Rp 250.000</p>
              <div className="flex justify-center mt-4">
                <a href="/shop" className="inline-block primary-btn !px-6">
                  Beli
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg">
              <div className="relative">
                <img
                  src="https://tse2.mm.bing.net/th?id=OIP.Tyy8ZkdrUsBf7viF55dcHgHaHa&pid=Api&P=0&h=180"
                  alt="Buket Ulang Tahun"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-0 right-0 bg-primary text-white py-2 px-4 rounded-bl-lg text-xs">
                  Promo
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-4 text-center">Buket Ulang Tahun</h3>
              <p className="text-lg font-bold text-primary text-center mt-3">Rp 150.000</p>
              <div className="flex justify-center mt-4">
                <a href="/shop" className="inline-block primary-btn !px-6">
                  Beli
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg">
              <div className="relative">
                <img
                  src="https://tse2.mm.bing.net/th?id=OIP.s-EXZEhqN2wIDHdXu858WAHaHa&pid=Api&P=0&h=180"
                  alt="Buket Kasih Sayang"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-0 right-0 bg-primary text-white py-2 px-4 rounded-bl-lg text-xs">
                  Promo
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-4 text-center">Buket Kasih Sayang</h3>
              <p className="text-lg font-bold text-primary text-center mt-3">Rp 180.000</p>
              <div className="flex justify-center mt-4">
                <a href="/shop" className="inline-block primary-btn !px-6">
                  Beli
                </a>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg">
              <div className="relative">
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.WYbROPX1kbAUWrvJcU_LdAHaHa&pid=Api&P=0&h=180"
                  alt="Buket Romantis"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-0 right-0 bg-primary text-white py-2 px-4 rounded-bl-lg text-xs">
                  Promo
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-4 text-center">Buket Romantis</h3>
              <p className="text-lg font-bold text-primary text-center mt-3">Rp 220.000</p>
              <div className="flex justify-center mt-4">
                <a href="/shop" className="inline-block primary-btn !px-6">
                  Beli
                </a>
              </div>
            </div>
          </div>

          {/* Kata-kata Indah setelah seluruh card */}
          <div className="text-center mt-12">
            <p className="text-xl text-slate-500">
              "Setiap buket bunga mengandung cerita cinta, kebahagiaan, dan kenangan indah yang akan selalu mekar dalam hidup kita."
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container text-center">
          <p>&copy; 2024 Toko Buket Bunga Saquenna. All rights reserved.</p>
          <p>
            Follow us on{" "}
            <a
              href="https://www.instagram.com/tokobuketbunga"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-400"
            >
              Instagram
            </a>
          </p>
          <p>Alamat: Kali tengah, Mranggen, Demak</p>
        </div>
      </footer>
    </>
  );
};

export default About;
