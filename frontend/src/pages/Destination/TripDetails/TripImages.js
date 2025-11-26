import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTripImages } from "../../../redux/features/trips/tripImagesSlice";
import { BACKEND_URL } from "../../../services/tripService";
function TripImages() {
  const dispatch = useDispatch();
  const { tripId } = useParams();
  const { images, isLoading, isError } = useSelector(
    (state) => state.tripImages
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(tripId);

  useEffect(() => {
    dispatch(fetchTripImages(tripId));
  }, [dispatch, tripId]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  console.log("images:", images);
  return (
    <div className="m-[50px] text-white">
      <h2 className="text-2xl font-semibold mb-6">Trip Images</h2>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading images</p>}

      {images?.length > 0 ? (
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-lg shadow-lg">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img) => (
              <img
                key={img._id}
                src={`${BACKEND_URL}/${img.path}`}
                alt="Trip"
                className="w-full flex-shrink-0 object-cover h-[600PX]"
              />
            ))}
          </div>

          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
          >
            ‹
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
          >
            ›
          </button>

          {/* Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === idx ? "bg-white" : "bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </div>
      ) : (
        <p>No images found...</p>
      )}
    </div>
  );
}

export default TripImages;
