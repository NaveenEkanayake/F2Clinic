import axios from "axios";
const BASE_URL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

export const registerCustomer = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering customer:", error);
  }
};

export const Logincustomer = async (userData) => {
  const response = await axios.post(`${BASE_URL}/login`, userData);
  return response.data;
};
export const Loginadmin = async (userData) => {
  const response = await axios.post(`${BASE_URL}/loginadmin`, userData);
  return response.data;
};

export const Logoutadmin = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/logoutadmin`,
      {},
      { withCredentials: true }
    );

    if (response.status === 200) {
      console.log("Admin logged out successfully.");
      localStorage.removeItem("adminToken");

      return response.data;
    }
  } catch (error) {
    console.error("Error logging out admin:", error);
  }
};

export const LogoutCustomer = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/logout`,
      {},
      { withCredentials: true }
    );

    if (response.status === 200) {
      console.log("Customer logged out successfully.");
      localStorage.removeItem("customerToken");
      return response.data;
    }
  } catch (error) {
    console.error("Error logging out customer:", error);
  }
};

export const LogoutConsultant = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/logoutConsultant`,
      {},
      { withCredentials: true }
    );

    if (response.status === 200) {
      console.log("Consultant logged out successfully.");
      localStorage.removeItem("consultantToken");
      return response.data;
    }
  } catch (error) {
    console.error("Error logging out consultant:", error);
  }
};

export const Loginconsultant = async (userData) => {
  const response = await axios.post(`${BASE_URL}/loginConsultant`, userData);
  return response.data;
};

export const verifyconsultant = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/verifyConsultant`, {
      withCredentials: true,
    });
    console.log("Response from /verifyConsultant:", response);
    return response.data;
  } catch (error) {
    console.error("Error during Consultant verification:", error.message);
    if (error.response && error.response.status === 403) {
      try {
        await refreshToken();
        const retryResponse = await axios.get(`${BASE_URL}/refreshConsultant`, {
          withCredentials: true,
        });
        console.log("Retry Response from /refreshConsultant:", retryResponse);
        return retryResponse.data;
      } catch (refreshError) {
        console.error("Error during token refresh:", refreshError.message);
        throw refreshError;
      }
    }
    throw error;
  }
};

export const consultantrefreshToken = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/refreshConsultant`, {
      withCredentials: true,
    });
    console.log("Response from refreshToken:", response);
    return response.data;
  } catch (error) {
    console.error("Error during token refresh:", error.message);
    throw error;
  }
};

export const verifyadmin = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/verifyadmin`, {
      withCredentials: true,
    });
    console.log("Response from /verifyadmin:", response);
    return response.data;
  } catch (error) {
    console.error("Error during admin verification:", error.message);
    if (error.response && error.response.status === 403) {
      try {
        await refreshToken();
        const retryResponse = await axios.get(`${BASE_URL}/verifyadmin`, {
          withCredentials: true,
        });
        console.log("Retry Response from /verifyadmin:", retryResponse);
        return retryResponse.data;
      } catch (refreshError) {
        console.error("Error during token refresh:", refreshError.message);
        throw refreshError;
      }
    }
    throw error;
  }
};

export const adminrefreshToken = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/refreshadmin`, {
      withCredentials: true,
    });
    console.log("Response from refreshToken:", response);
    return response.data;
  } catch (error) {
    console.error("Error during token refresh:", error.message);
    throw error;
  }
};

export const verifyCustomer = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/verifyusertoken`, {
      withCredentials: true,
    });
    console.log("Response from verifyCustomer:", response);
    return response.data;
  } catch (error) {
    console.error("Error during user verification:", error.message);
    if (error.response && error.response.status === 403) {
      try {
        await refreshToken();
        const retryResponse = await axios.get(`${BASE_URL}/verifyusertoken`, {
          withCredentials: true,
        });
        console.log("Retry Response from verifyCustomer:", retryResponse);
        return retryResponse.data;
      } catch (refreshError) {
        console.error("Error during token refresh:", refreshError.message);
        throw refreshError;
      }
    }
    throw error;
  }
};

