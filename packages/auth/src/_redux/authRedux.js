import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import {
	requestLogout,
	validateEmailToken,
	resendEmailTokenAsync,
	refreshTokenAsync
} from "./authCrud";

// import { ParseJwt } from "_metronic/_helpers"

export const actionTypes = {

	Login: "[Login] Action",

	Logout: "[Logout] Action",
	LogoutComplete: "[Logout] Action Completed",

	Register: "[Register] Action",

	ValidateEmailToken: "VALIDATE__EMAIL__TOKEN",
	ValidateEmailTokenComplete: "VALIDATE__EMAIL__TOKEN__COMPLETE",
	ValidateEmailTokenError: "VALIDATE__EMAIL__TOKEN__ERROR",

	ResendEmailToken: "RESEND_EMAIL_TOKEN",
	ResendEmailTokenComplete: "RESEND_EMAIL_TOKEN_COMPLETE",
	ResendEmailTokenError: "RESEND_EMAIL_TOKEN_ERROR",

	RefreshToken: "REFRESH__TOKEN",
	RefreshTokenComplete: "REFRESH__TOKEN__COMPLETE",
	RefreshTokenError: "REFRESH__TOKEN__ERROR",

};

const initialAuthState = {
	authToken: {},
	emailTokenStatus: 'initial',
	resendTokenStatus: 'initial',
	resetPasswdToken: '',
	isUpdating: false,
	emailTokenErrorCode: "",
	bookkeeper: false
};

export const reducer = persistReducer(
	{ storage, key: "v01-clara-auth", whitelist: ["authToken", "bookkeeper"] },
	(state = initialAuthState, action) => {
		switch (action.type) {
			case actionTypes.Login: {
				let { authToken, response } = action.payload;

				authToken = JSON.parse(authToken)
				return {
					...state,
					authToken: {
						...state.authToken,
						...authToken,
						// exp: ParseJwt(authToken.bearerToken).exp
					},
					bookkeeper: response.bookkeeperEnabled,
					// bookkeeper: false
				};
			}

			case actionTypes.Register: {
				const { authToken } = action.payload;
				return { authToken };
			}

			case actionTypes.LogoutComplete: {
				return initialAuthState;
			}

			// -------------------------------------
			// -------------------------------------
			// -------------------------------------

			case actionTypes.ValidateEmailTokenComplete: {
				const { resetPasswdToken } = action.payload;
				return {
					...state,
					emailTokenStatus: 'success',
					resetPasswdToken
				};
			}

			case actionTypes.ValidateEmailTokenError: {

				const { status } = action.payload

				return {
					...state,
					emailTokenStatus: status,
				};

			}
			// -------------------------------------
			// -------------------------------------
			// -------------------------------------
			
			case actionTypes.ResendEmailTokenComplete: {
				return {
					...state,
					resendTokenStatus: 'success'
				};
			}

			case actionTypes.ResendEmailTokenError: {
				return {
					...state,
					resendTokenStatus: 'error'
				};
			}

			case actionTypes.RefreshToken: {
				return {
					...state,
					isUpdating: true,
				};
			}

			case actionTypes.RefreshTokenComplete: {
				const { authToken } = action.payload;
				return {
					...state,
					authToken: {
						...state.authToken,
						...authToken,
						// exp: ParseJwt(authToken.bearerToken).exp
					},
					isUpdating: false,
				};
			}
			default:
				return state;
		}
	}
);

export const actions = {

	login: response => {
		const { headers, data } = response;
		return { type: actionTypes.Login, payload: { authToken: headers.jwt, response: data } }
	},
	register: authToken => ({
		type: actionTypes.Register,
		payload: { authToken }
	}),
	logout: () => {
		return { type: actionTypes.Logout }
	},
	logoutComplete: () => (
		{ type: actionTypes.LogoutComplete }
	),
	validateEmailToken: (emailToken, type, uuid) => ({
		type: actionTypes.ValidateEmailToken,
		payload: { emailToken, type, uuid }
	}),
	validateEmailTokenComplete: resetPasswdToken => ({
		type: actionTypes.ValidateEmailTokenComplete,
		payload: { resetPasswdToken }
	}),
	validateEmailTokenError: (status) => (
		{ type: actionTypes.ValidateEmailTokenError, payload: { status } }
	),
	resendEmailToken: (emailToken, type, uuid) => (
		{ type: actionTypes.ResendEmailToken, payload: { emailToken, type, uuid } }
	),
	resendEmailTokenComplete: () => (
		{ type: actionTypes.ResendEmailTokenComplete }
	),
	resendEmailTokenError: () => (
		{ type: actionTypes.ResendEmailTokenError }
	),
	refreshTokenAction: refreshToken => (
		{ type: actionTypes.RefreshToken, payload: { refreshToken } }
	),
	refreshTokenActionComplete: authToken => ({
		type: actionTypes.RefreshTokenComplete, payload: { authToken }
	}),
};

export function* saga() {

	yield takeLatest(actionTypes.Register, function* registerSaga() {
		yield put(actions.requestUser());
	});

	yield takeLatest(actionTypes.ValidateEmailToken, function* validateEmailTokenSaga({ payload }) {
		try {
			const { data } = yield validateEmailToken(payload.emailToken, payload.type, payload.uuid);
			yield put(actions.validateEmailTokenComplete(data.resetPasswdToken));

		} catch (e){
			yield put(actions.validateEmailTokenError("error"))
		}
	});

	yield takeLatest(actionTypes.ResendEmailToken, function* resendEmailTokenSaga({ payload }) {
		try {
			const { data } = yield resendEmailTokenAsync(payload.emailToken, payload.type, payload.uuid);
			yield put(actions.resendEmailTokenComplete(data));
		} catch {
			yield put(actions.resendEmailTokenError());
		}
	});

	yield takeLatest(actionTypes.RefreshToken, function* refreshTokenSaga({ payload }) {
		try {
			const { data } = yield refreshTokenAsync(payload);
			yield put(actions.refreshTokenActionComplete(data));
		} catch (e){
			console.log('no se pudo refrescar el token')
			// console.log( e.response )
			// yield put(actions.refreshTokenError());
			//TODO; CONSULTAR QUE HACER EN ESTE CASO 
		}
	});

	yield takeLatest(actionTypes.Logout, function* logoutSaga() {
		try {
			const { data } = yield requestLogout();
			yield put(actions.logoutComplete(data));
		} catch {
			console.log('error en el  logout ')
			yield put(actions.logoutComplete());
		}
	});
}
