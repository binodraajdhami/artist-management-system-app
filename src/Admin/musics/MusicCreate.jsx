import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GotoBack from "../../components/GotoBack";

import * as HttpClient from "../../utils/httpClient";
import * as notify from "../../utils/toastifyMessage";

export default function MusicCreate() {
	const user = JSON.parse(localStorage.getItem("user"));
	const navigate = useNavigate();
	const [isSubmitting, setSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		artist_id: user.id,
		title: null,
		album_name: null,
		genre: null,
	});
	const [formError, setFormError] = useState({
		titleError: null,
		albumNameError: null,
		genreError: null,
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleError = () => {
		setFormError({
			titleError: formData.title == null ? "Title is required!" : null,
			albumNameError:
				formData.album_name == null ? "Albums name is required!" : null,
			genreError: formData.genre == null ? "Genre is required!" : null,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitting(true);
		handleError();
		if (
			formData.title != null &&
			formData.album_name != null &&
			formData.genre != null
		) {
			HttpClient.post("/musics", { body: formData }, true)
				.then((data) => {
					setSubmitting(false);
					if (data.hasOwnProperty("err")) {
						notify.showError(data.err.msg);
						return;
					}
					if (data.data) {
						notify.showSuccess("Created Successful!");
						navigate("/admin/musics");
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
				<h1 className="text-xl font-bold">Music Create</h1>
			</div>
			<div>
				<form
					className="w-full grid grid-cols-12 gap-[20px]"
					onSubmit={handleSubmit}
				>
					<div className="col-span-12">
						<label htmlFor="title" className="block mb-2 text-lg">
							Music Title
						</label>
						<input
							id="title"
							type="text"
							className="block w-full p-3 border"
							name="title"
							placeholder="Music Title"
							onChange={handleChange}
						/>
						{formError.titleError ? (
							<span className="p-2 px-3 text-white bg-red-400 w-full inline-block">
								{formError.titleError}
							</span>
						) : (
							""
						)}
					</div>
					<div className="col-span-6">
						<label
							htmlFor="album_name"
							className="block mb-2 text-lg"
						>
							Album Name
						</label>
						<input
							id="album_name"
							type="text"
							className="block w-full p-3 border"
							name="album_name"
							placeholder="Album Name"
							onChange={handleChange}
						/>
						{formError.albumNameError ? (
							<span className="p-2 px-3 text-white bg-red-400 w-full inline-block">
								{formError.albumNameError}
							</span>
						) : (
							""
						)}
					</div>
					<div className="col-span-6">
						<label htmlFor="genre" className="block mb-2 text-lg">
							Genre
						</label>
						<select
							id="genre"
							name="genre"
							onChange={handleChange}
							className="block w-full p-3 border"
						>
							<option value="">Select Genre</option>
							<option value="RNB">RNB</option>
							<option value="COUNTRY">COUNTRY</option>
							<option value="CLASSIC">CLASSIC</option>
							<option value="ROCK">ROCK</option>
							<option value="JAZZ">JAZZ</option>
						</select>
						{formError.genderError ? (
							<span className="p-2 px-3 text-white bg-red-400 w-full inline-block">
								{formError.genderError}
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
