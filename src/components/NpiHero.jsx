import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import heroImage from "../assets/hero.jpg";

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`rounded-lg font-medium transition px-4 py-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-secondary ${className}`}
    {...props}
  />
);

const NpiHero = () => {
  const [quickSearchValue, setQuickSearchValue] = useState("");
  const navigate = useNavigate();

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    const raw = quickSearchValue.trim();
    if (!raw) return;

    // ✅ Check if input is an NPI number (10 digits)
    const npiPattern = /^\d{10}$/;
    const isNPI = npiPattern.test(raw.replace(/\D/g, ""));

    if (isNPI) {
      const npiNumber = raw.replace(/\D/g, "");
      navigate({
        pathname: "/search",
        search: `npiNumber=${npiNumber}`,
      });
      return;
    }

    // ✅ Handle Full Name Search (send as "fullName" for backend)
    const fullName = raw.trim();
    if (!fullName) return;

    const searchParams = new URLSearchParams();
    searchParams.append("fullName", fullName); // 👈 backend expects this key

    navigate({
      pathname: "/search",
      search: searchParams.toString(),
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Healthcare professionals"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Healthcare Provider Lookup
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">
            Search healthcare providers by NPI number or name with match accuracy
          </p>

          {/* Quick Search Form */}
          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={handleQuickSubmit}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search by NPI (1234567890) or Name (John Smith)"
                    value={quickSearchValue}
                    onChange={(e) => setQuickSearchValue(e.target.value)}
                    className="h-16 text-lg pl-16 pr-6 bg-white text-black border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    maxLength={100}
                  />
                </div>
                <p className="mt-2 text-sm text-white/80 text-center sm:text-left">
                  Type a 10-digit NPI number or provider’s full name
                </p>
              </div>
              <Button
                type="submit"
                className="h-16 px-8 bg-primary hover:bg-primary/90 text-white text-lg font-medium flex items-center justify-center disabled:opacity-50 transition-colors duration-200"
                disabled={!quickSearchValue.trim()}
              >
                Search
              </Button>
            </form>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">2M+</div>
              <div className="text-white/80">Healthcare Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">Dual Search</div>
              <div className="text-white/80">NPI & Name Lookup</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-white/80">Match Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/40 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default NpiHero