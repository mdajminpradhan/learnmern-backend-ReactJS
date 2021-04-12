import { API } from '../../backend';

export const getAllUser = (token) => {
	return fetch(`${API}/users`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => response.json())
		.catch((error) => console.log(error));
};

export const getUser = (userid, token) => {
	return fetch(`${API}/user/${userid}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
		.then((response) => response.json())
		.catch((error) => console.log(error));
};

export const updateuser = (user, userid, token) => {
	return fetch(`${API}/updateuser/${userid}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(user)
	})
		.then((response) => response.json())
		.catch((error) => console.log(error));
};

export const accountdelete = (userid, token) => {
	return fetch(`${API}/account/delete/${userid}`, {
		method: 'DELETE',
		
		headers: {
			Authorization: `Bearer ${token}`
		}

	})
	.then((response) => response.json())
	.catch((error) => console.log(error));
};
