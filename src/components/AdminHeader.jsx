import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useHoverDirty } from "react-use";
import { FaRegUserCircle, FaCog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

export default function AdminHeader() {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("user"));

	const ref = useRef(null);
	const isHovering = useHoverDirty(ref);

	const handleLogout = () => {
		localStorage.clear();
		navigate("/auth/login");
	};

	return (
		<header>
			<div ref={ref} className="relative h-[50px] flex items-center">
				<div className="flex justify-end items-center gap-2 cursor-pointer">
					<FaRegUserCircle />
					{user.first_name}
				</div>
				<div
					className={`absolute top-[50px] right-0 ${
						isHovering ? "block" : "hidden"
					} py-5 w-[200px] bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all ease-linear z-[9999]`}
				>
					<ul>
						<li>
							<button
								onClick={handleLogout}
								className="flex items-center gap-1 px-6 text-slate-500 hover:text-slate-800"
							>
								<MdLogout />
								<span>Logout</span>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
}
