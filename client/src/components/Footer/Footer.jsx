import React from "react";
import { Link } from "react-scroll";
import facebookIcon from "../../assets/images/Facebook.png";
import instagramIcon from "../../assets/images/insta.png";
import twitterIcon from "../../assets/images/twitter.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col space-y-2 md:space-y-0">
            <h6 className="text-lg font-semibold">Quick Links</h6>
            <div className="flex space-x-4">
              <Link
                to="homesection"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="no-underline hover:text-blue-500 transition duration-300 cursor-pointer"
              >
                <span className="text-sm">Home</span>
              </Link>
              <Link
                to="aboutus"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="no-underline hover:text-blue-500 transition duration-300 cursor-pointer"
              >
                <span className="text-sm">About Us</span>
              </Link>

              <Link
                to="ourservice"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="no-underline hover:text-blue-500 transition duration-300 cursor-pointer"
              >
                <span className="text-sm">Our Services</span>
              </Link>
              <Link
                to="specialists"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="no-underline hover:text-blue-500 transition duration-300 cursor-pointer"
              >
                <span className="text-sm">Our Specialists</span>
              </Link>
              <Link
                to="partners"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="no-underline hover:text-blue-500 transition duration-300 cursor-pointer"
              >
                <span className="text-sm">Our Partners</span>
              </Link>
              <Link
                to="faq"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="no-underline hover:text-blue-500 transition duration-300 cursor-pointer"
              >
                <span className="text-sm">FAQ</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm">
              We strive to provide the best service for you.
            </p>
          </div>
          <div className="text-center">
            <h6 className="text-lg font-semibold">Connect with Us</h6>
            <div className="flex justify-center space-x-4">
              <Link className="transition duration-300 cursor-pointer">
                <img
                  src={facebookIcon}
                  className="w-6 h-6 filter brightness-0 invert hover:brightness-100 transition duration-300"
                />
              </Link>
              <Link className="transition duration-300 cursor-pointer">
                <img
                  src={instagramIcon}
                  className="w-6 h-6 filter brightness-0 invert hover:brightness-100 transition duration-300"
                />
              </Link>
              <Link className="transition duration-300 cursor-pointer">
                <img
                  src={twitterIcon}
                  className="w-6 h-6 transition duration-300 "
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white mt-6"></div>
        <div className="text-center mt-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Furry pet Clinic. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
