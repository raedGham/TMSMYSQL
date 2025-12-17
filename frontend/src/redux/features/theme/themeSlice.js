import { createSlice } from "@reduxjs/toolkit";

const initialTheme = localStorage.getItem("theme") || "dark";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: initialTheme, // "light" or "dark"
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
      localStorage.setItem("theme", state.mode);

      // update html class
      const root = document.documentElement;
      if (state.mode === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("theme", state.mode);

      const root = document.documentElement;
      if (state.mode === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
