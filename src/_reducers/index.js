import { combineReducers } from 'redux';
import authReducer from "./auth";
import gameReducer from "./game";

const appReducer = combineReducers({
    authReducer,
    gameReducer,
});

const rootReducer = (state={}, action) => {
    return appReducer(state, action)
}

export default rootReducer;