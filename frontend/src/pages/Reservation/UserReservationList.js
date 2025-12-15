import { useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserID,
  selectIsLoggedIn,
} from "../../redux/features/auth/authSlice";
import { fetchReservs , deleteReserv} from "../../redux/features/reservation/ReservationSlice";
import { BACKEND_URL } from "../../services/tripService";
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";


function UserReservationList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = useSelector(selectUserID);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(fetchReservs());
  }, [dispatch, isLoggedIn]);

  const { reserves } = useSelector((state) => state.reservation);

  const userReserves = reserves.filter(
    (r) => String(r.userID) === String(userID)
  );

 const delReservation = async (id) => {
    await dispatch(deleteReserv(id));    
    navigate("/userreservation");
  };

 const confirmDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Delete Trip
              </h1>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Are you sure you want to delete this Reservation?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    delReservation(id);
                    onClose();
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
      },
    });
  };


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
                <thead className="text-[11px] uppercase bg-gray-50/50 dark:bg-gray-900/60 dark:text-gray-200">
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
                      id,
                      trip,
                      numberOfPeople,
                      status,
                      reservationDate,
                    } = Reserv;

                    return (
                      <tr
                        key={id}
                        className="bg-white border-b bg-white/50 dark:bg-gray-800/60 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <td className="px-3 py-2">{index + 1}</td>
                        <td className="px-3 py-2">{trip.title}</td>
                        <td className="px-3 py-2">
                          {new Date(reservationDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td className="px-3 py-2">
                          {new Date(trip.startDate).toLocaleDateString("en-GB")}
                        </td>
                        <td className="px-3 py-2">
                          {new Date(trip.endDate).toLocaleDateString("en-GB")}
                        </td>
                        <td className="px-3 py-2">{trip.pricePerPerson}</td>
                        <td className="px-3 py-2">{numberOfPeople}</td>
                        <td className="px-3 py-2">
                          {trip.pricePerPerson * numberOfPeople}
                        </td>
                        <td className="px-3 py-2">{status}</td>
                        <td className="px-3 py-2">
                          <div className="rounded shadow-sm p-0 relative">
                            <img
                              src={`${BACKEND_URL}/${trip.thumbnail}`}
                              alt={trip.thumbnail || "trip image"}
                              className="w-auto h-32 object-cover rounded"
                            />
                          </div>
                          <div className="rounded shadow-sm p-0 relative"></div>
                        </td>
                        <td>
                         {status !== "completed"  && 
                         
                         
                             <button
                                title="Delete Reservation"
                                    onClick={() => {
                                     confirmDelete(id);
                                      }}
                              >
                             <FaTrashAlt
                               size={18}
                               className="text-red-600 hover:text-red-800"
                             />
                           </button>

                        }
                        
                          <Link
                            to={
                              status === "completed"
                                ? "#"
                                : `/payment/new/${id}`
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
