import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTrip } from "../../../redux/features/trips/tripSlice";
import { fetchTranses } from "../../../redux/features/transes/transSlice";
import { fetchActivities } from "../../../redux/features/activity/ActivitySlice";
import { BACKEND_URL } from "../../../services/tripService";
import DetailActivities from "../TripDetails/DetailActivities";
import DetailTransportation from "../TripDetails/DetailTransportation";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import Feedback from "../Feedback";
import axios from "axios";
import { selectUserID } from "../../../redux/features/auth/authSlice";

//import RateTrip from "./RateTrip";

function TripDetails() {
  const [reserved, setReserved] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userID = useSelector(selectUserID);

  const { trip, isLoading, isError, message } = useSelector(
    (state) => state.trip
  );
  const { transes } = useSelector((state) => state.trans);
  const tripTranses = transes.filter((t) => t.tripID === id);

  const { activities } = useSelector((state) => state.activity);
  const tripActivities = activities.filter((t) => t.tripID === trip._id);

  useEffect(() => {
    dispatch(getTrip(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchTranses());
    dispatch(fetchActivities());
  }, [dispatch, trip]);

  useEffect(() => {
    const fetchStatus = async () => {
      console.log("id", id);
      console.log("userID", userID);

      const res = await axios.get(
        `${BACKEND_URL}/api/trips/check/${id}/${userID}`
      );
      setReserved(res.data.reserved);
    };

    fetchStatus();
  }, [id, userID]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading trip details...
      </div>
    );
  }

  if (isError || !trip) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        {message || "Trip not found"}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-[20px] px-6 py-12 text-gray-900 dark:text-white">
      {/* Header */}
      <p className="text-4xl font-bold mb-8">Your Journey Starts Here</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Left side (trip info) */}
        <div className="md:col-span-1 space-y-8 leading-relaxed">
          <h1 className="text-4xl font-bold mt-[40px]">{trip.title}</h1>

          <p className="text-gray-300 text-lg leading-8">{trip.details}</p>

          <div className="mt-6 space-y-3 text-lg">
            <div className="flex">
              <span className="text-gray-500 w-40">Destination:</span>
              <span>{trip.destination}</span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-40">Demographic:</span>
              <span>{trip.demographic}</span>
            </div>
            {trip.startDate && (
              <div className="flex">
                <span className="text-gray-500 w-40">Start Date:</span>
                <span>{new Date(trip.startDate).toLocaleDateString()}</span>
              </div>
            )}
            {trip.endDate && (
              <div className="flex">
                <span className="text-gray-500 w-40">End Date:</span>
                <span>{new Date(trip.endDate).toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex">
              <span className="text-gray-500 w-40">Price/Person:</span>
              <span>${trip.pricePerPerson}</span>
            </div>
          </div>
          <div className="mt-10">
            <Link
              to={`/trip/images/${trip._id}`}
              className="mt-12 px-4 py-2 bg-[#701414] text-white font-normal rounded-lg dark:hover:bg-[#9c4343] activityition duration-200 shadow"
            >
              view Images
            </Link>
          </div>
        </div>

        <div className="md:col-span-2">
          <img
            src={`${BACKEND_URL}/${trip.thumbnail}`}
            alt={trip.title}
            className="w-full h-[500px] rounded-2xl shadow-xl object-cover"
          />
        </div>
      </div>

      {/* Activities Section */}

      <DetailActivities tripActivities={tripActivities} />

      {/* Transportation Section */}
      <DetailTransportation tripTranses={tripTranses} />
      {isLoggedIn && (
        <>
          <div>
            <Link
              to={reserved ? "#" : `/reservation/${trip._id}`}
              onClick={(e) => reserved && e.preventDefault()}
              className={`mt-1 ml-12 px-4 py-2 text-white font-normal rounded-lg shadow transition duration-200
              ${
                reserved
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#701414] dark:hover:bg-[#9c4343]"
              }
                                                           `}
            >
              {reserved ? "Already Reserved" : "Reserve Trip"}
            </Link>
          </div>
          <Feedback tripID={trip._id} userID={userID} />
        </>
      )}
    </div>
  );
}

export default TripDetails;
