require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movie');

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);

app.get('/', (req, res) => {
  res.send('Cinevibe App Backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
.catch(err => console.log('MongoDB connection error:', err));
