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
    try {
        const response = await axios.post(`${BASE_URL}/login`, userData);
        return response.data;
    } catch (error) {
        console.error("Error Login customer:", error);
    }
};
export const Loginadmin = async(userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/loginadmin`, userData);
        return response.data;
    } catch (error) {
        console.error("Error Login admin:", error);
    }
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
    try {
        const response = await axios.post(`${BASE_URL}/loginConsultant`, userData);
        return response.data;
    } catch (error) {
        console.error("Error Login Consultant:", error);
    }
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