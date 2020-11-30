const db = require("./connection.js");


const orm = {
  async getEmployees(){
	  const sql = "SELECT * AS emp, r.title, r.salary, d.name FROM employees LEFT JOIN roles r ON emp.role_id = r.id LEFT JOIN departments d ON r.department_id = d.id";
	  return await db.query(sql, (err, data) => err ? throw err : data);
  },
  async createEmployee(first_name, last_name, role_id){
	  const insert = {first_name, last_name, role_id, manager_id: null};
	  const sql = "INSERT INTO employees SET ?";
	  return await db.query(sql, insert, (err, data) => err ? throw err : data); 
  },
  async deleteEmployee(id){
	  const id = {id};
	  const sql1 = "UPDATE employees SET manager_id = null WHERE ?";
	  const sql2 = "DELETE FROM employees WHERE ?";
	  await db.query(sql1, id);
	  return await db.query(sql2, id, (err, data) => err ? throw err : data);
  },
  async updateEmployeeFirstName(id, first_name){
	  const name = {first_name};
	  const id = {id};
	  const sql = "UPDATE employees SET ? WHERE ?";
	  return await db.query(sql, [name, id], (err, data) => err ? throw err : data);
  },
  async updateEmployeeLastName(id, last_name){
	  const name = {last_name};
	  const id = {id};
	  const sql = "UPDATE employees SET ? WHERE ?";
	  return await db.query(sql, [name, id], (err, data) => err ? throw err : data);
  },
  async updateEmployeeRoldId(id, role_id){
	  const role = {role_id};
	  const id = {id};
	  const sql = "UPDATE employees SET ? WHERE ?";
	  return await db.query(sql, [role, id], (err, data) => err ? throw err : data);
  },
  async updateEmployeeManagerId(id, manager_id){
	  const manager = {manager_id};
	  const id = {id};
	  const sql = "UPDATE employees SET ? WHERE ?";
	  return await db.query(sql, [manager, id], (err, data) => err ? throw err : data);
  },
  async getRoles(){
	  const sql = "SELECT * AS role, d.name FROM roles LEFT JOIN departments d ON role.department_id = d.id";
	  return await db.query(sql, (err, data) => err ? throw err : data);
  },
  async createRole(title, salary, department_id){
	  const insert = {title, salary, department_id};
	  const sql = "INSERT INTO roles SET ?";
	  return await db.query(sql, insert, (err, data) => err ? throw err : data); 
  },
  async deleteRole(id){
	  const id = {id};
	  const sql1 = "UPDATE employees SET role_id = null WHERE ?";
	  const sql2 = "DELETE FROM roles WHERE ?";
	  await db.query(sql1, id);
	  return await db.query(sql2, id, (err, data) => err ? throw err : data);
  },
  async updateRoleSalary(id, salary){
	  const salary = {salary};
	  const id = {id};
	  const sql = "UPDATE roles SET ? WHERE ?";
	  return await db.query(sql, [salary, id], (err, data) => err ? throw err : data);
  },
  async updateRoleTitle(id, title){
	  const title = {title};
	  const id = {id};
	  const sql = "UPDATE roles SET ? WHERE ?";
	  return await db.query(sql, [title, id], (err, data) => err ? throw err : data);
  },
  async updateRoleDepartment(id, department_id){
	  const department = {department_id};
	  const id = {id};
	  const sql = "UPDATE roles SET ? WHERE ?";
	  return await db.query(sql, [department, id], (err, data) => err ? throw err : data);
  },
  async getDepartments(){
	  const sql = "SELECT * FROM departments";
	  return await db.query(sql, (err, data) => err ? throw err : data);
  },
  async createDepartment(name){
	  const name = {name};
	  const sql = "INSERT INTO departments SET ?";
	  return await db.query(sql, name, (err, data) => err ? throw err : data);
  },
  async deleteDepartment(id){
	  const id = {id};
	  const sql1 = "UPDATE roles SET department_id = null WHERE ?";
	  const sql2 = "DELETE FROM departments WHERE ?";
	  await db.query(sql1, id);
	  return await db.query(sql2, id, (err, data) => err ? throw err : data);
  },
  async updateDepartmentName(id, name){
	  const name = {name};
	  const id = {id};
	  const sql = "UPDATE departments SET ? WHERE ?";
	  return await db.query(sql, [name, id], (err, data) => err ? throw err : data);
  },
  
};

module.exports = orm;
