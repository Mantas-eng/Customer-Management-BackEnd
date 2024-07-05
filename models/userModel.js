// models/userModel.js
const db = require('../database');
const bcrypt = require('bcrypt');

const addUser = (username, password, callback) => {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return callback(err);
    }

    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(sql, [username, hashedPassword], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: this.lastID, username });
    });
  });
};

const getUserByUsername = (username, callback) => {
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.get(sql, [username], (err, row) => {
    if (err) {
      return callback(err);
    }
    callback(null, row);
  });
};

const getUserById = (id, callback) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      return callback(err);
    }
    callback(null, row);
  });
};

module.exports = { addUser, getUserByUsername, getUserById };
