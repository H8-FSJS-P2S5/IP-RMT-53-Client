import { createBrowserRouter, redirect } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AnimeDetailPage from "./pages/AnimeDetailPage";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";
// import UserProfilePage from "./pages/UserProfilePage";
import AnimeList from "./components/AnimeList";
import UserProfilePage from "./pages/UserProfilePage";

const isLoggedIn = () => {  
  const token = localStorage.getItem("access_token");  
  return !token ? redirect("/login") : null;  
};  

const isNotLoggedIn = () => {
  const token = localStorage.getItem('access_token')
  return token ? redirect('/') : null;
}

const router = createBrowserRouter([ 
    {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            path: 'register',
            element: <RegisterPage />,
            loader: isNotLoggedIn
          },
          {
            path: '/login',
            element: <LoginPage />,
            loader: isNotLoggedIn
          },
          {
            path: '/',
            element: <HomePage />,
            loader: isLoggedIn
          },
          {
            path: '/user/:id/profile',
            element: <UserProfilePage />,
            loader: isLoggedIn
          },
          {
            path: '/user/:id/anime-list',
            element: <AnimeList />,
            loader: isLoggedIn
          },
          {
            path: '/anime/search',
            element: <SearchPage />,
            loader: isLoggedIn
          },
          {
            path: '/anime/:id',
            element: <AnimeDetailPage />,
          },
          {
            path: '*',
            element: <NotFoundPage />
          },
        ],
      },
]);

export default router;