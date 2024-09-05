import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as HttpClient from "../../utils/httpClient";
import * as notify from "../../utils/toastifyMessage";
import GotoBack from "../../components/GotoBack";

export default function MusictByArtist() {
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
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-xl font-bold">
							Artist : {artist.name}
						</h1>
					</div>
					<div>
						<h1 className="text-xl font-bold">
							Total Music : {artist.Music?.length}
						</h1>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-12 gap-[30px]">
				{artist.Music?.length > 0 &&
					artist.Music.map((music, index) => (
						<div key={index} className="col-span-3">
							<div className="p-6 bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
								<h4 className="font-bold border-b pb-2 ">
									{music.title}
								</h4>
								<table className="table table-bordered mb-4 border-b pb-3">
									<thead>
										<tr>
											<th>Album :</th>
											<td>{music.album_name}</td>
										</tr>
										<tr>
											<th>Genre :</th>
											<td>{music.genre}</td>
										</tr>
										<tr>
											<th>Created At :</th>
											<td>
												{new Date(
													music.created_at
												).toLocaleDateString()}
											</td>
										</tr>
										<tr>
											<th>Updated At :</th>
											<td>
												{new Date(
													music.updated_at
												).toLocaleDateString()}
											</td>
										</tr>
									</thead>
								</table>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
