import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import * as HttpClient from "./../utils/httpClient";
import { Link } from "react-router-dom";

export default function DashbaordUserCard() {
	const [users, setUsers] = useState([]);

	const fetchUsers = () => {
		HttpClient.get("/users", {}, true)
			.then((data) => {
				setUsers(data.data.users);
			})
			.catch();
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<div className="flex justify-between bg-white rounded-[15px] p-6 border border-dashed border-slate-300 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
			<div>
				<span className="text-[#666] font-bold text-[18px]">Users</span>
				<h4 className="text-[#056464] font-bold text-[30px]">
					{users?.length}
				</h4>
				<p className="text-[#666] font-light">
					<Link
						to="/admin/users"
						className="btn bg-[#0fb450] text-black px-5 py-2"
					>
						View Details
					</Link>
				</p>
			</div>
			<div className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-[#056464] text-white text-xl">
				<FaUsers />
			</div>
		</div>
	);
}
