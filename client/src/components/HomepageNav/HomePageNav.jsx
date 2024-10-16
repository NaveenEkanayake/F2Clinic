import React from "react";
import logo from "../../assets/images/logo.png";
import DropdownHome from "../DropdownHome/DropdownHome";
import { Link } from "react-scroll";

const HomePageNav = () => {
  return (
    <>
      <div className="py-4 px-2 bg-slate-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer">
            <img src={logo} className="w-12 h-auto" alt="Logo" />
            <span className="text-white text-[20px] ml-3">
              Furry Pet Clinic
            </span>
          </div>
          <div className="flex text-white items-center">
            <ul className="flex space-x-6 items-center cursor-pointer">
              <li>
                <Link
                  to="homesection"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className="relative group"
                >
                  <span className="hover:text-blue-500">Home</span>
                  <span className="absolute left-1/2 top-[30px] transform -translate-x-1/2 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="aboutus"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className="relative group"
                >
                  <span className="hover:text-blue-500">About Us</span>
                  <span className="absolute left-1/2 top-[30px] transform -translate-x-1/2 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>

              <Link
                to="ourservice"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="relative group"
              >
                <span className="hover:text-blue-500">Our Services</span>
                <span className="absolute left-1/2 top-[30px] transform -translate-x-1/2 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <li>
                <Link
                  to="specialists"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className="relative group"
                >
                  <span className="hover:text-blue-500">Our Specialists</span>
                  <span className="absolute left-1/2 top-[30px] transform -translate-x-1/2 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="partners"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className="relative group"
                >
                  <span className="hover:text-blue-500">Our Partners</span>
                  <span className="absolute left-1/2 top-[30px] transform -translate-x-1/2 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="faq"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className="relative group"
                >
                  <span className="hover:text-blue-500">FAQ</span>
                  <span className="absolute left-1/2 top-[30px] transform -translate-x-1/2 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <DropdownHome />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageNav;
