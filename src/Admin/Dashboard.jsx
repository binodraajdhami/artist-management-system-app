import React from "react";

import DashbaordUserCard from "../components/DashbaordUserCard";
import DashbaordArtistCard from "../components/DashbaordArtistCard";
import DashbaordMusicCard from "../components/DashbaordMusicCard";

export default function Dashboard() {
	const user = JSON.parse(localStorage.getItem("user"));

	return (
		<div>
			<div className="mb-[30px]">
				<h1>Dashbaord</h1>
			</div>
			<div className="grid grid-cols-12 gap-[30px]">
				{user.role == "SUPER_ADMIN" && (
					<div className="col-span-4">
						<DashbaordUserCard />
					</div>
				)}
				{(user.role == "SUPER_ADMIN" ||
					user.role == "ARTIST_MANAGER") && (
					<div className="col-span-4">
						<DashbaordArtistCard />
					</div>
				)}
				{(user.role == "SUPER_ADMIN" || user.role == "ARTIST") && (
					<div className="col-span-4">
						<DashbaordMusicCard />
					</div>
				)}
			</div>
		</div>
	);
}
