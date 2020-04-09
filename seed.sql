USE employee_trackerDB;

INSERT INTO role (title, salary, department_id)
Values ("Sales Lead", 90000, 1), ("Salesperson", 50000, 1), ("Lead Engineer", 80000, 2), ("Software Engineer", 40000, 2), ("Accountant", 60000, 3), ("Legal Team Lead", 100000, 4), ("Lawer", 75000, 4)

INSERT INTO department (name)
VALUES ("Marketing & Sales"), ("Product Development"), ("Finance"), ("Legal")

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Shavon", "Shearin", 1), ("Sharika", "Stark", 2, 1), ("Sherrill", "Vannorman", 3), ("Kanisha", "Studstill", 4, 3), ("Charmaine", "Finkbeiner", 4, 3), ("Hosea", "Bertelsen", 4, 3), ("Samantha", "Markert", 5), ("Nelly", "Robinette", 5, 7), ("Joel", "Romain", 6),("Robin", "Higa", 7, 9), ("Lula", "Shewmaker", 7, 9)