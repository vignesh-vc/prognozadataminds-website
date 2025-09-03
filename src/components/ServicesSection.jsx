import { useEffect } from "react";
import { ArrowRight, Target, Users2, Map, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ServiceCard from "./ServiceCard";

const services = [
  { title: "KOLs Identification", subtitle: "Expert Analysis", icon: Target },
  { title: "Profiling of Key Opinion Leaders", subtitle: "Comprehensive Insights", icon: Users2 },
  { title: "KOL Mapping and Analysis", subtitle: "Strategic Mapping", icon: Map },
  { title: "Research on Guidelines", subtitle: "Evidence-Based Research", icon: BookOpen },
];

const ServicesSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
  }, []);

  return (
    <section id="services" className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/50 to-white py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            What we Do <br />
            <span className="text-[#00CD97]">
              The Perfect Services <br />
              <span className="text-[#336698]">We’re Offering</span>
            </span>
          </h2>

          <p className="text-gray-700 text-justify leading-relaxed max-w-lg">
            Prognoza Dataminds services are designed to research, identify, prioritize, profile and validate globally based on their involvement in Publications, Clinical Trials, Conferences, Guidelines, Journals, Affiliations, Social Media engagements and other relevant sources.
          </p>

          <button
            onClick={() => navigate("/services")}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-xl flex items-center group"
          >
            Explore More
            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Right Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} title={service.title} subtitle={service.subtitle} icon={service.icon} delay={index * 200} isFancy />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