export const uploadAdminImage = async (imageData) => {
  try {
    const response = await axios.post(`${BASE_URL}/adminimg`, imageData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading admin image:", error);
  }
};
export const getAdminIMG = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getadminIMG`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error retrieving admin image:", error);
  }
};
export const uploadCustomerImage = async (imageData) => {
  try {
    const response = await axios.post(`${BASE_URL}/addimg`, imageData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading Customer image:", error);
  }
};

export const getCustomerIMG = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getIMG`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error retrieving Customer image:", error);
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/refresh`, {
      withCredentials: true,
    });
    console.log("Response from refreshToken:", response);
    return response.data;
  } catch (error) {
    console.error("Error during token refresh:", error.message);
    throw error;
  }
};

export const addConsultant = async (data) => {
  try {
    return axios.post(`${BASE_URL}/addConsultants`, data, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error adding Consultant:", error);
  }
};

export const getAllConsultant = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllConsultants`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching consultants:", error);
    throw error;
  }
};

export const addInventory = async (data) => {
  try {
    const addnventory = await axios.post(`${BASE_URL}/addInventory`, data);
    return addnventory.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllInventories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllInventory`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Inventory:", error);
    throw error;
  }
};

export const getInventoryCount = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllInventoryCount`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching count of Inventory:", error);
    throw error;
  }
};

export const getCustomerCount = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getRegisteredCustomerCount`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching count of RegisteredCustomers:", error);
    throw error;
  }
};

export const getConsultantCount = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getConsultantCount`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching count of RegisteredConsultant:", error);
    throw error;
  }
};

export const addPetcareSupply = async (data) => {
  try {
    const addPetcareSupply = await axios.post(
      `${BASE_URL}/addpetcaresupply`,
      data
    );
    return addPetcareSupply.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPetcareSupply = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllpetcaresupply`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching PetcareSupply:", error);
    throw error;
  }
};

export const getAppointmentCount = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAppointmentCount/:id`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching count of AppointmentCount:", error);
    throw error;
  }
};

export const getPetRecordCount = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getcountPetRecord`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching count of PetRecord:", error);
    throw error;
  }
};
export const getAllConsultantNames = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getConsultantnames`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Consultant Names:", error);
    throw error;
  }
};

export const addAppointment = async (data) => {
  try {
    const addAppointment = await axios.post(`${BASE_URL}/addAppointment`, data);
    return addAppointment.data;
  } catch (error) {
    console.error("Error adding appointment:", error);
    throw error;
  }
};

export const updateConsultant = async (id, data) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/updateConsultant/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating consultant:", error);
    throw error;
  }
};

export const deleteConsultant = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteConsultant/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting consultant:", error);
    throw error;
  }
};

export const getConsultantById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/getConsultantByID/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Consultant by ID:", error);
    throw error;
  }
};

export const updateInventory = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/updateInventory/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating Inventory:", error);
    throw error;
  }
};

export const deleteInventory = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteInventory/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Inventory:", error);
    throw error;
  }
};

export const getInventoryById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/getInventoryByID/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Inventory by ID:", error);
    throw error;
  }
};

export const getPetcareSupplyById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllpetcaresupply/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching PetcareSupply by ID:", error);
    throw error;
  }
};

export const updatePetcareSupply = async (id, data) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/updatepetcaresupply/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating PetCareSupply:", error);
    throw error;
  }
};

export const deletepetcaresupply = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/deletepetcaresupply/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting Pet Care Supply:", error);
    throw error;
  }
};

export const getAllCustomerAndConsultantEmails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllEmails`, {
      withCredentials: true,
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Consultant or Customer Emails:", error);
    throw error;
  }
};

export const SendCustomerNotification = async (data) => {
  try {
    const SendNotification = await axios.post(
      `${BASE_URL}/SendnotificationCustomer`,
      data,
      {
        withCredentials: true,
      }
    );
    return SendNotification.data;
  } catch (error) {
    console.log(error);
  }
};

export const SendConsultantNotification = async (data) => {
  try {
    const SendNotification = await axios.post(
      `${BASE_URL}/SendnotificationConsultant`,
      data,
      {
        withCredentials: true,
      }
    );
    return SendNotification.data;
  } catch (error) {
    console.log(error);
  }
};

export const addPetRecords = async (data) => {
  try {
    const addPetRecords = await axios.post(`${BASE_URL}/AddPetRecords`, data);
    return addPetRecords.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPetRecords = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllPetRecord`, {
      withCredentials: true,
    });
    console.log("Fetched Pet Records:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching All Pet Records:", error.message || error);
    throw error;
  }
};

