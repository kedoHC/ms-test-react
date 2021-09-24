import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./authRedux";

const appReducer = combineReducers({
	auth: auth.reducer,
});


export const rootReducer = (state, action) => {
	return appReducer(state, action);
}

export function* rootSaga() {
	yield all([
		auth.saga(),
	])
}
