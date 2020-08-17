import { combineReducers } from 'redux';
import authReducer from "./auth";
const appReducer = combineReducers({
    authReducer,
});

const rootReducer = (state={}, action) => {
    return appReducer(state, action)
}

export default rootReducer;