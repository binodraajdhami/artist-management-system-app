import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// 404 | Page Not Found
import PageNotFound from "./404/PageNotFound";

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
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/auth/login" />} />
			<Route element={<AuthLayout />}>
				<Route path="/auth/login" element={<LoginPage />} />
				<Route path="/auth/register" element={<RegisterPage />} />
			</Route>
			<Route element={<AdminLayout />}>
				<Route path="/admin/dashboard" element={<Dashboard />} />
				<Route path="/admin/user/create" element={<UserCreate />} />
				<Route path="/admin/users" element={<UserList />} />
				<Route path="/admin/users/:id" element={<UserShow />} />
				<Route path="/admin/users/:id/edit" element={<UserEdit />} />
				<Route path="/admin/artist/create" element={<ArtistCreate />} />
				<Route path="/admin/artists" element={<ArtistList />} />
				<Route path="/admin/artists/:id" element={<ArtistShow />} />
				<Route
					path="/admin/artists/:id/edit"
					element={<ArtistEdit />}
				/>
				<Route path="/admin/music/create" element={<MusicCreate />} />
				<Route path="/admin/musics" element={<MusicList />} />
				<Route path="/admin/musics/:id" element={<MusicShow />} />
				<Route path="/admin/musics/:id/edit" element={<MusicEdit />} />
			</Route>
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
}
