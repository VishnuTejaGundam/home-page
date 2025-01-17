import React, { useState, useEffect, useRef } from 'react';
import { IoMdMenu, IoMdArrowDropdown, IoIosCall } from 'react-icons/io';
import { motion } from 'framer-motion';
import Logo from '../../assets/logo.png';
import { IoCalendarOutline, IoCallOutline } from 'react-icons/io5';

const NavbarMenu = [
  {
    id: 2,
    title: "Courses",
    link: "#",
    subMenu: [
      { title: "JEE", path: "http://localhost:5174/" },
      { title: "NEET", path: "/courses/neet" },
      { title: "6 to 12", path: "/courses/k6tok12" },
    ],
  },
  {
    id: 3,
    title: "Why Only NNIIT",
    link: "#",
  },
  {
    id: 4,
    title: "Study Material",
    link: "#",
  },
  {
    id: 5,
    title: "Blog",
    link: "#",
  },
];

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null); // Create a ref for the menu

  const toggleDropdown = (menuId) => {
    setOpenDropdown(openDropdown === menuId ? null : menuId);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenDropdown(null); // Close dropdown
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-10 transition-all duration-300 ${isScrolled ? "bg-white/70 shadow-lg backdrop-blur-md" : "bg-transparent"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container flex justify-between items-center"
      >
        {/* Logo section */}
        <div className="flex items-center">
          <img src={Logo} alt="NNIIT Logo" className="h-14 mr-2" />
        </div>

        {/* Menu section */}
        <div className="hidden lg:block" ref={menuRef}> {/* Attach the ref to the menu */}
          <ul className="flex items-center gap-3 text-sm py-1">
            {NavbarMenu.map((menu) => (
              <li key={menu.id} className="relative">
                <div
                  onClick={() => menu.subMenu && toggleDropdown(menu.id)}
                  className="py-1 px-2 hover:text-secondary relative group flex items-center cursor-pointer"
                >
                  {menu.title}
                  {menu.subMenu && <IoMdArrowDropdown className="ml-1" />}
                </div>

                {/* Dropdown for Courses */}
                {menu.subMenu && openDropdown === menu.id && (
                      <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md py-2 w-48">
                                          {menu.subMenu.map((subItem, index) => (
                                                    <a
                                                      key={index}
                                                      href={subItem.path} // Use href for the URL
                                                      target="_blank" // Opens the URL in a new tab
                                                      rel="noopener noreferrer" // For security reasons
                                                      className="block px-4 py-2 hover:bg-gray-100"
                                                    >
                                                      {subItem.title}
                                                    </a>
                                                  ))}
                      </div>
                    )}
              </li>
            ))}
            <button
              type="submit"
              className="primary-btn flex items-center gap-2 group justify-center"
              onClick={() => window.open('https://calendar.app.google/ACitve3sDuj7vWWt5', '_blank')}
            >
              Book a Free Demo
              <IoCalendarOutline className="text-xl animate-[phone-ring_1s_infinite]" />
            </button>

            <button
              type="button"
              className="primary-btn flex items-center gap-3 group px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
              onClick={() => window.open('https://calendar.app.google/ACitve3sDuj7vWWt5', '_blank')}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full group-hover:bg-orange-500 transition duration-300">
                <IoCallOutline className="text-gray-800 text-xl group-hover:text-white transition duration-300" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Talk to our experts</p>
                <p className="text-lg font-semibold text-gray-800">+91 9876543210</p>
              </div>
            </button>
            <button
              className="primary-btn px-3 py-1 text-md"
              onClick={() => window.open("https://nniit.com/signup", "_blank")}
            >
              Sign In
            </button>
          </ul>
        </div>

        {/* Mobile Hamburger menu section */}
        <div className="lg:hidden">
          <IoMdMenu className="text-4xl" />
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
