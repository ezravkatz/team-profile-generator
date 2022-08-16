const generateProfile = require('./src/generateProfile');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const fs = require('fs');
const inquirer = require('inquirer');

const teamProfileArray = [];

const managerInfo = () => {
  return inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Please enter the name of the manager of this team.',
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log('Error! Please enter the manager\'s name.');
              return false;
            }
          },
        },
        {
          type: 'input',
          name: 'ID',
          message: 'Please enter the manager\'s ID.',
          validate: (nameInput) => {
            if (isNaN(nameInput)) {
              console.log('Error! Please enter the manager\'s ID.');
              return false;
            } else {
              return true;
            }
          },
        },
        {
          type: 'input',
          name: 'email',
          message: 'Please enter the manager\'s email.',
          validate: (email) => {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            if (valid) {
              return true;
            } else {
              console.log('Error! Please enter the manager\'s email address.');
              return false;
            }
          },
        },
        {
          type: 'input',
          name: 'officeNumber',
          message: 'Please enter the manager\'s office number.',
          validate: (nameInput) => {
            if (isNaN(nameInput)) {
              console.log('Error! Please enter the manager\'s office number.');
              return false;
            } else {
              return true;
            }
          },
        },
      ])
      .then((managerProfile) => {
        const {name, ID, email, OfficeNumber} = managerProfile;
        const manager = new Manager(name, ID, email, OfficeNumber);

        teamProfileArray.push(manager);
        console.log(manager);
      });
};

const employeeInfo = () => {
  console.log(`
  Would you like to add employees to the team?
  `);

  return inquirer
      .prompt([
        {
          type: 'input',
          name: 'positon',
          message: 'Please indicate the position of the employee.',
          options: ('Engineer', 'Intern'),
        },
        {
          type: 'input',
          name: 'name',
          message: 'Please enter the employee name.',
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log('Error! Please enter the employee name.');
              return false;
            }
          },
        },
        {
          type: 'input',
          name: 'ID',
          message: 'Please enter the employee ID number.',
          validate: (nameInput) => {
            if (isNaN(nameInput)) {
              console.log('Error! Please enter an ID number for the employee.');
              return false;
            } else {
              return true;
            }
          },
        },
        {
          type: 'input',
          name: 'email',
          message: 'Please enter the employee\'s email address.',
          validate: (email) => {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            if (valid) {
              return true;
            } else {
              console.log('Error! Please enter a valid email address.');
              return false;
            }
          },
        },
        {
          type: 'input',
          name: 'github',
          message: 'Please enter the employee\'s GitHub username.',
          when: (input) => input.position === 'Engineer',
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log(
                  'Error! Please provide the emmployee\'s github username.',
              );
            }
          },
        },
        {
          type: 'input',
          name: 'school',
          message:
          'Please enter the name of the school your intern is affiliated with!',
          when: (input) => input.position === 'Intern',
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log('Error! Please enter the school name.');
              return false;
            }
          },
        },
        {
          type: 'confirmation',
          name: 'confirmAdd',
          message: 'Do you want to add another member to your team?',
          default: false,
        },
      ])
      .then((teamData) => {
    const {name, ID, email, position, github, school, confirmAdd} = teamData;
        let employee;

        if (position === 'Engineer') {
          employee = new Engineer(name, ID, email, github);
          console.log(employee);
        } else if (position === 'Intern') {
          employee = new Intern(name, ID, email, school);
          console.log(employee);
        }

        teamProfileArray.push(employee);

        if (confirmAdd) {
          return employeeInfo(teamProfileArray);
        } else {
          return teamProfileArray;
        }
      });
};

const createFile = (data) => {
  fs.createFile('./dist/index.html', data, (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log('Team profile generated! Please check the index.html file.');
    }
  });
};

managerInfo()
    .then(employeeInfo)
    .then((teamProfileArray) => {
      return generateProfile(teamProfileArray);
    })
    .then((pageDesign) => {
      return createFile(pageDesign);
    })
    .catch((err) => {
      console.log(err);
    });
