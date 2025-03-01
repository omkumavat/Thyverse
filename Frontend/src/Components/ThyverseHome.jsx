import React from "react";
import NavBar2 from "./NavBar2";
import { CheckCircle } from "lucide-react";
import Throat from "../Images/Throa.jpg";
import Contact from "../Images/contact.gif";
import { motion } from "framer-motion";
import Footer2 from "./Footer2";
import ServiceCard2 from "./ServiceCard2";
const ThyverseHome = () => {
  return (
    <div className="flex flex-col gap-y-10">
      <div>
        <NavBar2 />
      </div>
      <div className="relative mx-4 mt-14">
        <div className="bg-[#18184e] rounded-md py-12 px-6 relative z-10 rounded-tl-[10%] rounded-br-[10%]">
          <p className="text-white font-bold text-3xl font-poppins text-center">
            Our Services
          </p>
          <ServiceCard2 />
        </div>
      </div>
      <section className="py-20" id="technology">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Text Section */}
            <div className="bg-orange-400 p-5 rounded-md hover:bg-orange-500 hover:scale-105 transition-all duration-100 h-full flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-6 font-poppins text-blue-700">
                Revolutionary Thermal Scanning Technology
              </h2>
              <p className="text-gray-600 mb-6 text-2xl font-poppins">
                Our innovative approach uses advanced thermal imaging to detect
                thyroid abnormalities with high precision. This non-invasive
                method provides:
              </p>
              <ul className="space-y-4">
                {[
                  "Accurate temperature mapping of the thyroid region",
                  "Real-time analysis using AI",
                  "Immediate results with detailed reports",
                  "Non-invasive and painless procedure",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-700 " />
                    <span className="font-poppins text-xl text-white">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Image Section */}
            <div className="h-full flex items-center">
              <img
                src={Throat}
                className="rounded-lg shadow-xl w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-2" id="contact">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-3xl font-bold text-center font-poppins mb-2">
              Get in Touch
            </h2>
            <div className="h-1 bg-black w-[20%]"></div>
          </motion.div>
          <div className="flex justify-center items-center">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: false, amount: 0.2 }}
              className=""
            >
              <img src={Contact} className="max-w-full h-auto" alt="Contact" />
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: false, amount: 0.2 }}
              className="w-[40%] bg-gray-300 p-8 rounded-lg shadow-lg"
            >
              <form className="space-y-6 font-poppins">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-bold text-md text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-md border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-bold text-md text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block font-bold text-md text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer2 />
    </div>
  );
};

export default ThyverseHome;
