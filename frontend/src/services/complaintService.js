import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/complaint`;

//----------------------------------------------------
//  C R E A T E    N E W   C O M P L A I N T
//----------------------------------------------------
export const registerComplaint = async (complaintData) => {
  try {
    const formData = new FormData();
    formData.append("userID", complaintData.userID);
    formData.append("status", complaintData.status);
    formData.append("complaintText", complaintData.complaintText);
    formData.append("category", complaintData.category);
    formData.append("dateFiled", complaintData.dateFiled);

    const response = await axios.post(
      `${BACKEND_URL}/api/complaint/new`,
      formData,
      { withCredentials: true }
    );
    if (response.statusText === "OK") {
      toast.success("Complaintation Created Sucessfully");
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
//    G E T  A L L   C O M P L A I N T S
//----------------------------------------------------
const getComplaints = async () => {
  const reponse = await axios.get(API_URL);
  return reponse.data;
};

//----------------------------------------------------
//    G E T  S I N G L E   C O M P L A I N T
//----------------------------------------------------
export const getComplaint = async (id) => {
  const reponse = await axios.get(API_URL + "/" + id);
  return reponse.data;
};

//----------------------------------------------------
//    D E L E T E    C O M P L A I N T
//----------------------------------------------------
const deleteComplaint = async (id) => {
  const reponse = await axios.delete(API_URL + "/" + id);
  return reponse.data;
};

//----------------------------------------------------
//    U P D A T E   C O M P L A I N T
//----------------------------------------------------

export const updateComplaint = async (id, complaintData) => {
  try {
   const response = await axios.patch(`${API_URL}/${id}`, complaintData, {
      withCredentials: true,
    });

    if (response.statusText === "OK") {
      toast.success("Complaint Updated Successfully");
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

const complaintService = {
  registerComplaint,
  getComplaints,
  getComplaint,
  deleteComplaint,
  updateComplaint,
};

export default complaintService;
