import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";

import { fetchPayments } from "../../../redux/features/payment/paymentSlice";

function PaymentsList() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const { payments } = useSelector((state) => state.payment);

  console.log(payments);
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
                  </tr>
                </thead>

                <tbody>
                  {payments?.map((payment, index) => {
                    const {
                      _id,
                      reservationID,
                      paymentDate,
                      amount,
                      paymentMethod,
                    } = payment;

                    // Safely extract nested data
                    const trip = reservationID?.tripID;
                    const title = trip?.title;
                    const userID = reservationID?.userID;
                    const username = userID?.name;
                    const reservationDate = reservationID?.reservationDate;

                    return (
                      <tr
                        key={_id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <td className="px-3 py-2">{index + 1}</td>
                        <td className="px-3 py-2">{username}</td>
                        <td className="px-3 py-2">{title}</td>
                        <td className="px-3 py-2">
                          {new Date(reservationDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td className="px-3 py-2">
                          {new Date(paymentDate).toLocaleDateString("en-GB")}
                        </td>
                        <td className="px-3 py-2">{amount}</td>
                        <td className="px-3 py-2">{paymentMethod}</td>
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
          Please log in to view your payments.
        </p>
      )}
    </div>
  );
}

export default PaymentsList;
