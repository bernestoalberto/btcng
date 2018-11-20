const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const LdapStrategy = require('passport-ldapauth').Strategy;
const jwt = require('jsonwebtoken');
const ExtractJWT = jwtStrategy.ExtractJwt;
const mysql = require('../middleware/database.js');

const error = require('../middleware/errorlog');
const config = require('../config');

passport.use(new LdapStrategy(config.actievdirectory));
var auth = {
    login: function (req, res) {
        if (req.body.username == '' || req.body.password == '') {
            res.status(201).json({
                status: 401,
                message: "Invalid credentials"
            });
            return;
        }
        auth.validate(req, function (user) {
            if (!user) {
                res.status(201).json({
                    status: 401,
                    message: "Invalid credentials"
                });
                return;
            }
            var usr = filterLDAP(user);
			console.log(user.memberOf);
            mysql.exec("SELECT * FROM `users` WHERE `username` LIKE '" + usr.username + "'", null, function (user) {
                mysql.exec("SELECT MAX(DATE_FORMAT(`lastLogin`, '%Y-%m-%d %H:%i:%s')) `lastLogin` FROM `userlog` WHERE `username` LIKE '" + usr.username + "'", null, function (idlogs) {
                    if (idlogs.length !== 0) {usr['userid'] = user[0]['idusers']; usr['lastLogin'] = idlogs[0]['lastLogin'];}
                    mysql.exec("INSERT INTO `userlog`(`username`, `lastlogin`) VALUES ('"+ usr.username + "', NOW())", null, function (r) {
                        res.status(201).json(genToken(usr, req.body.password));
                    });
                });
            });
        });

    },
    validate: function (req, next) {
      //  console.log(req);
        passport.authenticate('ldapauth', {session: false}, function (err, user) {
            console.log(user);
            if (err) {
                error.log(err, config.system.debugLevel, 'aderror.log');
                return next(err);
            }
            return next(user);
        })(req, next);
    },
    validateUser: function (token, next) {
        var req = {body: {username: token.username, password: token.password}}
        passport.authenticate('ldapauth', {session: false}, function (err, user) {
            if (err) {
                error.log(err, config.system.debugLevel, 'aderror.log');
                return next(err);
            }
            return next(user);
        })(req, next);
    }
}


function genToken(user, password) {
    var expires = (typeof config.security.jwt.expirationTime != 'undefined') ? (new Date().getTime() + config.security.jwt.expirationTime) : expiresIn(7);
    var token = {
        token: jwt.sign({"username": user.username, "password": password, "email": user.email, "role": user.role}, config.security.jwt.privateKey, {
            expiresIn: expires,
        })
    }
    delete user.password;
    token.user = user;
    console.log(token);
    return token;
}

function filterLDAP(user) {
    var usr = {
        name: user.name,
        title: user.title,
        department: user.department,
        username: user.sAMAccountName,
        email: (user.userPrincipalName.replace('AD.', '')).toLowerCase(),
        password: user.userPassword,
        //role: filterLDAPMemberOf(user.role),
        pwdLastSet: {
            timestamp: user.pwdLastSet,
            datetime: convertWindowsTimeStamp(user.pwdLastSet)
        },
        accountExprires: user.accountExprires
    }
    return usr;
}

function convertWindowsTimeStamp(timestamp) {
    return new Date((timestamp / 10000) - 11644473600000);
}

/*function filterLDAPMemberOf(memberof) {
    var roles = ['user', 'editor', 'administrator']
    var role = '';
    for (var rl in roles) {
        for (var i=0;i<memberof.length;i++) {
            if ((memberof[i].toLowerCase()).indexOf(roles[rl]) >= 0) {
                role = roles[rl];
            }
        }
    }

    return role;
}*/

function expiresIn(days) {
    var dObj = Math.floor(Date.now() / 1000);
    return dObj + config.security.jwt.expirationTime;
}

module.exports = auth;

