import { axiosInstance } from "./index";


//Register a user

export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/register", payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/login", payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const cuurentUser = async () => {
  try {
    const response = await axiosInstance.post(
      "/api/users/current-user"
    );
    return response;
  } catch (error) {
    return error;
  }
};