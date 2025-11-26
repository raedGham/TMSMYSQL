import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrips } from "../../redux/features/trips/tripSlice";
import { BACKEND_URL } from "../../services/tripService";
import { Link } from "react-router-dom";

function Destination() {
  const dispatch = useDispatch();

  const { trips, isLoading, isError, message } = useSelector(
    (state) => state.trip
  );

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-500">
        Loading destinations...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-red-500">
        {message || "Failed to load destinations"}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-300 my-10">
        Find Your Best Destination
      </h2>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {trips.map((trip) => (
          <Link
            to={`/details/${trip._id}`} // 👈 navigate to TripDetails page
            key={trip._id}
            className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300"
          >
            {/* Trip Image */}
            <img
              src={`${BACKEND_URL}/${trip.thumbnail}` || "/default-trip.jpg"}
              alt={trip.title}
              className="w-full h-64 object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all"></div>

            {/* Trip Info */}
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm italic text-gray-300">{trip.destination}</p>
              <h3 className="text-xl font-semibold">{trip.title}</h3>
              <p className="text-sm flex items-center gap-1 mt-1">
                <span className="text-gray-300">{trip.demographic}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Destination;
