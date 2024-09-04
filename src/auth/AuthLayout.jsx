import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthLayout() {
	let token = localStorage.getItem("token");
	return token ? <Navigate to="/admin/dashboard" /> : <Outlet />;
}
