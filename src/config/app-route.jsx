import Login from "../pages/auth/Login";
import Profile from "../pages/profile/Profile";
import HomePage from "../pages/homepage/HomePage";
import NotFound from "../pages/not-found/NotFound";
import Register from "../pages/auth/Register";
import DiaryPage from "../pages/diaries/DiaryPage";

const routes = [
  {
    path: '/',
    element: <HomePage />,
    layout: true,
  },
  {
    path: '/diary',
    element: <DiaryPage />,
    layout: true,
  },
  {
    path: '/profile',
    element: <Profile />,
    layout: true,
  },
  {
    path: '/login',
    element: <Login />,
    layout: false,
  },
  {
    path: '/register',
    element: <Register />,
    layout: false,
  },
  {
    path: '*',
    element: <NotFound />,
    layout: false,
  }
];

export default routes;