export const deletepetRecords = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/DeletePetRecord/${id}`);
    if (response.status === 200) {
      console.log("Pet Record deleted successfully:", response.data);
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting Pet Records:", error);
    throw error;
  }
};

export const UpdatePetRecord = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/UpdatePetRecord/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating Pet Records:", error);
    throw error;
  }
};

export const getPetRecordById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/getPetRecordByid/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching PetcareSupply by ID:", error);
    throw error;
  }
};

export const getAllAppointments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllAppointment`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching  Appointments:", error);
    throw error;
  }
};

export const UpdateAppointment = async (id, data) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/updateAppointment/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating Appointment:", error);
    throw error;
  }
};

export const getAppointmentById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/getAppointmentById/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Appointment by ID:", error);
    throw error;
  }
};

export const deleteAppointment = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteAppointment/${id}`);
    if (response.status === 200) {
      console.log("Appointment  deleted successfully:", response.data);
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting Appointment :", error);
    throw error;
  }
};
export const getAllNotifications = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllCustomerMessages`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Notifications :", error);
    throw error;
  }
};

export const ISReadAllNotifications = async () => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/updateCustomerNotifications`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating notifications:", error);
    throw error;
  }
};

export const AddMessage = async (data) => {
  try {
    const AddMessage = await axios.post(`${BASE_URL}/MakeContact`, data);
    return AddMessage.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllDoctors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllDoctors`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching  Doctors :", error);
    throw error;
  }
};

export const getAllAppointmentPrices = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/appointmenttotal`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching  Prices :", error);
    throw error;
  }
};

export const uploadConsultantImage = async (imageData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/addConsultantimg`,
      imageData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading Consultant image:", error);
  }
};

export const getConsultantIMG = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getConsultantIMG`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error retrieving Consultant image:", error);
  }
};

export const getAllConsultantAppointment = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllAppointmentCount`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error retrieving Appointments:", error);
  }
};

export const getConsultantAppointment = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/getAllConsultantAppointments`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving Appointments:", error);
  }
};

export const ApproveStatus = async (data) => {
  try {
    const AddMessage = await axios.post(`${BASE_URL}/addApprove`, data);
    return AddMessage.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAppointmentStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getStatus`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error retrieving Appointments:", error);
  }
};

export const getAllConsultantNotifications = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllConsultantMessages`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Notifications :", error);
    throw error;
  }
};

export const getAllIncome = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllprices`, {});
    return response.data;
  } catch (error) {
    console.error("Error fetching Notifications :", error);
    throw error;
  }
};

export const SendForgotPassword = async (data) => {
  try {
    const SendForgotPassword = await axios.post(
      `${BASE_URL}/Customerforgotpassword`,
      data
    );
    return SendForgotPassword.data;
  } catch (error) {
    console.log(error);
  }
};

export const ResetCustomerPassword = async (id, token, data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/ResetPassword/${id}/${token}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

export const SendAdminForgotPassword = async (data) => {
  try {
    const SendAdminForgotPassword = await axios.post(
      `${BASE_URL}/Adminforgotpassword`,
      data
    );
    return SendAdminForgotPassword.data;
  } catch (error) {
    console.log(error);
  }
};

export const ResetAdminPassword = async (id, token, data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/ResetAdminPassword/${id}/${token}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

export const SendConsultantForgotPassword = async (data) => {
  try {
    const SendConsultantForgotPassword = await axios.post(
      `${BASE_URL}/Consultantforgotpassword`,
      data
    );
    return SendConsultantForgotPassword.data;
  } catch (error) {
    console.log(error);
  }
};

export const ResetConsultantPassword = async (id, token, data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/ResetConsultantPassword/${id}/${token}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

export const getAllConsultantpetRecords = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllConsultantPetRecord`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Consultant Names:", error);
    throw error;
  }
};

export const getAllContactmessages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/GetAllMessage`);
    return response.data;
  } catch (error) {
    console.error("Error fetching getAllContact messages :", error);
    throw error;
  }
};

export const AppointmentPrice = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/AppointmentPayment`, data);
    return response.data;
  } catch (error) {
    console.error("Error Adding the Appointment Price:", error);
    throw error;
  }
};
