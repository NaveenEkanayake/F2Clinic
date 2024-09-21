import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image1 from "../assets/image10.avif";
import "../AddConsultant/Addconsul.css";
import UserNav from "../UserNav";

const Addinfo = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [petImage, setPetImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const nextStep = (data) => {
    const isEmpty = Object.values(data).some((value) => !value);
    if (isEmpty) {
      toast.error("Please fill in all fields");
    } else {
      setFormData((prevData) => ({
        ...prevData,
        ...data,
      }));
      setStep(step + 1);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const finalData = { ...formData, ...data };
    console.log("Final data submitted:", finalData);
    try {
      // Perform submission logic here (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Data submitted successfully");
    } catch (error) {
      toast.error("Error submitting data");
    } finally {
      setLoading(false);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handlePetImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPetImage(URL.createObjectURL(file)); // Store the image URL for preview
    }
  };
  return (
    <div>
      <UserNav />
      <div
        className="consultant-image-container flex justify-center items-center"
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${image1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="form-container border mt-10 border-gray-400 bg-opacity-90 rounded-md bg-white"
          style={{
            width: "872px",
            padding: "20px",
          }}
        >
          {step === 1 && (
            <>
              <h1
                className="text-black text-center"
                style={{
                  fontFamily: "Times New Roman,sans-serif",
                  fontSize: "30px",
                }}
              >
                Add User Info
              </h1>
              <form onSubmit={handleSubmit(nextStep)} className="text-black">
                <div className="consultant-form-group consultant-form-control flex flex-col mb-4">
                  <label
                    htmlFor="firstName"
                    className="text-black"
                    style={{
                      fontFamily: "Times New Roman,sans-serif",
                    }}
                  >
                    Owner Name:
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    placeholder="Enter First Name"
                    style={{ color: "black" }}
                    className="p-4 border border-gray-400 rounded-md"
                  />
                  {errors.firstName && (
                    <span className="error text-red-500">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>

                <div className="consultant-form-group consultant-form-control flex flex-col mb-4">
                  <label
                    htmlFor="lastName"
                    className="text-black"
                    style={{
                      fontFamily: "Times New Roman,sans-serif",
                    }}
                  >
                    Email:
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    placeholder="Enter Last Name"
                    style={{ color: "black" }}
                    className="p-4 border border-gray-400 rounded-md"
                  />
                  {errors.lastName && (
                    <span className="error text-red-500">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="consultant-login-button mx-auto block bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600"
                  style={{
                    fontFamily: "Times New Roman,sans-serif",
                  }}
                >
                  Next
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-black text-center">Pet Details</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="text-black">
                <div className="consultant-form-group consultant-form-control flex flex-col mb-4">
                  <label
                    htmlFor="petName"
                    className="text-black"
                    style={{
                      fontFamily: "Times New Roman,sans-serif",
                    }}
                  >
                    Pet Name:
                  </label>
                  <input
                    type="text"
                    id="petName"
                    name="petName"
                    {...register("petName", {
                      required: "Pet name is required",
                    })}
                    placeholder="Enter Pet Name"
                    style={{ color: "black" }}
                    className="p-4 border border-gray-400 rounded-md"
                  />
                  {errors.petName && (
                    <span className="error text-red-500">
                      {errors.petName.message}
                    </span>
                  )}
                </div>
                <div className="consultant-form-group consultant-form-control flex flex-col mb-4">
                  <label
                    htmlFor="petName"
                    className="text-black"
                    style={{
                      fontFamily: "Times New Roman,sans-serif",
                    }}
                  >
                    Pet Image:
                  </label>
                  <input
                    type="file"
                    id="petImage"
                    name="petImage"
                    accept="image/*"
                    {...register("petImage", {
                      required: "Pet Image is required",
                    })}
                    onChange={handlePetImageUpload} // Handle image upload
                    className="p-4 border border-gray-400 rounded-md"
                  />
                </div>
                <div className="consultant-form-group consultant-form-control flex flex-col mb-4">
                  <label
                    htmlFor="age"
                    className="text-black"
                    style={{
                      fontFamily: "Times New Roman,sans-serif",
                    }}
                  >
                    Breed:
                  </label>
                  <input
                    type="text"
                    id="Breed"
                    name="Breed"
                    {...register("age", {
                      required: "Breed is required",
                    })}
                    placeholder="Enter Breed"
                    style={{ color: "black" }}
                    className="p-4 border border-gray-400 rounded-md"
                  />
                  {errors.age && (
                    <span className="error text-red-500">
                      {errors.age.message}
                    </span>
                  )}
                </div>

                <div className="consultant-form-group consultant-form-control flex flex-col mb-4">
                  <label
                    htmlFor="age"
                    className="text-black"
                    style={{
                      fontFamily: "Times New Roman,sans-serif",
                    }}
                  >
                    Age:
                  </label>
                  <input
                    type="text"
                    id="age"
                    name="age"
                    {...register("age", {
                      required: "Age is required",
                    })}
                    placeholder="Enter Age"
                    style={{ color: "black" }}
                    className="p-4 border border-gray-400 rounded-md"
                  />
                  {errors.age && (
                    <span className="error text-red-500">
                      {errors.age.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="consultant-login-button mx-auto block bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600"
                  style={{
                    fontFamily: "Times New Roman,sans-serif",
                  }}
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Info"}
                </button>
                <button
                  type="button"
                  onClick={prevStep}
                  className="consultant-login-button mx-auto block bg-red-500 text-white rounded-lg py-2 px-4 mt-4 hover:bg-red-600"
                  style={{
                    fontFamily: "Times New Roman,sans-serif",
                  }}
                >
                  Previous
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Addinfo;
