import { createInstance } from "./index";


//Register a user

export const registerUser = async (payload) => {
  try {
    const response = await createInstance.post("/register", payload);
    return response;
  } catch (error) {
    return error;
  }
};