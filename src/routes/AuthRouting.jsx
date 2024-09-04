import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthRouting() {
	let token = localStorage.getItem("token");
	return token ? <Navigate to="/admin/dashboard" /> : <Outlet />;
}
