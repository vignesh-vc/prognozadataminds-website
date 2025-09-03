import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import one from "../assets/images/one.webp";
import two from "../assets/images/two.webp";
import three from "../assets/images/three.webp";
import four from "../assets/images/four.webp";

const Hero = () => {
  const slides = [
    { img: one, text: "Data security and regulatory compliance are fundamental to our operations." },
    { img: two, text: "Our Key Opinion Leaders services deliver expert insights and drive strategic impact." },
    { img: three, text: "Systematic Identification and Profiling yields actionable insights." },
    { img: four, text: "Continuous improvement and customer-centric innovation are vital for gaining a competitive edge." },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Preload images
  useEffect(() => {
    slides.forEach(slide => {
      const img = new Image();
      img.src = slide.img;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background Images stacked */}
      {slides.map((slide, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${slide.img})`,
            backgroundPosition: "center 10%" // <-- move image slightly down
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: activeIndex === i ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        ></motion.div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-0 h-full flex items-center">
        <div className="grid lg:grid-cols-12 items-center gap-10 h-full">
          {/* Left Content */}
          <motion.div
            key={activeIndex}
            className="lg:col-span-7 space-y-6 lg:space-y-8 text-center lg:text-left break-words"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white leading-snug">
              {slides[activeIndex].text.split(" ").map((word, i) => (
                <span
                  key={i}
                  className={i % 4 === 0 ? "bg-clip-text text-transparent bg-gradient-to-r from-[#00CD97] to-[#336698]" : ""}
                >
                  {word + " "}
                </span>
              ))}
            </h1>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-4">
              <a
                href="#"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-[#00CD97] to-[#336698] text-white font-medium shadow-lg transform transition hover:scale-105 hover:shadow-xl text-center"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
