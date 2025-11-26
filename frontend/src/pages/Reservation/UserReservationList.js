import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserID,
  selectIsLoggedIn,
} from "../../redux/features/auth/authSlice";
import { fetchReservs } from "../../redux/features/reservation/ReservationSlice";
import { BACKEND_URL } from "../../services/tripService";

function UserReservationList() {
  const dispatch = useDispatch();
  const userID = useSelector(selectUserID);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(fetchReservs());
  }, [dispatch]);

  const { reserves } = useSelector((state) => state.reservation);
  const userReserves = reserves.filter((r) => r.userID._id === userID);

  return (
    <div className="">
      {isLoggedIn ? (
        <div className="w-full rounded-lg shadow p-14">
          <div className="flex">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2 mr-4 pt-2">
              My Reservations
            </h1>
          </div>

          <div className="overflow-x-auto">
            {!userReserves && <p>Loading...</p>}

            {userReserves.length === 0 ? (
              <p className="text-gray-400 mt-2">
                -- You have No Reservations Yet ....
              </p>
            ) : (
              <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-200 mt-2">
                <thead className="text-[11px] uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-200">
                  <tr>
                    <th className="px-6 py-3">S/N</th>
                    <th className="px-6 py-3">Trip Title</th>
                    <th className="px-6 py-3">Reservation Date</th>
                    <th className="px-6 py-3">Start Date</th>
                    <th className="px-6 py-3">End Date</th>
                    <th className="px-6 py-3">Cost /Person</th>
                    <th className="px-6 py-3">No of People</th>
                    <th className="px-6 py-3">Total Cost</th>
                    <th className="px-6 py-3">Reserv Status</th>
                    <th className="px-6 py-3">Thumbnail</th>
                    <th className="p-[80px] py-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {userReserves.map((Reserv, index) => {
                    const {
                      _id,
                      tripID,
                      numberOfPeople,
                      status,
                      reservationDate,
                    } = Reserv;

                    return (
                      <tr
                        key={_id}
                        className="bg-white border-b dark:bg-gray-800/60 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <td className="px-3 py-2">{index + 1}</td>
                        <td className="px-3 py-2">{tripID.title}</td>
                        <td className="px-3 py-2">
                          {new Date(reservationDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td className="px-3 py-2">
                          {new Date(tripID.startDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td className="px-3 py-2">
                          {new Date(tripID.endDate).toLocaleDateString("en-GB")}
                        </td>
                        <td className="px-3 py-2">{tripID.pricePerPerson}</td>
                        <td className="px-3 py-2">{numberOfPeople}</td>
                        <td className="px-3 py-2">
                          {tripID.pricePerPerson * numberOfPeople}
                        </td>
                        <td className="px-3 py-2">{status}</td>
                        <td className="px-3 py-2">
                          <div className="rounded shadow-sm p-0 relative">
                            <img
                              src={`${BACKEND_URL}/${tripID.thumbnail}`}
                              alt={tripID.thumbnail || "trip image"}
                              className="w-auto h-32 object-cover rounded"
                            />
                          </div>
                          <div className="rounded shadow-sm p-0 relative"></div>
                        </td>
                        <td>
                          <Link
                            to={
                              status === "completed"
                                ? "#"
                                : `/payment/new/${_id}`
                            }
                            onClick={(e) =>
                              status === "completed" && e.preventDefault()
                            }
                            className={`mt-1 ml-12 px-12 py-2 rounded-lg transition duration-200 shadow
                            ${
                              status === "completed"
                                ? "bg-gray-400 cursor-not-allowed text-gray-700"
                                : "bg-[#701414] text-white dark:hover:bg-[#9c4343]"
                            }
                          `}
                          >
                            Pay
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 font-medium m-[80px]">
          Please log in to view your reservations.
        </p>
      )}
    </div>
  );
}

export default UserReservationList;
