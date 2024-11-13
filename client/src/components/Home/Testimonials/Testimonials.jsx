import React, { useState } from "react";
import { motion } from "framer-motion";
import Client1 from "../../../assets/images/testimonial1.jpeg";
import Client2 from "../../../assets/images/testimonial2.jpeg";
import Client3 from "../../../assets/images/testimonial3.jpeg";
import Client4 from "../../../assets/images/testimonial4.jpeg";
import Client5 from "../../../assets/images/testimonial5.jpeg";
import pet1 from "../../../assets/images/testimonialpet1.jpeg";
import pet2 from "../../../assets/images/testimonialpet2.jpeg";
import pet3 from "../../../assets/images/testimonialpet3.jpeg";
import pet4 from "../../../assets/images/testimonialpet4.jpeg";
import pet5 from "../../../assets/images/testimonialpet5.jpeg";
import PrevButton from "../HomeSliderPrevButton/PrevButton";
import NextButton from "../HomeSliderNextButton/NextButton";

const Testimonials = () => {
  const images = [Client1, Client2, Client3, Client4, Client5];
  const pets = [pet1, pet2, pet3, pet4, pet5];
  const testimonials = [
    {
      title: "David Smith",
      content:
        "I highly recommend the Furry Pet Clinic! The staff is incredibly friendly, and they took excellent care of my little kittie. I felt reassured knowing my pet was in such good hands.",
    },
    {
      title: "Jane Smith",
      content:
        "The Furry Pet Clinic staff is amazing! They are always friendly and attentive, making every visit a positive experience.",
    },
    {
      title: "Samantha Khanna",
      content:
        "I am very pleased with the care my puppy received at Furry Pet Clinic. They saved him from a stomach disease, and I can't thank them enough for their expertise and compassion.",
    },
    {
      title: "Alice Johnson",
      content:
        "The care my dog received at Furry Pet Clinic was exceptional! The veterinarians were thorough and genuinely cared for my pet's well-being.",
    },
    {
      title: "Michael Brown",
      content:
        "Furry Pet Clinic is fantastic! The staff went above and beyond to make sure my parrot felt comfortable during his visit.",
    },
  ];

  const totalImages = images.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < totalImages - 1 ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <section className="flex flex-col items-center justify-center h-[100vh] my-auto w-full mx-auto cursor-pointer">
      <div className="mb-20">
        <motion.h1
          initial={{ translateY: "20%" }}
          whileInView={{ translateY: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center font-bold text-[30px] sm:text-[50px] tracking-wide"
        >
          Review
        </motion.h1>
      </div>
      <div className="relative overflow-hidden w-full max-w-[880px] mx-auto">
        <div
          className={`flex transition-transform duration-500 ease-in-out`}
          style={{
            transform: `translateX(-${currentIndex * (100 / totalImages)}%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex items-end p-4 min-w-[300px] h-[25rem] sm:h-[20rem] md:h-[22rem] bg-cover bg-center rounded-lg mx-2 shadow-md"
              style={{
                backgroundImage: `url(${pets[index]})`,
              }}
            >
              <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
              <img
                src={image}
                alt={`Image for ${testimonials[index].title}`}
                className="absolute z-20 bottom-[100px] left-[40px] w-16 h-16 rounded-full"
              />
              <div className="relative z-10 ml-28 mb-4 text-white flex flex-col">
                <h4 className="text-md font-semibold mb-1 text-center">
                  {testimonials[index].title}
                </h4>
                <p className="text-xs font-bold mb-0">
                  {testimonials[index].content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Previous Button */}
        <div
          className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg cursor-pointer ${
            currentIndex === 0 ? "hidden" : ""
          }`}
          onClick={handlePrev}
        >
          <PrevButton />
        </div>

        {/* Next Button */}
        <div
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg cursor-pointer ${
            currentIndex === totalImages - 1 ? "hidden" : ""
          }`}
          onClick={handleNext}
        >
          <NextButton />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
