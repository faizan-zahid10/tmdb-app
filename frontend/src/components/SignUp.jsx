import { useState } from "react";
import axios from "axios";

export default function SignUp({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert(res.data.message);
      setCurrentPage("login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" name="name" placeholder="Name"
          value={formData.name} onChange={handleChange}
          className="border p-2" required />
        <input type="email" name="email" placeholder="Email"
          value={formData.email} onChange={handleChange}
          className="border p-2" required />
        <input type="tel" name="phone" placeholder="Phone"
          value={formData.phone} onChange={handleChange}
          className="border p-2" required />
        <input type="password" name="password" placeholder="Password"
          value={formData.password} onChange={handleChange}
          className="border p-2" required />
        <button className="bg-green-500 text-white p-2 rounded">Sign Up</button>
      </form>
    </div>
  );
}
