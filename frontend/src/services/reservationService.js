import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/reservation`;

//----------------------------------------------------
//  C R E A T E    N E W   R E S E R V A T I O N
//----------------------------------------------------
export const registerReserv = async (reservData) => {
  try {
    const formData = new FormData();
    formData.append("reservationDate", reservData.reservationDate);
    formData.append("numberOfPeople", reservData.numberOfPeople);
    formData.append("status", reservData.status);
    formData.append("tripID", reservData.tripID);
    formData.append("userID", reservData.userID);

    const response = await axios.post(
      `${BACKEND_URL}/api/reservation/new`,
      formData,
      { withCredentials: true }
    );
    if (response.statusText === "OK") {
      toast.success("Reservation Created Sucessfully");
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
//    G E T  A L L   R E S E R V A T I O N S
//----------------------------------------------------
const getReservs = async () => {
  const reponse = await axios.get(API_URL);
  return reponse.data;
};

//----------------------------------------------------
//    G E T  S I N G L E   R E S E R V A T I O N
//----------------------------------------------------
export const getReserv = async (id) => {
  console.log("GET SINGLE RESERV")
  console.log(`${API_URL}/${id}`);
  const reponse = await axios.get(API_URL + "/" + id);
  console.log("RESRVATION SERVICE GETRESERV:", reponse)
  return reponse.data;
};

//----------------------------------------------------
//    D E L E T E    R E S E R V A T I O N
//----------------------------------------------------
const deleteReserv = async (id) => {
  const reponse = await axios.delete(API_URL + "/" + id);
  return reponse.data;
};

//----------------------------------------------------
//    U P D A T E   R E S E R V A T I O N
//----------------------------------------------------

export const updateReserv = async (id, reservData) => {
  try {
    const formData = new FormData();
    formData.append("reservationDate", reservData.reservationDate);
    formData.append("numberOfPeople", reservData.numberOfPeople);
    formData.append("status", reservData.status);
    formData.append("tripID", reservData.tripID);
    formData.append("userID", reservData.userID);

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      withCredentials: true,
    });

    if (response.statusText === "OK") {
      toast.success("Reservation Updated Successfully");
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


export const updateStatus = async (id, status) => {
  const res = await axios.patch(API_URL + "/status/" + id, { status });
  return res.data;
};


const reservService = {
  registerReserv,
  getReservs,
  getReserv,
  deleteReserv,
  updateReserv,
  updateStatus,
};

export default reservService;
