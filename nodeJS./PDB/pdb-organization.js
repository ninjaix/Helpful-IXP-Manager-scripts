require('dotenv').config();
var mysql = require('mysql');
const fastcsv = require("fast-csv");
const fs = require("fs");
// output CSVs
const ws = fs.createWriteStream("output/pdb-organization.csv");

// create a connection variable with the required details
var mycon = mysql.createConnection({
  host:         process.env.MYSQLHOST,
  user:         process.env.MYSQLUSER,
  password:     process.env.MYSQLPASS
});
// make sure we are connected
//
mycon.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log("Connection Failed");
  }
});

// PDB ORG
//mycon.query("SELECT * FROM peeringdb.peeringdb_organization where updated >'2022-12-10'", function (err, data, fields) {
mycon.query("SELECT * FROM peeringdb.peeringdb_organization", function (err, data, fields) {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
//    console.log(result);

    const jsonData = JSON.parse(JSON.stringify(data));
//    console.log("jsonData", jsonData);

    fastcsv
      .write(jsonData, { headers: true })
      .on("finish", function() {
        console.log("Write to pdb-organization.csv successfully!");
      })
      .pipe(ws);
});


mycon.end();
