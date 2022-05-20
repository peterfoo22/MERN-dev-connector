import axios from "axios";
//import { setAlert } from "./alert";

import {
  GET_PROFILE,
  PROFILE_ERROR
} from './types';

// Get current users profile

export const getCurrentProfiles = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5001/api/auth/me'); 

    dispatch(
      {
        type: GET_PROFILE,
        payload: res.data
      }
    );

  } catch (err) {

    dispatch(
      {
        type: PROFILE_ERROR,
        payload: {msg:err.response.status.text, status: err.response.status}
      }
    )
    
  }
}