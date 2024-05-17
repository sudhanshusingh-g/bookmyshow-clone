import { axiosInstance } from ".";

export const addMovie = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/movies/add-movie", payload);
    return response;
  } catch (error) {
    return error.response;
  }
};
