const data = require("./config/orm.js");
const inquirer = require("inquirer");
const cTable = require('console.table');

/*
	"View all employees": emp.viewAll,
	"View employees by department": emp.viewByDept,
	"View employees by manager": emp.viewByMgr,
	"View employees by role": emp.viewByRole,
	"Edit employee": emp.edit,
	"Delete employee": emp.del,
	"Create employee": emp.create
*/

function viewAll(callback){
	console.log("==========");
	console.log("Employee: view all");
	const employees = data.getEmployees();
	if (!employees.length){
		console.log("No employees to view");
	}
	else {
		console.table(employees);
	}
	if ("function" === typeof callback) callback();
}

function viewByDept(callback){
	console.log("==========");
	console.log("Employee: view by department");
	const employees = data.getEmployees();
	if (!employees.length){
		console.log("No employees to view");
	}
	else {
		employees.sort((a,b) => a.department.localeCompare(b.department));
		console.table(employees);
	}
	if ("function" === typeof callback) callback();
}

function viewByMgr(callback){
	console.log("==========");
	console.log("Employee: view by manger");
	const employees = data.getEmployees();
	if (!employees.length){
		console.log("No employees to view");
	}
	else {
		employees.sort((a,b) => a.manager.localeCompare(b.manager));
		console.table(employees);
	}
	if ("function" === typeof callback) callback();
}

function viewByRole(callback){
	console.log("==========");
	console.log("Employee: view by role");
	const employees = data.getEmployees();
	if (!employees.length){
		console.log("No employees to view");
	}
	else {
		employees.sort((a,b) => a.title.localeCompare(b.title));
		console.table(employees);
	}
	if ("function" === typeof callback) callback();
}

function edit(callback){
	console.log("==========");
	console.log("Employee: edit");
	const employees = data.getEmployees();
	if (!employees.length){
		console.log("No employees to edit");
		if ("function" === typeof callback) callback();
		return;
	}
	console.table(employees);
	inquirer.prompt([
	{
		message: "Which employees do you want to edit?",
		type: "list",
		choices: employees.map(el => el.id),
		name: "employeeId"
	},
	{
		message: "Which property do you want to edit?",
		type: "list",
		choices: ["first name", "last name", "role id", "manager id"],
		name: "employeesProperty"
	}
	]).then(res => {
		switch (res.employeesProperty){
			case "first name": editFirstName(res.employeeId, callback); break;
			case "last name": editLastName(res.employeeId, callback); break;
			case "role id": editRoleId(res.employeeId, callback); break;
			case "manager id": editManagerId(res.employeeId, callback); break;
		}
	});
}

function editFirstName(id, callback){
	inquirer.prompt({
		 message: "New first name for employee:",
		 name: "firstName"
	 }).then(res => {
		const success = data.updateEmployeeFirstName(id, res.firstName);
		if (success) console.log("Employee new first name:", res.firstName);
		else console.log("Employee could not be edited");
		if ("function" === typeof callback) callback();
	 });
}

function editLastName(id, callback){
	inquirer.prompt({
		 message: "New last name for employee:",
		 name: "lastName"
	 }).then(res => {
		const success = data.updateEmployeeLastName(id, res.lastName);
		if (success) console.log("Employee new last name:", res.lastName);
		else console.log("Employee could not be edited");
		if ("function" === typeof callback) callback();
	 });
}

function editRoleId(id, callback){
	const roles = data.getRoles();
	console.table(roles);
	inquirer.prompt({
		 message: "Change employee to which role:",
		 type: "list",
		 choices: roles.map(el => el.id),
		 name: "roleId"
	 }).then(res => {
		 const success = data.updateEmployeeRoleId(id, res.roleId);
		 if (success) console.log("Employee new role:", roles.find(el => el.id === res.roleId).title);
		 else console.log("Employee could not be edited");
		 if ("function" === typeof callback) callback();
	 });
}

function editManagerId(id, callback){
	const emps = data.getEmployees();
	console.table(emps);
	inquirer.prompt({
		 message: "Change employee to have which manager:",
		 type: "list",
		 choices: emps.map(el => el.id),
		 name: "managerId"
	 }).then(res => {
		 const success = data.updateEmployeeManagerId(id, res.managerId);
		 if (success){
			 const mgr = emps.find(el => el.id === res.managerId);
			 console.log("Employee new manager:", `${mgr.last_name}, ${mgr.first_name}`);
		 }
		 else console.log("Employee could not be edited");
		 if ("function" === typeof callback) callback();
	 });
}

function del(callback){
	console.log("==========");
	console.log("Employee: delete");
	const employees = data.getEmployees();
	if (!employees.length){
		console.log("No employees to delete");
		if ("function" === typeof callback) callback();
		return;
	}
	console.table(employees);
	inquirer.prompt({
		message: "Which employee do you want to delete?",
		type: "list",
		choices: employees.map(el => el.id),
		name: "id"
	}).then(res => {
		const success = data.deleteEmployee(res.id);
		if (success) console.log("Employee deleted");
		else console.log("Employee could not be deleted");
		if ("function" === typeof callback) callback();
	});
}

function create(callback){
	console.log("==========");
	console.log("Employee: create");
	const roles = data.getRoles();
	if (!roles.length){
		console.log("Please create a role first");
		if ("function" === typeof callback) callback();
		return;
	}
	console.table(roles);
	inquirer.prompt([
	{
		message: "For which role is the new employee?",
		type: "list",
		choices: roles.map(role => role.id),
		name: "employeeRoleId"
	},
	{
		message: "What's the first name of the new employee?",
		name: "employeeFirstName"
	},
	{
		message: "What's the last name for the new employee?",
		name: "employeeLastName"
	}
	]).then(res => {
		const success = data.createEmployee(res.employeeFirstName, res.employeeLastName, res.employeeRoleId);
		if (success) console.log("Employee created:", `${res.employeeLastName}, ${res.employeeFirstName}`);
		else console.log("Role could not be created:", res.roleTitle);
		if ("function" === typeof callback) callback();
	});
}

module.exports = {viewAll, viewByDept, viewByMgr, viewByRole, edit, del, create};