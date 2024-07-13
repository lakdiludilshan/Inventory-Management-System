import React from "react";
import loginImage from "../assets/login.svg";
import logins from "../assets/loginbg.jpg";
import { Link } from "react-router-dom";

const login = () => {

  

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
              SignUp
            </Link>
          </p>
        </div>

        <div className="flex flex-col w-1/2 h-full justify-center bg-white">
          <h1 className="text-2xl block py-3 items-start px-10 font-bold">
            Sign In
          </h1>
          <div className="flex flex-col px-10 justify-center ">
            <form className="space-y-6" method="POST" onSubmit={0}>
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
                    onChange={0}
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
                    onChange={0}
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
      <div className="col-span-2"></div>
    </div>
  );
};

export default login;
