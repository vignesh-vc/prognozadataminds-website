import React from "react";

const ServiceCard = ({ title, subtitle, icon: Icon, delay, isFancy }) => {
  const baseClass = isFancy
    ? "relative p-6 rounded-3xl bg-white/30 backdrop-blur-lg border border-emerald-200 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105"
    : "p-6 rounded-xl bg-white shadow-md border border-gray-200 hover:shadow-lg transition";

  return (
    <div data-aos={isFancy ? "fade-up" : ""} data-aos-delay={delay} className={baseClass}>
      <div className={`flex items-center justify-center w-14 h-14 rounded-xl text-[#00CD97] mb-5 ${isFancy ? "bg-white/10 shadow-lg" : ""}`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{subtitle}</p>
    </div>
  );
};

export default ServiceCard;
