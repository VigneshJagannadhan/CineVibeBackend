require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movie'); // Assuming you have this file for movie routes

const app = express();
const PORT = process.env.PORT || 5001;

// Use the CORS middleware
app.use(cors());

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/movies', movieRoutes); // Assuming you have movie routes

app.get('/', (req, res) => {
  res.send('Movie Review App Backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const mongoURI = process.env.MONGODB_URI || 'your-default-mongodb-uri';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log('MongoDB connection error:', err));
