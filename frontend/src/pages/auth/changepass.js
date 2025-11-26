import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ChangePassword } from "../../services/authService";

import {
  selectName,
  selectEmail,
  selectUserID,
} from "../../redux/features/auth/authSlice";
import logo from "../../assets/Logo.png";

const initialState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function ChangePass() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { currentPassword, newPassword, confirmPassword } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  const userID = useSelector(selectUserID);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const changeP = async (e) => {
    e.preventDefault();

    // validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 chars ");
    }

    if (confirmPassword != newPassword) {
      return toast.error("Passwords does not match");
    }
    console.log(currentPassword);
    const userData = { currentPassword, newPassword, userID };
    setIsLoading(true);

    // attemps to login the user
    try {
      const data = await ChangePassword(userData);
      toast.success("Password Sucessfully changed");   
      navigate("/main");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
     
    }
  };

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img
          className="w-16 h-16 mr-2 rounded-2xl shadow-2xl"
          src={logo}
          alt="logo"
        />
        Travel Lebanon
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h1>

            <div className="px-4 pb-2  font-semibold flex">
              <p className=" text-white">{name} /</p>
              <p className=" text-gray-300 ml-4 ">{email}</p>
            </div>

            <form className="space-y-4 md:space-y-6" onSubmit={changeP}>
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={handleInputChange}
                  name="currentPassword"
                  id="currentPassword"
                  placeholder="enter current password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={handleInputChange}
                  name="newPassword"
                  id="newPassword"
                  placeholder="enter current password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="confirm new password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-lg font-medium shadow-md transition"
              >
                Change Pasword
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChangePass;
