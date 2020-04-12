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
      borderColor: "bold-green", 
      logoColor: "bold-green", 
      textColor: "bold-green" 
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
        "Delete An Employee, Role or Department",
        "Update an Employee Role",
        "Update an Employee Manager",
        "View Employees By Manager",
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

      case "Delete An Employee, Role or Department":
        deleter();
        break;

      case "Update an Employee Role":
        updateEmployeeRole();
        break;
      
      case "Update an Employee Manager":
        updateEmployeeManager();
        break;

      case "View Employees By Manager":
        viewEmployeeManager();
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

function deleter() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to delete?",
      choices: [
        "Delete An Employee",
        "Delete A Department",
        "Delete A Role"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Delete An Employee":
        deleteEmployee();
        break;

      case "Delete A Department":
        deleteDepartment();
        break;
      
      case "Delete A Role":
        deleteRole();
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
    }
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
  inquirer.prompt([
    {
      name: "department_name",
      type: "input",
      message: "Enter New Department Name:"
    }
  ]).then(function(answer) {
    connection.query("INSERT INTO department SET ?", { name: answer.department_name }, function(err) {
      if (err) throw err;
      console.log("New Department Added! Thank you for your time!");
      directory();
    });
  });
}

function addRole() {
  inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "Enter New Role Title:"
    },
    {
      name: "salary",
      type: "input",
      message: "Enter Salary Amount:"
    },
    {
      name: "department_id",
      type: "input",
      message: "Enter The Department ID Associated With This Role:"
    }
  ]).then(function(answer) {
    connection.query("INSERT INTO role SET ?",
    {
      title: answer.title,
      salary: answer.salary,
      department_id: answer.department_id
    }, function(err) {
      if (err) throw err;
      console.log("New Role Added! Thank you for your time!");
      directory();
    });
  });
}

function deleteEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What Is The Employee's ID That You Wish To Delete?"
    }
  ]).then((answer) => {
    connection.query("DELETE FROM employee WHERE ?", { id: answer.id }, function(err) {
      if (err) throw err;
      console.log("Delete Successful!");
      directory();
    });
  });
}

function deleteDepartment() {
  inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What Is The Department's ID That You Wish To Delete?"
    }
  ]).then((answer) => {
    connection.query("DELETE FROM department WHERE ?", { id: answer.id }, function(err) {
      if (err) throw err;
      console.log("Delete Successful!");
      directory();
    });
  });
}

function deleteRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What Is The Role's ID That You Wish To Delete?"
    }
  ]).then((answer) => {
    connection.query("DELETE FROM role WHERE ?", { id: answer.id }, function(err) {
      if (err) throw err;
      console.log("Delete Successful!");
      directory();
    });
  });
}

function updateEmployeeRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "first",
      message: "What is the Employee to Update First Name?"
    },
    {
      type: "input",
      name: "last",
      message: "What is the Employee to Update Last Name?"
    },
    {
      type: "input",
      name: "role_id",
      message: "What is the Employee to Update New Role ID?"
    }
  ]).then((data) => {
    connection.query("UPDATE employee SET ? WHERE ? and ?", 
    [
      {
        role_id: data.role_id
      },
      {
        first_name: data.first
      },
      {
        last_name: data.last
      }
    ]);
    console.log("Employee Role Updated!");
    directory();
  });
}

function updateEmployeeManager() {
  inquirer.prompt([
    {
      type: "input",
      name: "first",
      message: "What is the Employee to Update First Name?"
    },
    {
      type: "input",
      name: "last",
      message: "What is the Employee to Update Last Name?"
    },
    {
      type: "input",
      name: "manager_id",
      message: "What is the Employee to Update New Manager ID?"
    }
  ]).then((data) => {
    connection.query("UPDATE employee SET ? WHERE ? and ?", 
    [
      {
        manager_id: data.manager_id
      },
      {
        first_name: data.first
      },
      {
        last_name: data.last
      }
    ]);
    console.log("Employee Role Updated!");
    directory();
  });
}

function viewEmployeeManager() {
  // let manager = [];
  // connection.query("SELECT id, first_name, last_name, manager_id FROM employee WHERE manager_id IS NULL", (err,res) => {
    // if (err) throw err;
    // console.log(res);
    // for (let i = 0; i < res.length; i++) {
    //   manager.push("ID: "res[i].id + ", " + "Name: " + res[i].first_name + " " + res[i].last_name);
    // }
    // console.log(manager);
    // inquirer.prompt([
    //   {
    //     type: "list",
    //     name: "managerName",
    //     message: "What Manager Would You Like To View Employees By?",
    //     choices: manager
    //   }
    // ]).then(function(res) {
    //   connection.query("SELECT * FROM employee WHERE manager_id = { res.")
    // })
  connection.query("SELECT * FROM employee WHERE manager_id IS NOT NULL ORDER BY manager_id ", (err,res) => {
    if (err) throw err;
    console.table(res);
    directory();
  });
}

