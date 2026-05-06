const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:5173', // your React app's address
  credentials: true               // needed so cookies/sessions work cross-origin
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // change to true when deployed with HTTPS
}));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/api', require('./routes/game'));
app.use('/api', require('./routes/scores'));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));