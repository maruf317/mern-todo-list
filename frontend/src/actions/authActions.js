import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types";

// Check token and load user.
export const loadUser = () => (dispatch, getState) => {
  // User loading.
  dispatch({ type: USER_LOADING });

  // res.data should be an object with token, user info etc.
  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Setup config/headers and token.
export const tokenConfig = (getState) => {
  // Get token from local storage.
  const token = getState().auth.token;

  // Cofnigure headers.
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers.
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
