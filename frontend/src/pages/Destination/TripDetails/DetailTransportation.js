import React from "react";

function DetailTransportation({ tripTranses }) {
  return (
    <div className="">
      <div className="w-full rounded-lg shadow  p-14">
        <div className="flex">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2 mr-4 pt-2">
            Transportation
          </h1>
        </div>
        <div className="overflow-x-auto">
          {!tripTranses && <p>Loading...</p>}

          {tripTranses.length === 0 ? (
            <p className=" text-gray-400 mt-2">
              -- No Transportation found, please add a trip...
            </p>
          ) : (
            <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-200 mt-2">
              <thead className="text-[11px] uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-200 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S/N
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Arrival Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Departure Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Arrival Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Depart. Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cost /Person
                  </th>
                </tr>
              </thead>
              <tbody>
                {tripTranses.map((trans, index) => {
                  const {
                    _id,
                    type,
                    arrivalLocation,
                    departureLocation,
                    arrivalDate,
                    departureDate,
                    duration,
                    costPerTrip,
                  } = trans;
                  return (
                    <tr
                      key={_id}
                      className="bg-white border-b dark:bg-gray-800/60 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <td className="px-3 py-2">{index + 1}</td>
                      <td className="px-3 py-2">{type}</td>
                      <td className="px-3 py-2">{arrivalLocation}</td>
                      <td className="px-3 py-2">{departureLocation}</td>
                      <td className="px-3 py-2">
                        {new Date(arrivalDate).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-3 py-2">
                        {new Date(departureDate).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-3 py-2">{duration}</td>
                      <td className="px-3 py-2">{costPerTrip}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailTransportation;
