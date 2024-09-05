import React from "react";
import { useNavigate } from "react-router-dom";

export default function GotoBack() {
	const navigate = useNavigate();
	return (
		<button
			onClick={() => navigate(-1)}
			className="bg-slate-700 py-2 px-4 mb-4 rounded-full text-sm text-white"
		>
			Go to back
		</button>
	);
}
