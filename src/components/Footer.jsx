
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaFacebook, FaMapMarkerAlt
} from "react-icons/fa";
import logo from "../assets/images/logo1.2.png";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const socialIcons = [
    { icon: <FaTwitter />, link: "https://x.com/PrognozaD0509" },
    { icon: <FaFacebook />, link: "https://www.facebook.com/people/Prognoza-Dataminds/61566066965157/" },
    { icon: <FaLinkedin />, link: "https://www.linkedin.com/company/prognoza-dataminds/about/" },
    { icon: <FaYoutube />, link: "#" },
  ];

  const footerLinks = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Services", href: "services" },
    { name: "Why Choose Us", href: "whychooseus" },
    { name: "Contact", href: "contact" },
  ];

  const handleFooterClick = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToId: id } });
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Prognoza Logo" className="h-20 md:h-30 w-auto object-contain" />
              <div>
                <span className="text-2xl font-bold">
                  Prognoza <span className="text-[#00CD97]">Dataminds</span>
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-base leading-relaxed">
              Prognoza Dataminds is an innovative organization specializing in Key Opinion Leader (KOL) Management.
            </p>

            <div className="flex space-x-4 mt-2">
              {socialIcons.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-[#00CD97] hover:text-white transition-transform duration-300 transform hover:scale-110 shadow-md text-gray-200"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-base">
              {footerLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleFooterClick(link.href)}
                    className="hover:text-[#00CD97] transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-3 text-gray-400 text-base">
              <li>
                <a href="tel:+919886616821" className="hover:text-[#00CD97] transition-colors duration-300">
                  +91 98866 16821
                </a>
              </li>
              <li>
                <a href="mailto:connect@prognozadataminds.com" className="hover:text-[#00CD97] transition-colors duration-300">
                  connect@prognozadataminds.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">Reach Us</h3>
            <ul className="space-y-2 text-gray-400 text-base">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-[#00CD97]" />
                <span>
                  11/4, Pooja Garden,
                  <br />
                  Kalapatti Main Road,
                  <br />
                  Civil Aerodrome Post,
                  <br />
                  Coimbatore, Tamil Nadu - 641014
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm border-t border-gray-700 pt-6">
          <p>© prognozadataminds 2025, All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Terms", "Privacy", "Cookies"].map((item, idx) => (
              <a key={idx} href="#" className="hover:text-[#00CD97] transition-colors duration-300">{item}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Decorative Circles */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#00CD97]/20 rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#00CD97]/20 rounded-full -z-10 animate-pulse"></div>
    </footer>
  );
};

export default Footer;
