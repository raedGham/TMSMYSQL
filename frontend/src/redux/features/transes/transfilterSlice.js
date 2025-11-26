import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredTranses: [],
};

const transFilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_TRANSES(state, action) {
      
      const { transes, search } = action.payload;
      const tempTranses = transes.filter((trans) =>
        trans.type.toLowerCase().includes(search.toLowerCase())
      );

      console.log("temptranses:", tempTranses);

      state.filteredTranses = tempTranses;
    },
  },
});

export const { FILTER_TRANSES } = transFilterSlice.actions;

export const selectFilteredTranses = (state) =>
  state.transFilter.filteredTranses;

export default transFilterSlice.reducer;
