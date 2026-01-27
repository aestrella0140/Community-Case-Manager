import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/homePage.jsx";
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "HomePage",
        element: <HomePage />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "Signup",
        element: <Signup />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
 <RouterProvider router={router} />
);
