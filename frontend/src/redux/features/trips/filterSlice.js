import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredTrips: [],
};

const tripFilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_TRIPS(state, action) {
      console.log("FROM FILTER SLICE:",action.payload)
      const { trips, search } = action.payload;
      const tempTrips = trips.filter((trip) =>
        trip.title.toLowerCase().includes(search.toLowerCase())
      );
      
      console.log("temptrips:",tempTrips)
      
      state.filteredTrips = tempTrips;
    },
  },
});

export const { FILTER_TRIPS } = tripFilterSlice.actions;

export const selectFilteredTrips = (state) => state.tripFilter.filteredTrips;

export default tripFilterSlice.reducer;
