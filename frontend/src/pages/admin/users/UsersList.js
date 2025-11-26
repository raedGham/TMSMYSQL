import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchUsers, deleteUser } from "../../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Search from "../../../components/search/Search";
import { updateUserType } from "../../../services/authService";
import { toast } from "react-toastify";

import {
  FILTER_USERS,
  selectFilteredUsers,
} from "../../../redux/features/auth/UserFilterSlice";
import ReactPaginate from "react-paginate";

const UsersList = () => {
  const [search, setSearch] = useState("");
  const filteredUsers = useSelector(selectFilteredUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const delUser = async (id) => {
    await dispatch(deleteUser(id));
    // await dispatch(fetchUsers());
    navigate("/admin/users");
  };

  const confirmDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Delete User
              </h1>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Are you sure you want to delete this User?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    delUser(id);
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

  const { users, loading, error } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredUsers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredUsers.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredUsers]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    console.log("FROM USEEFFECT:", users);
    dispatch(FILTER_USERS({ users, search }));
  }, [users, search, dispatch]);

  const handleChangeType = async (userId, newType) => {
    try {
      const updated = await updateUserType(userId, newType);
      dispatch(fetchUsers());
      toast.success(`Updated user type to ${updated.type}`);
      // Optionally update local state or refetch users
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full rounded-lg shadow  mt-12 ml-8 p-6">
      <div className="flex">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2 mr-4 pt-2">
          Users List
        </h1>
        <Link
          to="/admin/users/new"
          className="mt-1 px-4 py-2 bg-[#701414] text-white font-normal rounded-lg dark:hover:bg-[#9c4343] transition duration-200 shadow"
        >
          Add User
        </Link>

        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="overflow-x-auto">
        {!users && <p>Loading...</p>}

        {users.length === 0 ? (
          <p className=" text-gray-400 mt-2">
            -- No users found, please add a user...
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
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  type
                </th>

                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user, index) => {
                const { _id, name, email, type } = user;
                return (
                  <tr
                    key={_id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <td className="px-3 py-2">{index + 1}</td>
                    <td className="px-3 py-2">{name}</td>
                    <td className="px-3 py-2">{email}</td>
                    {name !== "admin" ? (
                      <>
                        <td>
                          <select
                            value={type}
                            onChange={(e) =>
                              handleChangeType(_id, e.target.value)
                            }
                            className="
                                        px-2 py-1 
                                        rounded-lg 
                                        border border-gray-300 
                                        dark:border-gray-600 
                                        bg-white dark:bg-gray-700 
                                        text-gray-900 dark:text-gray-200 
                                        focus:outline-none 
                                        focus:ring-2 focus:ring-blue-500 
                                        focus:border-blue-500
                                      "
                          >
                            <option value="normal">Normal</option>
                            <option value="superuser">Superuser</option>
                            <option value="organizer">Organizer</option>
                          </select>
                        </td>

                        <td className="px-6 py-4 flex space-x-3">
                          <button onClick={() => confirmDelete(_id)}>
                            <FaTrashAlt
                              size={18}
                              className="text-red-600 hover:text-red-800"
                            />
                          </button>
                        </td>
                      </>
                    ) : (
                      <td></td>
                    )}
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

export default UsersList;
