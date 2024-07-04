const customerModel = require('../models/customerModel');

const getCustomers = (req, res) => {
  customerModel.getAllCustomers((err, customers) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ customers });
  });
};

const getCustomer = (req, res) => {
  const { id } = req.params;
  customerModel.getCustomerById(id, (err, customer) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ customer });
  });
};

const createCustomer = (req, res) => {
  const customer = req.body;
  customerModel.addCustomer(customer, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json(result);
  });
};

const updateCustomer = (req, res) => {
  const { id } = req.params;
  const customer = req.body;
  customerModel.updateCustomer(id, customer, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(204).send();
  });
};

const deleteCustomer = (req, res) => {
  const { id } = req.params;
  customerModel.deleteCustomer(id, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(204).send();
  });
};

const getCustomerActions = (req, res) => {
  const { id } = req.params;
  customerModel.getCustomerActions(id, (err, actions) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ actions });
  });
};

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerActions,
};
