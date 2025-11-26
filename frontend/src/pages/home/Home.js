import { Link } from "react-router-dom";

import raoucheImg from "../../assets/Raouche.jpg";

const Home = () => {
  return (
     <div className="relative w-full h-screen overflow-hidden">
   
       
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col md:flex-row justify-center items-center px-6 md:px-20 gap-10">
        
        {/* Left Text Section */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-8xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
           Travel Across <br className="hidden md:block" />
           Lebanon
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md">
            Explore the best beautiful tourist spots in Lebanon and see Lebanon on all your amazing adventures
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-lg font-medium shadow-md transition"
            >
              Register Now
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 text-white bg-gray-900 hover:bg-gray-800 rounded-lg text-lg font-medium shadow-md transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right Image Section */}

        <img
          src={raoucheImg}
          alt="Rouche"
          className="rounded-2xl shadow-2xl w-full max-w-[600px] md:max-w-[500px] lg:max-w-[850px] object-cover"
        />

      </div>
      </div>  
  );
};

export default Home;
