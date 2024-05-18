import { axiosInstance } from ".";


//Add movie
export const addMovie = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/movies/add-movie", payload);
    return response;
  } catch (error) {
    return error.response;
  }
};

//Get all movies
export const getMovies= async ()=>{
  try {
    const response = await axiosInstance.get("/api/movies/all-movies");
    return response.data;
  } catch (error) {
    return error.response;
  }
}

//Delete movie
export const deleteMovie= async (id)=>{
  try {
    const response = await axiosInstance.delete(`/api/movies/${id}`);
    return response.data;
  } catch (error) {
    return error.response;
    
  }
}

//Update a movie
export const updateMovie = async (id, updatedData) => {
  try {
    const response = await axiosInstance.put(`/api/movies/update-movie`, {
      movieId: id,
      ...updatedData,
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};


