const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/customers', customerController.getCustomers);
router.get('/customers/:id', customerController.getCustomer);
router.post('/customers', customerController.createCustomer);
router.put('/customers/:id', customerController.updateCustomer);
router.delete('/customers/:id', customerController.deleteCustomer);
router.get('/customers/:id/actions', customerController.getCustomerActions);

module.exports = router;
