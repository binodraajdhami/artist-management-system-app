import React from "react";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
	const navigate = useNavigate();
	return (
		<div className="">
			<h1 className="text-red-600 text-[36px] font-extrabold">
				Unauthorized
			</h1>
			<button
				onClick={() => navigate(-1)}
				className="bg-red-600 py-4 px-12 mt-4 rounded-full uppercase text-xl font-extrabold text-slate-100"
			>
				Go to back
			</button>
		</div>
	);
}
