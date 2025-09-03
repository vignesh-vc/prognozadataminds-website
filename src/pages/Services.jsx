import { Link } from "react-router-dom";
import { servicesData } from "../data/servicesData";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import serviceBg from "../assets/images/s_img.jpg"
import ScrollButton from '../components/ScrollButton'

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // GSAP animation for service sections
  useEffect(() => {
    const sections = containerRef.current.querySelectorAll(".service-section");
    sections.forEach((section, i) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
          delay: i * 0.1,
        }
      );
    });
  }, []);

  return (
    <div className="relative bg-gray-50 overflow-hidden">
     
      <div className="absolute inset-0 overflow-hidden">
      
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-300 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-teal-400 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 opacity-90"></div>
      </div>

     
      <div
        className="relative bg-cover bg-center h-[300px] md:h-[400px] flex items-center justify-center"
        style={{ backgroundImage: `url(${serviceBg})` }}
      >
       
        <div className="absolute inset-0 bg-black/60"></div>

        
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
            Our Services
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-200">
            <Link to="/" className="hover:underline hover:text-emerald-300">
              Home
            </Link>{" "}
            &gt; <span className="text-emerald-300 font-medium">Services</span>
          </p>
        </div>

       
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-[80px]"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path
              d="M321.39 56.44c58.6 10.79 117.2 21.58 175.8 22.08 58.6.5 117.2-9.71 175.8-19.92 58.6-10.22 117.2-20.43 175.8-16.63 58.6 3.8 117.2 19.61 175.8 29.82 58.6 10.22 117.2 14.84 175.8 19.46v29.75H0V81.19c107.13-17.45 214.26-34.91 321.39-24.75z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </div>

     
      <div
        ref={containerRef}
        className="relative z-10 container mx-auto px-6 lg:px-20 py-16 space-y-28"
      >
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="service-section grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Image Left */}
            {service.direction === "left" && (
              <img
                src={service.image}
                alt={service.title}
                className="rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500"
              />
            )}

            {/* Text */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 relative inline-block">
                {service.title}
                <span className="absolute left-0 -bottom-2 w-16 h-1 bg-emerald-400 rounded-full"></span>
              </h2>

              {service.description?.map((para, idx) => (
                <p
                  key={idx}
                  className="text-gray-600 text-justify mb-4 leading-relaxed text-base"
                >
                  {para}
                </p>
              ))}

              {service.points && (
                <ul className="list-disc text-justify pl-6 text-gray-700 space-y-2 mb-4">
                  {service.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              )}

              {service.footer && (
                <p className="text-gray-700 text-justify font-medium">{service.footer}</p>
              )}
            </div>

            {/* Image Right */}
            {service.direction === "right" && (
              <img
                src={service.image}
                alt={service.title}
                className="rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500"
              />
            )}
          </div>
        ))}
      </div>

      {/* Bottom Pattern Section */}
      <div className="relative w-full mt-16">
        <svg
          className="w-full h-32"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Main wave */}
          <path
            d="M0 40 C 300 120 900 0 1200 60 L1200 120 L0 120 Z"
            className="fill-emerald-100"
          />
          {/* Left accent */}
          <path
            d="M0 60 C 150 30 150 90 0 60 Z"
            className="fill-emerald-300 opacity-40"
          />
          {/* Right accent */}
          <path
            d="M1200 60 C 1050 90 1050 30 1200 60 Z"
            className="fill-teal-300 opacity-40"
          />
        </svg>
      </div>
      <ScrollButton />
    </div>
  );
}
