import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as HttpClient from "../../utils/httpClient";
import * as notify from "../../utils/toastifyMessage";
import GotoBack from "../../components/GotoBack";

export default function UserShow() {
	const { id } = useParams();
	const [user, setUser] = useState({});

	const fetchUsers = () => {
		HttpClient.get(`/users/${id}`, {}, true)
			.then((data) => {
				setUser(data.data.user);
			})
			.catch((err) => {
				notify.showError(err.response.data.message);
			});
	};

	useEffect(() => {
		fetchUsers();
	}, [id]);

	return (
		<div>
			<div className="border-b pb-3 mb-3">
				<GotoBack />
				<h1 className="text-xl font-bold">User Details</h1>
			</div>
			<table className="table table-bordered mb-4 border-b pb-3">
				<thead>
					<tr>
						<th>First Name</th>
						<td>{user.first_name}</td>
					</tr>
					<tr>
						<th>Last Name</th>
						<td>{user.last_name}</td>
					</tr>
					<tr>
						<th>Email</th>
						<td>{user.email}</td>
					</tr>
					<tr>
						<th>Phone</th>
						<td>{user.phone}</td>
					</tr>
					<tr>
						<th>Address</th>
						<td>{user.addrerss}</td>
					</tr>
					<tr>
						<th>Gender</th>
						<td>{user.gender}</td>
					</tr>
					<tr>
						<th>Birth Date</th>
						<td>{new Date(user.dob).toLocaleDateString()}</td>
					</tr>
				</thead>
			</table>
		</div>
	);
}
