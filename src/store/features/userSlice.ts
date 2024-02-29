import { createSlice } from "@reduxjs/toolkit";
import User from "../../types/User";

const initialState: User = {
  name: undefined,
  email: undefined,
  location: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      const { name, email, location } = action.payload;
      state.name = name;
      state.email = email;
      state.location = location;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
