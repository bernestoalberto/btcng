const jwt = require('jsonwebtoken');
const auth = require('../routes/auth');
const config = require('../config')

module.exports = function (req, res, next) {
    var token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['x-token'];
    if (token) {
        try {
            var decoded = jwt.verify(token, config.security.jwt.privateKey);
            if (decoded.exp <= Date.now()) {
                res.status(400).json({"status": 400, "message": "Token Expired."});
                return;
            }

            auth.validateUser(decoded, function (user) {
                if (user) {
                    if (req.url.indexOf('admin') >= 0 && user.memberOf.indexOf('admin') || req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0) {

                        next();
                    } else {
                        res.status(403).json({
                            status: 403,
                            message: "Not Authorized"
                        });
                        return;
                    }
                } else {
                    res.status(401).json({
                        status: 401,
                        message: "Invalid User"
                    });
                    return;
                }
            });
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: "Oops something went wrong",
                error: err
            });
            return;
        }
    } else {
        res.status(401).json({
            status: 401,
            message: "Invalid Token or Key"
        });
        return;
    }
}