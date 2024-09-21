import { Link } from "react-router-dom";
import React from "react";
import Logo from "../assets/logo.png";
const NavbarLogin = () => {
  return (
    <nav className="relative flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-slate-500 lg:py-4">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div className="flex items-center">
          <Link to="/Home" className="flex items-center">
            <img
              src={Logo}
              alt=""
              style={{ height: "50px" }}
              className="mr-2"
            />
            <span
              className="font-normal"
              style={{ color: "white", fontStyle: "bold", fontSize: "23px" }}
            >
              Furry pet clinic
            </span>
          </Link>
        </div>
        <div
          className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
          id="navbarSupportedContent4"
          data-twe-collapse-item
        >
          <ul
            className="list-style-none me-auto flex flex-col ps-0 lg:mt-1 lg:flex-row"
            data-twe-navbar-nav-ref
          ></ul>
          <Link to="/Home" className="hover-text">
            <div className="flex items-center">
              <span className="hover-text__inner text-white">Home</span>
            </div>
          </Link>
          <Link to="/Register">
            <div className="flex items-center pl-5">
              <button
                type="button"
                className="dark:text-gray-100 font-light font-semibold me-3 bg-primary px-6 pb-2 pt-2.5 text-xs leading-normal text-white hover:bg-blue-400 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong rounded-2xl"
              >
                <span className="font-sans" style={{ fontSize: "15px" }}>
                  Sign Up
                </span>
              </button>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLogin;
