import React, { useState } from "react";
import loginImage from "../assets/login.svg";
import logins from "../assets/loginbg.jpg";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const changeValue = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 200) {
        const userData = await response.json();
        console.log(userData);
        localStorage.setItem("jwt", userData.jwt);
        if (userData) {
          toast.success("User Login Successfull", {
            duration: 3000,
            position: "top-right",
          });
          navigate("/");
        }
      } else {
        toast.error("Login failed, please check your credentials.",{
          duration: 3000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later.",{
        duration: 3000,
        position: "top-right",
      });
    }
  };

  return (
    <div
      className="flex-auto items-center justify-center h-screen w-full grid grid-cols-12"
      style={{
        backgroundImage: `url(${logins})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="col-span-2"></div>
      <div className="col-span-8 flex flex-wrap flex-row items-center justify-center h-4/5">
        <div
          className="flex flex-col items-center justify-center w-1/2 h-full"
          style={{
            backgroundImage: `url(${loginImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-4xl font-bold"> Welcome to Login</h1>

          <p className="mt-10 text-center text-sm text-white">
            Don't have an account?{" "}
            <Link
              to={"/user/register"}
              href="#"
              className="font-semibold leading-6 text-black hover:text-indigo-900"
            >
              Register
            </Link>
          </p>
        </div>

        <div className="flex flex-col w-1/2 h-full justify-center bg-white">
          <h1 className="text-2xl block py-3 items-start px-10 font-bold">
            Sign In
          </h1>
          <div className="flex flex-col px-10 justify-center ">
            <form className="space-y-6" method="POST" onSubmit={handleChange}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={changeValue}
                    className="block w-full pl-1.5 rounded-md border-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-base font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={changeValue}
                    className="block w-full pl-1.5 rounded-md border-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
      <div className="col-span-2"></div>
    </div>
  );
};

export default login;
