import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reservService from "../../../services/reservationService";
import { toast } from "react-toastify";
const initialState = {
  reservationDate: null,
  reserv: null,
  reserves: [],
  isLoading: false,
  isSuccess: false,
  isError: null,
  message: "",
};

// GET ALL RESERVATIONS
export const fetchReservs = createAsyncThunk(
  "reservation/getAll",
  async (_, thunkAPI) => {
    try {
      return await reservService.getReservs();
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

// DELETE A RESERVATION

export const deleteReserv = createAsyncThunk(
  "reservation/delete",
  async (id, thunkAPI) => {
    try {
      console.log("deleteReserv Slice :", id);
      return await reservService.deleteReserv(id);
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

// get a single reservation
export const getReservation = createAsyncThunk(
  "reservation/getReserv",
  
  async (reservationID, thunkAPI) => {
    try {
      console.log("THUNK CALLED with:", reservationID);  
      return await reservService.getReserv(reservationID);
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

// UPDATE A RESERVATION

export const updateReserv = createAsyncThunk(
  "reservation/updateReserv",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await reservService.updateReserv(id, formData);
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

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    SAVE_RESERVE(state, action) {
      const profile = action.payload;
      state.reserv.reservationDate = profile.reservationDate;
      state.reserv.numberOfPeople = profile.numberOfPeople;
      state.reserv.status = profile.status;
      state.reserv.tripID = profile.tripID;
      state.reserv.userID = profile.userID;
    },
  },

  // extraReducers will store responses that comes from createAsyncThunk
  extraReducers: (builder) => {
    builder

      // getReservs  in progress case
      .addCase(fetchReservs.pending, (state) => {
        state.isLoading = true;
      })
      // get Reservs sucessfull  case
      .addCase(fetchReservs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.reserves = action.payload;
      })
      //  error getting Reservs case
      .addCase(fetchReservs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // getreserv  in progress case
      .addCase(getReservation.pending, (state) => {
        state.isLoading = true;
        console.log("IN SLICE PENDING");
      })
      // get reserv sucessfull  case
      .addCase(getReservation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.reserv = action.payload;
        console.log("IN SLICE FULFIL");
      })
      //  error getting reserv case
      .addCase(getReservation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
        console.log("IN SLICE REJECTED");
      })

      // update reserv  in progress case
      .addCase(updateReserv.pending, (state) => {
        state.isLoading = true;
      })
      // update reserv sucessfull  case
      .addCase(updateReserv.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.reserv = action.payload;
      })
      //  error updating reserv case
      .addCase(updateReserv.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // delete reserv  in progress case
      .addCase(deleteReserv.pending, (state) => {
        state.isLoading = true;
      })
      // delete Reservs sucessfull  case
      .addCase(deleteReserv.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.reserves = state.reserves.filter(
          (reserv) => reserv._id !== action.payload._id
        );
        toast.success("Reserv Deleted Sucessfully");
      })
      //  error deleting reserv case
      .addCase(deleteReserv.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.reservation.isLoading;
export const selectReserv = (state) => state.reservation.reserv;

export const { SAVE_RESERVE } = reservationSlice.actions;

export default reservationSlice.reducer;
