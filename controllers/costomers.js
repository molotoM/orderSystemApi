const express = require('express');

const router = express();
const cors = require('cors');
const bodyParser = require('body-parser')

const Database = require('../database');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());
var postgres = new Database()
 

//CUSTOMER====================================================================================================
//GET ALL CUSTOMERS===========================================================================================
router.get('/allcustomers', (req, res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control_Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
   
 debugger;

    const functionName = `fn_get_all_customer`;

    return new Promise((resolve, reject) => {

        postgres.functionWithResults(functionName)
            .then((data) => {
                debugger;
                res.status(200).json({
                    message: 'Here is all appointments',
                    appointments: data,
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
//ADD A CUSTOMER==============================================================================================
router.post('/addCustomer/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control_Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");

    debugger;
    return new Promise((resolve, reject) => {
        let placeholder = '';
        let count = 1;
        const params = Object.keys(req.body).map(key => [(key), req.body[key]]);

        const paramsValues = Object.keys(req.body).map(key => req.body[key]);

        if (Array.isArray(params)) {
            params.forEach(() => {
                placeholder += `$${count},`;
                count += 1;
            });
        } 

        placeholder = placeholder.replace(/,\s*$/, ''); 

        const functionName = `public.fn_add_new_customer`;

        const sql = `${functionName}(${placeholder})`;

        postgres.callFnWithResultsAdd(sql, paramsValues)
        .then((data) => {
            debugger;
            res.status(201).json({
                message: 'Successfully Added Customer',
                customer: data
            });
            resolve(data);

        })
        .catch((error) => {
            debugger;
            res.status(500).json({
                message: 'bad Request',
                error: error,
                status: false
            });
            reject(error);
        })
    })
});
//GET CUSTOMER BY EMAIL=========================================================================
router.get('/getEmail/:email', (req, res, next) => {
    

    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control_Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");

    const functionName = `fn_get_customer_email('${req.params.email}')`;

        postgres.callFnWithResultsById(functionName)  
            .then((data) => {
                res.status(200).json({
                    message: 'You discovered a costomer',
                    customer: data,
                    status: true
                });
            })
            .catch((error => {
            debugger;
                console.log(error);
                res.status(500).json({
                    message: 'bad Request',
                    error: error,
                    status: false
                });
            }))

});

module.exports = router;