import { useState, useEffect } from "react";
import AddMoviesPopup from "../../components/Popups/AddMoviesPopup";

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

  // Dummy movie data for demonstration
  const dummyMovies = [
    {
      id: 1,
      title: "Movie 1",
      description: "Description of Movie 1",
      duration: "120 mins",
      genre: "Action",
      language: "English",
      releasedDate: "2022-01-01",
      posterUrl: "https://example.com/poster1.jpg", // Add poster URL here
    },
    {
      id: 2,
      title: "Movie 2",
      description: "Description of Movie 2",
      duration: "110 mins",
      genre: "Comedy",
      language: "English",
      releasedDate: "2022-02-15",
      posterUrl: "https://example.com/poster2.jpg", // Add poster URL here
    },
  ];

  useEffect(() => {
    // Set movies data (You can fetch this data from an API)
    setMovies(dummyMovies);
  }, []);

  const handleAddMovie = (newMovie) => {
    // Add the new movie to the movies list
    setMovies([...movies, newMovie]);
    // Close the popup
    setIsAddMoviesPopupOpen(false);
  };

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
        <div className="mt-4 p-4 bg-gray-100 rounded-md  overflow-scroll">
          <div className="flex justify-between items-center mb-4 ">
            <h2 className="text-lg font-semibold">Movies List</h2>
            <button
              onClick={handleAddMoviesClick}
              className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
            >
              Add Movies
            </button>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                  Poster
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{movie.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {movie.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {movie.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{movie.genre}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {movie.language}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {movie.releasedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={movie.posterUrl}
                      alt={movie.name}
                      className="h-24"
                    />
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
