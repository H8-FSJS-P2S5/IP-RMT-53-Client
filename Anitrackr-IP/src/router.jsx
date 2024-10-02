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

const router = createBrowserRouter([ 
    {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            path: 'register',
            element: <RegisterPage />
          },
          {
            path: '/login',
            element: <LoginPage />
          },
          {
            path: '/',
            element: <HomePage />
          },
          {
            path: '/user/:id/anime-list',
            element: <AnimeList />
          },
          {
            path: '/anime/search',
            element: <SearchPage />
          },
          {
            path: '/anime/:id',
            element: <AnimeDetailPage />
          },
          {
            path: '*',
            element: <NotFoundPage />
          },
        ],
      },
]);

export default router;