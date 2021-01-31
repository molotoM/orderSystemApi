const {
    Pool,
    types
} = require('pg');

var pg = require('pg');
pg.defaults.ssl = true;
const Sequelize = require('sequelize');
const connection_string = 'postgres://zwbobeebnmhnii:c6a857cb9d5b4a5d0827c8452240bd22d289b0306461031b2069c20be70da054@ec2-52-71-107-99.compute-1.amazonaws.com:5432/d3j1kta4ml44ai';

module.exports = class Database {
    constructor() {
        try {
            this.pool = new Pool({
                connectionString: connection_string,
                ssl:true
            });

            types.setTypeParser(1700, value => parseFloat(value));

            types.setTypeParser(20, value => parseInt(value));
        } catch (error) {
            throw error;
        }

        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err);
        });
    }

    functionWithResults(functionname) {
        debugger;
        const removeQuotes = `SELECT * FROM ${functionname}()`

        removeQuotes.replace(/'/g, "''");

        return new Promise((resolve, reject) => {
            this.pool.connect()
                .then(client => client.query(removeQuotes)
                    .then((res) => {
                        const rb = {
                            status: true,
                            message: 'Success',
                            data: res.rows
                        }

                        resolve(rb);
                    })
                    .catch((err) => {
                        const rb = {
                            status: false,
                            message: `Failed To Retrieve Data ${err.stack}`,
                            data: err
                        }
                        reject(rb);
                    }));
        });
    }


    callFnWithResultsById(functionname) {

        try {
            const removeQuotes = `SELECT * FROM ${functionname}`

            removeQuotes.replace(/'/g, "''");
    
            return new Promise((resolve, reject) => {
                this.pool.connect()
                    .then(client => client.query(removeQuotes)
                        .then((res) => {
                            const rb = {
                                status: true,
                                message: 'Success',
                                data: res.rows
                            }
    
                            resolve(rb);
                        })
                        .catch((err) => {
                            const rb = {
                                status: false,
                                message: `Failed To Retrieve Data ${err.stack}`,
                                data: err
                            }
                            reject(rb);
                        }));
            });
        } catch (err) {
            const rb = {
                status: false,
                message: `Failed To Retrieve Data ${err.stack}`,
                data: err
            }
            reject(rb);
        }
        
       
    }

    
    callFnWithResultsAdd(functionname, adduser) {
        debugger;
        const removeQuotes = `SELECT * FROM ${functionname}`

        removeQuotes.replace(/'/g, "''");

        return new Promise((resolve, reject) => {
            this.pool.connect()
                .then(client => client.query(removeQuotes, adduser)
                    .then((res) => {
                        const rb = {
                            status: true,
                            message: 'Success',
                            data: res.rows
                        }

                        resolve(rb);
                    })
                    .catch((err) => {
                        const rb = {
                            status: false,
                            message: `Failed To addData ${err.stack}`,
                            data: err
                        }
                        reject(rb);
                    }));
        });
    }


};