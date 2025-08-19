import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { FaHeart } from "react-icons/fa";

export default function Favorites() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition duration-300"
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="w-full h-72 object-fill"
                />
              ) : (
                <div className="w-full h-60 bg-gray-700 flex items-center justify-center">
                  No Image
                </div>
              )}

              {/* Heart button */}
              <button
                onClick={() => toggleFavorite(movie)}
                className="absolute top-2 right-2 text-xl text-white hover:text-red-500 transition"
              >
                <FaHeart className="text-red-500 cursor-pointer" />
              </button>

              <div className="p-2">
                <h2 className="font-semibold text-sm truncate">
                  {movie.title || movie.name}
                </h2>
                <p className="text-xs text-gray-400">
                  {movie.release_date
                    ? new Date(movie.release_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })
                    : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-300 text-lg py-10">
          You have no favorite movies yet.
        </div>
      )}
    </div>
  );
}
