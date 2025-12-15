import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectIsLoggedIn,   selectUserID,  selectType, } from "../../../redux/features/auth/authSlice";
import { fetchPayments } from "../../../redux/features/payment/paymentSlice";

function PaymentsList() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userID = useSelector(selectUserID)
  const userType = useSelector(selectType)

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // change as needed

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);


  const { payments } = useSelector((state) => state.payment);

  const organizerPayments =
  userType === "superuser"
    ? payments
    : payments.filter(
        (r) => String(r.reservation.trip.organizer.id) === String(userID)
      );
  // --------------------------
  // Pagination Logic
  // --------------------------
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = organizerPayments?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = organizerPayments ? Math.ceil(organizerPayments.length / itemsPerPage) : 1;

  // --------------------------
  // Pagination Buttons
  // --------------------------
  const Pagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);

    return (
      <div className="flex items-center justify-center space-x-1 mt-4">
        {/* Previous */}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            px-3 py-1 rounded-md text-sm font-medium border
            ${currentPage === 1
              ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`
              px-3 py-1 rounded-md text-sm font-medium border
              ${currentPage === page
                ? "bg-indigo-600 border-indigo-600 text-white"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            px-3 py-1 rounded-md text-sm font-medium border
            ${currentPage === totalPages
              ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
        >
          Next
        </button>
      </div>
    );
  };

  // --------------------------
  // Render
  // --------------------------
  return (
    <div>
      {isLoggedIn ? (
        <div className="w-full rounded-lg shadow p-14 mt-7">
          <div className="flex">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2 mr-4 pt-2">
              Payments List
            </h1>
          </div>

          <div className="overflow-x-auto">
            {!payments && <p>Loading...</p>}

            {payments?.length === 0 ? (
              <p className="text-gray-400 mt-2">
                -- You didn't pay anything yet ....
              </p>
            ) : (
              <>
                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-200 mt-2">
                  <thead className="text-[11px] uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-200">
                    <tr>
                      <th className="px-6 py-3">S/N</th>
                      <th className="px-6 py-3">User Name</th>
                      <th className="px-6 py-3">Trip Title</th>
                      <th className="px-6 py-3">Reservation Date</th>
                      <th className="px-6 py-3">Payment Date</th>
                      <th className="px-6 py-3">Amount Paid</th>
                      <th className="px-6 py-3">Payment Method</th>
                      <th className="px-6 py-3">Trip Organizer</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.map((payment, index) => {
                      const {
                        id,
                        reservation,
                        paymentDate,
                        amount,
                        paymentMethod,
                      } = payment;

                      return (
                        <tr
                          key={id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          <td className="px-3 py-2">{indexOfFirstItem + index + 1}</td>
                          <td className="px-3 py-2">{reservation.user.name}</td>
                          <td className="px-3 py-2">{reservation.trip.title}</td>
                          <td className="px-3 py-2">
                            {new Date(reservation.reservationDate).toLocaleDateString("en-GB")}
                          </td>
                          <td className="px-3 py-2">
                            {new Date(paymentDate).toLocaleDateString("en-GB")}
                          </td>
                          <td className="px-3 py-2">{amount}</td>
                          <td className="px-3 py-2">{paymentMethod}</td>
                           <td className="px-3 py-2">{reservation.trip?.organizer?.name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Pagination */}
                <Pagination />
              </>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 font-medium m-[80px]">
          Please log in to view your payments.
        </p>
      )}
    </div>
  );
}

export default PaymentsList;

