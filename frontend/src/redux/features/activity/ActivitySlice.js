import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import activityService from "../../../services/activityService";
import { toast } from "react-toastify";
const initialState = {
  activity: null,
  activities: [],
  isLoading: false,
  isSuccess: false,
  isError: null,
  message: "",
};

// GET ALL TRIPS
export const fetchActivities = createAsyncThunk(
  "Activities/getAll",
  async (_, thunkAPI) => {
    try {
      return await activityService.getActivities();
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

export const deleteActivity = createAsyncThunk(
  "Activities/delete",
  async (id, thunkAPI) => {
    try {
      console.log("deleteActivity Slice :", id);
      return await activityService.deleteActivity(id);
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

// get a single activity
export const getActivity = createAsyncThunk(
  "Activities/getActivity",
  async (id, thunkAPI) => {
    try {
      return await activityService.getActivity(id);
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

export const updateActivity = createAsyncThunk(
  "Activities/updateActivity",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await activityService.updateActivity(id, formData);
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

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    SAVE_ACTIVITY(state, action) {
      const profile = action.payload;
      state.activity.name = profile.name;
      state.activity.description = profile.description;
      state.activity.startDate = profile.startDate;
      state.activity.finishDate = profile.finishDate;
      state.activity.capacity = profile.capacity;
      state.activity.costPerPerson = profile.costPerPerson;
      state.activity.tripID = profile.tripID;
    },
  },

  // extraReducers will store responses that comes from createAsyncThunk
  extraReducers: (builder) => {
    builder

      // getActivities  in progress case
      .addCase(fetchActivities.pending, (state) => {
        state.isLoading = true;
      })
      // get Activities sucessfull  case
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.activities = action.payload;
      })
      //  error getting Activities case
      .addCase(fetchActivities.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // getactivity  in progress case
      .addCase(getActivity.pending, (state) => {
        state.isLoading = true;
      })
      // get activity sucessfull  case
      .addCase(getActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.activity = action.payload;
      })
      //  error getting activity case
      .addCase(getActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // update activity  in progress case
      .addCase(updateActivity.pending, (state) => {
        state.isLoading = true;
      })
      // update activity sucessfull  case
      .addCase(updateActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.activity = action.payload;
      })
      //  error updating activity case
      .addCase(updateActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // delete activity  in progress case
      .addCase(deleteActivity.pending, (state) => {
        state.isLoading = true;
      })
      // delete Activities sucessfull  case
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.activities = state.activities.filter(
          (activity) => activity._id !== action.payload._id
        );
        toast.success("Activity Deleted Sucessfully");
      })
      //  error deleting activity case
      .addCase(deleteActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.activity.isLoading;
export const selectActivity = (state) => state.activity.activity;

export const { SAVE_ACTIVITY } = activitySlice.actions;

export default activitySlice.reducer;
