import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      const updated = exists
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
