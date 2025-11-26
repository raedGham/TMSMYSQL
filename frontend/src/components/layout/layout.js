import Navbar from "../navbar/navbar";
import heroImg from "../../assets/welcome.jpg"; // your background image
import { Outlet } from "react-router-dom";

export default function Layout({children}) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      {/* Background Image */}
      <img
        src={heroImg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {/* SAME GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40 z-10"></div>

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar />  
        {children}      
      </div>

      {/* Page Content */}
      <main className="relative z-20">
        <Outlet />
      </main>
    </div>
  );
}
