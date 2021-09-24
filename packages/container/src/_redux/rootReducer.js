import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as container from "./containerRedux";

const appReducer = combineReducers({
	container: container.reducer,
});


export const rootReducer = (state, action) => {
	// when a logout action is dispatched it will reset redux state


	//? REVISAR AQUI, COMO MANEJAR ESTA CONDICIONAL

	// if (action.type === auth.actionTypes.LogoutComplete) {
	// 	// we keep a reference of the keys we want to maintain
	// 	// other keys will be passed as undefined and this will call
	// 	// reducers with an initial state
	// 	const { auth, user } = state;
	// 	state = { auth, user };
	// }
	return appReducer(state, action);
};

export function* rootSaga() {
	yield all([
		container.saga(),
	])
}
