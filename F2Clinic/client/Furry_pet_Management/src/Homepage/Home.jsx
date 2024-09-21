import React, { useState } from "react";
import SliderHome from "../SliderHome";
import Aboutus from "../AboutUs";
import Footer from "../Footer";
import HomepageNav from "../HomepageNav";
import Ourservices from "../OurServices";
import OurTeam from "../Ourteam";
import OurClient from "../Ourclient";
import "./home.css";
const Home = () => {
  return (
    <>
      <HomepageNav />
      <SliderHome />
      <Aboutus />
      <Ourservices />
      <OurTeam />
      <OurClient />
      <Footer />
    </>
  );
};

export default Home;
