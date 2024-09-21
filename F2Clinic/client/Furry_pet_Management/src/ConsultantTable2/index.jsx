import React, { useState, useEffect } from "react";
import ConsultantNav from "../ConsultantNav";

const PetRecord = () => {
  const [petRecords, setPetRecords] = useState([]);

  useEffect(() => {
    const fetchPetRecords = async () => {
      const mockData = [
        {
          _id: "1",
          ownerName: "Alice",
          email: "alice@example.com",
          petName: "Buddy",
          petImage: "https://via.placeholder.com/150",
          petBreed: "Golden Retriever",
          petAge: "5",
        },
        {
          _id: "2",
          ownerName: "Bob",
          email: "bob@example.com",
          petName: "Mittens",
          petImage: "https://via.placeholder.com/150",
          petBreed: "Siamese",
          petAge: "3",
        },
      ];

      setPetRecords(mockData);
    };

    fetchPetRecords();
  }, []);

  const handleDelete = (id) => {
    setPetRecords((prevRecords) =>
      prevRecords.filter((record) => record._id !== id)
    );
  };

  return (
    <>
      <ConsultantNav />
      <div
        className="p-10 w-screen h-screen mx-auto pt-8 bg-slate-200 text-black"
        style={{
          fontFamily: "Times New Roman,sans-serif",
        }}
      >
        <h1 className="text-4xl font-bold mb-4">Pet Records</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-200 text-black">Owner Name</th>
              <th className="px-4 py-2 bg-gray-200 text-black">Email</th>
              <th className="px-4 py-2 bg-gray-200 text-black">Pet Name</th>
              <th className="px-4 py-2 bg-gray-200 text-black">Pet Image</th>
              <th className="px-4 py-2 bg-gray-200 text-black">Breed</th>
              <th className="px-4 py-2 bg-gray-200 text-black">Age</th>
              <th className="px-4 py-2 bg-gray-200 text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {petRecords.map((record, index) => (
              <tr
                key={record._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="px-4 py-2">{record.ownerName}</td>
                <td className="px-4 py-2">{record.email}</td>
                <td className="px-4 py-2">{record.petName}</td>
                <td className="px-4 py-2">
                  <img
                    src={record.petImage}
                    alt={record.petName}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="px-4 py-2">{record.petBreed}</td>
                <td className="px-4 py-2">{record.petAge}</td>
                <td className="px-4 py-2">
                  <button
                    className="w-1/2 bg-white text-red-500 border-2 border-red-500 p-2 rounded-full hover:bg-red-500 hover:text-white transition duration-300"
                    onClick={() => handleDelete(record._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PetRecord;
