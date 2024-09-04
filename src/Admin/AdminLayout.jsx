import React, { useRef, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useHoverDirty } from "react-use";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";

export default function AdminLayout() {
	const token = localStorage.getItem("token");

	const [isAsideExpand, setIsAsideExpand] = useState(false);
	const ref = useRef(null);
	const isHovering = useHoverDirty(ref);

	return token ? (
		<section className="relative h-screen">
			<header
				className={`p-4 fixed z-20 top-0 left-0 h-[50px] bg-gray-300 flex justify-between items-center transition-all ease-in-out ${
					isAsideExpand && !isHovering
						? "ml-[70px] w-[calc(100%-70px)]"
						: "ml-[275px] w-[calc(100%-275px)]"
				}`}
			>
				<button
					type="button"
					onClick={() => setIsAsideExpand(!isAsideExpand)}
				>
					{isAsideExpand && !isHovering ? (
						<FaTimes />
					) : (
						<FaBarsStaggered />
					)}
				</button>
				<AdminHeader />
			</header>
			<aside
				ref={ref}
				className={`admin-panel-aside fixed z-30 top-0 left-0 h-full bg-[#333644] transition-all ease-in-out overflow-y-auto ${
					isAsideExpand && !isHovering ? "w-[70px]" : "w-[275px]"
				}`}
			>
				<AdminSidebar
					isAsideExpand={isAsideExpand}
					isHovering={isHovering}
				/>
			</aside>
			<main
				className={`py-10 px-12 absolute z-10 top-[50px] left-0 h-[calc(100vh-50px)] bg-[#f5f6fa] transition-all ease-in-out ${
					isAsideExpand && !isHovering
						? "ml-[70px] w-[calc(100%-70px)]"
						: "ml-[275px] w-[calc(100%-275px)]"
				}`}
			>
				<Outlet />
			</main>
			<footer
				style={{ paddingTop: 20 }}
				className={`p-5 fixed z-20 bottom-0 left-0 h-[50px] bg-gray-300 flex justify-between items-center transition-all ease-in-out ${
					isAsideExpand && !isHovering
						? "ml-[75px] w-[calc(100%-75px)]"
						: "ml-[275px] w-[calc(100%-275px)]"
				}`}
			>
				<AdminFooter />
			</footer>
		</section>
	) : (
		<Navigate to="/auth/login" />
	);
}
