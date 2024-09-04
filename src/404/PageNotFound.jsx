import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
	const navigate = useNavigate();

	return (
		<div className="w-screen h-screen bg-[#30b6a3] flex justify-center items-center flex-col">
			<h1 className="text-white text-[36px] font-extrabold">
				404 | Page Not Found !
			</h1>
			<button
				onClick={() => navigate(-1)}
				className="bg-white py-4 px-12 mt-4 rounded-full uppercase text--xl font-extrabold text-slate-800"
			>
				Go to back
			</button>
		</div>
	);
}
