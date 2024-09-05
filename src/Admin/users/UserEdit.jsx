import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GotoBack from "../../components/GotoBack";

import * as HttpClient from "./../../utils/httpClient";
import * as notify from "./../../utils/toastifyMessage";

export default function UserEdit() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [isSubmitting, setSubmitting] = useState(false);

	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		phone: "",
		dob: "",
		gender: "",
		address: "",
		role: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitting(true);
		HttpClient.put(`/users/${id}`, { body: formData }, true)
			.then((data) => {
				setSubmitting(false);
				if (data.hasOwnProperty("err")) {
					notify.showError(data.err.msg);
					return;
				}
				if (data.data) {
					notify.showSuccess("Created Successful!");
					navigate("/admin/users");
				}
			})
			.catch((err) => {
				setSubmitting(false);
				notify.showError(err.response.data.msg);
			});
	};

	const fetchUsers = () => {
		HttpClient.get(`/users/${id}`, {}, true)
			.then((data) => {
				setFormData({
					first_name: data.data.user.first_name,
					last_name: data.data.user.last_name,
					email: data.data.user.email,
					phone: data.data.user.phone,
					dob: data.data.user.dob,
					gender: data.data.user.gender,
					address: data.data.user.address,
					role: data.data.user.role,
				});
			})
			.catch();
	};

	useEffect(() => {
		fetchUsers();
	}, [id]);

	return (
		<div>
			<div className="border-b pb-3 mb-3">
				<GotoBack />
				<h1 className="text-xl font-bold">User Edit</h1>
			</div>
			<div>
				<form
					className="w-full grid grid-cols-12 gap-[20px]"
					onSubmit={handleSubmit}
				>
					<div className="col-span-6">
						<input
							type="text"
							className="block w-full p-3 border"
							name="first_name"
							placeholder="First Name"
							onChange={handleChange}
							value={formData.first_name}
						/>
					</div>
					<div className="col-span-6">
						<input
							type="text"
							className="block w-full p-3 border"
							name="last_name"
							placeholder="Last Name"
							onChange={handleChange}
							value={formData.last_name}
						/>
					</div>
					<div className="col-span-6">
						<input
							type="text"
							className="block w-full p-3 border"
							name="email"
							placeholder="Email"
							onChange={handleChange}
							value={formData.email}
						/>
					</div>
					<div className="col-span-6">
						<input
							type="text"
							className="block w-full p-3 border"
							name="password"
							placeholder="Password"
							onChange={handleChange}
						/>
					</div>
					<div className="col-span-6">
						<input
							type="tel"
							className="block w-full p-3 border"
							name="phone"
							placeholder="Phone"
							onChange={handleChange}
							value={formData.phone}
						/>
					</div>
					<div className="col-span-6">
						<input
							type={formData.dob ? "text" : "date"}
							className="block w-full p-3 border"
							name="dob"
							onChange={handleChange}
							value={
								formData.dob
									? new Date(
											formData.dob
									  ).toLocaleDateString()
									: ""
							}
						/>
					</div>
					<div className="col-span-6">
						<select
							name="gender"
							onChange={handleChange}
							value={formData.gender}
							className="block w-full p-3 border"
						>
							<option value="M">Male</option>
							<option value="F">Female</option>
							<option value="O">Other</option>
						</select>
					</div>
					<div className="col-span-6">
						<select
							name="role"
							onChange={handleChange}
							value={formData.role}
							className="block w-full p-3 border"
						>
							<option value="ARTIST">ARTIST</option>
							<option value="ARTIST_MANAGER">
								ARTIST_MANAGER
							</option>
							<option value="SUPER_ADMIN">SUPER_ADMIN</option>
						</select>
					</div>
					<div className="col-span-12">
						<input
							type="text"
							className="block w-full p-3 border"
							name="address"
							placeholder="Address"
							onChange={handleChange}
							value={formData.address}
						/>
					</div>
					<div className="col-span-12">
						<button
							disabled={isSubmitting}
							className="block bg-[#0b847a] px-9 w-full py-5 mt-5 rounded-lg text-white uppercase font-bold"
						>
							{isSubmitting ? (
								<>Submitting...</>
							) : (
								<>Update User</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
