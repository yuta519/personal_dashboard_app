import { createSlice } from "@reduxjs/toolkit";
import User from "../../types/User";

const initialState: User = {
  name: undefined,
  email: undefined,
  location: undefined,
  avatar: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      const { name, email, location, avatar } = action.payload;
      state.name = name;
      state.email = email;
      state.location = location;
      state.avatar = avatar;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
