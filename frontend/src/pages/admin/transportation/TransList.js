import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  fetchTranses,
  deleteTrans,
} from "../../../redux/features/transes/transSlice";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Search from "../../../components/search/Search";
import {
  FILTER_TRANSES,
  selectFilteredTranses,
} from "../../../redux/features/transes/transfilterSlice";
import ReactPaginate from "react-paginate";
import TripHeader from "../../../components/trip/TripHeader";

const TransesList = () => {
  const { tripID } = useParams();
  const [search, setSearch] = useState("");
  const filteredTranses = useSelector(selectFilteredTranses);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const delTrans = async (id) => {
    await dispatch(deleteTrans(id));
    // await dispatch(fetchTranses());
    navigate("/Main");
  };

  const confirmDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Delete Trans
              </h1>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Are you sure you want to delete this Trans?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    delTrans(id);
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

  const { transes, loading, error } = useSelector((state) => state.trans);
  useEffect(() => {
    dispatch(fetchTranses());
  }, [dispatch]);

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredTranses.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredTranses.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredTranses]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredTranses.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    console.log("FROM USEEFFECT:", transes);
    dispatch(FILTER_TRANSES({ transes, search }));
  }, [transes, search, dispatch]);

  return (
    <>
      <TripHeader tripID={tripID} />
      <div className="w-full rounded-lg shadow  mt-5 ml-8 p-6">
        <div className="flex">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2 mr-4 pt-2">
            Transportation List
          </h1>
          <Link
            to={`/admin/trans/new/${tripID}`}
            className="mt-1 px-4 py-2 bg-[#701414] text-white font-normal rounded-lg dark:hover:bg-[#9c4343] transition duration-200 shadow"
          >
            Add Trans
          </Link>

          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="overflow-x-auto">
          {!transes && <p>Loading...</p>}

          {transes.length === 0 ? (
            <p className=" text-gray-400 mt-2">
              -- No transportations found, please add a one...
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
                    Arrival Loc
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Depart. Loc
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
                    Cost/Trip
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
                    type,
                    arrivalLocation,
                    departureLocation,
                    arrivalDate,
                    departureDate,
                    duration,
                    costPerTrip,
                  } = trip;
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
                        {" "}
                        {new Date(arrivalDate).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-3 py-2">
                        {new Date(departureDate).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-3 py-2">{duration}</td>
                      <td className="px-3 py-2">{costPerTrip}</td>

                      <td className="px-6 py-4 flex space-x-3">
                        <Link to={`/admin/transes/trip-info/${_id}`}>
                          <AiOutlineEye
                            size={20}
                            className="text-purple-600 hover:text-purple-800"
                          />
                        </Link>
                        <Link to={`/admin/trans/edit/${_id}`}>
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

export default TransesList;
