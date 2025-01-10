import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Cart from "./page/Cart";
import AuthForm from "./page/AuthForm";
import Order from "./page/Order/Order";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

const router = createBrowserRouter([
  { path: "/", element: <Cart /> },
  { path: "/login", element: <AuthForm /> },
  { path: "/checkout", element: <Order /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
