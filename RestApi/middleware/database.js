const mysql = require('mysql');
const config = require('../config.js');
const logging = require('./logging.js');
config.database.debug = config.system.debug;

var pool = mysql.createPool(config.database.mysql);
var db = module.exports = {
    exec: function (req, param, callback) {
        // test entry array and pass by parameter to the query function
        /*var entry = {
            id: item[i],
            time_created: Math.floor(Date.now() / 1000),
            time_created: Math.floor(Date.now() / 1000),
            price_range: 0
        };*/
        pool.getConnection((err, con)=> {
            con.query(req, param, function (err, rows) {
                let res = rows;
                if (err) {
                    console.log(req);
                    logging.write("./logs/database_error.log", err);
                    db.error(req, err);
                    if (con) {con.destroy();}
                    callback(false, err);
                }
                con.release();
                return (typeof callback !== 'undefined') ? callback(res, err) : res;
            });
            if(err){
                logging.write("./logs/database_error.log", err);
            }
        });

    },
    error: function (req, err) {
        logging.write("./logs/database_error.log", req);
        logging.write("./logs/database_error.log", JSON.stringify(err));
        throw err;
    }
}


