const express = require('express');

const router = express();
const cors = require('cors');
const bodyParser = require('body-parser')

const Database = require('../database');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());
var postgres = new Database()

//GET ALL ORDERS===========================================================================================
router.get('/allOrder', (req, res,next) => {
   
    debugger;
       const functionName = `fn_get_all_orders`;
   
       return new Promise((resolve, reject) => {
   
           postgres.functionWithResults(functionName)
               .then((data) => {
                   debugger;
                   res.status(200).json({
                       message: 'Here is all orders',
                       orders: data,
                       status: true
                   });
                   resolve(data);
   
               })
               .catch((error => {
                   debugger;
                   res.status(500).json({
                       message: 'bad Request',
                       error: error,
                       status: false
                   });
                   reject(error);
               }))
   
       })
   });
   
module.exports = router;