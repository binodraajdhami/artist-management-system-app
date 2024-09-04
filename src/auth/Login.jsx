import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as HttpClient from "../utils/httpClient";
import * as notify from "../utils/toastifyMessage";

export default function LoginPage() {
	const navigate = useNavigate();
	const [isSubmitting, setSubmitting] = useState(false);

	const [formData, setFormData] = useState({
		email: null,
		password: null,
	});
	const [formError, setFormError] = useState({
		emailError: null,
		passwordError: null,
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleError = () => {
		setFormError({
			emailError: formData.email == null ? "Email is required!" : null,
			passwordError:
				formData.password == null ? "Password is required!" : null,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		handleError();
		if (formData.email != null && formData.password != null) {
			console.log(formData);

			HttpClient.post("/auth/login", { body: formData })
				.then((data) => {
					setSubmitting(false);
					if (data.hasOwnProperty("err")) {
						notify.showError(data.err.msg);
						return;
					}
					if (data.data) {
						notify.showSuccess("Login Successful!");
						localStorage.setItem("token", data.data.token);
						navigate("/admin/dashboard");
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
		<div className="w-screen h-screen bg-[#30b6a3] flex justify-center items-center">
			<div className="w-[500px] bg-white rounded-xl p-8">
				<h1 className="text-[#0b847a] text-4xl font-semibold text-center mb-8">
					Login
				</h1>
				<form className="w-full" onSubmit={handleSubmit}>
					<input
						type="text"
						className="block w-full p-5 border"
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
						className="block w-full p-5 border  mt-8"
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
					<p className="text-slate-500 text-[18px] mt-3">
						Don't have an account ?{" "}
						<Link to={"/auth/register"} className="text-[#0b847a]">
							Register
						</Link>
					</p>
					<button
						disabled={isSubmitting}
						className="block bg-[#0b847a] px-9 w-full py-5 mt-5 rounded-lg text-white uppercase font-bold"
					>
						{isSubmitting ? <>Submitting...</> : <>Sigin In</>}
					</button>
				</form>
			</div>
		</div>
	);
}
