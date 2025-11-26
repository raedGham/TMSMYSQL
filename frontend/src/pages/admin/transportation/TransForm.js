import React from "react";
import logo from "../../../assets/Logo.png";

function TransForm({
  type,
  arrivalLocation,
  arrivalDate,
  departureLocation,
  departureDate,
  duration,
  costPerTrip,
  handleInputChange,
  addTrans,
  formTitle,
}) {
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

            {/* Grid for two columns */}
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={addTrans}
            >
              {/* type dropdown */}
              <div>
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={type}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Type</option>
                  <option value="car">Car</option>
                  <option value="fairy">Fairy</option>
                  <option value="train">Train</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="arrivalLocation"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Arrival Location
                </label>
                <input
                  type="text"
                  value={arrivalLocation}
                  onChange={handleInputChange}
                  name="arrivalLocation"
                  id="arrivalLocation"
                  placeholder="Enter trans arrival Location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="arrivalDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Arrival Date
                </label>
                <input
                  type="date"
                  value={arrivalDate}
                  onChange={handleInputChange}
                  name="arrivalDate"
                  id="arrivalDate"
                  placeholder="Enter trans arrival Date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="depatureLocation"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Depature Location
                </label>
                <input
                  type="text"
                  value={departureLocation}
                  onChange={handleInputChange}
                  name="departureLocation"
                  id="departureLocation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="departureDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Departure Date
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={handleInputChange}
                  name="departureDate"
                  id="departureDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Duration
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={handleInputChange}
                  name="duration"
                  id="duration"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="costPerTrip"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cost/Trip
                </label>
                <input
                  type="number"
                  value={costPerTrip}
                  onChange={handleInputChange}
                  name="costPerTrip"
                  id="costPerTrip"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div></div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {formTitle === "Edit Trans" ? "Submit" : "Add Trans"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TransForm;
