const express = require('express');

const router = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const customer = require('./controllers/costomers')
const orders = require('./controllers/orders')
const items = require('./controllers/items')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());
//var cust = new Customer
router.use('/customer',customer)
router.use('/order',orders)
router.use('/items',items)

//HELLO WORLD=================================================================================================
router.get('/', (req, res) => res.send('Hello World!'))

module.exports = router;