import { useState, useContext } from "react";
import axios from "axios";
import { FavoritesContext } from "../context/FavoritesContext";

export default function Login({ setCurrentPage, setLoggedInUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { login } = useContext(FavoritesContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      alert(res.data.message);

      login(res.data.user);

      console.log(res.data.user);
      setCurrentPage("home");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="email" name="email" placeholder="Email"
          value={formData.email} onChange={handleChange}
          className="border p-2" required />
        <input type="password" name="password" placeholder="Password"
          value={formData.password} onChange={handleChange}
          className="border p-2" required />
        <button className="bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}

