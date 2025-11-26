import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/activities`;

//----------------------------------------------------
//  C R E A T E    N E W   A C T I V I T Y
//----------------------------------------------------
export const registerActivity = async (activityData) => {
  try {
    const formData = new FormData();
    formData.append("name", activityData.name);
    formData.append("description", activityData.description);
    formData.append("startDate", activityData.startDate);
    formData.append("finishDate", activityData.finishDate);
    formData.append("capacity", activityData.capacity);
    formData.append("costPerPerson", activityData.costPerPerson);
    formData.append("tripID", activityData.tripID);

    const response = await axios.post(
      `${BACKEND_URL}/api/activities/new`,
      formData,
      { withCredentials: true }
    );
    if (response.statusText === "OK") {
      toast.success("Activity Created Sucessfully");
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
//    G E T  A L L   A C T I V I T I E S
//----------------------------------------------------
const getActivities = async () => {
  const reponse = await axios.get(API_URL);
  return reponse.data;
};

//----------------------------------------------------
//    G E T  S I N G L E   A C T I V I T Y
//----------------------------------------------------
export const getActivity = async (id) => {
  const reponse = await axios.get(API_URL + "/" + id);
  return reponse.data;
};

//----------------------------------------------------
//    D E L E T E    A C T I V I T Y
//----------------------------------------------------
const deleteActivity = async (id) => {
  const reponse = await axios.delete(API_URL + "/" + id);
  return reponse.data;
};

//----------------------------------------------------
//    U P D A T E   A C T I V I T Y
//----------------------------------------------------

export const updateActivity = async (id, activityData) => {
  try {
    console.log(activityData);
    const formData = new FormData();
    formData.append("name", activityData.name);
    formData.append("description", activityData.description);
    formData.append("startDate", activityData.startDate);
    formData.append("finishDate", activityData.finishDate);
    formData.append("capacity", activityData.capacity);
    formData.append("costPerPerson", activityData.costPerPerson);
    formData.append("tripID", activityData.tripID);

    const response = await axios.patch(`${API_URL}/${id}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.statusText === "OK") {
      toast.success("Activity Updated Successfully");
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

const activityService = {
  registerActivity,
  getActivities,
  getActivity,
  deleteActivity,
  updateActivity,
};

export default activityService;
