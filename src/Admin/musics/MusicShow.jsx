import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as HttpClient from "../../utils/httpClient";
import * as notify from "../../utils/toastifyMessage";
import GotoBack from "../../components/GotoBack";

export default function MusicShow() {
	const { id } = useParams();
	const [music, setMusic] = useState({});

	const fetchMusic = () => {
		HttpClient.get(`/musics/${id}`, {}, true)
			.then((data) => {
				setMusic(data.data.music);
			})
			.catch((err) => {
				notify.showError(err.response.data.message);
			});
	};

	useEffect(() => {
		fetchMusic();
	}, [id]);

	return (
		<div>
			<div className="border-b pb-3 mb-3">
				<GotoBack />
				<h1 className="text-xl font-bold">Music Details</h1>
			</div>
			<table className="table table-bordered mb-4 border-b pb-3">
				<thead>
					<tr>
						<th>Music Title</th>
						<td>{music.title}</td>
					</tr>
					<tr>
						<th>Album Name</th>
						<td>{music.album_name}</td>
					</tr>
					<tr>
						<th>Genre</th>
						<td>{music.genre}</td>
					</tr>
					<tr>
						<th>Artist Name</th>
						<td>{music.Artist?.name}</td>
					</tr>
				</thead>
			</table>
		</div>
	);
}
