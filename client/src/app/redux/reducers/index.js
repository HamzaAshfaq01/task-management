import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import taskReducer from './task.reducer';
import msgReducer from './message.reducer';
import loadingReducer from './loading.reducer';

const rootReducer = combineReducers({
	auth: authReducer,
	task: taskReducer,
	message: msgReducer,
	loading: loadingReducer,
});

export default rootReducer;