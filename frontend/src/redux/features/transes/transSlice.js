import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transService from "../../../services/transService";
import { toast } from "react-toastify";
const initialState = {
  trans: null,
  transes: [],
  isLoading: false,
  isSuccess: false,
  isError: null,
  message: "",
};

// GET ALL TRANSES
export const fetchTranses = createAsyncThunk(
  "transes/getAll",
  async (_, thunkAPI) => {
    try {
      return await transService.getTranses();
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

// DELETE A TRANS

export const deleteTrans = createAsyncThunk(
  "transes/delete",
  async (id, thunkAPI) => {
    try {
      console.log("deleteTrans Slice :", id);
      return await transService.deleteTrans(id);
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

// get a single trans
export const getTrans = createAsyncThunk(
  "transes/getTrans",
  async (id, thunkAPI) => {
    try {
      return await transService.getTrans(id);
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


// UPDATE A TRANS

export const updateTrans = createAsyncThunk(
  "transes/updateTrans",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await transService.updateTrans(id, formData);
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

const transSlice = createSlice({
  name: "trans",
  initialState,
  reducers: {
    SAVE_TRANS(state, action) {
      const profile = action.payload;
      state.trans.type = profile.type;
      state.trans.arrivalLocation = profile.arrivalLocation;
      state.trans.departureLocation = profile.departureLocation;
      state.trans.arrivaltDate = profile.arrivaltDate;
      state.trans.departureDate = profile.departureDate;
      state.trans.duration = profile.duration;
      state.trans.cosPerTrip = profile.cosPerTrip;
      state.trans.tripID = profile.tripID;
    },
  },

  // extraReducers will store responses that comes from createAsyncThunk
  extraReducers: (builder) => {
    builder

      // gettranses  in progress case
      .addCase(fetchTranses.pending, (state) => {
        state.isLoading = true;
      })
      // get transes sucessfull  case
      .addCase(fetchTranses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.transes = action.payload;
      })
      //  error getting transes case
      .addCase(fetchTranses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // gettrans  in progress case
      .addCase(getTrans.pending, (state) => {
        state.isLoading = true;
      })
      // get trans sucessfull  case
      .addCase(getTrans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.trans = action.payload;
      })
      //  error getting trans case
      .addCase(getTrans.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // update trans  in progress case
      .addCase(updateTrans.pending, (state) => {
        state.isLoading = true;
      })
      // update trans sucessfull  case
      .addCase(updateTrans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.trans = action.payload;
      })
      //  error updating trans case
      .addCase(updateTrans.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // delete trans  in progress case
      .addCase(deleteTrans.pending, (state) => {
        state.isLoading = true;
      })
      // delete transes sucessfull  case
      .addCase(deleteTrans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.transes = state.transes.filter(
          (trans) => trans.id !== action.payload.id
        );
        toast.success("Trans Deleted Sucessfully");
      })
      //  error deleting trans case
      .addCase(deleteTrans.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.trans.isLoading;
export const selectTrans = (state) => state.trans.trans;

export const { SAVE_TRANS } = transSlice.actions;

export default transSlice.reducer;
