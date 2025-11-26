import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import Search from "../../../components/search/Search";

import { fetchComplaints } from "../../../redux/features/complaint/complaintSlice";
import {
  FILTER_COMPLAINTS,
  selectFilteredComplaints,
} from "../../../redux/features/complaint/ComplaintFilterSlice";

function ComplaintsList() {
  const [search, setSearch] = useState("");
  const filteredComplaints = useSelector(selectFilteredComplaints);
  const dispatch = useDispatch();

  const { complaints, isLoading, isError } = useSelector(
    (state) => state.complaint
  );

  useEffect(() => {
    dispatch(fetchComplaints());
  }, [dispatch]);

  useEffect(() => {
    dispatch(FILTER_COMPLAINTS({ complaints, search }));
  }, [complaints, search, dispatch]);
  return (
    <div className="">
      <div className="w-full rounded-lg shadow  p-14">
        <div className="flex">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2 mr-4 pt-2">
            Complaints Responses
          </h1>

          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="overflow-x-auto">
        {!filteredComplaints && <p>Loading...</p>}

        {filteredComplaints.length === 0 ? (
          <p className=" text-gray-400 mt-2">-- No Complaints Found ...</p>
        ) : (
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-200 mt-2">
            <thead className="text-[11px] uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-200 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S/N
                </th>
                <th scope="col" className="px-6 py-3">
                  User
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Date Filed
                </th>
                <th scope="col" className="px-6 py-3">
                  Date Reviewed
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint, index) => {
                const {
                  _id,
                  userID,
                  category,
                  status,
                  complaintText,
                  dateFiled,
                  dateReviewed,
                  responseText,
                } = complaint;

                return (
                  <>
                    {/* Row 1: regular fields */}
                    <tr
                      key={`${_id}-main`}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <td className="px-3 py-2">{index + 1}</td>
                      <td className="px-3 py-2">{userID.name}</td>
                      <td className="px-3 py-2">{category}</td>
                      <td className="px-3 py-2">{status}</td>
                      <td className="px-3 py-2">
                        {new Date(dateFiled).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-3 py-2">
                        {new Date(dateReviewed).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4 flex space-x-3">
                        <Link
                          to={`/admin/complaints/respond/${_id}`}
                          className="mt-1 ml-12 px-12 py-2   bg-[#701414] text-white font-normal rounded-lg dark:hover:bg-[#9c4343] transition duration-200 shadow"
                        >
                          Respond
                        </Link>
                      </td>
                    </tr>

                    {/* Row 2: complaint text full width */}
                    <tr
                      key={`${_id}-complaint`}
                      className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700"
                    >
                      <td
                        colSpan={5}
                        className="px-6 py-3 text-gray-700 dark:text-gray-300 italic"
                      >
                        <p1> Complaint</p1>
                        <br />
                        {complaintText}
                      </td>
                    </tr>

                    {/* Row 3: response text */}
                    <tr
                      key={`${_id}-complaint`}
                      className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700"
                    >
                      <td
                        colSpan={5}
                        className="px-6 py-3 text-gray-700 dark:text-gray-300 italic"
                      >
                        <p1> Supervisor Response</p1>
                        <br />
                        {responseText}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ComplaintsList;
