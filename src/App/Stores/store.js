import {
  configureStore
} from "@reduxjs/toolkit";
import loginSlice from "../Counter/loginSlice";
import moviesSlice from "../Counter/movieSlice";
import genresSlice from "../Counter/genresSlice";
import search from "../Counter/searchSlice";
import detailSlice from "../Counter/detailSlice";
import auth from "../Counter/auth";
import firebaseSlice from "../Counter/firebaseSlice";
// import Alert from "../../components/Alert";

export const store = configureStore({
  reducer: {
    user: loginSlice,
    firebase: firebaseSlice,
    movies: moviesSlice,
    genre: genresSlice,
    search: search,
    detail: detailSlice,
    auth: auth,
    // Alert: Alert,
  },
});