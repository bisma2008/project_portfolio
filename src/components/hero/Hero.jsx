import React from 'react';
import dinoImg from "../../assets/removebg.png";

const Hero = () => {
  return (
    <>
      <main className="w-full bg-secondary dark:bg-gray-900 dark:text-white">
        <div className="container grid grid-cols-2 items-canter space-y-2 py-12 sm:py-0 sm:h-[600px] sm:h-[600px] flex flex-col sm:flex-row items-center justify-between">
          <div>
            <div className='space-y-2 grid justify-items-start'>
              <p className="uppercase">Hello</p>
              <p className="text-4xl md:text-6xl font-bold">I'm Bisma Putra</p>
              <p className='text-3xl text-gray-700 dark:text-white '>Pelajar Binus  <br />
              </p>
              <p className='text-black/75 dark:text=white/70 text-center sm:text-left dark:text-white '>
                saya minat di bidang IT makanya saya ikut kelas programer
              </p>
              <a href="https://www.instagram.com/bismaaaptra?igsh=N2gyMWJzbmt5ZjJn" className='inline-block primary-btn !px-6'>instagram saya</a>
            </div>
          </div>
          <div>
            <img src={dinoImg} alt="Dinosaur" className="w-full md:max-w-lg mx-auto" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Hero;
