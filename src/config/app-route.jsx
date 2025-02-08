/* eslint-disable react/prop-types */
import Login from "../pages/auth/Login";
import Profile from "../pages/profile/Profile";
import HomePage from "../pages/homepage/HomePage";
import NotFound from "../pages/not-found/NotFound";
import Register from "../pages/auth/Register";
import DiaryPage from "../pages/diaries/DiaryPage";
import { Navigate } from "react-router";
import { getToken } from "./generalHelper";
import CreateDiaryPage from "../pages/diaries/CreateDiaryPage";

const isAuthenticated = () => !!getToken();

// Protect routes using a wrapper
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

// Redirect logged-in users away from login/register
const GuestRoute = ({ element }) => {
  return isAuthenticated() ? <Navigate to="/" /> : element;
};

const routes = [
  { path: "/", element: <HomePage />, layout: true },

  { path: "/diary", element: <ProtectedRoute element={<DiaryPage />} />, layout: true },
  { path: "/diary/create", element: <ProtectedRoute element={<CreateDiaryPage />} />, layout: true },
  { path: "/profile", element: <ProtectedRoute element={<Profile />} />, layout: true },

  { path: "/login", element: <GuestRoute element={<Login />} />, layout: false },
  { path: "/register", element: <GuestRoute element={<Register />} />, layout: false },

  { path: "*", element: <NotFound />, layout: false },
];

export default routes;