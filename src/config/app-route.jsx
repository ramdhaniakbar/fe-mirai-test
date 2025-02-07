import Login from "../pages/auth/Login";
import Profile from "../pages/profile/Profile";
import HomePage from "../pages/homepage/HomePage";
import NotFound from "../pages/not-found/NotFound";
import Register from "../pages/auth/Register";
import DiaryPage from "../pages/diaries/DiaryPage";

const routes = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/diary',
    element: <DiaryPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;