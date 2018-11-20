const fs = require('fs');
const config = require('../config');

var logger = module.exports = {
    levels: ['error', 'warn', 'info'],
    log: function (message, level, file) {
        var text = "";
        var f = (typeof file === 'undefined') ? config.system.errorlog_path : file;
        if (logger.levels.indexOf(level) >= levels.indexOf(config.system.debugLevel)) {
            text = new Date().now() + " ";
            text += (typeof text !== 'string') ? JSON.stringify(text) : message;
            fs.appendFile(f, text, function (err) {
                if (err) {throw err}
                if (config.system.erroroutput) {
                    console.log(message);
                }
            })
        }
    }
}