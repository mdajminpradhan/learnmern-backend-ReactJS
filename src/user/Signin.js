import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { authenticate, isAuthenticated, signin } from '../auth/helper/index';

function Signin() {
	const [ values, setValues ] = useState({
		email: '',
		password: '',
		error: '',
		success: false
	});

	const { email, password, error, success } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const onSubmit = (event) => {
		event.preventDefault();

		signin({ email, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
					console.log(data.error);
				} else {
					console.log(data);
					authenticate(data, () => {
						setValues({
							...values,
							email: '',
							password: '',
							success: true
						});
					});
				}
			})
			.catch((error) => console.log('Error in signup', error));
	};

	if (isAuthenticated()) {
		return <Redirect to="/user/dashboard" />;
	}

	const errormessage = () => {
		return error ? <p className="text-danger text-center">{error}</p> : null;
	};

	const succesmessage = () => {
		return success ? <Redirect to="/user/dashboard" /> : null;
	};

	const signinform = () => {
		return (
			<Fragment>
				<div className="form">
					<form onSubmit={onSubmit}>
						<div className="mb-3">
							<label htmlFor="email" className="form-label text-white">
								Email address
							</label>
							<input
								type="email"
								className="form-control"
								value={email}
								onChange={handleChange('email')}
								id="email"
							/>
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
						<Link to="/signup" className="text-secondary text-decoration-none d-block mb-4">
							Don't have any account?
						</Link>
						<button type="submit" className="btn btn-primary">
							Sign in
						</button>
					</form>
				</div>
				{/* <p className="text-white text-center mt-4">{JSON.stringify(values)}</p> */}
			</Fragment>
		);
	};

	return (
		<div>
			{signinform()}
			{errormessage()}
			{succesmessage()}
		</div>
	);
}

export default Signin;
