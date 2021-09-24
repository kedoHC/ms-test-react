import axios from "axios";
export const LOGIN_URL = "credentials/login";
export const REFRESH_TOKEN_URL = "credentials/refresh";
export const LOGOUT_URL = "credentials/logout";
export const REQUEST_PASSWORD_URL = "user/rstPasswd";
export const RESET_PASSWORD_URL = "user/rstPasswd";
export const ME_URL = "user";

export const REGISTER_URL = "company";
export const VALIDATE_EMAIL_TOKEN = "user/validateToken";
export const RESEND_EMAIL_TOKEN = "user/resendToken";

export function login(email, password) {
	return axios.post(LOGIN_URL, { user: email, passwd: password });
}

export function refreshTokenAsync(refreshToken) {
	return axios.post(REFRESH_TOKEN_URL, refreshToken );
}

export function register(email) {
	return axios.post(REGISTER_URL, { email });
}

export function requestPassword(email, captchaResponse) {
	return axios.post(REQUEST_PASSWORD_URL,
		{
			username: email
		}, {
		headers: {
			'captcha-response': captchaResponse
		}
	});
}

export function resetPassword(newPasswd, token) {
	return axios.put(RESET_PASSWORD_URL, { newPasswd, token, sendEmail: true });
}

export function validateEmailToken(token, type, userUUID) {
	return axios.post(VALIDATE_EMAIL_TOKEN, { token, type, userUUID })
}

export function resendEmailTokenAsync(token, type, userUUID) {
	return axios.post(RESEND_EMAIL_TOKEN, { token, type, userUUID })
}

export function activateAccount(newPasswd, token) {
	return axios.put(RESET_PASSWORD_URL, { newPasswd, token, sendEmail: false });
}

export function requestLogout() {
	// Authorization head should be fulfilled in interceptor.
	return axios.delete(LOGOUT_URL);
}
