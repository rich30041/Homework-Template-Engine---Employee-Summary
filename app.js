const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamMem = [];
const emptyId = [];

function manager() {
    console.log("Build your team");
    inquirer.prompt([
        {
            type: "input",
            name: "nameManager",
            message: "What is the manager's name?",
            validate: async (input) => {
                if (input == "" || /\s/.test(input)) {
                    return "Please enter first or last name.";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "managerId",
            message: "What is the manager's ID?"
        },
        {
            type: "input",
            name: "emailManager",
            message: "What is the manager's email?",
            validate: async (input) => {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                    return true;
                }
                return "Please enter a valid email address.";
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number, numbers only, no spaces?",
            validate: async (input) => {
                if (isNaN(input)) {
                    return "Please enter a number";
                }
                return true;
            }
        }
]).then(function(data){
        const manager = new Manager(data.nameManager, data.managerId, data.emailManager, data.officeNumber);
        teamMem.push(manager);
        emptyId.push(data.managerId);
        team();
    });
};

function team() {
    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "Which type of member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add any more team members"
            ]
        }
    ]).then(function(data){
        if (data.memberChoice === "Engineer"){
            engineer();
        } else if (data.memberChoice === "Intern"){
            intern();
        } else (genHTML());
//        } else console.log(teamMem)
    });
};

function engineer() {
    inquirer.prompt([
        {
            type: "input",
            name:"engineerName",
            message: "What is the engineer's name?",
            validate: async (input) => {
                if (input == "" || /\s/.test(input)) {
                    return "Please enter first or last name.";
                }
                return true;
            }
        },
        {
            type: "input",
            name:"engineerId",
            message: "What is the engineer's ID?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the engineer's email?",
            validate: async (input) => {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                    return true;
                }
            }    
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is the engineer's GitHub username?",
            validate: async (input) => {
                if (input == "" || /\s/.test(input)) {
                    return "Please enter a github name.";
                }
                return true;
            }
        }
    ]). then(function(data){
        const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub);
        teamMem.push(engineer);
        emptyId.push(data.engineerId);
        team();
    });
};

function intern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is the intern's name?",
            validate: async (input) => {
                if (input == "" || /\s/.test(input)) {
                    return "Please enter first or last name.";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "internId",
            message: "What is the intern's ID?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is the intern's email?",
            validate: async (input) => {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is the intern's school?",
            validate: async (input) => {
                if (input == "" || /\s/.test(input)) {
                    return "Please enter a school.";
                }
                return true;
            }
        }
    ]). then(function(data){
        const intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool);
        teamMem.push(intern);
        emptyId.push(data.internId);
        team();
    });
};

function genHTML() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMem), "utf-8");
}

manager()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
