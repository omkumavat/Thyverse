import React from "react";
import { motion } from "framer-motion";
import {
  FaUserMd,
  FaPills,
  FaUsers,
  FaBookOpen,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "Consult with a thyroid specialist",
    icon: <FaUserMd className="text-red-600" />,
  },
  {
    id: 2,
    title: "Medication and lifestyle support",
    icon: <FaPills className="text-purple-600" />,
  },
  {
    id: 3,
    title: "Community of thyroid warriors",
    icon: <FaUsers className="text-yellow-600" />,
  },
  {
    id: 4,
    title: "Up-to-date research & health insights",
    icon: <FaBookOpen className="text-teal-600" />,
  },
];

const ServiceCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {services.map((service, index) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          viewport={{ once: false, amount: 0.2 }}
          className="p-4 bg-gray-50 font-poppins rounded-2xl text-center hover:scale-105 border border-gray-300 hover:shadow-lg transition duration-300 flex flex-col justify-center items-center w-[220px] h-[220px] sm:w-[250px] sm:h-[230px]"
        >
          {React.cloneElement(service.icon, {
            className: `${service.icon.props.className} text-4xl`,
          })}
          <h3 className="text-xl font-semibold text-gray-800 mt-4 text-center">
            {service.title}
          </h3>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceCard;
