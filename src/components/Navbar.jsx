import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo1.3.png";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Services", href: "services" },
    { name: "Why Choose Us", href: "whychooseus" },
    { name: "Contact", href: "contact" },
  ];

  // Scroll function
  const handleNavClick = (id) => {
    closeMenu();

    if (location.pathname !== "/") {
      // Navigate to home page first
      navigate("/", { state: { scrollToId: id } });
    } else {
      // Scroll on the same page
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="bg-white  shadow fixed w-full z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
       
                    <a href="#home" className="flex items-center">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-[250px] w-[230px] sm:h-[270px] sm:w-[270px] md:h-[350px] md:w-[350px] lg:h-[450px] lg:w-[370px] xl:h-40 xl:w-66 object-contain"
                        />
                    </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(link.href)}
                className="relative text-gray-700 text-lg font-medium hover:text-teal-600 transition duration-300 
                  after:content-[''] after:absolute after:left-0 after:-bottom-1 
                  after:w-0 after:h-[2px] after:bg-teal-500 
                  after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300 rounded-lg p-2"
            >
              {isOpen ? <HiX className="w-7 h-7" /> : <HiMenu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-2 space-y-2 pb-4 animate-fadeIn">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(link.href)}
                className="block px-4 py-2 text-gray-700 text-lg font-medium rounded hover:bg-gray-100 transition w-full text-left"
              >
                {link.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
