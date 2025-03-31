import React, { useState } from "react";
import {
  Thermometer,
  Microscope,
  Target,
  Shield,
  Activity,
  Users,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Calendar,
  Heart,
  Clock,
  MessageCircle,
} from "lucide-react";
import logo from "../Images/logo.png";
import ServiceCard from "../Components/ServiceCard";
import Throat from "../Images/Throa.jpg";
import { motion } from "framer-motion";
import Contact from "../Images/contact.gif";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import homeImage from "../Images/HomeImage.webp";
import { Phone, Mail, MapPin } from "lucide-react";
const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const iconMap = {
    phone: <Phone className="w-5 h-5 text-[#5050ff]" />,
    mail: <Mail className="w-5 h-5 text-[#5050ff]" />,
    location: <MapPin className="w-5 h-5 text-[#5050ff]" />,
  };
  const testimonials = [
    {
      name: "Priya Sharma",
      text: "The thermal scanning technology provided early detection of my thyroid nodule, which allowed for timely treatment. I'm grateful for this innovative approach!",
      position: "Patient",
    },
    {
      name: "Dr. Rajesh Kumar",
      text: "As an endocrinologist, I'm impressed by the accuracy of this thermal imaging technology. It's a valuable addition to our diagnostic toolkit.",
      position: "Endocrinologist",
    },
    {
      name: "Anita Patel",
      text: "The non-invasive nature of this technology made my screening experience comfortable and stress-free. Highly recommend!",
      position: "Patient",
    },
  ];
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    help: "",
    message: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="w-full overflow-x-hidden font-sans bg-gray-50">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <header
        className="w-full bg-white py-24 relative overflow-hidden"
        id="home"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-[100px]"></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blue-100 blur-3xl opacity-50"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-indigo-100 blur-3xl opacity-30"
          ></motion.div>
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-4"
            >
              Breakthrough in Healthcare Technology
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 max-w-4xl"
            >
              Advanced <span className="text-indigo-600">Thermal Scanning</span>{" "}
              for Early Thyroid Diagnosis
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg text-gray-700 mb-8 leading-relaxed max-w-3xl"
            >
              Our AI-powered thermal imaging technology detects thyroid
              abnormalities with 94% accuracy, providing early diagnosis and
              improving treatment outcomes for patients across India.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-12 gap-12 items-center">
            {/* Left Content - Image and Floating Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="md:col-span-7 order-2 md:order-1"
            >
              <div className="relative">
                <motion.div
                  whileHover={{ rotate: 0 }}
                  initial={{ rotate: -2 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="bg-white p-3 rounded-2xl shadow-2xl relative z-20"
                >
                  <img
                    src={homeImage}
                    alt="Thyroid Thermal Scanning Technology"
                    className="rounded-xl w-full h-auto object-cover"
                  />
                </motion.div>

                {/* Left-positioned information tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl z-30 max-w-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        Non-invasive Procedure
                      </h4>
                      <p className="text-sm text-gray-600">
                        Painless and radiation-free scanning
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="absolute -top-6 -left-6 bg-white p-4 rounded-lg shadow-xl z-30 max-w-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Fast Results</h4>
                      <p className="text-sm text-gray-600">
                        Diagnosis within 24 hours
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Additional left tag for more balance */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="absolute top-1/2 -left-6 bg-white p-4 rounded-lg shadow-xl z-30 max-w-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        Easy Scheduling
                      </h4>
                      <p className="text-sm text-gray-600">
                        Book appointments online
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content - Stats and CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="md:col-span-5 flex flex-col order-1 md:order-2"
            >
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-indigo-600 text-3xl font-bold mb-1">
                    5,000+
                  </h3>
                  <p className="text-gray-600">Patients Screened</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-indigo-600 text-3xl font-bold mb-1">
                    94%
                  </h3>
                  <p className="text-gray-600">Accuracy Rate</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-indigo-600 text-3xl font-bold mb-1">
                    12
                  </h3>
                  <p className="text-gray-600">Partner Hospitals</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-indigo-600 text-3xl font-bold mb-1">
                    30min
                  </h3>
                  <p className="text-gray-600">Scan Duration</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-4 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex-1 text-center"
                >
                  Book a Scan Now
                </motion.button>
              </div>

              <div className="flex items-center gap-4 bg-indigo-50 p-4 rounded-lg">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white shadow-md overflow-hidden"
                    >
                      <img
                        src={`/api/placeholder/50/50`}
                        alt={`Patient ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-700">
                  Join <span className="font-bold text-indigo-600">5,000+</span>{" "}
                  patients who trust our technology
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Vision Section */}
      <section className="py-16 bg-gray-100 w-full">
        <div className="container font-poppins mx-auto px-4 md:px-6 max-w-6xl">
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: false, amount: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#e0e0ff] rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-[#5050ff]" />
                </div>
                <h3 className="text-2xl font-bold ml-4 text-[#18184e]">
                  Our Vision
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
              To build India’s only AI-based thyroid screening and management platform for thyroid-diseased patients

              </p>
              
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: false, amount: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#e0e0ff] rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-[#5050ff]" />
                </div>
                <h3 className="text-2xl font-bold ml-4 text-[#18184e]">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
              Revolutionize personalised thyroid health across India by 2030
              </p>
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-[#18184e] to-[#292980] rounded-bl-[10%] md:rounded-bl-[30%]">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Our Comprehensive Services
          </h2>
          <p className="text-white/80 text-center max-w-2xl mx-auto mb-12">
            We provide end-to-end support for thyroid patients with cutting-edge
            technology and personalized care
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl flex flex-col items-center text-center shadow-lg"
            >
              <div className="text-red-500 mb-4 bg-red-50 p-4 rounded-full">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-[#18184e]">
                Expert Consultation
              </h3>
              <p className="text-gray-600 text-sm">
                Connect with specialized thyroid doctors for personalized
                guidance and treatment plans
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl flex flex-col items-center text-center shadow-lg"
            >
              <div className="text-red-500 mb-4 bg-red-50 p-4 rounded-full">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-[#18184e]">
                Health Management
              </h3>
              <p className="text-gray-600 text-sm">
                Comprehensive medication tracking and lifestyle support tailored
                to thyroid conditions
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl flex flex-col items-center text-center shadow-lg"
            >
              <div className="text-red-500 mb-4 bg-red-50 p-4 rounded-full">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-[#18184e]">
                Patient Community
              </h3>
              <p className="text-gray-600 text-sm">
                Join our supportive network of thyroid warriors for shared
                experiences and mutual support
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl flex flex-col items-center text-center shadow-lg"
            >
              <div className="text-red-500 mb-4 bg-red-50 p-4 rounded-full">
                <Microscope className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-[#18184e]">
                Research Insights
              </h3>
              <p className="text-gray-600 text-sm">
                Access the latest thyroid research and health insights to stay
                informed about your condition
              </p>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <button className="bg-white text-[#18184e] hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl">
              View All Services
            </button>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 w-full">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="mb-12 text-center">
            <span className="bg-blue-100 text-[#5050ff] px-4 py-1 rounded-full text-sm font-medium">
              Our Innovative Technology
            </span>
            <h2 className="text-3xl font-bold mt-4 mb-6 text-[#18184e]">
              Revolutionary Thermal Scanning Technology
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered approach uses advanced thermal imaging to detect
              thyroid abnormalities with high precision, transforming how we
              diagnose and treat thyroid conditions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Thermometer className="w-5 h-5 text-[#5050ff]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2 text-[#18184e]">
                      Thermal Precision Mapping
                    </h3>
                    <p className="text-gray-600">
                      Our technology creates accurate temperature maps of the
                      thyroid region, detecting subtle abnormalities that might
                      be missed by conventional methods.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-5 h-5 text-[#5050ff]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2 text-[#18184e]">
                      Non-Invasive Procedure
                    </h3>
                    <p className="text-gray-600">
                      Our screening is completely painless and radiation-free,
                      making it suitable for all patients, including pregnant
                      women and children.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-5 h-5 text-[#5050ff]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2 text-[#18184e]">
                      Immediate Results
                    </h3>
                    <p className="text-gray-600">
                      Receive comprehensive analysis and detailed reports
                      immediately after your scan, eliminating lengthy wait
                      times for diagnosis.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Calendar className="w-5 h-5 text-[#5050ff]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2 text-[#18184e]">
                      Regular Monitoring
                    </h3>
                    <p className="text-gray-600">
                      Track your thyroid health over time with regular scans,
                      helping to monitor treatment effectiveness and detect
                      changes early.
                    </p>
                  </div>
                </div>
              </div>

              <button className="mt-8 bg-[#5050ff] text-white hover:bg-[#4040ee] px-6 py-3 rounded-lg font-medium transition-all shadow-md flex items-center">
                Learn About Our Technology{" "}
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: false, amount: 0.2 }}
              className="w-full"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#e0e0ff] rounded-full -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#e0e0ff] rounded-full -z-10"></div>
                <img
                  src={Throat}
                  alt="Thermal Imaging"
                  className="rounded-xl shadow-2xl w-full h-auto object-cover border-4 border-white"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <p className="ml-2 text-sm font-medium">
                      AI-Powered Analysis
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#18184e]">
            What Our Patients Say
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-500 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#e0e0ff] rounded-full flex items-center justify-center">
                    <span className="text-[#5050ff] font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-[#18184e]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-50 w-full">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <span className="bg-blue-100 text-[#5050ff] px-4 py-1 rounded-full text-sm font-medium">
                Contact Us
              </span>
              <h2 className="text-3xl font-bold mt-4 mb-6 text-[#18184e]">
                Get in Touch With Our Thyroid Specialists
              </h2>
              <p className="text-gray-600 mb-6">
                Have questions about our thyroid screening technology or
                interested in booking an appointment? Our team is here to help
                you take the first step toward better thyroid health.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    label: "Phone Number",
                    value: "+91 98765 43210",
                    icon: "phone",
                  },
                  {
                    label: "Email",
                    value: "info@thyroidhealth.in",
                    icon: "mail",
                  },
                  {
                    label: "Location",
                    value: "Bangalore, Mumbai, Delhi, Hyderabad",
                    icon: "location",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {iconMap[item.icon]} {/* Use the mapped icon */}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="font-medium text-[#18184e]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <div className="bg-white p-8 rounded-xl shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-[#18184e]">
                  Request a Consultation
                </h3>
                <form
                  className="space-y-4 bg-white p-6 rounded-lg shadow-md"
                  onSubmit={handleSubmit}
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      How can we help?
                    </label>
                    <select
                      name="help"
                      value={formData.help}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    >
                      <option value="">Select an option</option>
                      <option value="Book a thermal scan">
                        Book a thermal scan
                      </option>
                      <option value="Consult with a specialist">
                        Consult with a specialist
                      </option>
                      <option value="General inquiry">General inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your concerns"
                      className="mt-1 p-2 w-full border rounded-md"
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                      className="mr-2"
                      required
                    />
                    <label className="text-sm text-gray-700">
                      I agree to the privacy policy and terms of service
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Submit
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    We'll get back to you within 24 hours. Your information is
                    secure and will never be shared.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
