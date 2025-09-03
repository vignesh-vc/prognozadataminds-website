import { FaStar, FaUsers, FaClock, FaCheckCircle } from "react-icons/fa";

const Card = () => {
  const features = [
    {
      icon: <FaStar className="text-teal-500 text-4xl mb-3" />,
      title: "Great Experiences",
      desc: "We deliver outstanding solutions that ensure smooth and memorable experiences for every client.",
    },
    {
      icon: <FaCheckCircle className="text-teal-500 text-4xl mb-3" />,
      title: "Reference for Result",
      desc: "Our proven track record and satisfied clients are a true reflection of the quality we deliver.",
    },
    {
      icon: <FaUsers className="text-teal-500 text-4xl mb-3" />,
      title: "Expertise Team",
      desc: "Our highly skilled professionals bring deep knowledge and creativity to every project.",
    },
    {
      icon: <FaClock className="text-teal-500 text-4xl mb-3" />,
      title: "Timely Fulfillment",
      desc: "We respect deadlines and ensure your project is completed on time, every time.",
    },
  ];

  return (
    <section className="w-full  bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-7">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 text-center"
            >
              {item.icon}
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Card;
