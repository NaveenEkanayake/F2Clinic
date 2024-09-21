import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
const NavHome = () => {
  return (
    <nav
      className="relative flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-slate-500 lg:py-4"
      data-twe-navbar-ref
      style={{
        fontFamily: "Times New Roman,sans-serif",
      }}
    >
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div className="flex items-center">
          <Link to="/Home" className="flex items-center">
            <img
              src={Logo}
              alt="Logo"
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
        ></div>
      </div>
    </nav>
  );
};

export default NavHome;
