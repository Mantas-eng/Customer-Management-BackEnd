const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('customers.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    comment TEXT NOT NULL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS actions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerId INTEGER,
    action TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

const getAllCustomers = (callback) => {
  db.all('SELECT * FROM customers', [], (err, rows) => {
    callback(err, rows);
  });
};

const getCustomerById = (id, callback) => {
  db.get('SELECT * FROM customers WHERE id = ?', [id], (err, row) => {
    callback(err, row);
  });
};

const addCustomer = (customer, callback) => {
  const { name, age, comment } = customer;
  db.run('INSERT INTO customers (name, age, comment) VALUES (?, ?, ?)', [name, age, comment], function (err) {
    if (!err) {
      db.run('INSERT INTO actions (customerId, action) VALUES (?, ?)', [this.lastID, 'Registered']);
    }
    callback(err, { id: this.lastID });
  });
};

const updateCustomer = (id, customer, callback) => {
  const { name, age, comment } = customer;
  db.run('UPDATE customers SET name = ?, age = ?, comment = ? WHERE id = ?', [name, age, comment, id], function (err) {
    if (!err) {
      db.run('INSERT INTO actions (customerId, action) VALUES (?, ?)', [id, 'Edited']);
    }
    callback(err);
  });
};

const deleteCustomer = (id, callback) => {
  db.run('DELETE FROM customers WHERE id = ?', [id], function (err) {
    if (!err) {
      db.run('INSERT INTO actions (customerId, action) VALUES (?, ?)', [id, 'Deleted']);
    }
    callback(err);
  });
};

const getCustomerActions = (customerId, callback) => {
  db.all('SELECT * FROM actions WHERE customerId = ?', [customerId], (err, rows) => {
    callback(err, rows);
  });
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerActions,
};
