import React from "react";
import logo from '../assets/AerialLogo.svg';

export default function Navbar() {
    return (
      <nav className="z-0 h-full p-12 flex justify-between items-center">
        <div className="pl-8 logo">
            <img src={logo} alt='Aerial Coffee Co Logo' width='100%'/>
        </div>
      </nav>
    );
  }

  //        <ul className="flex space-x-10">
  //          <li><a href="#" className="text-gray-900 hover:text-blue-900">Location</a></li>
  //          <li><a href="#" className="text-red-900 hover:text-blue-900">Menu</a></li>
  //        </ul>