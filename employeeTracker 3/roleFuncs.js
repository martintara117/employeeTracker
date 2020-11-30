const data = require("./config/orm.js");
const inquirer = require("inquirer");
const cTable = require('console.table');

/*
	"View all roles": role.viewAll,
	"View roles by department": role.viewByDep,
	"Edit role": role.edit,
	"Delete role": role.del,
	"Create role": role.create
*/
 function viewAll(callback){
	console.log("==========");
	console.log("Role: view all");
	const roles = data.getRoles();
	if (!roles.length){
		console.log("No roles to view");
	}
	else {
		console.table(roles);
	}
	if ("function" === typeof callback) callback();
 }
 
 function viewByDep(callback){
	console.log("==========");
	console.log("Role: view by department");
	const roles = data.getRoles();
	if (!roles.length){
		console.log("No roles to view");
	}
	else {
		roles.sort((a,b) => a.department.localeCompare(b.department));
		console.table(roles);
	}
	if ("function" === typeof callback) callback();
 }
 
 function edit(callback){
	console.log("==========");
	console.log("Role: edit");
	const roles = data.getRoles();
	if (!roles.length){
		console.log("No roles to edit");
		if ("function" === typeof callback) callback();
		return;
	}
	console.table(roles);
	inquirer.prompt([
	{
		message: "Which role do you want to edit?",
		type: "list",
		choices: roles.map(el => el.id),
		name: "roleId"
	},
	{
		message: "Which property do you want to edit?",
		type: "list",
		choices: ["title", "salary", "department"],
		name: "roleProperty"
	}
	]).then(res => {
		switch (res.roleProperty){
			case "title": editTitle(res.roleId, callback); break;
			case "salary": editSalary(res.roleId, callback); break;
			case "department": editDepartment(res.roleId, callback); break;
		}
	});
 }
 
 function editTitle(id, callback){
	 inquirer.prompt({
		 message: "New title for role:",
		 name: "title"
	 }).then(res => {
		const success = data.updateRoleTitle(id, res.title);
		if (success) console.log("Role new title:", res.title);
		else console.log("Role could not be edited");
		if ("function" === typeof callback) callback();
	 });
 }
 
 function editSalary(id, callback){
	 inquirer.prompt({
		 message: "New salary for role:",
		 name: "salary"
	 }).then(res => {
		const success = data.updateRoleSalary(id, res.salary);
		if (success) console.log("Role new salary:", res.salary);
		else console.log("Role could not be edited");
		if ("function" === typeof callback) callback();
	 });
 }
 
 function editDepartment(id, callback){
	 const depts = data.getDepartments();
	 console.table(depts);
	 inquirer.prompt({
		 message: "Change role to which department:",
		 type: "list",
		 choices: depts.map(el => el.id),
		 name: "departmentId"
	 }).then(res => {
		 const success = data.updateRoleDepartmentId(id, res.departmentId);
		 if (success) console.log("Role new department:", depts.find(el => el.id === res.departmentId).name);
		 else console.log("Role could not be edited");
		 if ("function" === typeof callback) callback();
	 });
 }
 
 function del(callback){
	console.log("==========");
	console.log("Role: delete");
	const roles = data.getRoles();
	if (!roles.length){
		console.log("No roles to delete");
		if ("function" === typeof callback) callback();
		return;
	}
	console.table(roles);
	inquirer.prompt({
		message: "Which role do you want to delete?",
		type: "list",
		choices: roles.map(el => el.id),
		name: "id"
	}).then(res => {
		const success = data.deleteRole(res.id);
		if (success) console.log("Role deleted");
		else console.log("Role could not be edited");
		if ("function" === typeof callback) callback();
	});
 }
 
 function create(callback){
	console.log("==========");
	console.log("Role: create");
	const depts = data.getDepartments();
	if (!depts.length){
		console.log("Please create a department first");
		if ("function" === typeof callback) callback();
		return;
	}
	console.table(depts);
	inquirer.prompt([
	{
		message: "For which department is the new role?",
		type: "list",
		choices: depts.map(dept => dept.id),
		name: "roleDepartmentId"
	},
	{
		message: "What's the job title of the new role?",
		name: "roleTitle"
	},
	{
		message: "What's the salary for the new role?",
		name: "roleSalary"
	}
	]).then(res => {
		const success = data.createRole(res.roleTitle, res.roleSalary, res.roleDepartmentId);
		if (success) console.log("Role created:", res.roleTitle);
		else console.log("Role could not be created:", res.roleTitle);
		if ("function" === typeof callback) callback();
	});
 }
 
 module.exports = {viewAll, viewByDep, edit, del, create};