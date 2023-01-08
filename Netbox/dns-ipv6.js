// Node.js MySQL SELECT FROM query Example
// pe 23-01-08
// include mysql module
require('dotenv').config();
var mysql = require('mysql');
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("output/ipv6.csv");

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
'SELECT concat(`ixpmanager`.`vlaninterface`.`ipv6hostname`,".",`ixpmanager`.`vlan`.`name`,".IX.Ninja-IX.net"),`ixpmanager`.`vlaninterface`.`ipv4canping`,'+
'concat(`ipv6address`.`address`,"/64"), `ixpmanager`.`cust`.`name`, `ixpmanager`.`vlan`.`number`,`ixpmanager`.`ipv6address`.`updated_at`,'+
'`ixpmanager`.`cust`.`autsys`,`ixpmanager`.`vlan`.`private`,`ixpmanager`.`vlan`.`name`,`ixpmanager`.`vlaninterface`.`ipv6enabled`,'+
'`ixpmanager`.`vlaninterface`.`ipv6monitorrcbgp`,`ixpmanager`.`vlaninterface`.`busyhost`,'+
'concat("https://portal.ninja-ix.net/customer/overview/",`ixpmanager`.`cust`.`id`)'+
'FROM `ixpmanager`.`vlaninterface`'+
'JOIN `ixpmanager`.`ipv6address` ON (`ipv6address`.`id` = `ipv6addressid`)'+
'JOIN `ixpmanager`.`vlan` ON (`vlan`.`id` = `vlaninterface`.`vlanid`)'+
'JOIN `ixpmanager`.`virtualinterface` ON (`virtualinterface`.`id` = `vlaninterface`.`virtualinterfaceid`)'+
'JOIN `ixpmanager`.`cust` ON (`cust`.`id` = `virtualinterface`.`custid`)'+
'JOIN `ixpmanager`.`company_registration_detail` ON (`company_registration_detail`.`id` = `cust`.`company_registered_detail_id`)'+
'WHERE `ipv6address`.`address` IS NOT NULL and (`vlan`.`private` is FALSE)'+
'ORDER BY `ipv6address`.`address`',
function (err, data, fields) {
    if (err) throw err;
    const jsonData = JSON.parse(JSON.stringify(data));
//    console.log("jsonData", jsonData);
    fastcsv
      .write(jsonData, { headers: false })
      .on("finish", function() {
        console.log("Write to output/ipv6.csv successfully!");
      })
      .pipe(ws);
});

mycon.end();
