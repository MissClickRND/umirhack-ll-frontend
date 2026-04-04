import { createSlice } from "@reduxjs/toolkit";
import { IUserState, UserRole } from "./type";

const initialState: IUserState = {
  id: undefined,
  email: undefined,
  role: UserRole.HR,
  universityId: null,
  createdAt: undefined,
  updatedAt: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.universityId =
        action.payload.universityId ?? action.payload.university_id ?? null;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
    },

    userLogout: (state) => {
      state.id = undefined;
      state.email = undefined;
      state.role = UserRole.HR;
      state.universityId = null;
      state.createdAt = undefined;
      state.updatedAt = undefined;
    },
  },
});

export const { setUser, userLogout } = userSlice.actions;
export const userReducer = userSlice.reducer;
