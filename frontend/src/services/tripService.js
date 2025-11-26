import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/trips`;

//----------------------------------------------------
//  C R E A T E    N E W   T R I P
//----------------------------------------------------
export const registerTrip = async (tripData) => {
  try {
    const formData = new FormData();
    formData.append("title", tripData.title);
    formData.append("destination", tripData.destination);
    formData.append("demographic", tripData.demographic);
    formData.append("startDate", tripData.startDate);
    formData.append("endDate", tripData.endDate);
    formData.append("pricePerPerson", tripData.pricePerPerson);
    formData.append("organizerID", tripData.organizerID);
    if (tripData.thumbnail) formData.append("thumbnail", tripData.thumbnail);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await axios.post(
      `${BACKEND_URL}/api/trips/new`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
      { withCredentials: true }
    );
    if (response.statusText === "OK") {
      toast.success("Trip Created Sucessfully");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//----------------------------------------------------
//    G E T  A L L   T R I P S
//----------------------------------------------------
const getTrips = async () => {
  const reponse = await axios.get(API_URL);
  return reponse.data;
};

//----------------------------------------------------
//    G E T  S I N G L E   T R I P
//----------------------------------------------------
export const getTrip = async (id) => {
  const reponse = await axios.get(API_URL + "/" + id);
  return reponse.data;
};

//----------------------------------------------------
//    D E L E T E    T R I P
//----------------------------------------------------
const deleteTrip = async (id) => {
  const reponse = await axios.delete(API_URL + "/" + id);
  return reponse.data;
};

//----------------------------------------------------
//    U P D A T E   T R I P
//----------------------------------------------------

export const updateTrip = async (id, tripData) => {
  try {
    const formData = new FormData();
    formData.append("title", tripData.title);
    formData.append("destination", tripData.destination);
    formData.append("demographic", tripData.demographic);
    formData.append("startDate", tripData.startDate);
    formData.append("endDate", tripData.endDate);
    formData.append("pricePerPerson", tripData.pricePerPerson);
    formData.append("organiserID", tripData.organiserID);
    if (tripData.thumbnail) formData.append("thumbnail", tripData.thumbnail);
    const response = await axios.patch(`${API_URL}/${id}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.statusText === "OK") {
      toast.success("Trip Updated Successfully");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

const tripService = {
  registerTrip,
  getTrips,
  getTrip,
  deleteTrip,
  updateTrip,
};

export default tripService;
