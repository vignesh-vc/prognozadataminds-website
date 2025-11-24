export default function NpiNavbar() {
  return (
    <nav className="fixed top-0 left-0 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          {/* Example Logo Text */}
          <span className="text-2xl font-bold text-secondary">NPI Lookup</span>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <a
            href="#home"
            className="text-gray-700 hover:text-secondary transition"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-700 hover:text-secondary transition"
          >
            About
          </a>
          <a
            href="#features"
            className="text-gray-700 hover:text-secondary transition"
          >
            Features
          </a>
          <a
            href="#contact"
            className="text-gray-700 hover:text-secondary transition"
          >
            Contact
          </a>
        </div>

        {/* CTA Button */}
        <div>
          <a
            href="#search"
            className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition"
          >
            Search Now
          </a>
        </div>
      </div>
    </nav>
  );
} 
