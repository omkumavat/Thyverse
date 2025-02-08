import React from 'react';
import  logo from '../Images/logo.png'
import { Building2, Phone, Users,X,Menu,Quote, Calendar, MapPin, Microscope, ThermometerSun, Brain,Thermometer, Heart } from 'lucide-react';
import { useState } from 'react';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
function About() {
    const founders = [
        {
          name: "Dr. Sarah Mitchell",
          role: "Chief Executive Officer",
          image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
          testimonial: "Our mission at Thyright is to revolutionize thyroid disease diagnosis. By combining cutting-edge thermography with AI, we're making healthcare more accessible and efficient than ever before.",
        },
        {
          name: "Dr. James Wilson",
          role: "Chief Technology Officer",
          image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
          testimonial: "Technology should serve humanity. At Thyright, we're developing AI solutions that not only diagnose but also help predict and manage thyroid conditions with unprecedented accuracy.",
        },
        {
          name: "Dr. Emily Chen",
          role: "Chief Operations Officer",
          image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400",
          testimonial: "Our innovative approach to thyroid screening is changing lives. By making the process non-invasive and accessible, we're breaking down barriers to early detection and treatment.",
        },
      ];

  const specialties = [
    { icon: <Brain className="w-8 h-8" />, name: "AI/ML" },
    { icon: <Microscope className="w-8 h-8" />, name: "Medical Diagnostics" },
    { icon: <ThermometerSun className="w-8 h-8" />, name: "Thermal Imaging" },
    { icon: <Heart className="w-8 h-8" />, name: "Digital Health" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <NavBar/>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-400 text-white py-20">
        <div className="container mx-auto px-12 mt-10">
          <h1 className="text-5xl font-bold mb-6">About Thyright</h1>
          <p className="text-xl max-w-3xl">
            Creating innovative solutions for thyroid disease screening and diagnosis through advanced thermography and AI.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-16 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-orange-200">
          <h2 className="text-4xl font-bold text-orange-600 mb-6 relative">
            Our Mission
            <span className="absolute bottom-0 left-0 w-20 h-1 bg-orange-400 transform origin-left hover:scale-x-150 transition-transform duration-300"></span>
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At Thyright, we are creating a one-stop solution for screening and diagnosing thyroid diseases. With this we aim to effectively predict, diagnose and manage thyroid conditions across all age groups. Our solution involves an innovative technology of Thermography - a screening technique used to detect heat patterns. It is radiation-free, contactless, non-invasive and non-traumatic.
          </p>
        </div>

        {/* Company Info with 3D Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { icon: <Building2 className="w-8 h-8" />, title: "Company Size", value: "2-10 employees" },
            { icon: <Phone className="w-8 h-8" />, title: "Contact", value: "+91 7875059509" },
            { icon: <MapPin className="w-8 h-8" />, title: "Location", value: "Pune, Maharashtra" },
            { icon: <Calendar className="w-8 h-8" />, title: "Founded", value: "2023" },
          ].map((item, index) => (
            <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300">
              <div className="text-orange-500 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Specialties with Floating Cards */}
        <div className="mb-7">
          <h2 className="text-4xl font-bold text-orange-600 mb-10 text-center">
            Our Specialties
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialties.map((specialty, index) => (
              <div key={index} 
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 hover:bg-gradient-to-br hover:from-orange-50 hover:to-white"
                style={{
                  animation: `float ${3 + index * 0.5}s ease-in-out infinite alternate`
                }}
              >
                <div className="text-orange-500 mb-6 transform group-hover:scale-125 transition-transform duration-300 flex justify-center">
                  {specialty.icon}
                </div>
                <h3 className="font-semibold text-center text-lg group-hover:text-orange-600 transition-colors duration-300">
                  {specialty.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 py-24">
          <h2 className="text-5xl font-bold text-orange-600 mb-16 text-center relative">
            Meet Our Leadership
            <div className="absolute w-32 h-1 bg-orange-400 bottom-0 left-1/2 transform -translate-x-1/2"></div>
          </h2>
          
          <div className="space-y-24">
            {founders.map((founder, index) => (
              <div 
                key={index}
                className="group perspective-1000"
              >
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}>
                  {/* Photo Card */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative group rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-orange-200/50">
                      <img 
                        src={founder.image} 
                        alt={founder.name}
                        className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-3xl font-bold text-white mb-2">{founder.name}</h3>
                        <p className="text-orange-300 text-xl">{founder.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Card */}
                  <div className="w-full lg:w-1/2">
                    <div 
                      className={`bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 
                        ${index % 2 === 0 ? 'hover:rotate-2' : 'hover:-rotate-2'}
                        relative overflow-hidden group`}
                    >
                      <div className="absolute top-4 left-4 text-orange-400/20 transform scale-150 group-hover:scale-[2] transition-transform duration-500">
                        <Quote size={48} />
                      </div>
                      <div className="relative z-10">
                        <p className="text-xl text-gray-700 leading-relaxed mb-6 italic">
                          "{founder.testimonial}"
                        </p>
                        <div className="flex items-center">
                          <div className="h-1 w-12 bg-orange-400 mr-4"></div>
                          <div>
                            <h4 className="font-semibold text-lg text-orange-600">{founder.name}</h4>
                            <p className="text-gray-600">{founder.role}</p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }
      `}</style>

      <Footer/>
    </div>
  );
}

export default About;