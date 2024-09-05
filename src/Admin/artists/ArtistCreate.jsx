import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GotoBack from "../../components/GotoBack";

import * as HttpClient from "../../utils/httpClient";
import * as notify from "../../utils/toastifyMessage";

export default function ArtistCreate() {
	const navigate = useNavigate();
	const [isSubmitting, setSubmitting] = useState(false);

	const [formData, setFormData] = useState({
		name: null,
		dob: null,
		gender: null,
		address: null,
		first_release_year: null,
		no_of_albums_release: null,
	});
	const [formError, setFormError] = useState({
		nameError: null,
		dobError: null,
		genderError: null,
		addressError: null,
		firstReleaseYearError: null,
		noOfAlbumsReleaseError: null,
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleError = () => {
		setFormError({
			nameError: formData.name == null ? "Name is required!" : null,
			firstReleaseYearError:
				formData.first_release_year == null
					? "First release year is required!"
					: null,
			noOfAlbumsReleaseError:
				formData.password == null
					? "No of albums release is required!"
					: null,
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
		if (
			formData.name != null &&
			formData.first_release_year != null &&
			formData.no_of_albums_release != null &&
			formData.gender != null &&
			formData.dob != null &&
			formData.address != null
		) {
			HttpClient.post("/artists", { body: formData }, true)
				.then((data) => {
					setSubmitting(false);
					if (data.hasOwnProperty("err")) {
						notify.showError(data.err.msg);
						return;
					}
					if (data.data) {
						notify.showSuccess("Created Successful!");
						navigate("/admin/artists");
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
						<label htmlFor="name" className="block mb-2 text-lg">
							Artist Name
						</label>
						<input
							id="name"
							type="text"
							className="block w-full p-3 border"
							name="name"
							placeholder="Name"
							onChange={handleChange}
						/>
						{formError.nameError ? (
							<span className="p-2 px-3 text-white bg-red-400 w-full inline-block">
								{formError.nameError}
							</span>
						) : (
							""
						)}
					</div>
					<div className="col-span-6">
						<label
							htmlFor="first_release_year"
							className="block mb-2 text-lg"
						>
							First Release Year
						</label>
						<input
							id="first_release_year"
							type="date"
							className="block w-full p-3 border"
							name="first_release_year"
							onChange={handleChange}
						/>
						{formError.firstReleaseYearError ? (
							<span className="p-2 px-3 text-white bg-red-400 w-full inline-block">
								{formError.firstReleaseYearError}
							</span>
						) : (
							""
						)}
					</div>
					<div className="col-span-6">
						<label
							htmlFor="no_of_albums_release"
							className="block mb-2 text-lg"
						>
							No of Albums Release
						</label>
						<input
							id="no_of_albums_release"
							type="number"
							min={1}
							className="block w-full p-3 border"
							name="no_of_albums_release"
							placeholder="No of Albums Release"
							onChange={handleChange}
							value={1}
						/>
						{formError.no_of_albums_release ? (
							<span className="p-2 px-3 text-white bg-red-400 w-full inline-block">
								{formError.no_of_albums_release}
							</span>
						) : (
							""
						)}
					</div>
					<div className="col-span-6">
						<label htmlFor="dob" className="block mb-2 text-lg">
							Date of Birth
						</label>
						<input
							id="dob"
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
						<label htmlFor="gender" className="block mb-2 text-lg">
							Gender
						</label>
						<select
							id="gender"
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
						<label htmlFor="address" className="block mb-2 text-lg">
							Address
						</label>
						<input
							id="address"
							type="text"
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
								<>Create Artist</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
