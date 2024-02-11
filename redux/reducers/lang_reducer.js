import { createSlice } from "@reduxjs/toolkit";

const initialState = "en";

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLang: (state = initialState, { payload }) => {
      state = payload;
    },
  },
});

// Selectors
export const getLang = (state) => state.lang;

// Reducers and actions
export const { setTheme } = langSlice.actions;

export default langSlice.reducer;
