const mysql = require('mysql');
const config = require('../config');
const logging = require('./logging.js');
config.database.debug = config.system.debug;

var db = module.exports = {
    exec: function (req, param, callback) {
        var con = mysql.createConnection(config.database.mysql);
        con.connect(function (err) {
            if (err) {
                throw err;
            }

            con.query(req, param, function (err, res) {
                con.end();
                if (err) {throw err;}
                var rows = res;
                callback(rows, err);
            });
        });
    },
    error: function (req, err) {
        logging.write("./logs/database_error.log", req);
        logging.write("./logs/database_error.log", JSON.stringify(err));
        throw err;
    }
}