import React from "react";
import client1 from "../assets/People1.jpeg";
import client2 from "../assets/People2.jpeg";
import client3 from "../assets/People3.jpeg";

const ClientReview = ({ name, review, profilePic }) => (
  <div
    className="flex items-start p-4 bg-white shadow-md rounded-md hover:-translate-y-5 transition-transform duration-300 w-full h-48 mx-2 my-4"
    style={{
      fontFamily: "Times New Roman, serif",
    }}
  >
    <img
      src={profilePic}
      alt={`${name}'s profile`}
      className="w-16 h-16 rounded-full object-cover mr-4"
    />
    <div className="flex-1">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="mt-2">{review}</p>
    </div>
  </div>
);

const OurClient = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1
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
        Review
      </h1>
      <div className="mt-6 flex flex-wrap">
        <ClientReview
          name="Robert Johnson"
          review="The service was excellent, and my pet felt right at home at Furry Care Pet Clinic!"
          profilePic={client1}
        />
        <ClientReview
          name="Samantha Kanna"
          review="I was very pleased with the grooming services provided. They were professional and caring."
          profilePic={client2}
        />
        <ClientReview
          name="Emily Davis"
          review="The staff is knowledgeable and friendly. My dog always receives the best care!"
          profilePic={client3}
        />
      </div>
    </div>
  );
};

export default OurClient;
