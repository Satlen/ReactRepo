import { createSlice } from "@reduxjs/toolkit";

const initialState = { numOfcakes: 10 };

const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfcakes--;
    },
    restock: (state, action) => {
      state.numOfcakes += action.payload;
    },
  },
});

export const { ordered, restock } = cakeSlice.actions;
export default cakeSlice.reducer;
