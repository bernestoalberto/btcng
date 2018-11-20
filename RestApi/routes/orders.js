const mysql = require('../middleware/database.js');

var orders = {
    getAll: function (req, res) {
        var o = {};
        mysql.exec("SELECT `i`.`iditems`, `o`.`orderno`, `i`.`itemno`, `i`.`productid`, `i`.`productname`, `c`.`age`, `c`.`gender`, `o`.`transactionid`, DATE_FORMAT(`o`.`orderDate`, '%Y-%m-%d %H:%i:%s') `orderDate`, `o`.`status`, `c`.`shipping_firstname`, `c`.`shipping_lastname`, `c`.`username`, `c`.`billing_email`, `c`.`billing_phone`, `c`.`shipping_state` FROM `items` `i` LEFT JOIN `orders` `o` ON `o`.`orderno`=`i`.`orderno` LEFT JOIN `customers` `c` ON `c`.`idcustomers`=`i`.`customerid` GROUP BY `i`.`iditems` ORDER BY `orderno` DESC", null, function (result) {
            res.json(result);
        });
    },
    getOne: function (req, res) {
        console.log("SELECT `i`.`iditems`, `o`.`orderno`, `i`.`itemno`, `i`.`productid`, `i`.`productname`, `c`.`age`, `c`.`gender`, `o`.`transactionid`, DATE_FORMAT(`o`.`orderDate`, '%Y-%m-%d %H:%i:%s') `orderDate`, `o`.`status`, `c`.`shipping_firstname`, `c`.`shipping_lastname`, `c`.`username`, `c`.`billing_email`, `c`.`billing_phone`, `c`.`shipping_state` FROM `items` `i` LEFT JOIN `orders` `o` ON `o`.`orderno`=`i`.`orderno` LEFT JOIN `customers` `c` ON `c`.`idcustomers`=`i`.`customerid` WHERE `i`.`itemno` = '" + req.params.idorders + "'");
        mysql.exec("SELECT `i`.`iditems`, `o`.`orderno`, `i`.`itemno`, `i`.`productid`, `i`.`productname`, `c`.`age`, `c`.`gender`, `o`.`transactionid`, DATE_FORMAT(`o`.`orderDate`, '%Y-%m-%d %H:%i:%s') `orderDate`, `o`.`status`, `c`.`shipping_firstname`, `c`.`shipping_lastname`, `c`.`username`, `c`.`billing_email`, `c`.`billing_phone`, `c`.`shipping_state` FROM `items` `i` LEFT JOIN `orders` `o` ON `o`.`orderno`=`i`.`orderno` LEFT JOIN `customers` `c` ON `c`.`idcustomers`=`i`.`customerid` WHERE `i`.`itemno` = '" + req.params.idorders + "'", null, function (order) {
            if (order.length > 0) {
                res.json(order);
            } else {
                res.json(false);
            }
        });
    },
    getReport: function (req, res) {
        console.log("SELECT `filename`, `templatepath` FROM `bblmanager`.`reports` WHERE `itemid` = '" + req.params.itemno + "'");
        mysql.exec("SELECT `filename`, `templatepath` FROM `bblmanager`.`reports` WHERE `itemid` = '" + req.params.itemno + "'", null, function (pdf) {
            if (pdf.length !== 0) {
                var f = new Buffer(pdf[0].templatepath, 'binary').toString('base64');
                res.json({
                    filename: pdf[0].filename,
                    pdf: 'data:application/pdf;base64, ' + f
                });
            } else {
                res.json({
                    status: 406,
                    message: "No report found."
                })
            }

        })
    },
    create: function (req, res) {
        if (req.body.patient) {
            mysql.exec("INSERT INTO `patients` SET ?", req.body.patient, function (patient) {
                if (req.body.customer && !req.body.costumer.customerno) {
                    mysql.exec("INSERT INTO `client` SET ?", req.body.customer, function (customer) {req.body.order.customerid = customer.insertId;});
                }
                req.body.order.patientid = patient.insertId;
                mysql.exec("INSERT INTO `orders` SET ?", req.body.order, function (order) {
                    console.log(order)
                    mysql.exec("INSERT INTO `items` SET ?", req.body.item, function (item) {
                        mysql.exec("INSERT INTO `results`(`orderid`, `itemid`, `testid`, `testname`, `identifier`, `testpanelid`) SELECT '" + req.body.order.orderno + "', '" + req.body.item.itemno + "', `c`.`idtests` `idcompound`, `c`.`name` `compound`, LOWER(`c`.`identifier`), `cat`.`idtests` FROM `tests` `tp`LEFT JOIN `testcompoundrel` `tc1` ON `tc1`.`testid`=`tp`.`idtests`LEFT JOIN `tests` `cat` ON `cat`.`idtests`=`tc1`.`compoundid`LEFT JOIN `testcompoundrel` `tc2` ON `tc2`.`testid`=`cat`.`idtests`LEFT JOIN `tests` `t` ON `t`.`idtests`=`tc2`.`compoundid`LEFT JOIN `testcompoundrel` `tc3` ON `tc3`.`testid`=`t`.`idtests`LEFT JOIN `tests` `c` ON `c`.`idtests`=`tc3`.`compoundid` WHERE `tp`.`idtests`='" + productid + "' ON DUPLICATE KEY UPDATE `idresults` = `idresults`", null, function (res) {
                            res.json(result);
                        });
                    })
                });
            })
        } else {
            req.status(201).json({status: 403, message: "Patient Information missing."});
        }
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

module.exports = orders;