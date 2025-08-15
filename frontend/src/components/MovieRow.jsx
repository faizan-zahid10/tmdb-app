import { useRef, useContext } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from "react-icons/fa";
import { FavoritesContext } from "../context/FavoritesContext";

export default function MovieRow({ title, movies, icon }) {
    const rowRef = useRef(null);
    const { favorites, toggleFavorite } = useContext(FavoritesContext);

    const scroll = (direction) => {
        if (rowRef.current) {
            const scrollAmount = direction === "left" ? -500 : 500;
            rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const isFavorite = (movie) => favorites.some((m) => m.id === movie.id);

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 tracking-wide">
                {icon && <span className="text-xl">{icon}</span>}
                {title}
            </h2>

            <div className="relative group">
                <button
                    onClick={() => scroll("left")}
                    className="hidden group-hover:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 
                     bg-black/70 p-3 rounded-full text-white hover:bg-black transition items-center justify-center"
                >
                    <FaChevronLeft />
                </button>

                {/* Movie Row */}
                <div
                    ref={rowRef}
                    className="flex overflow-x-scroll scrollbar-hide space-x-4 scroll-smooth p-2"
                >
                    {movies.map((m) => (
                        <div
                            key={m.id}
                            className="relative min-w-[160px] rounded-lg overflow-hidden flex-shrink-0 hover:cursor-pointer 
                         transform hover:scale-105 hover:shadow-lg transition duration-300 bg-gray-800"
                        >
                            <div className="w-full h-72 overflow-hidden">
                                {m.poster_path ? (
                                    <img
                                        src={m.poster_path?.startsWith("http") || m.poster_path?.startsWith("blob")
                                            ? m.poster_path
                                            : `https://image.tmdb.org/t/p/w300${m.poster_path}`}
                                        alt={m.title || m.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-60 bg-gray-700 flex items-center justify-center">
                                        No Image
                                    </div>
                                )}

                            </div>

                            <div
                                onClick={() => toggleFavorite(m)}
                                className="absolute top-2 right-2 text-xl text-red-500 cursor-pointer"
                            >
                                {isFavorite(m) ? <FaHeart /> : <FaRegHeart />}
                            </div>

                            <div className="p-2">
                                <h2 className="font-semibold text-sm truncate">{m.title || m.name}</h2>
                                <p className="text-xs text-gray-400">
                                    {m.release_date
                                        ? new Date(m.release_date).toLocaleDateString("en-US", {
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

                <button
                    onClick={() => scroll("right")}
                    className="hidden group-hover:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 
                     bg-black/70 p-3 rounded-full text-white hover:bg-black transition items-center justify-center"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
}
