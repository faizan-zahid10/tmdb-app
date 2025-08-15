import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import MovieRow from "./components/MovieRow";
import SearchBar from "./components/SearchBar";
import Favorites from "./components/Favorites";
import { FaFire, FaStar, FaCalendarAlt } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { FavoritesProvider } from "./context/FavoritesContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyMovies from "./components/MyMovies";
import AddMovieModal from "./components/AddMovieModal";
import { MyMoviesProvider, MyMoviesContext } from "./context/MyMoviesContext";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

function AppContent() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  const { myMovies, addMovie } = useContext(MyMoviesContext);

  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [tRes, pRes, uRes] = await Promise.all([
          axios.get(`${BACKEND}/api/movies/trending`),
          axios.get(`${BACKEND}/api/movies/popular`),
          axios.get(`${BACKEND}/api/movies/upcoming`),
        ]);
        setTrending(tRes.data.results || []);
        setPopular(pRes.data.results || []);
        setUpcoming(uRes.data.results || []);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSearch = (query) => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    const allMovies = [...trending, ...popular, ...upcoming];
    const filtered = allMovies.filter((m, index, self) => {
      const title = (m.title || m.name || "").toLowerCase();
      return (
        title.startsWith(cleanQuery) &&
        index === self.findIndex((t) => t.id === m.id)
      );
    });

    setSearchResults(filtered);
    setIsSearching(true);
  };

  const handleAddMovie = (movie) => {
    addMovie(movie); // Now goes through context
    setIsAddMovieOpen(false);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white text-lg">
        Loading movies...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-700 text-white">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={(page) => {
          if (page === "addMovies") {
            setIsAddMovieOpen(true);
          } else {
            setCurrentPage(page);
          }
        }}
      />

      {currentPage !== "favorites" && <SearchBar onSearch={handleSearch} />}

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
        {currentPage === "favorites" ? (
          <Favorites />
        ) : isSearching ? (
          searchResults.length > 0 ? (
            <MovieRow title="Search Results" movies={searchResults} />
          ) : (
            <div className="text-center text-gray-300 text-lg py-10">
              No results found
            </div>
          )
        ) : (
          <>
            <MovieRow
              title="Trending"
              movies={trending}
              icon={<FaFire className="text-red-500" />}
            />
            <MovieRow
              title="What's Popular"
              movies={popular}
              icon={<FaStar className="text-yellow-400" />}
            />
            <MovieRow
              title="Upcoming"
              movies={upcoming}
              icon={<FaCalendarAlt className="text-blue-400" />}
            />
            <MyMovies
              title="My Movies"
              icon={<MdLocalMovies className="text-green-400" />}
              movies={myMovies}
            />
          </>
        )}
      </div>

      {isAddMovieOpen && (
        <AddMovieModal
          onClose={() => setIsAddMovieOpen(false)}
          onAdd={handleAddMovie}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <MyMoviesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Router>
      </MyMoviesProvider>
    </FavoritesProvider>
  );
}
