import React from "react";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaMicroscope,
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
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8 p-8">
      {services.map((service, index) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: false, amount: 0.2 }}
          className="p-4 bg-gray-50 font-poppins rounded-3xl text-center hover:scale-105 border border-gray-300 hover:shadow-md hover:shadow-white transition duration-300 flex flex-col items-center w-[300px] h-[250px] sm:w-[350px] sm:h-[280px]"
        >
          {React.cloneElement(service.icon, {
            className: `${service.icon.props.className} text-5xl`,
          })}
          <h3 className="text-2xl font-bold text-gray-800 mt-6">
            {service.title}
          </h3>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceCard;
