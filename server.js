// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/User');
const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Movie Review App Backend');
});

app.get('/protected', auth, (req, res) => {
  res.send('This is a protected route');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const mongoURI = 'mongodb+srv://vigneshjagannadhan1998:xMBHBGJpX6HV3NyA@cinevibe.odzn09h.mongodb.net/CineVibeDB?retryWrites=true&w=majority&appName=CineVibe';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log('MongoDB connection error:', err));
