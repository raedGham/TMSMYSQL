import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectUserID } from "../../redux/features/auth/authSlice";
import Search from "../../components/search/Search";
import { confirmAlert } from "react-confirm-alert";

import {
  deleteComplaint,
  fetchComplaints,
} from "../../redux/features/complaint/complaintSlice";

function ComplaintsList() {
  const [search, setSearch] = useState("");
  const userID = useSelector(selectUserID);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { complaints, isLoading, isError } = useSelector(
    (state) => state.complaint
  );
  // Filter
  console.log(userID);

  const userComplaints = complaints.filter(
    (complaint) => complaint.userID?._id.toString() === userID?.toString()
  );
  console.log(userID);
  console.log("userComplaints:", userComplaints);

  useEffect(() => {
    dispatch(fetchComplaints());
  }, [dispatch]);

  const delCompl = async (id) => {
    await dispatch(deleteComplaint(id));
    //  navigate(-1);
  };
  const confirmDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Delete Complaint
              </h1>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Are you sure you want to delete this Complaint?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    delCompl(id);
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
      <div className="w-full rounded-lg shadow  p-14 ml-8">
        <div className="flex">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2 mr-4 pt-2">
            User Complaints
          </h1>
          <Link
            to={`/complaint/new/${userID}`}
            className="mt-1 px-4 py-2 bg-[#701414] text-white font-normal rounded-lg dark:hover:bg-[#9c4343] transition duration-200 shadow"
          >
            Add a Complaint
          </Link>

          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="overflow-x-auto">
        {!userComplaints && <p>Loading...</p>}

        {userComplaints.length === 0 ? (
          <p className=" text-gray-400 mt-2">-- No Complaints Found ...</p>
        ) : (
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-200 mt-2">
            <thead className="text-[11px] uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-200 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S/N
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
              {userComplaints.map((complaint, index) => {
                const {
                  _id,
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
                      <td className="px-3 py-2">{category}</td>
                      <td className="px-3 py-2">{status}</td>
                      <td className="px-3 py-2">
                        {" "}
                        {new Date(dateFiled).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-3 py-2">
                        {new Date(dateReviewed).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4 flex space-x-3">
                        <Link to={`/complaint/${_id}`}>
                          <FaEdit
                            size={20}
                            className="text-green-600 hover:text-green-800"
                          />
                        </Link>
                        <button onClick={() => confirmDelete(_id)}>
                          <FaTrashAlt
                            size={18}
                            className="text-red-600 hover:text-red-800"
                          />
                        </button>
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

                    {/* Row 3: response */}
                    <tr
                      key={`${_id}-complaint1`}
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
