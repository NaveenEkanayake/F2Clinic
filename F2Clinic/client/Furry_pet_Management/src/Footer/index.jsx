import React from "react";
import { MDBFooter, MDBContainer } from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <section
      className="text-center text-white"
      style={{ backgroundColor: "#0a4275" }}
    >
      <MDBFooter
        className="text-center text-white"
        style={{ backgroundColor: "navyblue" }}
      >
        <MDBContainer className="p-4"></MDBContainer>

        <div
          className="text-center p-3"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            fontFamily: "Times New Roman,sans-serif",
          }}
        >
          <p> © 2024 Copyright: Furry Pets.com</p>
        </div>
      </MDBFooter>
    </section>
  );
};

export default Footer;
