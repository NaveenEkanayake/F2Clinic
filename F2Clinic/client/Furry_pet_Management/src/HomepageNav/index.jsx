import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import {
  FaUserCircle,
  FaCheck,
  FaChevronDown,
  FaAngleDown,
} from "react-icons/fa";

const HomepageNav = () => {
  return (
    <nav
      className={`relative flex w-full flex-wrap items-center justify-between bg-slate-500 py-2 shadow-dark-mild lg:py-4 text-white`}
      data-twe-navbar-ref
    >
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div className="flex items-center">
          <Link to="/Home" className="flex items-center">
            <img
              src={Logo}
              alt=""
              style={{ height: "50px", paddingRight: "20px" }}
              className="mr-2"
            />
            <span
              className="font-serif font-normal"
              style={{ color: "white", fontStyle: "bold", fontSize: "23px" }}
            >
              Furry Pet Clinic
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
          <a href="#" className="hover-text">
            <div className="flex items-center" style={{ marginLeft: "50px" }}>
              <Link to="/Home">
                <span className="hover-text__inner text-white">Home</span>
              </Link>
            </div>
          </a>
          <a href="#" className="hover-text">
            <div
              className="flex items-center"
              style={{ marginLeft: "50px" }}
              onClick={() => {
                window.scrollTo({
                  top: 500,
                  behavior: "smooth",
                });
              }}
            >
              <Link to="#about-us-section">
                <span className="hover-text__inner text-white">About Us</span>
              </Link>
            </div>
          </a>
          <a href="#" className="hover-text">
            <div
              className="flex items-center"
              style={{ marginLeft: "50px" }}
              onClick={() => {
                window.scrollTo({
                  top: 1000,
                  behavior: "smooth",
                });
              }}
            >
              <Link to="#service-section">
                <span className="hover-text__inner text-white">Services</span>
              </Link>
            </div>
          </a>
          <a href="#" className="hover-text">
            <div
              className="flex items-center"
              style={{ marginLeft: "50px" }}
              onClick={() => {
                window.scrollTo({
                  top: 1500,
                  behavior: "smooth",
                });
              }}
            >
              <Link to="#our-team-section">
                <span className="hover-text__inner text-white">Our Team</span>
              </Link>
            </div>
          </a>
          <a href="#" className="hover-text">
            <div
              className="flex items-center"
              style={{ marginLeft: "50px" }}
              onClick={() => {
                window.scrollTo({
                  top: 2000,
                  behavior: "smooth",
                });
              }}
            >
              <Link to="#review-section">
                <span className="hover-text__inner text-white">Review</span>
              </Link>
            </div>
          </a>
        </div>
        <div
          className="relative flex items-center group"
          style={{ marginLeft: "40px", marginRight: "30px" }}
        >
          <div
            className="relative flex items-center group"
            style={{ marginLeft: "40px", marginRight: "30px" }}
          >
            <div className="notification-avatar relative flex items-center">
              {/* User Avatar */}
              <FaUserCircle className="avatar-icon w-full mr-2" />

              {/* Welcome Message */}
              <p
                className="ml-2 text-gray-700 "
                style={{
                  whiteSpace: "nowrap",
                  fontFamily: "Times New Roman,san-serif",
                  color: "white",
                }}
              >
                Welcome User!
              </p>

              {/* Dropdown Downward Arrow Icon */}
              <FaAngleDown className="ml-2 text-gray-500 cursor-pointer" />

              {/* Dropdown content on hover */}
              <div className="dropdown-content absolute top-full left-0 hidden group-hover:block bg-white shadow-md rounded-md p-2 z-10">
                {/* Link to Dashboard */}
                <a
                  href="/Dash"
                  className="text-sm text-gray-700 hover:text-blue-500"
                >
                  Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomepageNav;
