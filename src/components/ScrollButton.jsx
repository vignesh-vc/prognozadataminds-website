import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const ScrollButton = () => {
  const [showTop, setShowTop] = useState(false);

  // Detect scroll position
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowTop(true);
    } else {
      setShowTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {!showTop ? (
        <button
          onClick={scrollToBottom}
          className="p-4 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition"
        >
          <FaArrowDown size={20} />
        </button>
      ) : (
        <button
          onClick={scrollToTop}
          className="p-4 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default ScrollButton;
