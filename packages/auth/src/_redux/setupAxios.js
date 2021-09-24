import { actions } from './authRedux';
// import * as user from 'app/modules/UserProfile/_redux/userRedux'
import { LOGIN_URL } from './authCrud';
import { ParseJwt } from "../_helpers"

export function setupAxios(axios, store) {

	axios.defaults.baseURL = "https://api-beta.clara.team/"

	// REQUEST
	axios.interceptors.request.use(

		config => {
			const {
				auth: { authToken }
			} = store.getState()

			if (authToken.bearerToken && authToken.bearerToken !== '') {
				config.headers.Authorization = `${authToken.bearerToken}`;
			}
			return config
		},
		err => Promise.reject(err)
	);

	// RESPONSE
	axios.interceptors.response.use(response => {

		let authToken = {}
		if (response.config.url === LOGIN_URL) {
			authToken = ParseJwt(JSON.parse(response.headers.jwt).bearerToken)
		} else {
			authToken = store.getState().auth.authToken;
		}
		return response;

	}, error => {

		const { response } = error;

		if (response.status == 401 || response.data.message === "Unauthorized") {
			// store.dispatch(user.actions.deleteInitialData())
			store.dispatch(actions.logoutComplete())
		}
		return Promise.reject(error);
	});
}

