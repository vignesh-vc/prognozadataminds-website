import React from "react";
import { FileText, Shield, Clock, Users } from "lucide-react";

const NpiAbout = () => {
  const delayClasses = ["anim-delay-0", "anim-delay-100", "anim-delay-200", "anim-delay-300"];
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-b from-white to-secondary/5">
      {/* Decorative dotted overlays */}
      <div className="pointer-events-none absolute -top-8 -left-8 w-48 h-48 rounded-full bg-dots-secondary opacity-20"></div>
      <div className="pointer-events-none absolute -bottom-14 -right-10 w-64 h-64 rounded-full bg-dots opacity-20"></div>

      {/* Top wave */}
      <div className="wave-top text-secondary/10" aria-hidden>
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,96L80,74.7C160,53,320,11,480,32C640,53,800,139,960,149.3C1120,160,1280,96,1360,64L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        </svg>
      </div>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl  mx-auto text-center">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary animate-fade-in">
            About NPI Lookup
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 leading-relaxed mb-12">
            The National Provider Identifier (NPI) is a unique identification number for covered health care providers.
            Our NPI lookup tool provides instant access to the official NPPES database, allowing you to verify provider
            credentials, contact information, and practice details with confidence.
          </p>

          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: <FileText className="h-8 w-8 text-secondary animate-bounce-slow" />,
                title: "Official Data",
                desc: "Direct access to NPPES registry",
                bg: "bg-secondary/10",
              },
              {
                icon: <Shield className="h-8 w-8 text-primary animate-bounce-slow" />,
                title: "Verified Info",
                desc: "Trusted provider credentials",
                bg: "bg-primary/10",
              },
              {
                icon: <Clock className="h-8 w-8 text-secondary animate-bounce-slow" />,
                title: "Real-Time",
                desc: "Always up-to-date information",
                bg: "bg-secondary/10",
              },
              {
                icon: <Users className="h-8 w-8 text-primary animate-bounce-slow" />,
                title: "Comprehensive",
                desc: "All provider types covered",
                bg: "bg-primary/10",
              },
            ].map((item, index) => (
              <div key={index} className={`p-[1px] rounded-2xl bg-gradient-to-br from-primary to-secondary animate-fade-in ${delayClasses[index % delayClasses.length]}`}>
                <div className="text-center bg-white rounded-2xl p-6 h-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`${item.bg} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-secondary mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Bottom wave */}
      <div className="wave-bottom text-secondary/10" aria-hidden>
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,64L60,80C120,96,240,128,360,117.3C480,107,600,53,720,53.3C840,53,960,107,1080,117.3C1200,128,1320,96,1380,80L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default NpiAbout;
