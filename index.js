const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const logo = require('asciiart-logo');
const config = require('./package.json');



var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "MaCgYvEr29>?",
    database: "employeetracker_DB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);

    logo();
  });
  
function logo() {
    console.log(logo({ name: "MYSQL EMPLOYEE TRACKER", font: "Puffy" }).render());
    
}