import logo from "../../../assets/Logo.png";
import { selectName, selectUser } from "../../../redux/features/auth/authSlice";
import AddResponse from "./AddResponse";

function ResponseForm({
  complaint,
  dateReviewed,
  responseText,
  handleInputChange,
  addRes,
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
          {complaint && (
            <div className="m-8 text-gray-300">
              <h2 className="text-xl font-bold mb-6">Complaint Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-800 p-6 rounded-lg shadow-lg">
                {/* Left Column */}
                <div className="space-y-4">
                  <p>
                    <span className="font-semibold text-indigo-300">
                      Complaint User:
                    </span>
                    <span className="ml-2 text-gray-300">
                      {complaint.userID?.name}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold text-indigo-300">
                      Email:
                    </span>
                    <span className="ml-2 text-gray-300">
                      {complaint.userID?.email}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold text-indigo-300">
                      Category:
                    </span>
                    <span className="ml-2 text-gray-300">
                      {complaint.category}
                    </span>
                  </p>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <p>
                    <span className="font-semibold text-indigo-300">
                      Status:
                    </span>
                    <span className="ml-2 text-gray-300">
                      {complaint.status}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold text-indigo-300">
                      Date Filed:
                    </span>
                    <span className="ml-2 text-gray-300">
                      {complaint.dateFiled?.substring(0, 10)}
                    </span>
                  </p>
                </div>
                <p>
                  <span className="font-semibold text-indigo-300">
                    Complaint Text:
                  </span>
                  <span className="ml-2 text-gray-300">
                    {complaint.complaintText}
                  </span>
                </p>
              </div>
            </div>
          )}

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {formTitle}
            </h1>
            <div className="mt-6 p-4 rounded-lg bg-white/40 dark:bg-gray-700/40 shadow-md space-y-4">
              {/* Grid for two columns */}
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                onSubmit={addRes}
              >
                <div>
                  <label
                    htmlFor="dateReviewed"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Review Date
                  </label>
                  <input
                    type="date"
                    value={dateReviewed}
                    onChange={handleInputChange}
                    name="dateReviewed"
                    id="dateReviewed"
                    placeholder="Enter Date of Review"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                 <div>
                  <label
                    htmlFor="responseText"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Reponse
                  </label>
                  <textarea
                    value={responseText}
                    onChange={handleInputChange}
                    name="responseText"
                    id="responseText"
                    placeholder="Enter your response to the user ..."
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

export default ResponseForm;
