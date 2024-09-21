import React from "react";
import image2 from "../assets/Surgery.png";
import newServiceImage from "../assets/grooming.jpeg";
import Vaciination from "../assets/Vaci.jpeg";

const Ourservices = () => {
  return (
    <div
      className="services-container"
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      <h2
        className="services-heading"
        style={{
          textAlign: "center",
          marginTop: "30px",
          fontWeight: "bold",
          fontSize: "50px",
          width: "100%",
          marginBottom: "50px",
          color: "black",
          fontFamily: "Times New Roman,sans-serif",
        }}
      >
        OUR SERVICES
      </h2>
      {/* Existing Service 1 */}
      <div
        className="service-box"
        style={{
          marginTop: "30px",
          marginLeft: "30px",
          width: "19%",
          height: "auto",
          position: "relative",
          fontFamily: "Times New Roman,sans-serif",
        }}
      >
        <img
          src={newServiceImage}
          alt="Grooming Service"
          className="service-image"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
        <div
          className="service-header-overlay"
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            textAlign: "center",
            padding: "10px",
            fontFamily: "Times New Roman,sans-serif",
          }}
        >
          <h3>Grooming</h3>
        </div>
        <div
          className="service-description"
          style={{
            padding: "10px",
            textAlign: "center",
          }}
        >
          <p style={{ fontWeight: "500" }}>
            Furry Care Pet Clinic provides baths, haircuts, nail trimming, and
            more to maintain your pet's hygiene and appearance.
          </p>
        </div>
      </div>
      {/* Existing Service 2 */}
      <div
        className="service-box"
        style={{
          marginTop: "30px",
          marginLeft: "30px",
          width: "19%",
          height: "auto",
          position: "relative",
        }}
      >
        <img
          src={Vaciination}
          alt="Vaccinations Service"
          className="service-image"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
        <div
          className="service-header-overlay"
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            textAlign: "center",
            padding: "10px",
            fontFamily: "Times New Roman,sans-serif",
          }}
        >
          <h3>Vaccinations</h3>
        </div>
        <div
          className="service-description"
          style={{
            padding: "10px",
            textAlign: "center",
          }}
        >
          <p style={{ fontWeight: "500" }}>
            Our tailored vaccination services protect your pet from diseases at
            Furry Care Pet Clinic.
          </p>
        </div>
      </div>
      {/* New Service */}
      <div
        className="service-box"
        style={{
          marginTop: "30px",
          marginLeft: "30px",
          width: "19%",
          height: "auto",
          position: "relative",
        }}
      >
        <img
          src={image2}
          alt="Surgery Service"
          className="service-image"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
        <div
          className="service-header-overlay"
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            textAlign: "center",
            padding: "10px",
            fontFamily: "Times New Roman,sans-serif",
          }}
        >
          <h3>Surgery</h3>
        </div>
        <div
          className="service-description"
          style={{
            padding: "10px",
            textAlign: "center",
          }}
        >
          <p style={{ fontWeight: "500" }}>
            Our skilled veterinarians perform surgeries with the utmost care and
            precision to ensure your pet's health and safety.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ourservices;
