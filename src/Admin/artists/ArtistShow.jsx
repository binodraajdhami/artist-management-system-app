import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as HttpClient from "../../utils/httpClient";
import * as notify from "../../utils/toastifyMessage";
import GotoBack from "../../components/GotoBack";

export default function ArtistShow() {
	const { id } = useParams();
	const [artist, setArtist] = useState({});

	const fetchArtist = () => {
		HttpClient.get(`/artists/${id}`, {}, true)
			.then((data) => {
				setArtist(data.data.artist);
			})
			.catch((err) => {
				notify.showError(err.response.data.message);
			});
	};

	useEffect(() => {
		fetchArtist();
	}, [id]);

	return (
		<div>
			<div className="border-b pb-3 mb-3">
				<GotoBack />
				<h1 className="text-xl font-bold">Artist Details</h1>
			</div>
			<table className="table table-bordered mb-4 border-b pb-3">
				<thead>
					<tr>
						<th>Name</th>
						<td>{artist.name}</td>
					</tr>
					<tr>
						<th>First Release Year</th>
						<td>
							{new Date(
								artist.first_release_year
							).toLocaleDateString()}
						</td>
					</tr>
					<tr>
						<th>No of Albums Release</th>
						<td>{artist.no_of_albums_release}</td>
					</tr>
					<tr>
						<th>Address</th>
						<td>{artist.address}</td>
					</tr>
					<tr>
						<th>Gender</th>
						<td>{artist.gender}</td>
					</tr>
					<tr>
						<th>Birth Date</th>
						<td>{new Date(artist.dob).toLocaleDateString()}</td>
					</tr>
				</thead>
			</table>
		</div>
	);
}
