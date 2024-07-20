import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const AUTH_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/auth`;
const initialState = {
  status: "",
  error: "",
  user: {
    id: "",
    name: "",
    email: "",
    picture: "",
    status: "",
    token: "",
  },
};
export const registerUser = createAsyncThunk(
  "auth/register",
  async (values, { rejectWithValue }) => {
    try {
      console.log(values);
      const { data } = await axios.post(`${AUTH_ENDPOINT}/register`, {
        ...values
      });
      console.log("data",data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducer: {
    logout: (state) => {
      state.status = "";
      state.error = "";
      state.user = {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
      };
    },
  changeStatus:(state,action)=>{
     state.status=action.payload;
  }

  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        console.log("action is here baby",action);
        console.log("Action.payload is here baby",action.payload);
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout,changeStatus } = userSlice.actions;
export default userSlice.reducer;
