import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// 404 | Page Not Found
import PageNotFound from "./404/PageNotFound";
import UnauthorizedPage from "./404/Unauthorized";

// auth
import AuthLayout from "./auth/AuthLayout";
import LoginPage from "./auth/Login";
import RegisterPage from "./auth/Register";

// Admin AdminLayout
import AdminLayout from "./Admin/AdminLayout";

// Admin Dashboard
import Dashboard from "./Admin/Dashboard";

// Users
import UserCreate from "./Admin/users/UserCreate";
import UserList from "./Admin/users/UserList";
import UserShow from "./Admin/users/UserShow";
import UserEdit from "./Admin/users/UserEdit";

// Artists
import MusictByArtist from "./Admin/artists/MusictByArtist";
import ArtistCreate from "./Admin/artists/ArtistCreate";
import ArtistList from "./Admin/artists/ArtistList";
import ArtistShow from "./Admin/artists/ArtistShow";
import ArtistEdit from "./Admin/artists/ArtistEdit";

// Musics
import MusicCreate from "./Admin/musics/MusicCreate";
import MusicList from "./Admin/musics/MusicList";
import MusicShow from "./Admin/musics/MusicShow";
import MusicEdit from "./Admin/musics/MusicEdit";

export default function AppRouting() {
	const [userRole, setUserRole] = useState("");
	const location = useLocation();
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("user"));
		setUserRole(data?.role);
	}, [location]);

	return (
		<Routes>
			<Route path="/" element={<Navigate to="/auth/login" />} />
			<Route element={<AuthLayout />}>
				<Route path="/auth/login" element={<LoginPage />} />
				<Route path="/auth/register" element={<RegisterPage />} />
			</Route>
			<Route element={<AdminLayout />}>
				<Route path="/admin/dashboard" element={<Dashboard />} />

				{/* ============================================ User Routes */}
				<Route
					path="/admin/users"
					element={
						userRole == "SUPER_ADMIN" ? (
							<UserList />
						) : (
							<UnauthorizedPage />
						)
					}
				/>
				<Route
					path="/admin/user/create"
					element={
						userRole == "SUPER_ADMIN" ? (
							<UserCreate />
						) : (
							<UnauthorizedPage />
						)
					}
				/>
				<Route
					path="/admin/users/:id"
					element={
						userRole == "SUPER_ADMIN" ? (
							<UserShow />
						) : (
							<UnauthorizedPage />
						)
					}
				/>
				<Route
					path="/admin/users/:id/edit"
					element={
						userRole == "SUPER_ADMIN" ? (
							<UserEdit />
						) : (
							<UnauthorizedPage />
						)
					}
				/>

				{/* ============================================ Artist Routes */}
				<Route path="/admin/artists" element={<ArtistList />} />
				<Route
					path="/admin/artist/create"
					element={
						userRole == "ARTIST_MANAGER" ? (
							<ArtistCreate />
						) : (
							<UnauthorizedPage />
						)
					}
				/>
				<Route
					path="/admin/artists/:id"
					element={
						userRole == "ARTIST_MANAGER" ? (
							<ArtistShow />
						) : (
							<UnauthorizedPage />
						)
					}
				/>
				<Route
					path="/admin/artists/:id/edit"
					element={
						userRole == "ARTIST_MANAGER" ? (
							<ArtistEdit />
						) : (
							<UnauthorizedPage />
						)
					}
				/>

				<Route
					path="/admin/artists/:id/musics"
					element={
						userRole == "SUPER_ADMIN" ||
						userRole == "ARTIST_MANAGER" ? (
							<MusictByArtist />
						) : (
							<UnauthorizedPage />
						)
					}
				/>

				{/* ============================================ Musc Routes */}
				<Route path="/admin/musics" element={<MusicList />} />
				<Route
					path="/admin/music/create"
					element={
						userRole == "ARTIST" ? (
							<MusicCreate />
						) : (
							<UnauthorizedPage />
						)
					}
				/>
				<Route
					path="/admin/musics/:id"
					element={
						userRole == "ARTIST" ? (
							<MusicShow />
						) : (
							<UnauthorizedPage />
						)
					}
				/>
				<Route
					path="/admin/musics/:id/edit"
					element={
						userRole == "ARTIST" ? (
							<MusicEdit />
						) : (
							<UnauthorizedPage />
						)
					}
				/>
			</Route>
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
}
