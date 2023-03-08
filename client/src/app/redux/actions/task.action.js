import axios from "../../utils/axios";
import { getCookie } from "../../utils/auth";
import { returnMessage } from "./message.action";
import { setLoading, clearLoading } from "./loading.action";
import {
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,
  GET_USER_TASK_SUCCESS,
  GET_TASK_DETAIL_SUCCESS,
  GET_MSG,
  GET_ERROR,
  CLEAR_MSG,
} from "../constants";

// createTask ACTION
export const createTask = (body) => async (dispatch) => {
  const token = getCookie("token");
  try {
    dispatch(setLoading(true));

    const { data } = await axios.post("/create/task", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
      console.log(error, "task creation error");
      dispatch({
        type: GET_ERROR,
        payload: error,
      });
    }
    dispatch(clearLoading(false));
  }
};
// getUserTaks ACTION
export const getUserTasks = () => async (dispatch) => {
  const token = getCookie("token");
  try {
    dispatch(setLoading(true));

    const { data } = await axios.get("/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(clearLoading(false));
    dispatch({
      type: GET_USER_TASK_SUCCESS,
      payload: data.tasks,
    });
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
// Get Task Detail ACTION
export const getTaskDetail = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const { data } = await axios.get(`/task/${id}`);

    dispatch(clearLoading(false));
    dispatch({
      type: GET_TASK_DETAIL_SUCCESS,
      payload: data.taskDetail,
    });
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
