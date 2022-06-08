import axios from "axios";
import { setAlert } from "./alert";
import {
	DELETE_POST,
	GET_POSTS,
	POST_ERROR,
	UPDATE_LIKES,
	ADD_POST,
} from "./types";

//get posts

export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get("http://localhost:5001/api/posts");

		console.log("Success- ALL POSTS", res.data);

		dispatch({
			type: GET_POSTS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//ADD LIKES

export const addLike = (postID) => async (dispatch) => {
	try {
		// could not use the axios.post command as it as not working, used the fetch command instead
		await fetch(`http://localhost:5001/api/posts/like/${postID}`, {
			method: "PUT", // or 'PUT'
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"x-auth-token": `${localStorage.token}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					response.json();
				}
				dispatch(setAlert("Already Liked", "Fail"));

				return Promise.reject(response);
			})
			.then((data) => {
				dispatch({
					type: UPDATE_LIKES,
					payload: { postID, likes: data },
				});

				dispatch(setAlert("Like Added", "Success"));
			})
			.catch((error) => {});
	} catch (err) {
		console.error("Error:", err);
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.status.text,
				status: err.response.status,
			},
		});
	}
};

export const removeLike = (postID) => async (dispatch) => {
	try {
		const res = await axios.put(
			`http://localhost:5001/api/posts/unlike/${postID}`
		);

		console.log("Success- Added Unlike Likee", res.data);

		dispatch({
			type: UPDATE_LIKES,
			payload: { postID, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//delete posts

export const deletePost = (postID) => async (dispatch) => {
	// could not use the axios.post command as it as not working, used the fetch command instead
	await fetch(`http://localhost:5001/api/posts/${postID}`, {
		method: "DELETE", // or 'PUT'
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			"x-auth-token": `${localStorage.token}`,
		},
	})
		.then((response) => {
			if (response.ok) {
				response.json();
			}

			dispatch(setAlert("Not Authorized", "Fail"));

			return Promise.reject(response);
		})
		.then((data) => {
			dispatch({
				type: DELETE_POST,
				payload: postID,
			});

			dispatch(setAlert("Post Removed", "success"));
		})
		.catch((error) => {
			dispatch({
				type: POST_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status,
				},
			});
		});
};

export const addPost = (formData) => async (dispatch) => {
	// could not use the axios.post command as it as not working, used the fetch command instead
	await fetch(`http://localhost:5001/api/posts/`, {
		method: "POST", // or 'PUT'
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			"x-auth-token": `${localStorage.token}`,
		},
		body: JSON.stringify(formData),
	})
		.then((response) => {
			if (response.ok) {
				response.json();
			}
		})
		.then((data) => {
			dispatch({
				type: ADD_POST,
				payload: data,
			});

			dispatch(setAlert("Post Created", "success"));
		})
};
