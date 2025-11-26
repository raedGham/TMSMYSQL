import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredComplaints: [],
};

const complaintFilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_COMPLAINTS(state, action) {
      const { complaints, search } = action.payload;

      const tempComplaints = complaints.filter((complaint) =>
        complaint.complaintText.toLowerCase().includes(search.toLowerCase())
      );

      console.log("tempactivities:", tempComplaints);

      state.filteredComplaints = tempComplaints;
    },
  },
});

export const { FILTER_COMPLAINTS } = complaintFilterSlice.actions;

export const selectFilteredComplaints = (state) =>
  state.complaintFilter.filteredComplaints;

export default complaintFilterSlice.reducer;
