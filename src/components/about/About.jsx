import React from 'react';

const About = () => {
  return (
    <>
      <section
        id="about"
        className="bg-white dark:bg-slate-800 dark:text-white"
      >
        <div className="container md:w-[70%]">
          <div className="grid items-center gap-4 grid-cols-1 sm:grid-cols-2">
            <div className="relative font-bold">
              <div className="text-center text-6xl xl:text-8xl font-bold text-black/5 dark:text-gray-700">
                ABOUT
              </div>
              <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl md:text-4xl">
                About Me
              </h1>
            </div>
            <div className="text-slate-500">
              <br />
              <br />
              <p>
                Saya Bisma Saya Lahir Di Demak 15 Oktober 2008, Saya Sekarang
                Masih Pelajar Di Sekolah SMK BINA NUSANTARA Hoby Saya Dengerin
                Lagunya Neck Deep
              </p>
              <br />
              <p>Cita-Cita Saya Adalah Menjadi Full stack Developer</p>
              <div>
                <a href="tel:+6289518626219" className="outline-btn inline-block">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <footer className="bg-gray-800 text-white py-4">
        <div className="container text-center">
          <p>&copy; 2024 Bisma Putra. All rights reserved.</p>
          <p>
            Follow me on{" "}
            <a
              href="https://www.instagram.com/bismaaaptra"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-400"
            >
              Instagram
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default About;
