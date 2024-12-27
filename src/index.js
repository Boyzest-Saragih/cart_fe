import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./page/Cart";
import AuthForm from "./page/AuthForm";

const router = createBrowserRouter([
  { path: "/", element: <Cart /> },
  { path: "/login", element: <AuthForm /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
