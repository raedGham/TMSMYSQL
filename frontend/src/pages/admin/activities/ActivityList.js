import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import TripHeader from "../../../components/trip/TripHeader";
import {
  fetchActivities,
  deleteActivity,
} from "../../../redux/features/activity/ActivitySlice";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Search from "../../../components/search/Search";
import {
  FILTER_ACTIVITIES,
  selectFilteredActivities,
} from "../../../redux/features/activity/ActivityFilterSlice";
import ReactPaginate from "react-paginate";

const ActivitiesList = () => {
  const { tripID } = useParams();
  console.log(tripID);
  const [search, setSearch] = useState("");
  const filteredActivities = useSelector(selectFilteredActivities);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const delActivity = async (id) => {
    await dispatch(deleteActivity(id));
    // await dispatch(fetchActivities());
    navigate("/Main");
  };

  const confirmDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Delete Activity
              </h1>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Are you sure you want to delete this Activity?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    delActivity(id);
                    onClose();
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 activityition"
                >
                  Delete
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 activityition"
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

  const { activities, loading, error } = useSelector((state) => state.activity);
  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredActivities.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredActivities.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredActivities]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % filteredActivities.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_ACTIVITIES({ activities, search }));
  }, [activities, search, dispatch]);

  return (
    <>
      <TripHeader tripID={tripID} />
      <div className="w-full rounded-lg shadow  p-14">
        <div className="flex">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2 mr-4 pt-2">
            Activities List
          </h1>
          <Link
            to={`/admin/activity/new/${tripID}`}
            className="mt-1 px-4 py-2 bg-[#701414] text-white font-normal rounded-lg dark:hover:bg-[#9c4343] activityition duration-200 shadow"
          >
            Add Activity
          </Link>

          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="overflow-x-auto">
          {!activities && <p>Loading...</p>}

          {activities.length === 0 ? (
            <p className=" text-gray-400 mt-2">
              -- No activities found, please add a trip...
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

                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((activity, index) => {
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

                      <td className="px-6 py-4 flex space-x-3">
                        <Link to={`/admin/activity/edit/${_id}`}>
                          <FaEdit
                            size={20}
                            className="text-green-600 hover:text-green-800"
                          />
                        </Link>
                        <button
                          onClick={() => {
                            confirmDelete(_id);
                          }}
                        >
                          <FaTrashAlt
                            size={18}
                            className="text-red-600 hover:text-red-800"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="flex items-center justify-center space-x-1 mt-4"
          pageClassName="px-2 py-0.5 border border-gray-600 rounded text-gray-300 hover:bg-gray-700"
          activeClassName="bg-blue-600 text-white"
          previousClassName="px-2 py-0.5 border border-gray-600 rounded text-gray-300 hover:bg-gray-700"
          nextClassName="px-2 py-0.5 border border-gray-600 rounded text-gray-300 hover:bg-gray-700"
          breakClassName="px-2 py-0.5 text-gray-400"
          disabledClassName="opacity-40 cursor-not-allowed"
        />
      </div>
    </>
  );
};

export default ActivitiesList;
