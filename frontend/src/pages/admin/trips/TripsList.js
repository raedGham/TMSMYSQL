import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaBusAlt, FaUmbrellaBeach } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AiOutlinePicture } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  fetchTrips,
  deleteTrip,
} from "../../../redux/features/trips/tripSlice";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Search from "../../../components/search/Search";
import {
  FILTER_TRIPS,
  selectFilteredTrips,
} from "../../../redux/features/trips/filterSlice";
import ReactPaginate from "react-paginate";

const TripsList = () => {
  const [search, setSearch] = useState("");
  const filteredTrips = useSelector(selectFilteredTrips);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const delTrip = async (id) => {
    await dispatch(deleteTrip(id));
    // await dispatch(fetchTrips());
    navigate("/Main");
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
                Are you sure you want to delete this Trip?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    delTrip(id);
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

  const { trips, loading, error } = useSelector((state) => state.trip);
  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredTrips.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredTrips.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredTrips]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredTrips.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    console.log("FROM USEEFFECT:", trips);
    dispatch(FILTER_TRIPS({ trips, search }));
  }, [trips, search, dispatch]);

  return (
    <div className="w-full rounded-lg shadow  mt-12 ml-8 p-6">
      <div className="flex">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2 mr-4 pt-2">
          Trips List
        </h1>
        <Link
          to="/admin/trips/new"
          className="mt-1 px-4 py-2 bg-[#701414] text-white font-normal rounded-lg dark:hover:bg-[#9c4343] transition duration-200 shadow"
        >
          Add Trip
        </Link>

        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="overflow-x-auto">
        {!trips && <p>Loading...</p>}

        {trips.length === 0 ? (
          <p className=" text-gray-400 mt-2">
            -- No trips found, please add a trip...
          </p>
        ) : (
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-200 mt-2">
            <thead className="text-[11px] uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-200 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S/N
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  destination
                </th>
                <th scope="col" className="px-6 py-3">
                  demographic
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3">
                  End Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Price/Trip
                </th>
                <th scope="col" className="px-6 py-3">
                  Organizer
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((trip, index) => {
                const {
                  _id,
                  title,
                  destination,
                  demographic,
                  startDate,
                  endDate,
                  pricePerPerson,
                  organizerID,
                } = trip;
                return (
                  <tr
                    key={_id}
                    className="bg-white border-b dark:bg-gray-800/60 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <td className="px-3 py-2">{index + 1}</td>
                    <td className="px-3 py-2">{title}</td>
                    <td className="px-3 py-2">{destination}</td>
                    <td className="px-3 py-2">{demographic}</td>
                    <td className="px-3 py-2">
                      {" "}
                      {new Date(startDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-3 py-2">
                      {new Date(endDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-3 py-2">{pricePerPerson}</td>
                    <td className="px-3 py-2">{organizerID.name}</td>

                    <td className="px-6 py-4 flex space-x-3">
                      <Link to={`/admin/activity/${_id}`}>
                        <FaUmbrellaBeach
                          size={20}
                          className="text-yellow-600 hover:text-yellow-800"
                        />
                      </Link>

                      <Link to={`/admin/trans/${_id}`}>
                        <FaBusAlt
                          size={20}
                          className="text-blue-600 hover:text-blue-800"
                        />
                      </Link>
                      <Link to={`/admin/trips/trip-info/${_id}`}>
                        <AiOutlinePicture
                          size={20}
                          className="text-purple-600 hover:text-purple-800"
                        />
                      </Link>
                      <Link to={`/admin/trips/${_id}`}>
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
  );
};

export default TripsList;
