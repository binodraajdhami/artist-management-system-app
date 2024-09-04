import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as HttpClient from "../utils/httpClient";
import * as notify from "../utils/toastifyMessage";

export default function RegisterPage() {
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
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitting(true);
		handleError();
		if (formData.email != null && formData.password != null) {
			HttpClient.post("/auth/register", { body: formData })
				.then((data) => {
					setSubmitting(false);
					if (data.hasOwnProperty("err")) {
						notify.showError(data.err.msg);
						return;
					}
					if (data.data) {
						notify.showSuccess("Register Successful!");
						navigate("/auth/login");
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
		<div className="w-screen min-h-screen bg-[#30b6a3] flex justify-center items-center">
			<div className="w-[500px] bg-white rounded-xl p-8">
				<h1 className="text-[#0b847a] text-4xl font-semibold text-center mb-8">
					Register
				</h1>
				<form className="w-full" onSubmit={handleSubmit}>
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
					<input
						type="text"
						className="block w-full p-3 border mt-5"
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
					<input
						type="text"
						className="block w-full p-3 border mt-5"
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
					<input
						type="text"
						className="block w-full p-3 border mt-5"
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
					<input
						type="tel"
						className="block w-full p-3 border mt-5"
						name="phone"
						placeholder="Phone"
						onChange={handleChange}
					/>
					{formError.phoneError ? (
						<span className="p-2 px-3 text-white bg-red-400 w-full inline-block">
							{formError.phoneError}
						</span>
					) : (
						""
					)}
					<input
						type="date"
						className="block w-full p-3 border mt-5"
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
					<select
						name="gender"
						onChange={handleChange}
						className="block w-full p-3 border mt-5"
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
					<input
						type="tel"
						className="block w-full p-3 border mt-5"
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
					<p className="text-slate-500 text-[18px] mt-3">
						Already have an account ?{" "}
						<Link to={"/auth/login"} className="text-[#0b847a]">
							Login
						</Link>
					</p>
					<button
						disabled={isSubmitting}
						className="block bg-[#0b847a] px-9 w-full py-5 mt-5 rounded-lg text-white uppercase font-bold"
					>
						{isSubmitting ? <>Submitting...</> : <>Sigin Up</>}
					</button>
				</form>
			</div>
		</div>
	);
}
