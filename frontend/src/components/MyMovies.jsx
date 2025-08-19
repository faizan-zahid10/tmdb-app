import { useContext } from "react";
import { MyMoviesContext } from "../context/MyMoviesContext";
import { FaTimes } from "react-icons/fa";

const MyMovies = ({ title, icon }) => {
  const { myMovies, removeMovie } = useContext(MyMoviesContext);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 tracking-wide">
        {icon && <span className="text-xl">{icon}</span>}
        {title}
      </h2>

      {myMovies.length === 0 ? (
        <p className="text-gray-400">No movies added</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {myMovies.map((movie) => (
            <div
              key={movie.id}
              className="relative bg-gray-900 p-2 rounded-lg"
            >
              <button
                onClick={() => removeMovie(movie.id)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full"
              >
                <FaTimes size={14} />
              </button>

              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-full h-60 object-cover rounded"
              />
              <p className="mt-2 text-lg">{movie.title}</p>
              <p className="text-sm text-gray-400">{movie.release_date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyMovies;
