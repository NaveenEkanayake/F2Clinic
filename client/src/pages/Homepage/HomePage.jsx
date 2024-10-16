import React from "react";
import HomePageNav from "../../components/HomepageNav/HomePageNav";
import LandingContents from "../../components/Home/LandingContents/LandingContents";
import Aboutus from "../../components/Home/AboutUs/Aboutus";
import OurServices from "../../components/Home/OurServices/OurServices";
import OurSpecialist from "../../components/Home/OurTeam/OurSpecialist";
import OurClients from "../../components/Home/OurClients/OurClients";
import Testimonials from "../../components/Home/Testimonials/Testimonials";
import FAQ from "../../components/Home/FAQ/FAQ";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
  return (
    <>
      <HomePageNav />
      <LandingContents />
      <Aboutus />
      <OurServices />
      <OurSpecialist />
      <OurClients />
      <Testimonials />
      <div className="w-full h-[500px] mt-[100px]">
        <div className="p-4">
          <FAQ />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
