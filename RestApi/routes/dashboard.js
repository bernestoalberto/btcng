const mysql = require('../middleware/database.js');

var dashboard = {
    get: function (req, res) {
        getOrders(function (stats) {
            res.json(stats)
        })

    },
}

var getOrders = function (next) {
    mysql.exec("SELECT `i`.`iditems`, `o`.`orderno`, `i`.`itemno`, `i`.`productid`, `i`.`productname`, `i`.`age`, `i`.`gender`, `o`.`transactionid`, DATE_FORMAT(`o`.`orderDate`, '%m/%d/%Y') `orderDate`, `o`.`status`, `c`.`firstname`, `c`.`lastname`, `c`.`shipping_state` FROM `items` `i` LEFT JOIN `orders` `o` ON `o`.`orderno` = `i`.`orderid` LEFT JOIN  `customers` `c` ON `c`.`idcustomers` = `o`.`customerid` GROUP BY `i`.`iditems`", null, function (orders) {
        var stats = {orders: orders, stats: {agegroups: {},gender: {},products: {},status: {},states: {}}};
        
        for (var item in orders) {
            //AgeGroups
            var ag = Math.round((orders[item].age/10)) * 10;
            ag = (ag >= 60) ? 60 : (ag < 20) ? 20 : ag;
            stats.stats.agegroups[ag] = stats.stats.agegroups[ag] || 0;
            stats.stats.agegroups[ag] += 1;

            //gender
            var g = (orders[item].gender === null) ? 'Unknown' : orders[item].gender;
            stats.stats.gender[g] = stats.stats.gender[g] || 0;
            stats.stats.gender[g] += 1

            //status
            stats.stats.status[orders[item].status] = stats.stats.status[orders[item].status] || 0;
            stats.stats.status[orders[item].status] += 1

            //states
            var state = (orders[item].shipping_state === null) ? 'Unknown' : orders[item].shipping_state;
            console.log(state);
            stats.stats.states[state] = stats.stats.states[state] || 0;
            stats.stats.states[state] += 1

            //products
            stats.stats.products[orders[item].productname] = stats.stats.products[orders[item].productname] || {paid: 0, unpaid: 0, total: 0};
            if (orders[item].transactionid === null) {
                stats.stats.products[orders[item].productname].unpaid += 1
            }  else {
                stats.stats.products[orders[item].productname].paid += 1
            }
            stats.stats.products[orders[item].productname].total += 1
        }
        return next(stats)
    });
}

module.exports = dashboard;