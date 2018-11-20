const express = require('express');
const router = express.Router();

const auth = require('./auth');
const orders = require('./orders');
const coupons = require('./coupons');
const affiliates = require('./affiliates');
const dashboard = require('./dashboard');
const stats = require('./dashboard');

router.post('/authenticate', auth.login);

// Dashboard Routes
router.get('/api/v1/dashboard', dashboard.get);

// Order Routes
router.get('/api/v1/orders', orders.getAll);
router.get('/api/v1/order/:idorders', orders.getOne);
router.post('/api/v1/order', orders.create);
router.put('/api/v1/order/:idorders', orders.update);
router.delete('/api/v1/order/:idorders', orders.delete);

// Order/Report
router.get('/api/v1/orders/report/:itemno', orders.getReport);

// Coupons Routes
router.get('/api/v1/coupons', coupons.getAll);
router.get('/api/v1/coupon/:idcoupons', coupons.getOne);
router.post('/api/v1/coupon', coupons.create);
router.put('/api/v1/coupon/:coupons', coupons.update);

router.delete('/api/v1/coupon/:coupons', coupons.delete);
// Affiliates Routes
router.get('/api/v1/affiliates', affiliates.getAll);
router.get('/api/v1/affiliate/:idaffiliates', affiliates.getOne);
router.post('/api/v1/affiliate', affiliates.create);
router.put('/api/v1/affiliate/:idaffiliates', affiliates.update);

router.delete('/api/v1/affiliate/:idaffiliates', affiliates.delete);

module.exports = router;
