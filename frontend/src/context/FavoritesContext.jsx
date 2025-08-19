import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  // const [allFavorites, setAllFavorites] = useState({});
  const [loggedInUser, setLoggedInUser] = useState(null);

  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
      setLoggedInUser(user);
   
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      const allFavs = JSON.parse(localStorage.getItem("favorites")) || {};
      setFavorites(allFavs[loggedInUser.email] || []);
    }
    else {
      setFavorites([]);
    }
  }, [loggedInUser]); 


   const login = (user) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setLoggedInUser(user);
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };


  const toggleFavorite = (movie) => {
    if (!loggedInUser) return alert("Please login first");

    const userEmail = loggedInUser.email;

    const allFavs = JSON.parse(localStorage.getItem("favorites")) || {};
    let userFavs = allFavs[loggedInUser.email] || [];

    const exists = userFavs.some((m) => m.id === movie.id);
    
    let updatedUserFavs;
    if (exists) {
      updatedUserFavs = userFavs.filter((m) => m.id !== movie.id);
    } else {
      updatedUserFavs = [...userFavs, movie];
    }

    allFavs[loggedInUser.email] = updatedUserFavs;
    localStorage.setItem("favorites", JSON.stringify(allFavs));

    setFavorites(updatedUserFavs);
  };


  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, loggedInUser, login, logout }}>
      {children}
    </FavoritesContext.Provider>
  );
}
