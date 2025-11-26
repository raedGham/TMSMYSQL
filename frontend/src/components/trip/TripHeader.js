import { useEffect } from "react";
import { getTrip, selectTrip } from "../../redux/features/trips/tripSlice";
import { useSelector, useDispatch } from "react-redux";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function TripHeader({ tripID }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrip(tripID));
  }, [dispatch, tripID]);
  const trip = useSelector(selectTrip);

  const {
    title,
    destination,
    demographic,
    startDate,
    endDate,
    pricePerPerson,
    organizerID,
    thumbnail,
  } = trip || {}; // safe destructure

  return (
    <section className="m-12 mb-0 text-white space-y-0">
      {trip && (
        <>
          <header className="bg-gray-800/40 p-8 rounded-xl shadow-lg space-y-2">
            <h1 className="text-3xl font-semibold tracking-wide">{title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_0.7fr] gap-6 text-lg items-start">
              {/* Left 2 columns: trip info */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p>
                  <span className="text-gray-400">Destination:</span>{" "}
                  {destination}
                </p>
                <p>
                  <span className="text-gray-400">Demographic:</span>{" "}
                  {demographic}
                </p>
                <p>
                  <span className="text-gray-400">Start Date:</span>{" "}
                  {new Date(startDate).toLocaleDateString("en-GB")}
                </p>
                <p>
                  <span className="text-gray-400">End Date:</span>{" "}
                  {new Date(endDate).toLocaleDateString("en-GB")}
                </p>
                <p>
                  <span className="text-gray-400">Price / Person:</span>{" "}
                  {pricePerPerson}
                </p>
                <p>
                  <span className="text-gray-400">Organizer:</span>{" "}
                  {organizerID?.name}
                </p>
              </div>

              {/* Third column: thumbnail */}
              <div className="flex justify-center items-center">
                <img
                  src={`${BACKEND_URL}/${thumbnail}`}
                  alt="Thumbnail"
                  className="w-48 h-32 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </header>
        </>
      )}
    </section>
  );
}

export default TripHeader;
