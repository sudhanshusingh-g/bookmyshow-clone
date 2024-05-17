import { useState, useEffect } from "react";
import AddMoviesPopup from "../../components/Popups/AddMoviesPopup";
import { deleteMovie, getMovies } from "../../apis/movies";
import { addMovie } from "../../apis/movies";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import moment from "moment";
function Home() {
  const [activeTab, setActiveTab] = useState("movies");
  const [isAddMoviesPopupOpen, setIsAddMoviesPopupOpen] = useState(false);
  const [movies, setMovies] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddMoviesClick = () => {
    setIsAddMoviesPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsAddMoviesPopupOpen(false);
  };

 const fetchData = async () => {
   try {
     const response = await getMovies();
     if (response.success && Array.isArray(response.data)) {
       setMovies(response.data);
     } else {
       console.error("Invalid movies data:", response);
     }
   } catch (error) {
     console.error("Error fetching movies: ", error);
   }
 };

  useEffect(() => {
    
   fetchData();
    
  }, [movies]);

  const handleAddMovie = async (newMovie) => {
    try {
      const response = await addMovie(newMovie);
      if (response.status === 200) {
        setMovies([...movies, response.data]);
        setIsAddMoviesPopupOpen(false);
      } else {
        console.error("Failed to add movie:", response.data);
      }
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };


  const handleDelete= async (id)=>{
    try {
      const response=await deleteMovie(id);
      if (response.success) {
        const updatedMoviesList = movies.filter((movie) => movie._id !== id);
        setMovies(updatedMoviesList);
        console.log("Movie deleted successfully.");
      } else {
        console.error("Failed to delete movie:", response.message);
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  }

  return (
    <div className="p-4">
      <nav className="flex space-x-4">
        <button
          onClick={() => handleTabClick("movies")}
          className={`${
            activeTab === "movies"
              ? "bg-red-400 text-white"
              : "bg-gray-200 text-gray-800"
          } px-4 py-2 rounded-md transition-colors duration-300 focus:outline-none`}
        >
          Movies
        </button>
        <button
          onClick={() => handleTabClick("theatres")}
          className={`${
            activeTab === "theatres"
              ? "bg-red-400 text-white"
              : "bg-gray-200 text-gray-800"
          } px-4 py-2 rounded-md transition-colors duration-300 focus:outline-none`}
        >
          Theatres
        </button>
      </nav>

      {activeTab === "movies" && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <div className="flex justify-between items-center mb-4 ">
            <h2 className="text-lg font-semibold">Movies List</h2>
            <button
              onClick={handleAddMoviesClick}
              className="text-blue-400 px-3 py-2 rounded-md "
            >
              Add Movies
            </button>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Poster
                </th>
                <th className="px-6  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Genre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Language
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Released Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td className="px-6 py-4">
                    <img src={movie.poster} alt={movie.name} className="h-24" />
                  </td>
                  <td className="px-6 py-4 text-sm">{movie.title}</td>
                  <td className="px-6 py-4 text-sm">{movie.description}</td>
                  <td className="px-6 py-4 text-sm">{movie.duration}</td>
                  <td className="px-6 py-4 text-sm">{movie.genre}</td>
                  <td className="px-6 py-4 text-sm">{movie.language}</td>
                  <td className="px-6 py-4 text-sm">
                    {moment(movie.releaseDate).format(`YYYY-MM-DD`)}
                  </td>
                  <td className="p-4 flex gap-2">
                    <CiEdit className="text-lg hover:text-blue-400 cursor-pointer" />

                    <MdOutlineDeleteOutline onClick={()=>handleDelete(movie._id)} className="text-lg hover:text-red-400 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "theatres" && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold">Content from theatres</h2>
          <p className="text-gray-700">
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      )}

      <AddMoviesPopup
        isOpen={isAddMoviesPopupOpen}
        onClose={handleClosePopup}
        onAddMovie={handleAddMovie}
      />
    </div>
  );
}

export default Home;
