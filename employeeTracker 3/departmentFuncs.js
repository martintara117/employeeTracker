const data = require("./config/orm.js");
const inquirer = require("inquirer");
const cTable = require('console.table');

/*
	"View all departments": dep.viewAll,
	"Edit department": dep.edit,
	"Delete department": dep.del,
	"Create department": dep.create
*/

function viewAll(callback){
	console.log("==========");
	console.log("Department: view all");
	const depts = data.getDepartments();
	if (!depts.length){
		console.log("No departments to view");
	}
	else {
		console.table(depts);
	}
	if ("function" === typeof callback) callback();
}

function edit(callback){
	console.log("==========");
	console.log("Department: edit");
	const depts = data.getDepartments();
	if (!depts.length){
		console.log("No departments to edit");
		if ("function" === typeof callback) callback();
		return;
	}
	console.table(depts);
	inquirer.prompt({
		message: "Which department do you want to edit?",
		type: "list",
		choices: depts.map(el => el.id),
		name: "id"
	}).then(res => editName(res.id, callback));
}

function editName(id, callback){
	inquirer.prompt({
		message: "New name for department:",
		name: "name"
	}).then(res => {
		const success = data.updateDepartmentName(id, res.name);
		if (success) console.log("Department new name:", res.name);
		else console.log("Department could not be edited");
		if ("function" === typeof callback) callback();
	});
}

function del(callback){
	console.log("==========");
	console.log("Department: delete");
	const depts = data.getDepartments();
	if (!depts.length){
		console.log("No departments to delete");
		if ("function" === typeof callback) callback();
		return;
	}
	console.table(depts);
	inquirer.prompt({
		message: "Which department do you want to delete?",
		type: "list",
		choices: depts.map(el => el.id),
		name: "id"
	}).then(res => {
		const success = data.deleteDepartment(res.id);
		if (success) console.log("Department deleted");
		else console.log("Department could not be edited");
		if ("function" === typeof callback) callback();
	});
}

function create(callback){
	console.log("==========");
	console.log("Department: create");
	inquirer.prompt({
		message: "What's the name of the new department?",
		name: "departmentName"
	}).then(res => {
		const success = data.createDepartment(res.departmentName);
		if (success) console.log("Department created:", res.departmentName);
		else console.log("Department could not be created:", res.departmentName);
		if ("function" === typeof callback) callback();
	});
}

module.exports = {viewAll, edit, del, create};