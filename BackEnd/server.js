require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = require("./src/app");

// Apply CORS properly — allow localhost:3000 for dev, or use '*' temporarily
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
