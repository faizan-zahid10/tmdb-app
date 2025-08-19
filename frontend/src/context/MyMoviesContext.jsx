import { createContext, useState, useEffect, useContext } from "react";
import { FavoritesContext } from "./FavoritesContext";
import { set, get } from "idb-keyval";

export const MyMoviesContext = createContext();

export function MyMoviesProvider({ children }) {
  const { loggedInUser } = useContext(FavoritesContext);
  const [myMovies, setMyMovies] = useState([]);

  const storageKey = loggedInUser ? `myMovies:${loggedInUser.email}` : null;

  useEffect(() => {
    if (!storageKey) {
      setMyMovies([]);
      return;
    }
    (async () => {
      const list = await get(storageKey);
      setMyMovies(Array.isArray(list) ? list : []);
    })();
  }, [storageKey]);


  const persist = async (list) => {
    if (!storageKey) return;
    await set(storageKey, list); 
  };

  const addMovie = (movie, file) => {
    if (!storageKey) return alert("Please login first");

    if (myMovies.some((m) => m.id === movie.id)) {
      return alert("Movie already added");
    }

    const done = (m) => {
      const next = [...myMovies, m]; 
      setMyMovies(next);
      persist(next);
    };

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        done({ ...movie, poster_path: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      done(movie);
    }
  };

  const removeMovie = (id) => {
    if (!storageKey) return alert("Please login first");
    const next = myMovies.filter((m) => m.id !== id);
    setMyMovies(next);
    persist(next);
  };

  return (
    <MyMoviesContext.Provider value={{ myMovies, addMovie, removeMovie }}>
      {children}
    </MyMoviesContext.Provider>
  );
}
