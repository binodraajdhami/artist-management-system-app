import React, { useEffect, useState } from "react";
import { FaGuitar, FaUsers, FaMusic } from "react-icons/fa";
import * as HttpClient from "../utils/httpClient";

export default function Dashboard() {
	const [users, setUsers] = useState([]);
	const [musics, setMusics] = useState([]);
	const [artits, setArtits] = useState([]);

	const fetchUsers = () => {
		HttpClient.get("/users", {}, true)
			.then((data) => {
				setUsers(data.data);
			})
			.catch();
	};

	const fetchMusics = () => {
		HttpClient.get("/musics", {}, true)
			.then((data) => {
				setMusics(data.data);
			})
			.catch();
	};

	const fetchArtits = () => {
		HttpClient.get("/artists", {}, true)
			.then((data) => {
				setArtits(data.data);
			})
			.catch();
	};

	useEffect(() => {
		fetchUsers();
		fetchMusics();
		fetchArtits();
	}, []);

	return (
		<div>
			<div className="mb-[30px]">
				<h1>Dashbaord</h1>
			</div>
			<div className="grid grid-cols-12 gap-[30px]">
				<div className="col-span-4">
					<div className="flex justify-between bg-white rounded-[15px] p-6 border border-dashed border-slate-300 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
						<div>
							<span className="text-[#666] font-bold text-[18px]">
								Users
							</span>
							<h4 className="text-[#056464] font-bold text-[30px]">
								{users.length}
							</h4>
							<p className="text-[#666] font-light">
								<span>Previous Month</span>
								<span className="bg-[#056464] bg-opacity-10 py-1 px-2 ml-2 text-[10px] rounded-lg font-bold">
									+6.2%
								</span>
							</p>
						</div>
						<div className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-[#056464] text-white text-xl">
							<FaUsers />
						</div>
					</div>
				</div>
				<div className="col-span-4">
					<div className="flex justify-between bg-white rounded-[15px] p-6 border border-dashed border-slate-300 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
						<div>
							<span className="text-[#666] font-bold text-[18px]">
								Artits
							</span>
							<h4 className="text-[#fac10f] font-bold text-[30px]">
								{artits.length}
							</h4>
							<p className="text-[#666] font-light">
								<span>Previous Month</span>
								<span className="bg-[#fac10f] bg-opacity-10 py-1 px-2 ml-2 text-[10px] rounded-lg font-bold">
									+6.2%
								</span>
							</p>
						</div>
						<div className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-[#fac10f] text-white text-xl">
							<FaGuitar />
						</div>
					</div>
				</div>
				<div className="col-span-4">
					<div className="flex justify-between bg-white rounded-[15px] p-6 border border-dashed border-slate-300 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
						<div>
							<span className="text-[#666] font-bold text-[18px]">
								Musics
							</span>
							<h4 className="text-[#0fb450] font-bold text-[30px]">
								{musics.length}
							</h4>
							<p className="text-[#666] font-light">
								<span>Previous Month</span>
								<span className="bg-[#0fb450] bg-opacity-10 py-1 px-2 ml-2 text-[10px] rounded-lg font-bold">
									+6.2%
								</span>
							</p>
						</div>
						<div className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-[#0fb450] text-white text-xl">
							<FaMusic />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
