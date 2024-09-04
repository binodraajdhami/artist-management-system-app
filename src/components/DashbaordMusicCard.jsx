import React, { useEffect, useState } from "react";
import { FaMusic } from "react-icons/fa";
import * as HttpClient from "./../utils/httpClient";

export default function DashbaordMusicCard() {
	const [musics, setMusics] = useState([]);

	const fetchMusics = () => {
		HttpClient.get("/musics", {}, true)
			.then((data) => {
				setMusics(data.data);
			})
			.catch();
	};

	useEffect(() => {
		fetchMusics();
	}, []);

	return (
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
	);
}
