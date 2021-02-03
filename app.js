const express = require('express');

const router = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const Database = require('./database');
const customer = require('./controllers/costomers')
const orders = require('./controllers/orders')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());
var postgres = new Database()
//var cust = new Customer
router.use('/customer',customer)
router.use('/order',customer)

//HELLO WORLD=================================================================================================
router.get('/', (req, res) => res.send('Hello World!'))

module.exports = router;