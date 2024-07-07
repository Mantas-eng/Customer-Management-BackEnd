const jwt = require('jsonwebtoken');
const { addUser, getUserByUsername } = require('../models/userModel');

const jwtSecret = 'your_jwt_secret';

const authController = {
  register: (req, res) => {
    const { username, password } = req.body;

    getUserByUsername(username, (err, user) => {
      if (user) {
        return res.status(400).json({ message: 'User with this username already exists' });
      }

      addUser(username, password, (err, newUser) => {
        if (err) {
          return res.status(200).json({ message: 'Failed to register user' });
        }

        const token = jwt.sign({ userId: newUser.id }, jwtSecret, { expiresIn: '1h' });
        res.status(201).json({ token });
      });
    });
  },

  login: (req, res) => {
    const { username, password } = req.body;

    getUserByUsername(username, async (err, user) => {
      if (err || !user) {
        return res.status(404).json({ message: 'User with such username not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    });
  },
};

module.exports = authController;
