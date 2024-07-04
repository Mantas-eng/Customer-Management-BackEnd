const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('customers.db');

db.serialize(() => {
  db.run(`(id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    comment TEXT NOT NULL
  )`);
  db.run(`(id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerId INTEGER,
    action TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = db;
