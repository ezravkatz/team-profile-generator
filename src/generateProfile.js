const createManager = function(manager) {
  return `
  <div className="col-4 mt-4">
    <div className="card h-80">
      <div className="card-head">
        <h2>${manager.name}</h2>
        <h3>Manager</h3><i class="fa-solid fa-briefcase"></i>
      </div>
      <div className="card-body">
        <p className="ID">ID: ${manager.id}</p>
        <p className="email">Email: <a href="mailto:${manager.email}">${manager.email}</a></p>
        <p className="">Office Number: ${manager.officeNumber}</p>
      </div>
    </div>
  </div>
  `;
};

const createEngineer = function(engineer) {
  return `
  <div class="col-4 mt-4">
  <div class="card h-80">
      <div class="card-head">
          <h2>${engineer.name}</h2>
          <h3>Engineer</h3><i class="fa-solid fa-laptop"></i>
      </div>
      <div class="card-body">
          <p class="ID">ID: ${engineer.id}</p>
          <p class="email">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></p>
          <p class="github">Github: <a href="https://github.com/${engineer.github}">${engineer.github}</a></p>
      </div>
  </div>
</div>
`;
};

const createIntern = function(intern) {
  return `
  <div class="col-4 mt-4">
  <div class="card h-80">
      <div class="card-head">
          <h2>${intern.name}</h2>
          <h3>Intern</h3><i class="fa-solid fa-graduation-cap"></i>
      </div>
      <div class="card-body">
          <p class="ID">ID: ${intern.id}</p>
          <p class="email">Email:<a href="mailto:${intern.email}">${intern.email}</a></p>
          <p class="school">Attending: ${intern.school}</p>
      </div>
</div>
</div>
  `;
};

generateHTML = (data) => {
  teamArray = [];

  for (let i=0; i < data.length; i++) {
    const employee = data[i];
    const position = employee.returnPosition();
    if (position === 'Manager') {
      const managerCard = createManager(employee);

      teamArray.push(managerCard);
    }
    if (position ==='Engineer') {
      const engineerCard = createEngineer(employee);

      teamArray.push(engineerCard);
    }

    if (position === 'Intern') {
      const internCard = createIntern(employee);

      teamArray.push(internCard);
    }
  }

  const teamCards = teamArray.join('');

  const createTeam = createTeamProfile(teamCards);
  return createTeam;
};


const createTeamProfile = function(teamCards) {
  return `
  <!DOCTYPE html>
  <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Profile</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav class="navbar" id="navbar">
            <span class="navbar-brand mb-0 h1 w-80 text-center" id="navBarText">Team Profile</span>
        </nav>
    </header>
    <main>
        <div class="container">
            <div class="row justify-content-center" id="teamCards">
                <!--Team Cards-->
                ${teamCards}}
            </div>
        </div>
    </main>
    
</body>
</html>
`;
};

// export to index
module.exports = generateHTML;
