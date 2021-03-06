import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { isAuthenticated, signup } from '../auth/helper/index';

function Signup() {
	const [ values, setValues ] = useState({
		firstname: '',
		lastname: '',
		email: '',
		gender: '',
		password: '',
		error: false,
		success: false
	});

	const { firstname, lastname, email, gender, password, error, success } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const onSubmit = (event) => {
		event.preventDefault();

		signup({ firstname, lastname, email, gender, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
					console.log(data.error);
				} else {
					setValues({
						...values,
						firstname: '',
						lastname: '',
						email: '',
						gender: '',
						password: '',
						success: true
					});
				}
			})
			.catch((error) => console.log('Error in signup', error));
	};

	if (isAuthenticated()) {
		return <Redirect to="/user/dashboard" />;
	}

	const signupform = () => {
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
						<div className="row my-4">
							<div className="col-md-4">
								<div className="form-check">
									<input
										className="form-radio-input"
										type="radio"
										name="gender"
										value="male"
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
						<Link to="/signin" className="text-secondary text-decoration-none d-block mb-4">
							Already have an account?
						</Link>
						<button type="submit" className="btn btn-primary">
							Sign up
						</button>
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
			{signupform()}
			{errormessage()}
			{succesmessage()}
		</div>
	);
}

export default Signup;
