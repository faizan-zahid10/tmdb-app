import { useContext, useState } from "react";
import { MyMoviesContext } from "../context/MyMoviesContext";

export default function AddMovieModal({ onClose }) {
  const { addMovie } = useContext(MyMoviesContext);
  const [title, setTitle] = useState("");
  const [posterFile, setPosterFile] = useState(null);
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !posterFile || !date) return;

    const movie = {
      id: Date.now(),
      title,
      release_date: date,
      poster_path: URL.createObjectURL(posterFile) // preview image
    };

    addMovie(movie);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Movie</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPosterFile(e.target.files[0])}
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-400"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
