const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const TMDB_BASE = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

app.get('/api/movies/trending', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const { data } = await axios.get(`${TMDB_BASE}/trending/movie/week`, {
            params: { api_key: API_KEY, page }
        });
        res.json(data);
    } catch (e) {
        console.error(e?.response?.data || e.message);
        res.status(500).json({ error: 'Failed to fetch trending movies' });
    }
});

app.get('/api/movies/:id', async (req, res) => {
    try {
        const { data } = await axios.get(`${TMDB_BASE}/movie/${req.params.id}`, {
            params: { api_key: API_KEY, language: 'en-US' }
        });
        res.json(data);
    } catch (e) {
        console.error(e?.response?.data || e.message);
        res.status(500).json({ error: 'Failed to fetch movie details' });
    }
});



app.get('/api/movies/popular', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const { data } = await axios.get(`${TMDB_BASE}/movie/popular`, {
            params: { api_key: API_KEY, page }
        });
        res.json(data);
    } catch (e) {
        console.error(e?.response?.data || e.message);
        res.status(500).json({ error: 'Failed to fetch popular movies' });
    }
});

app.get('/api/movies/upcoming', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const { data } = await axios.get(`${TMDB_BASE}/movie/upcoming`, {
            params: { api_key: API_KEY, page, language: 'en-US' }
        });
        res.json(data);
    } catch (e) {
        console.error(e?.response?.data || e.message);
        res.status(500).json({ error: 'Failed to fetch upcoming movies' });
    }
});


const usersFile = path.join(process.cwd(), "users.json");

// Signup 
app.post("/api/auth/signup", (req, res) => {
  const { name, email, phone, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile));

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "Email already exists" });
  }

  users.push({ name, email, phone, password });
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.json({ message: "Signup successful" });
});

// Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile));

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful", user });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
