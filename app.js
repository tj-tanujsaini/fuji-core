const dotenv = require('dotenv');
const path = require('path');

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: path.resolve(__dirname, envFile) });

const express = require("express");
const cors = require("cors");

const userRoutes = require('./src/routes/users');
const expenseRoutes = require('./src/routes/expenses');
const categoryRoutes = require('./src/routes/category');
const authRoutes = require('./src/routes/auth');
const pool = require('./src/connections/db');
const CORS_ORIGIN = process.env.CORS_ORIGIN;

const app = express();
app.use(express.json());

// TODO :: update to same server request 
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(cors({
  origin: [CORS_ORIGIN], // Allow all origins (for debugging, restrict later)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Connection error", err));

app.get('/', (req, res) => {
  const dramaticResponse = `
      .------..------..------.
      | P  || O  || N  || G  |
      '------''------''------'
       Pong! You've reached the server.
       Welcome to the land of code and creativity!
      `;

  res.send(`<pre>${dramaticResponse}</pre>`);
});

app.use('/api/login', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/categories', categoryRoutes);


// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
