import Navbar from "../navbar/navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import heroImg from "../../assets/welcome.jpg";
import heroImgLight from "../../assets/welcomeLight.jpg";

export default function Layout({ children }) {
  const theme = useSelector((state) => state.theme.mode);
  const bg = theme === "dark" ? heroImg : heroImgLight;

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <img
        src={bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      {theme === "dark" ? (
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40 z-10"></div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/50 to-black/40 z-10"></div>
      )}
      <div className="relative z-20">
        <Navbar />
        {children}
      </div>
      <main className="relative z-20">
        <Outlet />
      </main>
    </div>
  );
}
