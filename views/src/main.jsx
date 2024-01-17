import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/home/Home.jsx'
import Alumni from './pages/alumni/Alumni.jsx'
import Admin from './pages/admin/Admin.jsx'
import { AuthProvider } from "./components/auth/AuthContext.jsx";
import PrivateRoute from "./components/auth/PrivateRoute.jsx";
import StaffLogin from "./components/auth/StaffLogIn.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/alumni",
    element: <Alumni/>,
  },
  {
    path:"/staff",
    element:  <Admin />,

  },
  {
    path:'/stafflog',
    element:<StaffLogin/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    
  </React.StrictMode>
);
