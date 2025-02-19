import react from "react";
import logo from "../Images/logo.png"
const Footer=()=>{
    return(
        <>
         <footer className="bg-gray-900 text-white py-8">
                    <div className="container mx-auto px-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <img src={logo} height={56} width={56}/>
                                <span className="font-bold font-poppins text-3xl">ThyRight</span>
                            </div>
                            <div className="text-gray-400">
                                © 2025 ThyRight. All rights reserved.
                            </div>
                        </div>
                    </div>
                </footer>
        </>
    );
}

export default Footer;