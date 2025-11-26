import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tripService from "../../../services/tripService"
import { toast } from "react-toastify";
const initialState = {
  trip:  null,
  trips: [],
  isLoading: false,
  isSuccess: false,
  isError: null,
  message: "",
};

// GET ALL TRIPS
export const fetchTrips = createAsyncThunk(
  "trips/getAll",
  async (_, thunkAPI) => {
    try {
      return await tripService.getTrips();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// DELETE A TRIP

export const deleteTrip = createAsyncThunk(
  "trips/delete",
  async (id, thunkAPI) => {
    try {
      console.log("deleteTrip Slice :", id)
      return await tripService.deleteTrip(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get a single trip
export const getTrip = createAsyncThunk(
  "trips/getTrip",
  async (id, thunkAPI) => {
    try {
      return await tripService.getTrip(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// UPDATE A TRIP

export const updateTrip = createAsyncThunk(
  "trips/updateTrip",
  async ( {id, formData} , thunkAPI) => {
    try {
    
   
      return await tripService.updateTrip(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    SAVE_TRIP(state, action) {
      const profile = action.payload;
      state.trip.title          = profile.title;
      state.trip.destination    = profile.destination;
      state.trip.demographic    = profile.demographic;
      state.trip.startDate      = profile.startDate;
      state.trip.endDate        = profile.endDate;
      state.trip.pricePerPerson = profile.pricePerPerson;
      state.trip.organiserID    = profile.organiserID;
      state.trip.thumbnail      = profile.thumbnail;
    },
  },

  // extraReducers will store responses that comes from createAsyncThunk
  extraReducers: (builder) => {
    builder

      // gettrips  in progress case
      .addCase(fetchTrips.pending, (state) => {
        state.isLoading = true;
      })
      // get trips sucessfull  case
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.trips = action.payload;
      })
      //  error getting trips case
      .addCase(fetchTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // gettrip  in progress case
      .addCase(getTrip.pending, (state) => {
        state.isLoading = true;
      })
      // get trip sucessfull  case
      .addCase(getTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;        
        state.trip = action.payload;
      })
      //  error getting trip case
      .addCase(getTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // update trip  in progress case
      .addCase(updateTrip.pending, (state) => {
        state.isLoading = true;
      })
      // update trip sucessfull  case
      .addCase(updateTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.trip = action.payload;
      })
      //  error updating trip case
      .addCase(updateTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // delete trip  in progress case
      .addCase(deleteTrip.pending, (state) => {
        state.isLoading = true;
      })
      // delete trips sucessfull  case
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.trips = state.trips.filter(
          (trip) => trip._id !== action.payload._id
        );
        toast.success("Trip Deleted Sucessfully");
      })
      //  error deleting trip case
      .addCase(deleteTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);        
      });
  },
});

export const selectIsLoading = (state) => state.trip.isLoading;
export const selectTrip = (state) => state.trip.trip;


export const { SAVE_TRIP } = tripSlice.actions;

export default tripSlice.reducer;
