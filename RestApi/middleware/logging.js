const fs = require('fs');

var log = module.exports = {
    write: function (filename, data, timestamp = true) {
        var d = log.getdate();
        fs.appendFile(filename, data+"\r\n", function (err) {
            if (err) {
                throw err
            }
        });
    },
    writeCSV: function (filename, json) {
        if (!fs.exists(filename)) {
            var header = "";
            for (var key in header) {
                header += key + ", ";
                row += json[key] + ", ";
            }
            header = header.substring(header.length-2) + "\r\n"
            fs.appendFile(filename, header);
        }
        var row = "";
        for (var key in json) {
            row += json[key] + ", ";
        }
        row = row.substring(row.length-2) + "\r\n";
        fs.appendFile(filename, row);
    },
    getdate: function () {
        var date = new Date();
        var d = date.getFullYear()+"-"+((date.getMonth() < 10) ? "0"+date.getMonth() : date.getMonth())+"-"+((date.getDate() < 10) ? "0"+date.getDate() : date.getDate())+" "+date.getHours()+":"+date.getMinutes()+":"+((date.getSeconds()<10) ? "0"+date.getSeconds() : date.getSeconds())+"."+date.getMilliseconds();
        return d;
    },
    show: function (data) {
        console.log(data);
    }
}