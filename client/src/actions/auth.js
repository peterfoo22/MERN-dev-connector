import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

import axios from "axios";

//Load User

export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get("/api/auth");
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

//Register User
export const register =
	({ name, email, password }) =>
	async (dispatch) => {
		const newBody = JSON.stringify({ name, email, password });
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const url = "/api/users";

			const res = await axios.post(url, newBody, config);

			console.log(res.data);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});

			dispatch(loadUser());
		} catch (err) {
			const errors = err.response.data.errors;

			console.log("errors have occured");

			if (errors) {
				errors.forEach((error) => {
					dispatch(setAlert(error.msg, "danger"));
				});
			}

			dispatch({
				type: REGISTER_FAIL,
			});
		}
	};

//Login User
export const login = (email, password) => async (dispatch) => {
	const newBody = JSON.stringify({ email, password });
	const config = {
		headers: {
			"Content-Type": "application/json",
					},
	};

	try {
		const url = "/api/auth";

		const res = await axios.post(url, newBody, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, "danger"));
			});
		}

		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

//LOG OUT / CLEAR PROFILE

export const logout = () => (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT });
};
