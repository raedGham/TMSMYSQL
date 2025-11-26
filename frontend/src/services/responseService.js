import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/complaint`;

//----------------------------------------------------
//    G E T  A L L   C O M P L A I N T S
//----------------------------------------------------
const getResponses = async () => {
  const reponse = await axios.get(API_URL);
  return reponse.data;
};

//----------------------------------------------------
//    G E T  S I N G L E   C O M P L A I N T
//----------------------------------------------------
export const getResponse = async (id) => {
  const reponse = await axios.get(API_URL + "/" + id);
  return reponse.data;
};

//----------------------------------------------------
//    D E L E T E    C O M P L A I N T
//----------------------------------------------------
const deleteResponse = async (id) => {
  const reponse = await axios.delete(API_URL + "/" + id);
  return reponse.data;
};

//----------------------------------------------------
//    R E G I S T E R  C O M P L A I N T
//----------------------------------------------------

export const registerResponse = async (id, responseData) => {
  try {
    const formData = new FormData();
    formData.append("status", responseData.status);
    formData.append("responseText", responseData.responseText);
    formData.append("dateReviewed", responseData.dateReviewed);
    console.log(responseData.dateReviewed);
    console.log("id:", id);

    console.log(`${API_URL}/${id}`);
    const response = await axios.patch(`${API_URL}/${id}`, formData, {
      withCredentials: true,
    });

    if (response.statusText === "OK") {
      toast.success("Response Updated Successfully");
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

const responseService = {
  registerResponse,
  getResponses,
  getResponse,
  deleteResponse,
};

export default responseService;
