import React from "react";
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
    title: "Personalized Dashboard",
    icon: <FaUserCircle className="text-blue-600 text-4xl" />,
  },
  {
    id: 2,
    title: "Book your AI-based thyroid scan",
    icon: <FaMicroscope className="text-green-600 text-4xl" />,
  },
  {
    id: 3,
    title: "Consult with a thyroid specialist",
    icon: <FaUserMd className="text-red-600 text-4xl" />,
  },
  {
    id: 4,
    title: "Medication and lifestyle support",
    icon: <FaPills className="text-purple-600 text-4xl" />,
  },
  {
    id: 5,
    title: "Community of thyroid warriors",
    icon: <FaUsers className="text-yellow-600 text-4xl" />,
  },
  {
    id: 6,
    title: "Up-to-date research & health insights",
    icon: <FaBookOpen className="text-teal-600 text-4xl" />,
  },
];

const ServiceCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {services.map((service) => (
        <div
          key={service.id}
          className="p-4 bg-gray-50 font-poppins rounded-3xl text-center hover:scale-105 border border-gray-300 hover:shadow-md hover:shadow-white transition duration-300 flex flex-col items-center w-[300px] h-[250px] sm:w-[350px] sm:h-[280px]"
        >
          {React.cloneElement(service.icon, {
            className: `${service.icon.props.className} text-5xl`, // Preserve colors & increase size
          })}
          <h3 className="text-2xl font-bold text-gray-800 mt-6">
            {service.title}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default ServiceCard;
