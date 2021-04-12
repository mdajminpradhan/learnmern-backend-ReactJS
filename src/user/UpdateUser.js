import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth/helper/index';
import { getUser, updateuser } from './coreapicalls/apicalls';

function UpdateUser({ match, history }) {
	const [ values, setValues ] = useState({
		firstname: '',
		lastname: '',
		email: '',
		gender: '',
		password: '',
		error: false,
		success: false
	});

	const { token } = isAuthenticated();

	const { firstname, lastname, email, gender, password, error, success } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const preload = (userid, token) => {
		getUser(userid, token)
			.then((data) => {
				setValues({
					...values,
					firstname: data.firstname,
					lastname: data.lastname,
					email: data.email,
					gender: data.gender,
					password: '',
					success: false
				});

				console.log(data);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		preload(match.params.userid, token);
	}, []);

	const onSubmit = (event) => {
		event.preventDefault();

		updateuser({ firstname, lastname, email, gender, password }, match.params.userid, token)
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
					console.log(data.error);
				} else {
					history.push('/user/dashboard');
				}
			})
			.catch((error) => console.log('Error in signup', error));
	};

	const updateform = () => {
		return (
			<Fragment>
				<div className="form">
					<form onSubmit={onSubmit}>
						<div className="mb-3">
							<label htmlFor="firstname" className="form-label text-white">
								First name
							</label>
							<input
								type="firstname"
								className="form-control"
								value={firstname}
								onChange={handleChange('firstname')}
								id="firstname"
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="lastname" className="form-label text-white">
								Last name
							</label>
							<input
								type="lastname"
								className="form-control"
								value={lastname}
								onChange={handleChange('lastname')}
								id="lastname"
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="email" className="form-label text-white">
								Email address {gender}
							</label>
							<input
								type="email"
								className="form-control"
								value={email}
								onChange={handleChange('email')}
								id="email"
							/>
						</div>
						<div className="row my-4">
							<div className="col-md-4">
								<div className="form-check">
									<input
										className="form-radio-input"
										type="radio"
										name="gender"
										value="male"
										checked={gender == 'male' ? true : ''}
										onChange={handleChange('gender')}
										id="male"
									/>
									<label className="form-check-label text-white" htmlFor="male">
										Male
									</label>
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-check">
									<input
										className="form-radio-input"
										type="radio"
										name="gender"
										value="female"
										checked={gender == 'female' ? true : ''}
										onChange={handleChange('gender')}
										id="female"
									/>
									<label className="form-check-label text-white" htmlFor="female">
										Female
									</label>
								</div>
							</div>
						</div>
						<div className="mb-3">
							<label htmlFor="password" className="form-label text-white">
								Password
							</label>
							<input
								type="password"
								className="form-control"
								value={password}
								onChange={handleChange('password')}
								id="password"
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							Update
						</button>

						<Link to="/user/dashboard" className="text-secondary text-decoration-none d-block mt-3">
							Back to dashboard
						</Link>
					</form>
				</div>
				{/* <p className="text-white text-center mt-4">{JSON.stringify(values)}</p> */}
			</Fragment>
		);
	};

	const errormessage = () => {
		return error ? <p className="text-danger text-center">{error}</p> : null;
	};

	const succesmessage = () => {
		return success ? (
			<p className="text-success text-center">Your account is being created successfully...</p>
		) : null;
	};

	return (
		<div>
			{updateform()}
			{errormessage()}
			{succesmessage()}
		</div>
	);
}

export default UpdateUser;
