import {REGISTER_SUCCESS, REGISTER_FAIL} from './types';
import { setAlert } from './alert';

import axios from 'axios';

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
