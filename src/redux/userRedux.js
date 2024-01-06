import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    casinoPoints: 500,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    removeUser: (state) => {
      state.currentUser = null;
    },
    addPoints: (state, action) => {
      state.casinoPoints = state.casinoPoints + action.payload;
    },
    removePoints: (state, action) => {
      state.casinoPoints = state.casinoPoints - action.payload;
    },
    emptyPoints: (state) => {
      state.casinoPoints = 0;
    },
  },
});

export const { setUser, removeUser, addPoints, removePoints, emptyPoints } = userSlice.actions;
export default userSlice.reducer;
