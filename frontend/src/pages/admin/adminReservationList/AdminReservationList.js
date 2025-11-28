import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
} from "../../../redux/features/auth/authSlice";
import { fetchReservs } from "../../../redux/features/reservation/ReservationSlice";

function AdminReservationList() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { reserves } = useSelector((state) => state.reservation);

  useEffect(() => {
    dispatch(fetchReservs());
  }, [dispatch]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reserves.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(reserves.length / itemsPerPage);

  return (
    <div>
      {isLoggedIn ? (
        <div className="w-full rounded-lg shadow p-14">
          <h1 className="text-3xl font-bold text-gray-300">Reservations List</h1>

          <div className="overflow-x-auto mt-4">
            {!reserves && <p>Loading...</p>}

            {reserves.length === 0 ? (
              <p className="text-gray-400 mt-2">-- No Reservations Yet ....</p>
            ) : (
              <>
                <table className="min-w-full text-sm text-left text-gray-300">
                  <thead className="text-[11px] uppercase  bg-gray-900 ">
                    <tr>
                      <th className="px-6 py-3">S/N</th>
                      <th className="px-6 py-3">User Name</th>
                      <th className="px-6 py-3">Trip Title</th>
                      <th className="px-6 py-3">Reservation Date</th>
                      <th className="px-6 py-3">Start Date</th>
                      <th className="px-6 py-3">End Date</th>
                      <th className="px-6 py-3">Cost /Person</th>
                      <th className="px-6 py-3">No of People</th>
                      <th className="px-6 py-3">Total Cost</th>
                      <th className="px-6 py-3">Reserv Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.map((Reserv, index) => {
                      const {
                        id,
                        user,
                        trip,
                        numberOfPeople,
                        status,
                        reservationDate,
                      } = Reserv;

                      return (
                        <tr key={id} className="bg-gray-700/60 ">
                          <td className="px-3 py-2">
                            {indexOfFirstItem + index + 1}
                          </td>
                          <td className="px-3 py-2">{user.name}</td>
                          <td className="px-3 py-2">{trip.title}</td>
                          <td className="px-3 py-2">
                            {new Date(reservationDate).toLocaleDateString("en-GB")}
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
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-center mt-4 space-x-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                  >
                    Prev
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-2 rounded ${
                        currentPage === i + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </>
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

export default AdminReservationList;
