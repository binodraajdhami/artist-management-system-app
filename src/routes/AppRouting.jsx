import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AuthRouting from "./AuthRouting";
import LoginPage from "../auth/Login";
import RegisterPage from "../auth/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import AdminRouting from "./AdminRouting";
import Dashboard from "../AdminPanel/Dashboard";

export default function AppRouting() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/auth/login" />} />
			<Route element={<AuthRouting />}>
				<Route path="/auth/login" element={<LoginPage />} />
				<Route path="/auth/register" element={<RegisterPage />} />
			</Route>
			<Route element={<AdminRouting />}>
				<Route path="/admin/dashboard" element={<Dashboard />} />
			</Route>
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
}
