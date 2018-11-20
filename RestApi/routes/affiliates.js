const mysql = require('../middleware/database.js');

var affiliates = {
    getAll: function (req, res) {
        mysql.exec("SELECT `i`.`iditems`, `o`.`orderno`, `i`.`itemno`, `i`.`productid`, `i`.`productname`, `i`.`age`, `i`.`gender`, `o`.`transactionid`, DATE_FORMAT(`o`.`orderDate`, '%m/%d/%Y') `orderDate`, `o`.`status`, `c`.`firstname`, `c`.`lastname` FROM `items` `i` LEFT JOIN `orders` `o` ON `o`.`orderno` = `i`.`orderno` LEFT JOIN  `customers` `c` ON `c`.`idcustomers` = `o`.`customerid` GROUP BY `i`.`iditems`", null, function (result) {
            res.json(result);
        });
    },
    getOne: function (req, res) {
        let o = {}
        mysql.exec("SELECT * FROM `orders` WHERE `orderno` = '" + req.params.idorders + "'", null, function (order) {
            if (order.length > 0) {
                o = order[0];
                mysql.exec("SELECT * FROM `items` WHERE `orderid` = '" + order[0].orderno + "'", null, function (items) {
                    o['items'] = items;
                    mysql.exec("SELECT * FROM `customers` WHERE `idcustomers` = '" + order[0].customerid + "'", null, function (customer) {
                        o['customer'] = customer;
                        res.json(o);
                    });
                });
            } else {
                res.json(false);
            }
        });
    },
    create: function (req, res) {
        mysql.exec("INSERT INTO `orders` SET ?", req.body, function (result) {
            res.json(result);
        })
    },
    update: function (req, res) {
        mysql.exec("UPDATE `orders` SET ? ", req.body, function (result) {
            res.json(result);
        })
    },
    delete: function (req, res) {
        mysql.exec("DELETE FROM `orders` WHERE `idorders` = ?", {idorders: req.body.id}, function (result) {
            res.json(result);
        });
    }
}

module.exports = affiliates;