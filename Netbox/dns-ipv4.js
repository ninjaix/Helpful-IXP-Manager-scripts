// Node.js MySQL SELECT FROM query Example
// pe 23-01-08
// include mysql module
require('dotenv').config();
var mysql = require('mysql');
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("output/ipv4.csv");

// create a connection variable with the required details
var mycon = mysql.createConnection({
  host:         process.env.MYSQLHOST,
  user:         process.env.MYSQLUSER,
  password:     process.env.MYSQLPASS
});
// make sure we are connected
mycon.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log("Connection Failed");
  }
});

mycon.query(
'SELECT concat(`ixpmanager`.`vlaninterface`.`ipv4hostname`,".",`ixpmanager`.`vlan`.`name`,".IX.Ninja-IX.net") AS `dns-name`,`ixpmanager`.`vlaninterface`.`ipv4canping`,'+
'concat(`ipv4address`.`address`,"/24") AS `ipaddress`,`ixpmanager`.`cust`.`name`,`ixpmanager`.`company_registration_detail`.`registeredName`,'+
'`ixpmanager`.`vlan`.`number`,`ixpmanager`.`ipv4address`.`updated_at`,'+
'`ixpmanager`.`cust`.`autsys`,`ixpmanager`.`vlan`.`private`,`ixpmanager`.`vlan`.`name`,`ixpmanager`.`vlaninterface`.`ipv4enabled`,'+
'`ixpmanager`.`vlaninterface`.`ipv4monitorrcbgp`,`ixpmanager`.`vlaninterface`.`busyhost`,'+
'concat("https://portal.ninja-ix.net/customer/overview/",`ixpmanager`.`cust`.`id`) AS `IXPM-Link`'+
'FROM `ixpmanager`.`vlaninterface`'+
'JOIN `ixpmanager`.`ipv4address` ON (`ipv4address`.`id` = `ipv4addressid`)'+
'JOIN `ixpmanager`.`vlan` ON (`vlan`.`id` = `vlaninterface`.`vlanid`)'+
'JOIN `ixpmanager`.`virtualinterface` ON (`virtualinterface`.`id` = `vlaninterface`.`virtualinterfaceid`)'+
'JOIN `ixpmanager`.`cust` ON (`cust`.`id` = `virtualinterface`.`custid`)'+
'JOIN `ixpmanager`.`company_registration_detail` ON (`company_registration_detail`.`id` = `cust`.`company_registered_detail_id`)'+
'WHERE `ipv4address`.`address` IS NOT NULL and (`vlan`.`private` is FALSE)'+
'ORDER BY `ipv4address`.`address`',
function (err, data, fields) {
    if (err) throw err;
    const jsonData = JSON.parse(JSON.stringify(data));
//    console.log("jsonData", jsonData);
    fastcsv
      .write(jsonData, { headers: true })
      .on("finish", function() {
        console.log("Write to output/ipv4.csv successfully!");
      })
      .pipe(ws);
});

mycon.end();
