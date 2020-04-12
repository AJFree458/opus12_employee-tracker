const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const logo = require('asciiart-logo');

const connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "MaCgYvEr29>?",
  database: "employee_trackerDB"
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
        // "Update an Employee Role",
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
        updateEmployeeRole();
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

function viewEmployees() {
  connection.query("SELECT * FROM employee", (err,res) => {
    if (err) throw err;
    console.table(res);
    directory();
  });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", (err,res) => {
    if (err) throw err;
    console.table(res);
    directory();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM role", (err,res) => {
    if (err) throw err;
    console.table(res);
    directory();
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      name: "first",
      type: "input",
      message: "Enter New Employee First Name:"
    },
    {
      name: "last",
      type: "input",
      message: "Enter New Employee Last Name:"
    },
    {
      name: "role_id",
      type: "input",
      message: "Enter New Employee Role ID:"
    },
    {
      name: "manager_id",
      type: "input",
      message: "Enter New Employee Manager ID (if applicable):",
      default: "NULL"
    },
  ]).then(function(answer) {
    connection.query("INSERT INTO employee SET ?",
    {
      first_name: answer.first,
      last_name: answer.last,
      role_id: answer.role_id,
      manager_id: answer.manager_id
    }, function(err) {
      if (err) throw err;
      console.log("New Employee Added! Thank you for your time!");
      directory();
    });
  });
}

function addDepartment() {
  
}

function addRole() {
  
}

// function updateEmployeeRole() {
//   const employeeArr = [];
//   connection.query('SELECT first_name, last_name FROM employee', (err,res) => {
//     for( let i = 0; i < res.length; i++) {
//       let fullName = res[i].first_name + " " + res[i].last_name;
//       employeeArr.push(fullName);
//     }
//     inquirer.prompt([{
//       type: "list",
//       name: "employeeFullName",
//       message: "Which employee would you like to update the role for?",
//       choices: employeeArr
//     }]).then()
//   });
// }