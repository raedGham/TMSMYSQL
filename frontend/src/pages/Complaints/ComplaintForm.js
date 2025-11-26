import logo from "../../assets/Logo.png";
import { selectName, selectUser } from "../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { getTrip } from "../../redux/features/trips/tripSlice";
import { useEffect } from "react";

function ComplaintForm({
  status,
  category,
  complaintText,
  dateFiled,
  handleInputChange,
  addComplaint,
  formTitle,
}) {
  const namewithquotes = localStorage.getItem("name");
  const name = namewithquotes.replace(/"/g, "");
  const emailWithQuotes = localStorage.getItem("email");
  const email = emailWithQuotes.replace(/"/g, "");

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-12 h-12 mr-2 rounded-2xl shadow-2xl"
            src={logo}
            alt="logo"
          />
          Travel Lebanon
        </a>

        {/* Increased max width to lg:max-w-4xl for a wider window */}

        <div className="w-full rounded-lg shadow dark:border md:mt-0 lg:max-w-4xl xl:p-0 bg-white/60 dark:bg-gray-800/60 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {formTitle}
            </h1>
            <div className="mt-6 p-4 rounded-lg bg-white/40 dark:bg-gray-700/40 shadow-md space-y-4">
              {/* Row 1 – Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                    UserName:
                  </span>{" "}
                  {name}
                </p>

                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                    Email:
                  </span>{" "}
                  {email}
                </p>
              </div>

              {/* Grid for two columns */}
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                onSubmit={addComplaint}
              >
                <div>
                  <label
                    htmlFor="dateFiled"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    value={dateFiled}
                    onChange={handleInputChange}
                    name="dateFiled"
                    id="dateFiled"
                    placeholder="Enter Date Filed"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={handleInputChange}
                    name="category"
                    id="category"
                    placeholder="Enter category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Status
                  </label>
                  <input
                    type="text"
                    value={status}
                    onChange={handleInputChange}
                    name="status"
                    id="status"
                    placeholder="Enter status"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="complaintText"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Complaint Text
                  </label>
                  <textarea
                    value={complaintText}
                    onChange={handleInputChange}
                    name="complaintText"
                    id="complaintText"
                    placeholder="Enter your complaint ..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    rows={6} // Optional: adjust height
                  ></textarea>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-12 py-2.5 text-center"
                  >
                    {formTitle === "Edit Complaint" ? "Submit" : "Send"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComplaintForm;
