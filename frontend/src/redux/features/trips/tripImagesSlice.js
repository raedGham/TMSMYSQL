import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tripImagesService from "../../../services/tripImagesService";
import { toast } from "react-toastify";

const initialState = {
  images: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//----------------------------------------------------
//  G E T   I M A G E S
//----------------------------------------------------
export const fetchTripImages = createAsyncThunk(
  "tripImages/get",
  async (tripId, thunkAPI) => {
    try {
      return await tripImagesService.getTripImages(tripId);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//----------------------------------------------------
//  U P L O A D   I M A G E S
//----------------------------------------------------
export const uploadTripImages = createAsyncThunk(
  "tripImages/upload",
  async ({ tripId, files }, thunkAPI) => {
    try {
      return await tripImagesService.uploadTripImages({ tripId, files });
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//----------------------------------------------------
//  D E L E T E   I M A G E
//----------------------------------------------------
export const removeTripImage = createAsyncThunk(
  "tripImages/delete",
  async ({ tripId, imageId }, thunkAPI) => {
    try {
      await tripImagesService.deleteTripImage({ tripId, imageId });
      return imageId;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//----------------------------------------------------
//  S L I C E
//----------------------------------------------------
const tripImagesSlice = createSlice({
  name: "tripImages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchTripImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTripImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.images = action.payload;
      })
      .addCase(fetchTripImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })

      // UPLOAD
      .addCase(uploadTripImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadTripImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.images = [...action.payload, ...state.images];
        toast.success("Images Uploaded");
      })
      .addCase(uploadTripImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })

      // DELETE
      .addCase(removeTripImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeTripImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.images = state.images.filter((img) => img._id !== action.payload);
        toast.success("Image Deleted");
      })
      .addCase(removeTripImage.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export const selectTripImages = (state) => state.tripImages.images;
export const selectTripImagesLoading = (state) => state.tripImages.isLoading;

export default tripImagesSlice.reducer;
