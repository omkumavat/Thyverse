import { Heart } from 'lucide-react';
import logo from "../../Images/logo.png"
export const BrandingPanel = () => (
  <div className="bg-navy p-12 font-poppins text-white md:w-2/5 flex flex-col justify-center items-center relative overflow-hidden h-screen md:h-auto" 
       style={{ backgroundColor: '#1B3168' }}>
    <div className="relative z-10 flex flex-col justify-center items-center">
      <div className="flex  items-center gap-3 mb-10 ">
        <img src={logo} className="w-10 h-10 text-orange-500" />
        <span className="text-3xl font-bold">Thyverse</span>
      </div>
      <p className="text-center text-gray-300 mb-8 text-lg">
        Your health is our priority. Join us in revolutionizing healthcare access and management.
      </p>
      <img
        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=500"
        alt="Healthcare"
        className="rounded-lg w-full max-w-md shadow-lg transform transition-transform hover:scale-105"
      />
    </div>
    
    {/* Decorative elements */}
    <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-orange-500/20 rounded-full"></div>
    <div className="absolute -top-8 -right-8 w-24 h-24 bg-orange-500/10 rounded-full"></div>
  </div>
);