import { createContext, useState, useEffect } from "react";

export const MyMoviesContext = createContext();

export function MyMoviesProvider({ children }) {
    const [myMovies, setMyMovies] = useState([]);

    // Load saved movies from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("myMovies");
        if (saved) setMyMovies(JSON.parse(saved));
    }, []);

    const addMovie = (movie, file) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const movieWithBase64 = { ...movie, poster_path: reader.result };
                setMyMovies((prev) => {
                    const updated = [...prev, movieWithBase64];
                    localStorage.setItem("myMovies", JSON.stringify(updated));
                    return updated;
                });
            };
            reader.readAsDataURL(file); 
        } else {
            setMyMovies((prev) => {
                const updated = [...prev, movie];
                localStorage.setItem("myMovies", JSON.stringify(updated));
                return updated;
            });
        }
    };


    // Remove a movie
    const removeMovie = (id) => {
        setMyMovies((prev) => {
            const updated = prev.filter((m) => m.id !== id);
            localStorage.setItem("myMovies", JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <MyMoviesContext.Provider value={{ myMovies, addMovie, removeMovie }}>
            {children}
        </MyMoviesContext.Provider>
    );
}
