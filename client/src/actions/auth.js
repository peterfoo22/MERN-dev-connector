import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR} from './types';
import { setAlert } from './alert';
import  setAuthToken from '../utils/setAuthToken';

import axios from 'axios';

//Load User

export const loadUser = () => async (dispatch) => {

	if (localStorage.token){
		setAuthToken(localStorage.token);
	}

	try {
		
		const res = await axios.get('http://localhost:5001/api/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (err) {

		dispatch({
			type: AUTH_ERROR
		})
	}

}

//Register User
export const register = ({name, email, password}) => async dispatch => {
 

  const newBody = JSON.stringify({name, email, password});
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

  try {
     const url = "http://localhost:5001/api/users";

		 const res = await axios.post(url, newBody, config);

		 console.log(res.data);

		 dispatch({
			 type:REGISTER_SUCCESS,
			 payload: res.data
		 });
		 
  } catch (err) {

		const errors = err.response.data.errors;

		console.log("errors have occured")

		if(errors) {
			errors.forEach(error => {
			  dispatch(setAlert(error.msg,'danger'))
			});
		}

		dispatch({
			type: REGISTER_FAIL
		});
    
  }

}
