import React from "react";
import { motion } from "framer-motion";
import {
  MdVerified,
  MdDataset,
  MdTune,
  MdInsights,
  MdUpdate,
  MdLayers,
  MdSecurity,
  MdSupportAgent,
  MdHub,
  MdAutoAwesome,
  MdHandshake,
  MdLeaderboard,
} from "react-icons/md";
import chooseimg from "../assets/images/doctor.jpg";

const iconColor = "#00CD97";

const featuresTop = [
  {
    icon: <MdVerified className="w-6 h-6" style={{ color: iconColor }} />,
    title: "Expertise and Experience",
    desc: "Our team of seasoned professionals brings extensive knowledge and experience in identifying and profiling KOLs across various healthcare sectors.",
  },
  {
    icon: <MdDataset className="w-6 h-6" style={{ color: iconColor }} />,
    title: "Comprehensive Data Management",
    desc: "We utilize advanced techniques and tools for precise data collection and management, ensuring you have access to accurate and up-to-date KOL information.",
  },
  {
    icon: <MdTune className="w-6 h-6" style={{ color: iconColor }} />,
    title: "Customized Solutions",
    desc: "We recognize that each business has unique data management needs. That’s why we provide customized solutions designed to meet your specific requirements.",
  },
];

const featuresGrid = [
  {
    icon: <MdInsights className="w-6 h-6" style={{ color: iconColor }} />,
    title: "In-Depth Analysis",
    desc: "Our thorough analysis of KOL influence, publications, and clinical trials provides actionable insights to support your strategic decisions.",
  },
  {
    icon: <MdUpdate className="w-6 h-6" style={{ color: iconColor }} />,
    title: "Timely Updates",
    desc: "We maintain and regularly update our databases, ensuring you have the latest information on KOLs and emerging trends.",
  },
  {
    icon: <MdLayers className="w-6 h-6" style={{ color: iconColor }} />,
    title: "Scalability and Flexibility",
    desc: "Our solutions are designed to scale with your business, adapting seamlessly to evolving needs.",
  },
  {
    icon: <MdSecurity className="w-6 h-6" style={{ color: iconColor }} />,
    title: "Security and Compliance",
    desc: "Data security is our foremost priority. We deploy robust security measures and ensure compliance with industry regulations.",
  },
  {
    icon: <MdSupportAgent className="w-6 h-6" style={{ color: iconColor }} />,
    title: "Reliability and Support",
    desc: "We provide round-the-clock support and proactive monitoring to minimize downtime and maximize uptime.",
  },
  {
    icon: <MdHub className="w-6 h-6" style={{ color: iconColor }} />,
    title: "Strategic Networking",
    desc: "Our services facilitate meaningful connections with influential healthcare professionals, enhancing collaboration.",
  },
  {
    icon: <MdAutoAwesome className="w-6 h-6" style={{ color: iconColor }} />,
    title: "Innovation and Continuous Improvement",
    desc: "We continually refine our services to provide cutting-edge solutions that enhance efficiency and foster innovation.",
  },
  {
    icon: <MdHandshake className="w-6 h-6" style={{ color: iconColor }} />,
    title: "Strategic Partnership",
    desc: "Selecting our services means partnering with a team committed to your success and proactive guidance.",
  },
  {
    icon: <MdLeaderboard className="w-6 h-6" style={{ color: iconColor }} />,
    title: "Proven Track Record",
    desc: "We have a history of delivering exceptional results, helping clients achieve their goals through effective KOL management.",
  },
];

export default function Why() {
  return (
    <div id="whychooseus"className="relative pt-[50px] bg-gradient-to-b from-gray-50 via-white to-gray-100 font-inter overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-10 -left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 -right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
             Why Choose Us <br /> <span className="text-[#00CD97]"> <br />  <span className="text-[#336698]">Our Key Opinion Leader (KOL) Services? </span></span>
            </h2>
          </div>
        </motion.div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          {/* Image with Bounce */}
          <motion.div
            className="flex justify-center"
            initial={{ y: 20 }}
            animate={{ y: [20, -10, 20] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <img
              src={chooseimg}
              alt="Medical professionals"
              className="rounded-2xl shadow-2xl w-80 lg:w-96 h-auto"
            />
          </motion.div>

          {/* Text Features */}
          <div className="space-y-6">
            {featuresTop.map((f, i) => (
              <motion.div
                key={i}
                className="flex items-start"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
              >
                <span className="mr-4 flex items-center justify-center w-10 h-10 rounded-full bg-[#00CD97]/10 text-[#00CD97] shadow-md">
                  {f.icon}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{f.title}</h3>
                  <p className="text-gray-600 mt-1">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Grid Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresGrid.map((f, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-xl bg-white/80 backdrop-blur-md hover:shadow-2xl transition-all duration-300 border border-gray-200"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center mb-3">
                <span className="mr-3 flex items-center justify-center w-10 h-10 rounded-full bg-[#00CD97]/10 text-[#00CD97]">
                  {f.icon}
                </span>
                <h3 className="text-lg font-semibold text-gray-800">{f.title}</h3>
              </div>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
