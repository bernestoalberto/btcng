const fs = require('fs');
const ftp = require('ftp');
const db = require('mysql');
const mysql = require('./database.js');
const log = require('./logging.js');
const utilities = require('./utilities.js');
const ups = require('./upsworlship.js');

var config = require('../config');

var iO = module.exports = {
    orders: [],
    init: function (callback) {
        iO.pullOrders(function (orderid) {
            return (typeof callback === 'function') ? callback(true) : true;
        });
    },
    pullOrders: function () {
        mysql.exec("SELECT `o`.*, `i`.*, `c`.* FROM `bblwebsite`.`woocommerce_orders` `o` LEFT JOIN `bblwebsite`.`woocommerce_items` `i` ON `i`.`orderid`=`o`.`idorders`LEFT JOIN `bblwebsite`.`woocommerce_customers` `c` ON `c`.`orderid`=`o`.`idorders`", null, function (wcOrders) {
            for (let order in wcOrders) {
                let d = new Date(wcOrders[order]['orderDate']);
                let attributes = utilities.unserializeArray(wcOrders[order]['item_attributes']);
                for (let i = 0; i < wcOrders[order]['Qty']; i++) {
                    let ordr = {
                        orderno: wcOrders[order]['idorders'],
                        orderDate: d.getFullYear() + '-' + iO.twoDigitsDate(d.getMonth() + 1) + '-' + iO.twoDigitsDate(d.getDate()),
                        status: wcOrders[order]['wp_status'].replace('wc-', ''),
                        customerid: wcOrders[order]['customerid'],
                        transactionid: wcOrders[order]['transactionid']
                    }
                    let itm = {
                        itemno: wcOrders[order]['iditems'],
                        orderno: wcOrders[order]['idorders'],
                        productid: wcOrders[order]['productid'],
                        productName: wcOrders[order]['productName'],
                        lineTotal: wcOrders[order]['lineTotal'],
                        subtotal: wcOrders[order]['subtotal']
                    }
                    let customer = {
                        age: (typeof attributes !== 'undefined') ? attributes[wcOrders[order]['productid']][i]['age'] : null,
                        gender: (typeof attributes !== 'undefined') ? attributes[wcOrders[order]['productid']][i]['gender'] : null,
                        billing_firstName: wcOrders[order]['billing_firstName'],
                        billing_lastName: wcOrders[order]['billing_lastName'],
                        billing_company: wcOrders[order]['billing_company'],
                        billing_email: wcOrders[order]['billing_email'],
                        billing_phone: wcOrders[order]['billing_phone'],
                        billing_address: wcOrders[order]['billing_address'],
                        billing_address2: wcOrders[order]['billing_address2'],
                        billing_city: wcOrders[order]['billing_city'],
                        billing_state: wcOrders[order]['billing_state'],
                        billing_postcode: wcOrders[order]['billing_postcode'],
                        billing_country: wcOrders[order]['billing_country'],
                        shipping_firstName: wcOrders[order]['shipping_firstname'],
                        shipping_lastName: wcOrders[order]['shipping_lastname'],
                        shipping_company: wcOrders[order]['shipping_company'],
                        shipping_address: wcOrders[order]['shipping_address'],
                        shipping_address2: wcOrders[order]['shipping_address2'],
                        shipping_city: wcOrders[order]['shipping_city'],
                        shipping_state: wcOrders[order]['shipping_state'],
                        shipping_postcode: wcOrders[order]['shipping_postcode'],
                        shipping_country: wcOrders[order]['shipping_country'],
                    }
                    mysql.exec("INSERT INTO `orders` SET ? ON DUPLICATE KEY UPDATE `idorders` = `idorders`", ordr, function (res) {
                        console.log(res);
                        if ((wcOrders[order]['transactionid'] !== null && wcOrders[order]['transactionid'] !== "") && wcOrders[order]['wp_status'].replace('wc-', '') !== 'trash' && wcOrders[order]['wp_status'].replace('wc-', '') !== 'cancelled') {
                            iO.dc2(wcOrders[order]['idorders']);
                        }
                        if (res.insertId !== 0) {
                            log.write('./logs/orderimport.log', JSON.stringify(ordr));
                            log.write('./logs/orderimport.log', JSON.stringify(res));
                            mysql.exec("INSERT IGNORE INTO `items` SET ?", itm, function (res) {
                                log.write('./logs/itemsimport.log', JSON.stringify(itm));
                                log.write('./logs/itemsimport.log', JSON.stringify(res));
                                if (itm.productid !== null) {
                                    mysql.exec("REPLACE INTO `customers` SET ?", customer, function (custRes) {
                                        if (res.insertId !== 0) {
                                            mysql.exec("UPDATE `items` SET `customerid` = '" + res.insertId + "' WHERE `itemno` = '" + itm.itemno + "'", null, function (res) {
                                                log.write('./logs/customerimport.log', JSON.stringify(customer));
                                                log.write('./logs/customerimport.log', JSON.stringify(custRes));
                                                log.write('./logs/customerimport.log', JSON.stringify(res));
                                            })
                                        }
                                    });

                                    mysql.exec("INSERT IGNORE INTO `results`(`orderid`, `itemid`, `testid`, `testname`, `identifier`, `testpanelid`) SELECT '" + ordr.orderno + "', '" + itm.itemno + "', `c`.`idtests` `idcompound`, `c`.`name` `compound`, LOWER(`c`.`identifier`), `cat`.`idtests` FROM `tests` `tp`LEFT JOIN `testcompoundrel` `tc1` ON `tc1`.`testid`=`tp`.`idtests`LEFT JOIN `tests` `cat` ON `cat`.`idtests`=`tc1`.`compoundid`LEFT JOIN `testcompoundrel` `tc2` ON `tc2`.`testid`=`cat`.`idtests`LEFT JOIN `tests` `t` ON `t`.`idtests`=`tc2`.`compoundid`LEFT JOIN `testcompoundrel` `tc3` ON `tc3`.`testid`=`t`.`idtests`LEFT JOIN `tests` `c` ON `c`.`idtests`=`tc3`.`compoundid` WHERE `tp`.`idtests`='" + itm.productid + "'", null, function (res) {
                                        log.write('./logs/resultcreation.log', JSON.stringify(res));
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    },
    dc2: function (orderid) {
        var con = db.createPool({
            "connectionLimit": "10",
            "host": "208.104.16.5",
            "user": "Administrator",
            "password": "ACS@dm1n!",
            "database": "logs"
        });

        con.query("INSERT IGNORE INTO `logs`.`mirthbblbilling`(`orderid`) VALUES ('" + orderid + "')", null, function (err, rows) {
            con.end();
            if (err) {
                console.log(err);
            }
            return rows
        });
    },
    twoDigitsDate: function (date) {
        return ((date < 10)) ? "0" + date : date;
    },
    version: '1.0'
}