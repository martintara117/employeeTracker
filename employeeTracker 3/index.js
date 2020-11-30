const emp = require("./employeeFuncs.js");
const dep = require("./departmentFuncs.js");
const rol = require("./roleFuncs.js");

const inquirer = require("inquirer");

/********************************************************************************/

const menus = {
	main(){
		console.log("==========");
		inquirer.prompt({
			message: "Main menu:",
			type: "list",
			choices: Object.keys(commands.main),
			name: "command"
		}).then(res => command("main", res));
	},
	employee(){
		console.log("==========");
		inquirer.prompt({
			message: "Employee menu:",
			type: "list",
			choices: Object.keys(commands.employee),
			name: "command"
		}).then(res => command("employee", res));
	},
	department(){
		console.log("==========");
		inquirer.prompt({
			message: "Department menu:",
			type: "list",
			choices: Object.keys(commands.department),
			name: "command"
		}).then(res => command("department", res));
	},
	role(){
		console.log("==========");
		inquirer.prompt({
			message: "Role menu:",
			type: "list",
			choices: Object.keys(commands.role),
			name: "command"
		}).then(res => command("role", res));
	},
	exit(){
		console.log("==========");
		console.log("Thank you for using Employee Tracker");
	}
};

/********************************************************************************/

const commands = {
	main: {
		"Employee menu": menus.employee,
		"Department menu": menus.department,
		"Role menu": menus.role,
		"Exit": menus.exit
	},
	employee: {
		"Back to main menu": menus.main,
		"View all employees": emp.viewAll,
		"View employees by department": emp.viewByDept,
		"View employees by manager": emp.viewByMgr,
		"View employees by role": emp.viewByRole,
		"Edit employee": emp.edit,
		"Delete employee": emp.del,
		"Create employee": emp.create
	},
	department: {
		"Back to main menu": menus.main,
		"View all departments": dep.viewAll,
		"Edit department": dep.edit,
		"Delete department": dep.del,
		"Create department": dep.create
	},
	role: {
		"Back to main menu": menus.main,
		"View all roles": rol.viewAll,
		"View roles by department": rol.viewByDep,
		"Edit role": rol.edit,
		"Delete role": rol.del,
		"Create role": rol.create
	}
};

function command(menu, res){
	if ("function" === typeof commands[menu][res.command]) commands[menu][res.command](menus[menu]);
}

/********************************************************************************/

console.log("Welcome to Employee Tracker");
menus.main();