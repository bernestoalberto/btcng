const fs = require('fs-extra');
const async = require('async');
const mysql = require('./database.js');
const log = require('./logging.js');

var ups = module.exports = {
    init: function (itemid) {
        ups.generateXMLFile(itemid, function (xml, param) {
            var filename = "./xml/" + orderid + "-" + itemid + " " + param.productname + " " + param.firstname + " " + param.lastname + ".xml";
            ups.writeFile(filename, xml);
        });
    },
    generateXMLFile: function (itemid, callback) {
        mysql.exec("SELECT `i`.*, `c`.* FROM `items` `i` LEFT JOIN `orders` `o` ON `o`.`orderno` = `i`.`orderno` LEFT JOIN `customers` `c` ON `c`.`idcustomers` = `o`.`customerid` WHERE `i`.`itemno` = '" + itemid + "' GROUP BY `itemno`", null, function (xmlparam) {
            async.each(xmlparam, function (param) {
                if (param.firstname !== null && param.lastname !== null) {
                    var xmldata = '<?xml version="1.0" encoding="WINDOWS-1252"?><OpenShipments xmlns="x-schema:OpenShipments.xdr"> <OpenShipment ProcessStatus="" ShipmentOption=""> <ShipTo> <CompanyOrName>' + param.firstname + ' ' + param.lastname + '</CompanyOrName> <Attention>' + param.firstname + ' ' + param.lastname + '</Attention> <Address1>' + param.shipping_address + '</Address1> <Address1>' + param.shipping_address2 + '</Address1><CountryTerritory>' + param.shipping_country + '</CountryTerritory> <PostalCode>' + param.shipping_postcode + '</PostalCode> <CityOrTown> ' + param.shipping_city + '</CityOrTown> <StateProvinceCounty>' + param.shipping_state + '</StateProvinceCounty> <Telephone>' + param.phone + '</Telephone> </ShipTo> <ShipFrom> <CompanyOrName>Balanced Body Labs, LLC</CompanyOrName> <Attention>Processing</Attention> <Address1>721 Cortaro Dr</Address1> <CountryTerritory>US</CountryTerritory> <PostalCode>33573</PostalCode> <CityOrTown>Sun City Center</CityOrTown> <StateProvinceCounty>Fl</StateProvinceCounty> <UpsAccountNumber>5265WY</UpsAccountNumber> </ShipFrom> <ShipmentInformation> <ServiceType>GND</ServiceType> <DescriptionOfGoods>(' + param.productid + ') ' + param.productname + ' Nutrition Test Kit</DescriptionOfGoods> <BillTransportationTo>Shipper</BillTransportationTo> </ShipmentInformation> <Package> <PackageType>CP</PackageType> <Weight>1</Weight> <Reference1>' + param.orderid + '-' + param.itemno + '</Reference1> <Length>4</Length> <Width>7</Width> <Height>1</Height> </Package> <ReturnService><Option>PRL</Option><SenderCompanyName>Balanced Body labs, LLC</SenderCompanyName><InstructionAndReceiptLanguage>ENU</InstructionAndReceiptLanguage><MerchandiseDescOfPackage>Dried Blood Spot Test Kit</MerchandiseDescOfPackage></ReturnService> </OpenShipment></OpenShipments>';
                    callback(xmldata, param);
                }
            });
        });
    },
    writeFile: function (filename, xmldata, callback) {
        fs.unlink(filename, function (err) {
            // Ignore error if no file already exists

            if (err && err.code !== 'ENOENT') {
                throw err;
            }
            var options = {flag: 'w'};

            fs.writeFile(filename, xmldata, options, function () {
                log.write('./logs/upsworldship.log', "File: " + filename + " created.");
            });
        });
    }
}