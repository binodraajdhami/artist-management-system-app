import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GotoBack from "../../components/GotoBack";

import * as HttpClient from "./../../utils/httpClient";
import * as notify from "./../../utils/toastifyMessage";

export default function ArtistEdit() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [artist, setArtist] = useState({});
	const [isSubmitting, setSubmitting] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		dob: "",
		gender: "",
		address: "",
		first_release_year: "",
		no_of_albums_release: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitting(true);
		HttpClient.put(`/artists/${id}`, { body: formData }, true)
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
	};

	const fetchArtist = () => {
		HttpClient.get(`/artists/${id}`, {}, true)
			.then((data) => {
				setArtist(data.data.artist);
				setFormData({
					name: data.data.artist.name,
					first_release_year: data.data.artist.first_release_year,
					no_of_albums_release: data.data.artist.no_of_albums_release,
					dob: data.data.artist.dob,
					gender: data.data.artist.gender,
					address: data.data.artist.address,
				});
			})
			.catch();
	};

	useEffect(() => {
		fetchArtist();
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
							value={formData.name}
						/>
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
							type={formData.first_release_year ? "text" : "date"}
							className="block w-full p-3 border"
							name="first_release_year"
							onChange={handleChange}
							value={
								formData.first_release_year
									? new Date(
											formData.first_release_year
									  ).toLocaleDateString()
									: ""
							}
						/>
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
							value={formData.no_of_albums_release}
						/>
					</div>
					<div className="col-span-6">
						<label htmlFor="dob" className="block mb-2 text-lg">
							Date of Birth
						</label>
						<input
							id="dob"
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
						<label htmlFor="gender" className="block mb-2 text-lg">
							Gender
						</label>
						<select
							id="gender"
							name="gender"
							onChange={handleChange}
							value={formData.gender}
							className="block w-full p-3 border"
						>
							<option value="">Select Gender</option>
							<option value="M">Male</option>
							<option value="F">Female</option>
							<option value="O">Other</option>
						</select>
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
								<>Update Artist</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
