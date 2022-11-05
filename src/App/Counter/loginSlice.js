// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInWithEmailAndPassword, registerWithEmailAndPassword, signInWithGoogle,} from "../../firebase";

export const getLogin = createAsyncThunk(
  "login/getLogin",
  async (formValues) => {
    try {
      const req = await logInWithEmailAndPassword(
        formValues.email,
        formValues.password
      );
      localStorage.setItem('credential', JSON.stringify(req.user.accessToken))
      localStorage.setItem('name', JSON.stringify(req.user.displayName))
      setTimeout(() => {
        window.location.reload(1);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  }
);

// if (msg) {
//   setTimeout(() => {
//     setMsg("");
//   }, 10000);
// }

export const getLoginGoogle = createAsyncThunk(
  "loginGoogle/getLoginGoogle",
  async () => {
    try {
      const req = await signInWithGoogle();
      console.log(req)
      localStorage.setItem('credential', JSON.stringify(req.accessToken))
      localStorage.setItem('name', JSON.stringify(req.displayName));
      setTimeout(() => {
        window.location.reload(1)
      }, 1500)
    } catch(error) {
      console.error(error)
    }
  }
);

export const getUserRegist = createAsyncThunk(
  "userRegist/getUserRegist",
  async (formValues) => {
    try {
      const res = await registerWithEmailAndPassword(formValues.name, formValues.email, formValues.password)
      localStorage.setItem('credential', JSON.stringify(res.accessToken));
      localStorage.setItem('name', JSON.stringify(res.displayName))
      setTimeout(() => {
        window.location.reload(1)
      }, 1500)
    } catch (error) {
      console.log("error");
    }
  }
);

export const loginSlice = createSlice({
  name: "user",
  initialState: {
    login: null,
    loginGoogle: null,
    userRegist: null,
  },
  reducers: {
    login: (state, Action) => {
      state.login = Action.payload;
    },
    register: (state, Action) => {
      state.userRegist = Action.payload;
    },
  },
  extraReducers: {
    [getLogin.fulfilled]: (state, { payload }) => {
      state.login = payload;
    },
    [getLoginGoogle.fulfilled]: (state, { payload }) => {
      state.loginGoogle = payload;
    },
    [getLoginGoogle.fulfilled]: (state, { payload }) => {
      state.loginGoogle = payload;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
