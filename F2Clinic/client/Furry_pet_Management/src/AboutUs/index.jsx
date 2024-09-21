import React from "react";
import newimg from "../assets/Docot.png";
const Aboutus = () => {
  return (
    <div className="about-us-container bg-white text-black">
      <div className="about-us-image mt-8">
        <img
          src={newimg}
          alt="About Us"
          style={{ width: "55%", marginLeft: "200px", marginTop: "50px" }}
        />
      </div>
      <div id="about-us-section" className="about-us-info">
        <h1
          style={{
            textAlign: "center",
            marginBottom: "200px",
            fontWeight: 1000,
            fontSize: "50px",
            fontStyle: "semibold",
            fontFamily: "Times New Roman,sans-serif",
          }}
          id="#about-us-section"
        >
          About Us
        </h1>
        <p
          className="mb-4 font-sans font-semibold"
          style={{
            fontFamily: "Times New Roman,sans-serif",
          }}
        >
          Furry Pet Clinic, founded by Dr. Dhammika Kumarasinghe in 2020, is a
          trusted name in providing quality veterinary care for your beloved
          pets. With a team of experienced and compassionate veterinarians, we
          strive to ensure the health and well-being of your furry companions.
        </p>
        <p
          className="mb-4 font-sans font-semibold"
          style={{ fontFamily: "Times New Roman,sans-serif" }}
        >
          Our mission is to provide comprehensive and personalized care for pets
          of all shapes and sizes. Whether it's routine check-ups, vaccinations,
          or specialized treatments, we are dedicated to meeting the unique
          needs of each pet.
        </p>
        <p
          className="font-sans font-semibold"
          style={{ fontFamily: "Times New Roman,sans-serif" }}
        >
          At Furry Pet Clinic, we understand the special bond between pets and
          their owners, and we are committed to fostering that bond by
          delivering exceptional veterinary services with a personal touch.
        </p>
      </div>
    </div>
  );
};

export default Aboutus;
