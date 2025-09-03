import { useRef, useState } from "react";
import { MdLocationOn, MdPhone, MdEmail, MdOutlineHandshake } from "react-icons/md";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const info = [
    {
      icon: <MdLocationOn className="text-4xl" style={{ color: "#00CD97" }} />,
      title: "Office Address, India",
      desc1: "11/4, Pooja Garden, Kalapatti Main Road, Civil Aerodrome Post,",
      desc2: "Coimbatore, Tamil Nadu - 641014",
    },
    {
      icon: <MdPhone className="text-4xl" style={{ color: "#00CD97" }} />,
      title: "Contact",
      desc1: "Talk to us and see how we can work",
      desc2: "+91 98866 16821",
    },
    {
      icon: <MdEmail className="text-4xl" style={{ color: "#00CD97" }} />,
      title: "Email",
      desc1: "",
      desc2: "connect@prognozadataminds.com",
    },
    {
      icon: <MdOutlineHandshake className="text-9xl mt-[-50px]" style={{ color: "#00CD97" }} />,
      title: "Thank you",
      desc1: "--At Prognoza Dataminds, we prioritize your privacy and confidentiality.",
      desc2: "--We are committed to safeguarding any information provided by you and will only disclose your identity with your explicit written consent. You can also specify your preferred method of contact, and we will respect your communication preferences.",
    },
  ];

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_kjohfbo", // your EmailJS service ID
        "template_l5rt68m", // your EmailJS template ID
        form.current,
        "J3tZKwddph9uYhrDq" // your EmailJS public key
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccessMsg("Message sent successfully!");
          setErrorMsg("");
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          setErrorMsg("Oops! Something went wrong, please try again.");
          setSuccessMsg("");
        }
      );
  };

  return (
    <div id="contact" className="min-h-screen pt-[100px] md:pt-[20px] flex items-center justify-center bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

        {/* Contact Form */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">Contact Us</h2>
          <p className="text-gray-600 mb-6 sm:mb-8">
            We’re committed to providing excellent support. Send us a message and we’ll get back to you as soon as possible.
          </p>
          <form ref={form} onSubmit={sendEmail}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="relative">
                <input
                  type="text"
                  name="user_name" // matches {{user_name}} in EmailJS template
                  required
                  className="peer w-full px-3 sm:px-4 pt-4 sm:pt-5 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00CD97] focus:border-[#00CD97]"
                  placeholder=" "
                />
                <label className="absolute left-3 sm:left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-700 peer-focus:text-sm">
                  Full Name *
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="user_phone" // matches {{user_phone}} in EmailJS template
                  required
                  className="peer w-full px-3 sm:px-4 pt-4 sm:pt-5 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00CD97] focus:border-[#00CD97]"
                  placeholder=" "
                />
                <label className="absolute left-3 sm:left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-700 peer-focus:text-sm">
                  Mobile Number *
                </label>
              </div>
            </div>

            <div className="relative mb-4 sm:mb-6">
              <input
                type="email"
                name="user_email" // matches {{user_email}} in EmailJS template
                required
                className="peer w-full px-3 sm:px-4 pt-4 sm:pt-5 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00CD97] focus:border-[#00CD97]"
                placeholder=" "
              />
              <label className="absolute left-3 sm:left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-700 peer-focus:text-sm">
                Email *
              </label>
            </div>

            <div className="relative mb-4 sm:mb-6">
              <textarea
                name="message" // matches {{message}} in EmailJS template
                rows="4"
                required
                className="peer w-full px-3 sm:px-4 pt-4 sm:pt-5 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00CD97] focus:border-[#00CD97]"
                placeholder=" "
              ></textarea>
              <label className="absolute left-3 sm:left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-700 peer-focus:text-sm">
                Message *
              </label>
            </div>

            {successMsg && <p className="text-green-500 mb-4">{successMsg}</p>}
            {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

            <button className="w-full bg-gradient-to-r from-[#00CD97] to-[#336698] hover:from-[#336698] hover:to-[#00CD97] text-white font-semibold py-3 sm:py-3.5 rounded-xl transition-all duration-500">
              Send Message
            </button>
          </form>
        </div>

        {/* Info Cards */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {info.map((item, idx) => (
            <div key={idx} className="p-4 sm:p-6 md:p-6 border border-gray-200 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 bg-white">
              {item.icon}
              <div>
                <h3 className="text-md sm:text-lg md:text-lg font-semibold">{item.title}</h3>
                <p className="text-sm sm:text-base text-justify">{item.desc1}</p>
                <p className="text-sm sm:text-base text-justify">{item.desc2}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Contact;
