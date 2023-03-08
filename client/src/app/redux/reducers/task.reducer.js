import {
  GET_USER_TASK_SUCCESS,
  GET_TASK_DETAIL_SUCCESS,
} from "../constants";

const initialState = {
	tasks: [],
	task: {},
};

const AuthReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_USER_TASK_SUCCESS:
			return {
				...state,
				tasks: payload,
			};
		case GET_TASK_DETAIL_SUCCESS:
			return {
				...state,
				task: payload,
			};

		default:
			return state;
	}
};

export default AuthReducer;