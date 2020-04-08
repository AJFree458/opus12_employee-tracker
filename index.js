const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const logo = require('asciiart-logo');

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

  logoStart();
});
  
// Have a logo display before anything else
function logoStart() {
  console.log(
    logo({ 
      name: "MYSQL EMPLOYEE TRACKER", 
      font: "Doom", 
      borderColor: "grey", 
      logoColor: "bold-blue", 
      textColor: "blue" 
    }).render());
  directory();
}

// Make a directory to guide user to add, view or exit the app
function directory() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees, Departments, or Roles",
        "Add Employee, Department, or Role",
        "Update an Employee Role",
        "EXIT"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View All Employees, Departments, or Roles":
        viewer();
        break;

      case "Add Employee, Department, or Role":
        adder();
        break;

      case "Update an Employee Role":
        updateRole();
        break;
      
      case "EXIT":
        connection.end();
        break;
      }
    });
}

// Direct user to the individual view functions
function viewer() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to view?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View All Employees":
        viewEmployees();
        break;

      case "View All Departments":
        viewDepartments();
        break;
      
      case "View All Roles":
        viewRoles();
        break;
      }
    });
}

// Direct user to the individual add functions
function adder() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to add?",
      choices: [
        "Add New Employee",
        "Add New Department",
        "Add New Role"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add New Employee":
        addEmployee();
        break;

      case "Add New Department":
        addDepartment();
        break;
      
      case "Add New Role":
        addRole();
        break;
      }
    });
}

function updateRole() {
  
}












