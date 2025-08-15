import { FaHome, FaHeart } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function Navbar({ currentPage, setCurrentPage }) {
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
              className={`flex items-center gap-2 cursor-pointer transition ${
                currentPage === item.page ? "text-red-500" : "hover:text-red-500"
              }`}
            >
              {item.icon} {item.name}
            </li>
          ))}
        </ul>

        <div className="md:hidden cursor-pointer">
          ☰
        </div>
      </div>
    </nav>
  );
}
