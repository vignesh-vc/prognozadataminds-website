import { motion } from "framer-motion";
import one from "../assets/images/one.jpg";

const AboutUs = () => {
    const stats = [
        { title: "Experience", value: "1+ Years" },
        { title: "Reviews", value: "500+ Positive" },
        { title: "Clients", value: "10+ Worldwide" },
    ];

    const points = [
        "KOL Identification",
        "KOL Profiling",
        "KOL Mapping and Analysis",
        "Rising Star Analysis",
        "Medical Conferences Repository",
        "Guideline Research",
        "Publications Analysis",
        "Clinical Trials Analysis",
        "Market Access Profiling"
    ];

    return (
        <section id="about" className="relative pt-[90px] w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center py-16">
            <div className="container mx-auto px-6 lg:px-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    {/* Left Content */}
                    <motion.div
                        className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                            About Us <br /> <span className="text-[#00CD97]">Prognoza  <span className="text-[#336698]">Dataminds</span></span>
                        </h2>
                        <div className="max-w-4xl mx-auto space-y-6 text-gray-700">
                            <p className="text-gray-700 text-md sm:text-mdleading-relaxed text-justify">
                                Prognoza Dataminds is an innovative organization specializing in Key Opinion Leader (KOL) Management. We support leading pharmaceutical, biotech, medical device, and other healthcare industries by enhancing their understanding of Healthcare Professionals (HCPs) and fostering strong affiliations. Our expertise lies in data management and secondary research, focusing on areas such as KOL Identification, KOL Profiling, KOL Mapping and Analysis, Rising Star Analysis, Medical Conferences Repository, Guideline Research, Publications Analysis, Clinical Trials Analysis, and Market Access Profiling.
                                <span className="font-semibold text-[#336698]"> Key Opinion Leader (KOL) Management</span>. The Prognoza Dataminds team is composed of highly skilled managers, experienced analysts, subject matter experts, and quality analysts. Equipped with advanced search methods and techniques, <span className="font-medium">we excel in extensive data research and management.</span>
                            </p>

                            <p className="text-gray-700 text-md sm:text-md leading-relaxed text-justify">
                                Our team is proficient in various fields including <span className="font-medium text-[#00CD97]">data mining, interpretation, analytics, and management, enabling us to deliver outstanding KOL mapping and profiling services.</span> We help businesses build and sustain a comprehensive KOL database while adhering to client quality standards, consistently meeting deadlines, and achieving exceptional results.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Side */}
                    <div className="lg:col-span-7 flex flex-col gap-6">

                        {/* Top Image */}
                        <motion.div
                            className="w-full h-80 sm:h-96 lg:h-[400px] rounded-3xl overflow-hidden shadow-2xl relative"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <img
                                src={one}
                                alt="About Top"
                                className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                        </motion.div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-auto">
                            {stats.map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    className="bg-white rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-center text-center hover:scale-105 transform transition duration-500"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: idx * 0.2 }}
                                >
                                    <h3 className="text-3xl sm:text-4xl font-bold text-[#00CD97]">{stat.value}</h3>
                                    <p className="text-gray-700 mt-2 font-medium">{stat.title}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutUs;
