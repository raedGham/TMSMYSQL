import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredActivities: [],
};

const activityFilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_ACTIVITIES(state, action) {
     
      const { activities, search } = action.payload;
      const tempActivities = activities.filter((activity) =>
        activity.name.toLowerCase().includes(search.toLowerCase())
      );

      console.log("tempactivities:", tempActivities);

      state.filteredActivities = tempActivities;
    },
  },
});

export const { FILTER_ACTIVITIES } = activityFilterSlice.actions;

export const selectFilteredActivities = (state) =>
  state.activityFilter.filteredActivities;

export default activityFilterSlice.reducer;
