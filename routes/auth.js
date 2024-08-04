const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ error: 'This Email already exists' });
    }

    user = await User.findOne({ username });
    if (user) {
      return res.status(400).send({ error: 'Username already exists' });
    }

    user = new User({
      name,
      username,
      email,
      password: await bcrypt.hash(password, 10)
    });

    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

router.get('/get-profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password'); // Exclude the password field
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

module.exports = router;
