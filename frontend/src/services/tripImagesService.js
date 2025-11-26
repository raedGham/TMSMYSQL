import axios from "axios";
import { BACKEND_URL } from "./tripService"; // reuse same backend config

const API_URL = `${BACKEND_URL}/api/trips`;

//----------------------------------------------------
//  F E T C H   I M A G E S   F O R   A   T R I P
//----------------------------------------------------
const getTripImages = async (tripId) => {
  console.log("reached here");
  const response = await axios.get(`${API_URL}/images/${tripId}`);
  return response.data;
};

//----------------------------------------------------
//  U P L O A D   I M A G E S   T O   A   T R I P
//----------------------------------------------------
const uploadTripImages = async ({ tripId, files }) => {
  console.log(tripId);

  console.log(`${API_URL}/images/${tripId}`);

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("images", files[i]);
  }
  console.log("before axios post");
  const response = await axios.post(`${API_URL}/images/${tripId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.images;
};

//----------------------------------------------------
//  D E L E T E   A   T R I P   I M A G E
//----------------------------------------------------
const deleteTripImage = async ({ tripId, imageId }) => {
  const response = await axios.delete(`${API_URL}/${tripId}/images/${imageId}`);
  return response.data; // returns { message: 'Image deleted' }
};

const tripImagesService = {
  getTripImages,
  uploadTripImages,
  deleteTripImage,
};

export default tripImagesService;
