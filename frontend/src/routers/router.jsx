import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home";
import Category from "../pages/category";
import Products from "../pages/products";
import Purchase from "../pages/purchase";
import Customers from "../pages/customers";
import Suppliers from "../pages/suppliers";
import Sales from "../pages/sales";
import UserLayout from "../externals/userlayout";
import Login from "../externals/login";
import Register from "../externals/register";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/purchase",
        element: <Purchase />,
      },
      {
        path: "/customers",
        element: <Customers />,
      },
      {
        path: "/suppliers",
        element: <Suppliers />,
      },
      {
        path: "/sales",
        element: <Sales />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      // {
      //   path: "/user",
      //   path: <User />,
      // },
      {
        path: "/user/login",
        element: <Login />,
      },
      {
        path: "/user/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
