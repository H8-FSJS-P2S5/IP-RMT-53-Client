import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createRoot } from "react-dom/client";
// import "./index.css";

import Wellcome from "./pages/Wellcome";

import Login from "./pages/Login";

import NavbarLogin from "./components/NavbarLogin";
import NavbarMember from "./components/NavbarMember";

import HomePublic from "./pages/HomePublic";
import DetailPublic from "./pages/DetailPublic";
import HomePrivate from "./pages/HomePrivate";
import Edit from "./pages/Edit";
import Register from "./pages/Register";
import AddArt from "./pages/AddArt";
import GeminiForm from "./pages/Ai gemini";
import AllOrigin from "./pages/Origin/AllOrigin";
import UploadImageUrl from "./pages/UpdateImage";

import { store } from "./store";
import { Provider } from "react-redux";

const isNotLogin = async () => {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) {
    throw redirect("/login");
  } else {
    return null;
  }
};

const isLogin = async () => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    throw redirect("/user/get/private/home");
  } else {
    return null;
  }
};

const router = createBrowserRouter([
  {
    path: "/give-me-answer",
    element: 
      <>
        <NavbarLogin />
        <GeminiForm />
      </>
  },
  {
    path: "/",
    element: 
      <>
        <NavbarLogin />
        <Wellcome />
      </>
  },
  {
    path: "/home",
    element:
      <>
        <NavbarMember />,
        <HomePublic />,
      </>
  },
  {
    path: "/public/allArts/:id",
    element:
      <>
        <NavbarMember />,
        <DetailPublic />,
      </>
  },
  {
    path: "/login",
    element: <Login />,
    loader: isLogin,
  },
  {
    element: (
      <>
        <NavbarMember />,
        <Outlet />
      </>
    ),
    loader: isNotLogin,
    children: [
      {
        path: "/user/get/private/home",
        element: <HomePrivate />
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/user/post/private/arts",
        element:<AddArt/>,
      },
      {
        path: "/user/get/private/arts/:id",
        element: <Edit/>,
      },
      {
        path: "/user/update/private/arts/:id",
        element: <></>,
      },
      {
        path: "/user/patch/private/arts/:id/image-url",
        element: <UploadImageUrl />,
      },
      {
        path: "/user/get/private/origins",
        element: <AllOrigin />,
      },
      {
        path: "/user/post/private/by/origins",
        element: <></>,
      },
      {
        path: "/user/put/private/origins/by/:id",
        element: <></>,
      },
    ],
  },
  
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}> 
    <ToastContainer />
    <RouterProvider router={router} />
  </Provider>
);
