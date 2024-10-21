import { useState } from "react";
import Pedegree from "../../../assets/images/Pedegree.jpg";
import previousIcon from "../../../assets/images/previousIcon.png";
import nextIcon from "../../../assets/images/nextIcon.png";
import Searchbar from "../Searchbar/Searchbar";
import BuynowButon from "../BuyNowButton/BuynowButon";
import NextButton from "../NextButton/NextButton";
import PreviousButton from "../PreviousButton/PreviousButton";
const petCareData = [
  {
    id: 1,
    image: Pedegree,
    title: "Adult Dog Pedegree",
    description:
      "We provide your pet with the excellent taste and quality American Adult pet foods.",
  },
  {
    id: 2,
    image: Pedegree,
    title: "Other Pet Food",
    description: "Nutritious options for your beloved pets.",
  },
  {
    id: 3,
    image: Pedegree,
    title: "Other Pet Food",
    description: "Nutritious options for your beloved pets.",
  },
  {
    id: 4,
    image: Pedegree,
    title: "Other Pet Food",
    description: "Nutritious options for your beloved pets.",
  },
  {
    id: 5,
    image: Pedegree,
    title: "Other Pet Food",
    description: "Nutritious options for your beloved pets.",
  },
  {
    id: 6,
    image: Pedegree,
    title: "Other Pet Food",
    description: "Nutritious options for your beloved pets.",
  },
  {
    id: 7,
    image: Pedegree,
    title: "Other Pet Food",
    description: "Nutritious options for your beloved pets.",
  },
  {
    id: 8,
    image: Pedegree,
    title: "Other Pet Food",
    description: "Nutritious options for your beloved pets.",
  },
  {
    id: 9,
    image: Pedegree,
    title: "Other Pet Food",
    description: "Nutritious options for your beloved pets.",
  },
  {
    id: 10,
    image: Pedegree,
    title: "Other Pet Food",
    description: "Nutritious options for your beloved pets.",
  },
];

const PetCareContents = ({ isSidebarOpen }) => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = petCareData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(petCareData.length / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Searchbar />
      <div className="block mb-6">
        <div
          className={` h-auto bg-white shadow-lg ml-10 mt-4 p-5 ${
            isSidebarOpen ? "w-[1450px]" : "w-[1750px]"
          }`}
        >
          {currentItems.map((pet) => (
            <div key={pet.id} className="border-b-2 last:border-b-0 pb-5 mb-5">
              <div className="flex items-start">
                <img
                  src={pet.image}
                  className="rounded-full w-12 h-12 mr-4"
                  alt={pet.title}
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">{pet.title}</h3>
                  <p className="text-gray-400">{pet.description}</p>
                </div>
                <div className="mt-3">
                  <BuynowButon> Buy Now</BuynowButon>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-5">
            <PreviousButton
              onClick={handlePrevious}
              disabled={currentPage === 1}
              icon={previousIcon}
              label="Previous"
            />
            <NextButton
              onClick={handleNext}
              disabled={
                currentPage >= Math.ceil(petCareData.length / itemsPerPage)
              }
              icon={nextIcon}
              label="Next"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PetCareContents;
