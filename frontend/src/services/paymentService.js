import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/payment`;

//----------------------------------------------------
//  C R E A T E    N E W   P A Y M E N T
//----------------------------------------------------
export const registerPayment = async (paymentData) => {
  try {
    console.log("SERVICE paymentData:", paymentData)
    const formData = new FormData();
    formData.append("paymentDate", paymentData.paymentDate);
    formData.append("amount", paymentData.amount);
    formData.append("paymentMethod", paymentData.paymentMethod);
    formData.append("reservationID", paymentData.reservationID);

    const response = await axios.post(
      `${BACKEND_URL}/api/payment/new`,
      formData,
      { withCredentials: true }
    );
    if (response.statusText === "OK") {
      toast.success("Paymentation Created Sucessfully");
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
//    G E T  A L L   P A Y M E N T S
//----------------------------------------------------
const getPayments = async () => {
  const reponse = await axios.get(API_URL);
  return reponse.data;
};

//----------------------------------------------------
//    G E T  S I N G L E   P A Y M E N T
//----------------------------------------------------
export const getPayment = async (id) => {
  const reponse = await axios.get(API_URL + "/" + id);
  return reponse.data;
};

//----------------------------------------------------
//    D E L E T E    P A Y M E N T
//----------------------------------------------------
const deletePayment = async (id) => {
  const reponse = await axios.delete(API_URL + "/" + id);
  return reponse.data;
};

//----------------------------------------------------
//    U P D A T E   P A Y M E N T
//----------------------------------------------------

export const updatePayment = async (id, paymentData) => {
  try {
    const formData = new FormData();
   formData.append("paymentDate", paymentData.paymentDate);
    formData.append("amount", paymentData.amount);
    formData.append("payementMethod", paymentData.payementMethod);
    formData.append("reservationID", paymentData.reservationID);

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      withCredentials: true,
    });

    if (response.statusText === "OK") {
      toast.success("Payment Updated Successfully");
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

const paymentService = {
  registerPayment,
  getPayments,
  getPayment,
  deletePayment,
  updatePayment,
};

export default paymentService;
