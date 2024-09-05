import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GotoBack from "../../components/GotoBack";

import * as HttpClient from "./../../utils/httpClient";
import * as notify from "./../../utils/toastifyMessage";

export default function MusicEdit() {
	const user = JSON.parse(localStorage.getItem("user"));
	const navigate = useNavigate();
	const { id } = useParams();
	const [isSubmitting, setSubmitting] = useState(false);

	const [formData, setFormData] = useState({
		artist_id: user.id,
		title: "",
		album_name: "",
		genre: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitting(true);
		HttpClient.put(`/musics/${id}`, { body: formData }, true)
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
	};

	const fetchMusic = () => {
		HttpClient.get(`/musics/${id}`, {}, true)
			.then((data) => {
				setFormData({
					artist_id: data.data.music.artist_id,
					title: data.data.music.title,
					album_name: data.data.music.album_name,
					genre: data.data.music.genre,
				});
			})
			.catch();
	};

	useEffect(() => {
		fetchMusic();
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
							value={formData.title}
						/>
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
							value={formData.album_name}
						/>
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
							value={formData.genre}
						>
							<option value="">Select Genre</option>
							<option value="RNB">RNB</option>
							<option value="COUNTRY">COUNTRY</option>
							<option value="CLASSIC">CLASSIC</option>
							<option value="ROCK">ROCK</option>
							<option value="JAZZ">JAZZ</option>
						</select>
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
