const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('morgan');
const OI = require('./middleware/orderimport');

app.use(logger('dev'));
app.use(bodyParser.json());

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-type, Accept, x-token, X-Key");
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

setInterval(function () {
    OI.init();
    console.log("Order Import.");
}, 600000)

app.all('/api/v1/*', [require('./middleware/validateRequest')]);

app.use('/', require('./routes/index'));

app.use(function (req, res, next) {
    var err = new Error('Not found');
    err.status = 404
    next(err);
});

app.set('port', process.env.PORT || 6776);

var server = app.listen(app.get('port'), function () {
    console.log("Server listening on port " + app.get('port'));
});
