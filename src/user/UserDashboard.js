import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth/helper';
import { accountdelete, getAllUser } from './coreapicalls/apicalls';

function UserDashboard() {
	const { token } = isAuthenticated();

	const [ users, setUsers ] = useState([]);

	const [ error, setError ] = useState('');

	const preload = () => {
		getAllUser(token)
			.then((data) => {
				if (data.error) {
					setError(data.error);
				} else {
					setUsers(data);
				}
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		preload();
	}, []);

	const deleteUser = (userid) => {
		accountdelete(userid, token).then(() => preload()).catch((error) => console.log(error));
	};

	const errormessage = () => {
		return <p className="text-danger text-center">{error}</p>;
	};

	return (
		<Fragment>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container">
					<a className="navbar-brand" href="#">
						Navbar
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ms-auto">
							<li className="nav-item active">
								<a className="nav-link" href="#">
									Home
								</a>
							</li>
							<li className="nav-item">
								<a
									className="nav-link"
									onClick={() =>
										signout(() => {
											<Redirect to="/signin" />;
										})}
									href="#"
								>
									Signout
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<div className="container">
				{errormessage()}
				<div className="w-75 mx-auto mt-5">
					<table className="table table-dark table-hover text-center">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Name</th>
								<th scope="col">Email address</th>
								<th scope="col">Gender</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user, index) => {
								return (
									<tr key={index}>
										<th scope="row">{index + 1}</th>
										<td>{`${user.firstname} ${user.lastname}`}</td>
										<td>{user.email}</td>
										<td>{user.gender}</td>
										<td>
											<Link to={`/user/update/${user._id}`} className="btn btn-primary btn-sm">
												Update
											</Link>
											<button
												onClick={() => {
													deleteUser(user._id);
												}}
												className="btn btn-danger delete btn-sm"
											>
												Delete
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</Fragment>
	);
}

export default UserDashboard;
