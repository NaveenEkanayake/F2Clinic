import React, { useState } from "react";
import drJohnDoe from "../assets/Dr.sarath.jpg";
import drJaneSmith from "../assets/Dr.sarath.jpg";
import drEmilyJohnson from "../assets/Dr.sarath.jpg";

const OurTeam = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleClick = (doctorName) => {
    setSelectedDoctor((prev) => (prev === doctorName ? null : doctorName));
  };

  return (
    <div
      className="team-container"
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        fontFamily: "Times New Roman,sans-serif",
      }}
    >
      <h2
        className="team-heading"
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
        OUR TEAM
      </h2>

      {/* Team Member 1 */}
      <div
        className="team-box"
        style={{
          marginTop: "30px",
          marginLeft: "30px",
          width: "19%",
          height: "auto",
          position: "relative",
          cursor: "pointer",
          overflow: "hidden",
          borderRadius: "20px",
        }}
        onClick={() => handleClick("Dr. John Doe")}
      >
        <img
          src={drJohnDoe}
          alt="Dr. John Doe"
          className="team-image"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            transition: "filter 0.3s ease",
            filter:
              selectedDoctor === "Dr. Robert Smith"
                ? "brightness(50%)"
                : "brightness(100%)",
          }}
        />
        <div
          className="team-header-overlay"
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            textAlign: "center",
            padding: "10px",
            transition: "transform 0.3s ease",
            transform:
              selectedDoctor === "Dr. John Doe"
                ? "translateY(-30px)"
                : "translateY(0)",
          }}
        >
          <h3
            style={{
              margin: "0",
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          >
            Dr. John Doe
          </h3>
        </div>
        {selectedDoctor === "Dr. John Doe" && (
          <div
            className="team-description"
            style={{
              padding: "10px",
              textAlign: "center",
              backgroundColor: "white",
              border: "1px solid #ccc",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              position: "absolute",
              bottom: "0",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
              opacity: selectedDoctor === "Dr. John Doe" ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <p style={{ fontWeight: "500" }}>
              Specializes in internal medicine and diagnostic imaging with over
              15 years of experience in animal care.
            </p>
          </div>
        )}
      </div>

      {/* Team Member 2 */}
      <div
        className="team-box"
        style={{
          marginTop: "30px",
          marginLeft: "30px",
          width: "19%",
          height: "auto",
          position: "relative",
          cursor: "pointer",
          overflow: "hidden", // Ensures child elements respect border-radius
          borderRadius: "20px", // Apply border-radius here
        }}
        onClick={() => handleClick("Dr. Jane Smith")}
      >
        <img
          src={drJaneSmith}
          alt="Dr. Jane Smith"
          className="team-image"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            transition: "filter 0.3s ease",
            filter:
              selectedDoctor === "Dr. Jane Smith"
                ? "brightness(50%)"
                : "brightness(100%)",
          }}
        />
        <div
          className="team-header-overlay"
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            textAlign: "center",
            padding: "10px",
            transition: "transform 0.3s ease",
            transform:
              selectedDoctor === "Dr. Jane Smith"
                ? "translateY(-30px)"
                : "translateY(0)",
          }}
        >
          <h3
            style={{
              margin: "0",
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          >
            Dr. Jane Smith
          </h3>
        </div>
        {selectedDoctor === "Dr. Jane Smith" && (
          <div
            className="team-description"
            style={{
              padding: "10px",
              textAlign: "center",
              backgroundColor: "white",
              border: "1px solid #ccc",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              position: "absolute",
              bottom: "0",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
              opacity: selectedDoctor === "Dr. Jane Smith" ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <p style={{ fontWeight: "500" }}>
              Expert in surgical procedures and emergency care, dedicated to
              providing the highest level of veterinary surgery.
            </p>
          </div>
        )}
      </div>

      {/* Team Member 3 */}
      <div
        className="team-box"
        style={{
          marginTop: "30px",
          marginLeft: "30px",
          width: "19%",
          height: "auto",
          position: "relative",
          cursor: "pointer",
          overflow: "hidden", // Ensures child elements respect border-radius
          borderRadius: "20px", // Apply border-radius here
        }}
        onClick={() => handleClick("Dr. Emily Johnson")}
      >
        <img
          src={drEmilyJohnson}
          alt="Dr. Emily Johnson"
          className="team-image"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            transition: "filter 0.3s ease",
            filter:
              selectedDoctor === "Dr. Emily Johnson"
                ? "brightness(50%)"
                : "brightness(100%)",
          }}
        />
        <div
          className="team-header-overlay"
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            textAlign: "center",
            padding: "10px",
            transition: "transform 0.3s ease",
            transform:
              selectedDoctor === "Dr. Emily Johnson"
                ? "translateY(-30px)"
                : "translateY(0)",
          }}
        >
          <h3
            style={{
              margin: "0",
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
              // Match the overlay background
            }}
          >
            Dr. Emily Johnson
          </h3>
        </div>
        {selectedDoctor === "Dr. Emily Johnson" && (
          <div
            className="team-description"
            style={{
              padding: "10px",
              textAlign: "center",
              backgroundColor: "white",
              border: "1px solid #ccc",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              position: "absolute",
              bottom: "0",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
              opacity: selectedDoctor === "Dr. Emily Johnson" ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <p style={{ fontWeight: "500" }}>
              Specialist in exotic animal care with a focus on holistic
              treatment and wellness strategies.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurTeam;
