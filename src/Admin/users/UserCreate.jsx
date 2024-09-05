import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GotoBack from "../../components/GotoBack";

import * as HttpClient from "./../../utils/httpClient";
import * as notify from "./../../utils/toastifyMessage";

export default function UserCreate() {
	const navigate = useNavigate();
	const [isSubmitting, setSubmitting] = useState(false);

	const [formData, setFormData] = useState({
		first_name: null,
		last_name: null,
		email: null,
		password: null,
		phone: null,
		dob: null,
		gender: null,
		address: null,
		role: null,
	});
	const [formError, setFormError] = useState({
		firsNameError: null,
		lastNameError: null,
		emailError: null,
		passwordError: null,
		phoneError: null,
		dobError: null,
		genderError: null,
		addressError: null,
		roleError: null,
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleError = () => {
		setFormError({
			firsNameError:
				formData.first_name == null ? "First Name is required!" : null,
			lastNameError:
				formData.last_name == null ? "last_name is required!" : null,
			passwordError:
				formData.password == null ? "Password is required!" : null,
			emailError: formData.email == null ? "Email is required!" : null,
			phoneError: formData.phone == null ? "Phone is required!" : null,
			dobError:
				formData.dob == null ? "Date of Birth is required!" : null,
			genderError: formData.gender == null ? "Gender is required!" : null,
			addressError:
				formData.address == null ? "Address is required!" : null,
			roleError: formData.address == null ? "Role is required!" : null,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitting(true);
		handleError();
		if (
			formData.first_name != null &&
			formData.last_name != null &&
			formData.email != null &&
			formData.phone != null &&
			formData.address != null &&
			formData.password != null &&
			formData.gender != null &&
			formData.dob != null &&
			formData.role != null
		) {
			HttpClient.post("/auth/register", { body: formData })
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
		} else {
			setSubmitting(false);
		}
	};

	return (
		<div>
			<div className="border-b pb-3 mb-3">
				<GotoBack />
				<h1 className="text-xl font-bold">User Create</h1>
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
						/>
						{formError.firsNameError ? (
							<span className="p-2 px-3 text-white bg-red-400 w-full inline-block">
								{formError.firsNameError}
							</span>
						) : (
							""
						)}
					</div>
					<div className="col-span-6">
						<input
							type="text"
							className="block w-full p-3 border"
							name="last_name"
							placeholder="Last Name"
							onChange={handleChange}
						/>
						{formError.lastNameError ? (
							<span className="p-2 px-3 text-white bg-red-400 w-full inline-block">
								{formError.lastNameError}
							</span>
						) : (
							""
						)}
					</div>
					<div className="col-span-6">
						<input
							type="text"
							className="block w-full p-3 border"
							name="email"
							placeholder="Email"
							onChange={handleChange}
						/>
						{formError.emailError ? (
							<span className="p-2 px-3 text-white bg-red-400 w-full inline-block">
								{formError.emailError}
							</span>
						) : (
							""
						)}
					</div>
					<div className="col-span-6">
						<input
							type="text"
							className="block w-full p-3 border"
							name="password"
							placeholder="Password"
							onChange={handleChange}
						/>
						{formError.passwordError ? (
							<span className="p-2 px-3 text-white bg-red-400 w-full inline-block">
								{formError.passwordError}
							</span>
						) : (
							""
						)}
					</div>
					<div className="col-span-6">
						<input
							type="text"
							className="block w-full p-3 border"
							name="phone"
							placeholder="Phone"
							onChange={handleChange}
							minLength={10}
							maxLength={20}
						/>
						{formError.phoneError ? (
							<span className="p-2 px-3 text-white bg-red-400 w-full inline-block">
								{formError.phoneError}
							</span>
						) : (
							""
						)}
					</div>
					<div className="col-span-6">
						<input
							type="date"
							className="block w-full p-3 border"
							name="dob"
							onChange={handleChange}
						/>
						{formError.dobError ? (
							<span className="p-2 px-3 text-white bg-red-400 w-full inline-block">
								{formError.dobError}
							</span>
						) : (
							""
						)}
					</div>
					<div className="col-span-6">
						<select
							name="gender"
							onChange={handleChange}
							className="block w-full p-3 border"
						>
							<option value="">Select Gender</option>
							<option value="M">Male</option>
							<option value="F">Female</option>
							<option value="O">Other</option>
						</select>
						{formError.genderError ? (
							<span className="p-2 px-3 text-white bg-red-400 w-full inline-block">
								{formError.genderError}
							</span>
						) : (
							""
						)}
					</div>
					<div className="col-span-6">
						<select
							name="role"
							onChange={handleChange}
							className="block w-full p-3 border"
						>
							<option value="">Select Role</option>
							<option value="ARTIST">ARTIST</option>
							<option value="ARTIST_MANAGER">
								ARTIST_MANAGER
							</option>
							<option value="SUPER_ADMIN">SUPER_ADMIN</option>
						</select>
						{formError.roleError ? (
							<span className="p-2 px-3 text-white bg-red-400 w-full inline-block">
								{formError.roleError}
							</span>
						) : (
							""
						)}
					</div>
					<div className="col-span-12">
						<input
							type="tel"
							className="block w-full p-3 border"
							name="address"
							placeholder="Address"
							onChange={handleChange}
						/>
						{formError.addressError ? (
							<span className="p-2 px-3 text-white bg-red-400 w-full inline-block">
								{formError.addressError}
							</span>
						) : (
							""
						)}
					</div>
					<div className="col-span-12">
						<button
							disabled={isSubmitting}
							className="block bg-[#0b847a] px-9 w-full py-5 mt-5 rounded-lg text-white uppercase font-bold"
						>
							{isSubmitting ? (
								<>Submitting...</>
							) : (
								<>Create User</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
