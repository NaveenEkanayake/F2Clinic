import axios from "axios";
const BASE_URL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

export const registerCustomer = async(userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/signup`, userData);
        return response.data;
    } catch (error) {
        console.error("Error registering customer:", error);
    }
};

export const Logincustomer = async(userData) => {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    return response.data;
};
export const Loginadmin = async(userData) => {
    const response = await axios.post(`${BASE_URL}/loginadmin`, userData);
    return response.data;
};

export const Logoutadmin = async() => {
    try {
        const response = await axios.post(
            `${BASE_URL}/logoutadmin`, {}, { withCredentials: true }
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

export const Loginconsultant = async(userData) => {
    const response = await axios.post(`${BASE_URL}/loginConsultant`, userData);
    return response.data;
};

export const verifyconsultant = async() => {
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

export const consultantrefreshToken = async() => {
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

export const verifyadmin = async() => {
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

export const adminrefreshToken = async() => {
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

export const verifyCustomer = async() => {
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

export const uploadAdminImage = async(imageData) => {
    try {
        const response = await axios.post(`${BASE_URL}/adminimg`, imageData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading admin image:", error);
    }
};
export const getAdminIMG = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/getadminIMG`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error retrieving admin image:", error);
    }
};
export const uploadCustomerImage = async(imageData) => {
    try {
        const response = await axios.post(`${BASE_URL}/addimg`, imageData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading Customer image:", error);
    }
};

export const getCustomerIMG = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/getIMG`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error retrieving Customer image:", error);
    }
};

export const refreshToken = async() => {
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

export const addConsultant = async(data) => {
    try {
        return axios.post(`${BASE_URL}/addConsultants`, data, {
            withCredentials: true,
        });
    } catch (error) {
        console.error("Error adding Consultant:", error);
    }
};

export const getAllConsultant = async() => {
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

export const addInventory = async(data) => {
    try {
        const addnventory = await axios.post(`${BASE_URL}/addInventory`, data);
        return addnventory.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllInventories = async() => {
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

export const getInventoryCount = async() => {
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

export const getCustomerCount = async() => {
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

export const getConsultantCount = async() => {
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

export const addPetcareSupply = async(data) => {
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

export const getAllPetcareSupply = async() => {
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

export const getAppointmentCount = async() => {
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

export const getPetRecordCount = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/getPetRecordByID/:id`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching count of PetRecord:", error);
        throw error;
    }
};
export const getAllConsultantNames = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/getAllConsultantNames`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching  ConsultantNames:", error);
        throw error;
    }
};

export const addAppointment = async(data) => {
    try {
        const addAppointment = await axios.post(`${BASE_URL}/Appointment`, data);
        return addAppointment.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateConsultant = async(id, data) => {
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

export const deleteConsultant = async(id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/deleteConsultant/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting consultant:", error);
        throw error;
    }
};

export const getConsultantById = async(id) => {
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

export const updateInventory = async(id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/updateInventory/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating Inventory:", error);
        throw error;
    }
};

export const deleteInventory = async(id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/deleteInventory/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting Inventory:", error);
        throw error;
    }
};

export const getInventoryById = async(id) => {
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

export const getPetcareSupplyById = async(id) => {
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

export const updatePetcareSupply = async(id, data) => {
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

export const deletepetcaresupply = async(id) => {
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

export const getAllCustomerAndConsultantEmails = async() => {
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

export const SendCustomerNotification = async(data) => {
    try {
        const SendNotification = await axios.post(
            `${BASE_URL}/SendnotificationCustomer`,
            data, {
                withCredentials: true,
            }
        );
        return SendNotification.data;
    } catch (error) {
        console.log(error);
    }
};

export const SendConsultantNotification = async(data) => {
    try {
        const SendNotification = await axios.post(
            `${BASE_URL}/SendnotificationConsultant`,
            data, {
                withCredentials: true,
            }
        );
        return SendNotification.data;
    } catch (error) {
        console.log(error);
    }
};