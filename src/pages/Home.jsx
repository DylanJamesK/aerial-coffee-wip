import React from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-orange-600">
      <Navbar />
      <Hero />
    </div>
  );
}
