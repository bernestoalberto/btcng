module.exports = {
    system: {
        debgug: false,
        debugLevel: 'warn',
        erroroutput: true,
        errorlog_path: "log/systemerror.log"
    },
    database: {
        mysql: {
            "connectionLimit": 10,
            "host": "10.128.0.2",
            "user": "Administrator",
            "password": "ACS@dm1n!",
            "database": "bblmanager"
        }
    },
    email: {
        "smtp" : "",
        "emailaddress" : "info@balancedbodylabs.com",
        "username" : "info@balancedbodylabs.com",
        "password" : "acslab1922"
    },
    actievdirectory: {
        server: {
            url: 'ldap://AD.ACSLABTEST.COM:389',
            bindDn: 'acs\\administrator',
            bindCredentials: 'ACS@dm1n!',
            searchBase: 'OU=ACS Users, DC=AD, DC=ACSLABTEST, DC=COM',
            searchFilter: '(&(objectCategory=person)(samaccountname={{username}}))',
        },
        usernameField: 'username',
        passwordField: 'password'
    },
    security: {
        jwt: {
            expirationTime: 10070,
            privateKey: 'Rgny!L(piy,*{9q7X&{y_-SG{e&pqt[%@V$l*Dc_hG>>oUS=vX!y(1y<*u1^j;nwQP;ThPn*3a((wcf$_iyu20*+fhq+d04rxW7,lt:$N_IdrsA2[iG4BjQ&GPIwCGqT'
        }
    },
    ftp: {
        "connection": {
            "user": "American Clinical",
            "password": "ACS1971$816!",
            "host": "208.104.17.177",
            "port": 21
        },
        "localpath": "./xml/",
        "remotepath": "/",
        "ignore": ["complete"]
    },
    reports: {
        "exe_path": "./bin/wkhtmltopdf/bin/wkhtmltopdf.exe",
        "tmp_path": "./bin/wkhtmltopdf/tmp/",
        "res_path": "./results/"
    }
}