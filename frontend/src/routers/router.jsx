import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home";
import Category from "../pages/category";
import Products from "../pages/products";
import Purchase from "../pages/purchase";
import Customers from "../pages/customers";
import Suppliers from "../pages/suppliers";
import Sales from "../pages/sales";
import UserLayout from "../components/userlayout";
import Login from "../features/authentication/pages/login";
import Register from "../features/authentication/pages/register";
import User from "../pages/user";
import Report from "../pages/report";
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
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/report",
        element: <Report />,
      }
    ],
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
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
