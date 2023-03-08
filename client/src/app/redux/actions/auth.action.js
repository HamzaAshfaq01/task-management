import axios from "../../utils/axios";
import { getCookie } from "../../utils/auth";
import { returnMessage } from "./message.action";
import { setLoading, clearLoading } from "./loading.action";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  RESET_SUCCESS,
  RESET_FAIL,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  GET_MSG,
  GET_ERROR,
  CLEAR_MSG,
  TOKEN_EXPIRE,
} from "../constants";

import { encryptData, decryptData } from "../../utils/crypto.util";

// REGIGSTER ACTION
export const register = (values, resetForm) => async (dispatch) => {
  let body = {
    name: encryptData(values.first_name),
    email: encryptData(values.email),
    password: encryptData(values.new_password),
  };
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post("/register", body);
    dispatch(clearLoading(false));
    dispatch({ type: GET_MSG, payload: data.message });
    resetForm();
  } catch (err) {
    if (err.response) {
      const {
        response: {
          data: { error },
        },
      } = err;
      dispatch({
        type: GET_ERROR,
        payload: error,
      });
    }

    dispatch(clearLoading(false));
  }
};
// Activation Action
export const activateAccount = (value, _router) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post("/activation", { token: value });
    const { token, message } = data;
    dispatch({
      type: REGISTER_SUCCESS,
      payload: token,
    });
    dispatch(clearLoading(false));
    dispatch({ type: GET_MSG, payload: message });
    _router("/login");
  } catch (err) {
    console.log(err);
    if (err.response) {
      const {
        response: {
          data: { error },
        },
      } = err;
      dispatch({
        type: GET_ERROR,
        payload: error,
      });
    }
    dispatch(clearLoading(false));
    dispatch({
      type: REGISTER_FAIL,
    });
    _router("/register");
  }
};
// LOGIN WITH GOOGLE
export const googlelogin = (tokenId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const { data } = await axios.post(`/googlelogin`, {
      idToken: tokenId,
    });
    console.log(data, "loghh");
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    dispatch(clearLoading(false));
    dispatch({ type: GET_MSG, payload: data.message });
  } catch (err) {
    if (err.response) {
      const {
        response: {
          data: { error },
        },
      } = err;
      dispatch({
        type: GET_ERROR,
        payload: error,
      });
    }
    dispatch(clearLoading(false));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
// LOGIN WITH FACEBOOK
export const facebooklogin = (userID, accessToken) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const { data } = await axios.post(`/facebooklogin`, {
      userID,
      accessToken,
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    dispatch(clearLoading(false));
    dispatch({ type: GET_MSG, payload: data.message });
  } catch (err) {
    if (err.response) {
      const {
        response: {
          data: { error },
        },
      } = err;
      dispatch({
        type: GET_ERROR,
        payload: error,
      });
    }
    dispatch(clearLoading(false));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
// LOGIN ACTION
export const login = (values, resetForm, _router) => async (dispatch) => {
  let body = {
    email: encryptData(values.email),
    password: encryptData(values.password),
  };
  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(`/login`, body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    dispatch(clearLoading(false));
    dispatch({ type: GET_MSG, payload: data.message });
    resetForm();
    _router("/user/profile");
  } catch (err) {
    if (err.response) {
      const {
        response: {
          data: { error },
        },
      } = err;
      dispatch({
        type: GET_ERROR,
        payload: error,
      });
    }
    dispatch(clearLoading(false));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
// FORGOT PASSWORD ACTION
export const forgotpassword = (email) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.put("/forgotpassword", {
      email: encryptData(email),
    });
    dispatch(clearLoading());
    dispatch({ type: GET_MSG, payload: data.message });
  } catch (err) {
    if (err.response) {
      const {
        response: {
          data: { error },
        },
      } = err;
      dispatch({
        type: GET_ERROR,
        payload: error,
      });
    }
    dispatch(clearLoading(false));
  }
};
// RESET PASSWORD ACTION
export const resetpassword = (values, _router) => async (dispatch) => {
  let body = {
    password1: encryptData(values.new_password),
  };
  try {
    dispatch(setLoading());

    const { data } = await axios.put(`/resetpassword/${values.token}`, body);

    dispatch({
      type: RESET_SUCCESS,
      payload: true,
    });
    dispatch(clearLoading());
    dispatch({ type: GET_MSG, payload: data.message });
    _router("/auth/login");
  } catch (err) {
    dispatch({
      type: RESET_FAIL,
      payload: false,
    });
    if (err.response) {
      const {
        response: {
          data: { error },
        },
      } = err;
      dispatch({
        type: GET_ERROR,
        payload: error,
      });
    }
    dispatch(clearLoading(false));
  }
};
// Update User Profile
export const updateProfile = (userID, values) => async (dispatch) => {
  const token = getCookie("token");
  let body = {
    old_password: encryptData(values.old_password),
    password: encryptData(values.new_password),
  };
  try {
    dispatch(setLoading());

    const { data } = await axios.put(`/user/${userID}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { message } = data;
    // dispatch({
    //   type: PROFILE_UPDATE_SUCCESS,
    //   payload: user,
    // });
    dispatch(clearLoading());
    dispatch({ type: GET_MSG, payload: message });
  } catch (err) {
    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload: false,
    });
    if (err.response) {
      const {
        response: {
          data: { error },
        },
      } = err;
      dispatch({
        type: GET_ERROR,
        payload: error,
      });
    }
    dispatch(clearLoading(false));
  }
};
// LOGOUT ACTION
export const logout = (_router) => (dispatch) => {
  dispatch({
    type: GET_MSG,
    payload: "Logout Successfull",
  });
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  _router("/auth/login");
};
export const expireToken = () => (dispatch) => {
  dispatch({
    type: TOKEN_EXPIRE,
  });
};
