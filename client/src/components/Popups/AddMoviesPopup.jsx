import { useState } from "react";
import { addMovie } from "../../apis/movies";

const AddMoviesPopup = ({ isOpen, onClose, onAddMovie }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    genre: "",
    language: "",
    releaseDate: "",
    poster: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await addMovie(formData);
      console.log(response.data);
      console.log(formData);
      if (response.status === 200) {
        // Handle success, maybe redirect or show a success message
        onClose();
        setFormData({
          title: "",
          description: "",
          duration: "",
          genre: "",
          language: "",
          releaseDate: "",
          poster: "",
        });
      } else {
        // Handle error response
        console.error("Failed to add movie:", response.data);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error adding movie:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      } bg-gray-900 bg-opacity-50`}
    >
      <div className="bg-white p-4 rounded-md shadow-md ">
        <h2 className="text-lg font-semibold mb-4">Add Movies</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="name"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="p-2 border-2 rounded outline-none w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="p-2 border-2 rounded outline-none w-full"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="flex gap-4">
            <div className="mb-4">
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700"
              >
                Duration
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="p-2 border-2 rounded outline-none w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="genre"
                className="block text-sm font-medium text-gray-700"
              >
                Genre
              </label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="p-2 border-2 rounded outline-none w-full"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="language"
              className="block text-sm font-medium text-gray-700"
            >
              Language
            </label>
            <input
              type="text"
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="p-2 border-2 rounded outline-none w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="releaseDate"
              className="block text-sm font-medium text-gray-700"
            >
              Released Date
            </label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              className="p-2 border-2 rounded outline-none w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="poster"
              className="block text-sm font-medium text-gray-700"
            >
              Poster URL
            </label>
            <input
              type="text"
              id="poster"
              name="poster"
              value={formData.poster}
              onChange={handleChange}
              className="p-2 border-2 rounded outline-none w-full"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center ml-3 px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMoviesPopup;
