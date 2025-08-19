import { FaHome, FaHeart } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

export default function Navbar({ currentPage, setCurrentPage }) {
  const { loggedInUser, logout } = useContext(FavoritesContext);

  const menuItems = [
    { name: "Home", icon: <FaHome />, page: "home" },
    { name: "Favorites", icon: <FaHeart />, page: "favorites" },
    { name: "Add Movies", icon: <IoMdAddCircleOutline />, page: "addMovies" },
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-4xl font-bold text-red-500 cursor-pointer">
          MovieHub
        </div>

        {/* Menu Links */}
        <ul className="hidden md:flex gap-6 items-center text-xl font-medium">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => setCurrentPage(item.page)}
              className={`flex items-center gap-2 cursor-pointer transition ${currentPage === item.page ? "text-red-500" : "hover:text-red-500"
                }`}
            >
              {item.icon} {item.name}
            </li>
          ))}
        </ul>

        {/* Right Side Auth Buttons */}
        <div className="flex gap-3 items-center">
          {loggedInUser ? (
            <>
              <span className="font-semibold">Welcome, {loggedInUser.name}</span>
              <button
                 onClick={() => { logout(); setCurrentPage("login"); }}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setCurrentPage("login")}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
              >
                Login
              </button>
              <button
                onClick={() => setCurrentPage("signup")}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        <div className="md:hidden cursor-pointer">
          ☰
        </div>
      </div>
    </nav>
  );
}
