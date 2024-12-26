import React, { useEffect } from 'react';
import { BiSolidMoon, BiSolidSun } from 'react-icons/bi';
import { FiMenu } from "react-icons/fi";

const navMenus = [
  { name: "Home", link: "/" }, // Tambahkan menu Home
  { name: "Menu", link: "/About" }, // Menu Login tetap ada
  { name: "Login Admin", link: "/Login" }, // Menu Login tetap ada
];

const Navbar = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  const toggleMenu = () => setShowMenu(!showMenu);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <nav className="bg-secondary dark:bg-gray-900">
      <div className="container flex justify-between items-center py-3 sm:py-0 relative">
        <h1 className="text-3xl text-primary">TOKO BUKET BUNGA</h1>
        
        <div className="hidden sm:flex items-center">
          {darkMode ? (
            <BiSolidSun className="text-2xl dark:text-white mr-4 cursor-pointer" onClick={toggleDarkMode} />
          ) : (
            <BiSolidMoon className="text-2xl dark:text-white mr-4 cursor-pointer" onClick={toggleDarkMode} />
          )}

          <ul className="flex items-center gap-4">
            {navMenus.map((menu) => (
              <li key={menu.name}>
                <a 
                  href={menu.link} 
                  className="text-xl font-semibold px-2 py-4 md:py-6 inline-block cursor-pointer dark:text-white"
                >
                  {menu.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Menu Mobile */}
        <div className="block sm:hidden ml-auto flex items-center gap-4">
          {/* Ikon Dark/Light Mode untuk Mobile */}
          {darkMode ? (
            <BiSolidSun className="text-2xl dark:text-white cursor-pointer" onClick={toggleDarkMode} />
          ) : (
            <BiSolidMoon className="text-2xl dark:text-white cursor-pointer" onClick={toggleDarkMode} />
          )}

          <FiMenu className="text-2xl cursor-pointer ml-4 dark:text-white" onClick={toggleMenu} />
        </div>

        {showMenu && (
          <div className="fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 dark:text-white shadow-md rounded-b-xl z-10 py-10">
            <ul className="flex flex-col items-center gap-4">
              {navMenus.map((menu) => (
                <li key={menu.name}>
                  <a 
                    href={menu.link} 
                    className="text-xl font-semibold px-2 py-4 md:py-6 inline-block cursor-pointer dark:text-white"
                  >
                    {menu.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
