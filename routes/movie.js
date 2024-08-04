const express = require('express');
const auth = require('../middleware/auth');
const Movie = require('../models/Movie');

const router = express.Router();

// Endpoint to create a movie
router.post('/create', auth, async (req, res) => {
  const { title, genre, description, image, link } = req.body;

  try {
    const movie = new Movie({
      title,
      genre,
      description,
      image,
      link,
    });

    await movie.save();

    res.status(201).send(movie);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

// Endpoint to get all movies with pagination
router.get('/all', async (req, res) => {
  // Get page and limit from query parameters, default to page 1 and limit 10
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  try {
    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch movies with pagination
    const movies = await Movie.find().skip(skip).limit(limit);

    // Get the total count of movies for pagination
    const totalMovies = await Movie.countDocuments();

    res.send({
      movies,
      page,
      limit,
      totalMovies,
      totalPages: Math.ceil(totalMovies / limit),
    });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

module.exports = router;
