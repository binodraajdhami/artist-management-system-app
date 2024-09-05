import React, { useEffect, useState } from "react";
import * as HttpClient from "../../utils/httpClient";
import * as notify from "../../utils/toastifyMessage";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "./../../hooks/useQuery";
import {
	MdDelete,
	MdKeyboardDoubleArrowLeft,
	MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";
import GotoBack from "../../components/GotoBack";

export default function ArtistList() {
	const user = JSON.parse(localStorage.getItem("user"));
	const query = useQuery();
	const location = useLocation();

	const [artists, setArtist] = useState([]);
	const [metadata, setMetadata] = useState({});
	const [limit, setLimit] = useState(5);

	const handleDelete = (id) => {
		HttpClient.remove(`/artists/${id}`, {}, true)
			.then((data) => {
				if (data.data) {
					notify.showSuccess("Deleted Successful!");
					setArtist(artists.filter((user) => user.id !== id));
				}
			})
			.catch();
	};

	const fetchArtists = () => {
		HttpClient.get(
			`/artists?page=${
				query.get("page") ? query.get("page") : 1
			}&limit=${limit}`,
			{},
			true
		)
			.then((data) => {
				setArtist(data.data.artists);
				setMetadata(data.data.metadata);
			})
			.catch();
	};

	useEffect(() => {
		fetchArtists();
	}, [location.search, limit]);

	return (
		<div>
			<div className="border-b pb-3 mb-3">
				<GotoBack />
				<div className="flex justify-between items-center">
					<h1 className="text-xl font-bold">Artist List</h1>
					{user.role === "ARTIST_MANAGER" ? (
						<Link
							to="/admin/artist/create"
							className="btn btn-success text-white"
						>
							Create Artist
						</Link>
					) : (
						<></>
					)}
				</div>
			</div>
			<table className="table table-bordered mb-4 border-b pb-3">
				<thead>
					<tr>
						<th>SN</th>
						<th>Name</th>
						<th>First Release Year</th>
						<th>No of Albums Release</th>
						<th>Address</th>
						<th>Gender</th>
						<th>Date of Birth</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{artists.length > 0 &&
						artists.map((user, i) => {
							return (
								<tr key={i}>
									<td>{i + 1}</td>
									<td>{user.name}</td>
									<td>
										{new Date(
											user.first_release_year
										).toLocaleDateString()}
									</td>
									<td>{user.no_of_albums_release}</td>
									<td>{user.address}</td>
									<td>{user.gender}</td>
									<td>
										{new Date(
											user.dob
										).toLocaleDateString()}
									</td>
									<td className="flex justify-start items-center gap-1">
										<Link
											to={`/admin/artists/${user.id}/edit`}
											className="bg-green-500 py-3 px-4 text-white rounded-lg"
										>
											<FaEdit />
										</Link>
										<Link
											to={`/admin/artists/${user.id}`}
											className="bg-blue-500  py-3 px-4 text-white rounded-lg"
										>
											<FaEye />
										</Link>
										<button
											onClick={() =>
												handleDelete(user.id)
											}
											className="bg-red-500  py-3 px-4 text-white rounded-lg"
										>
											<MdDelete />
										</button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
			<div className="flex justify-between items-start gap-3">
				<div className="flex items-center gap-1 bg-slate-200 py-[15px] px-[10px] rounded-lg">
					<span>Show :</span>
					<select
						onChange={(e) => setLimit(e.target.value)}
						name="limit"
						className="bg-slate-200"
						defaultValue={limit}
					>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="15">15</option>
						<option value="20">20</option>
						<option value="30">30</option>
						<option value="40">40</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				</div>
				<div>
					<div className="flex justify-end items-center gap-1">
						{query.get("page") == 1 ? (
							<button
								disabled
								className={`inline-block ${
									query.get("page") == 1
										? "bg-blue-300"
										: "bg-slate-200"
								} py-[11px] px-[15px] rounded-lg`}
							>
								<MdKeyboardDoubleArrowLeft />
							</button>
						) : (
							<Link
								to={`/admin/artists?page=1`}
								className={`inline-block ${
									query.get("page") == 1
										? "bg-blue-300"
										: "bg-slate-200"
								} py-[11px] px-[15px] rounded-lg`}
							>
								<MdKeyboardDoubleArrowLeft />
							</Link>
						)}

						{[...Array(metadata.totalPages)].map((item, i) => {
							return (
								<Link
									key={i + 1}
									to={`/admin/artists?page=${i + 1}`}
									className={`inline-block ${
										query.get("page") == i + 1
											? "bg-blue-300"
											: "bg-slate-200"
									} py-[11px] px-[15px] rounded-lg`}
								>
									{i + 1}
								</Link>
							);
						})}
						{query.get("page") == metadata.totalPages ? (
							<button
								disabled
								className={`inline-block bg-blue-300 py-[11px] px-[15px] rounded-lg`}
							>
								<MdKeyboardDoubleArrowRight />
							</button>
						) : (
							<Link
								to={`/admin/artists?page=${metadata.totalPages}`}
								className={`inline-block bg-slate-200 py-[11px] px-[15px] rounded-lg`}
							>
								<MdKeyboardDoubleArrowRight />
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
