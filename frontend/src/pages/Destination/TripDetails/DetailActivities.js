function DetailActivities({ tripActivities }) {
  return (
    <div className="">
      <div className="w-full rounded-lg shadow  p-14">
        <div className="flex">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2 mr-4 pt-2">
            Activities
          </h1>
        </div>
        <div className="overflow-x-auto">
          {!tripActivities && <p>Loading...</p>}

          {tripActivities.length === 0 ? (
            <p className=" text-gray-400 mt-2">
              -- No Activities found, please add a trip...
            </p>
          ) : (
            <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-200 mt-2">
              <thead className="text-[11px] uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-200 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S/N
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Finish Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Capacity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cost /Person
                  </th>
                </tr>
              </thead>
              <tbody>
                {tripActivities.map((activity, index) => {
                  const {
                    _id,
                    name,
                    description,
                    startDate,
                    finishDate,
                    capacity,
                    costPerPerson,
                  } = activity;
                  return (
                    <tr
                      key={_id}
                      className="bg-white border-b dark:bg-gray-800/60 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <td className="px-3 py-2">{index + 1}</td>
                      <td className="px-3 py-2">{name}</td>
                      <td className="px-3 py-2">{description}</td>
                      <td className="px-3 py-2">
                        {new Date(startDate).toLocaleDateString("en-GB")}
                      </td>

                      <td className="px-3 py-2">
                        {new Date(finishDate).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-3 py-2">{capacity}</td>
                      <td className="px-3 py-2">{costPerPerson}</td>
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

export default DetailActivities;
