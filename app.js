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

const app = express();
app.use(express.json());

// TODO :: update to same server request 
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL"))
    .catch(err => console.error("❌ Connection error", err));

app.get('/', (req, res) => {
    res.send('pong');
});

app.use('/login', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/categories', categoryRoutes);


// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
