import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import complaintService from "../../../services/complaintService";
import { toast } from "react-toastify";
const initialState = {
  complaint: null,
  complaints: [],
  isLoading: false,
  isSuccess: false,
  isError: null,
  message: "",
};

// GET ALL COMPLAINTS
export const fetchComplaints = createAsyncThunk(
  "Complaints/getAll",
  async (_, thunkAPI) => {
    try {
      return await complaintService.getComplaints();
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

// DELETE A COMPLAINT

export const deleteComplaint = createAsyncThunk(
  "Complaints/delete",
  async (id, thunkAPI) => {
    try {
      console.log("deleteComplaint Slice :", id);
      return await complaintService.deleteComplaint(id);
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

// get a single complaint
export const getComplaint = createAsyncThunk(
  "Complaints/getComplaint",
  async (id, thunkAPI) => {
    try {
      return await complaintService.getComplaint(id);
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

// UPDATE A COMPLAINT

export const updateComplaint = createAsyncThunk(
  "Complaints/updateComplaint",
  async ({ id, formData }, thunkAPI) => {
    try {
  
      return await complaintService.updateComplaint(id, formData);
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

const complaintSlice = createSlice({
  name: "complaint",
  initialState,
  reducers: {
    SAVE_COMPLAINT(state, action) {
      const profile = action.payload;
      state.complaint.userID = profile.userID;
      state.complaint.category = profile.category;
      state.complaint.status = profile.status;
      state.complaint.complaintText = profile.complaintText;
      state.complaint.dateFiled = profile.dateFiled;
      state.complaint.dateReviewed = profile.dateReviewed;
      state.complaint.responseText = profile.responseText;
      state.complaint.supervisorID = profile.supervisorID;
    },
  },

  // extraReducers will store responses that comes from createAsyncThunk
  extraReducers: (builder) => {
    builder

      // getComplaints  in progress case
      .addCase(fetchComplaints.pending, (state) => {
        state.isLoading = true;
      })
      // get Complaints sucessfull  case
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.complaints = action.payload;
      })
      //  error getting Complaints case
      .addCase(fetchComplaints.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // getcomplaint  in progress case
      .addCase(getComplaint.pending, (state) => {
        state.isLoading = true;
      })
      // get complaint sucessfull  case
      .addCase(getComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.complaint = action.payload;
      })
      //  error getting complaint case
      .addCase(getComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // update complaint  in progress case
      .addCase(updateComplaint.pending, (state) => {
        state.isLoading = true;
      })
      // update complaint sucessfull  case
      .addCase(updateComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.complaint = action.payload;
      })
      //  error updating complaint case
      .addCase(updateComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // delete complaint  in progress case
      .addCase(deleteComplaint.pending, (state) => {
        state.isLoading = true;
      })
      // delete Complaints sucessfull  case
      .addCase(deleteComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.complaints = state.complaints.filter(
          (complaint) => complaint._id !== action.payload._id
        );
        toast.success("Complaint Deleted Sucessfully");
      })
      //  error deleting complaint case
      .addCase(deleteComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.complaint.isLoading;
export const selectComplaint = (state) => state.complaint.complaint;

export const { SAVE_COMPLAINT } = complaintSlice.actions;

export default complaintSlice.reducer;
