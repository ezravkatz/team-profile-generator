const createManager = function(manager) {
  return `
  <div>
    <div>
      <div className="card-head">
        <h2>${manager.name}</h2>
        <h3>Manager</h3><i class="fa-solid fa-briefcase"></i>
      </div>
      <div className="card-body">
        <p>ID: ${manager.id}</p>
        <p className="email">Email: <a href="mailto:${manager.email}">${manager.email}</a></p>
        <p>Office Number: ${manager.officeNumber}</p>
      </div>
    </div>
  </div>
  `;
};

const createEngineer = function(engineer) {
  return `
  <div>
  <div class="card">
      <div class="card-head">
          <h2>${engineer.name}</h2>
          <h3>Engineer</h3><i class="fa-solid fa-laptop"></i>
      </div>
      <div class="card-body">
          <p>ID: ${engineer.id}</p>
          <p class="email">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></p>
          <p class="github">Github: <a href="https://github.com/${engineer.github}">${engineer.github}</a></p>
      </div>
  </div>
</div>
`;
};

const createIntern = function(intern) {
  return `
  <div>
  <div class="card">
      <div class="card-head">
          <h2>${intern.name}</h2>
          <h3>Intern</h3><i class="fa-solid fa-graduation-cap"></i>
      </div>
      <div class="card-body">
          <p>ID: ${intern.id}</p>
          <p class="email">Email:<a href="mailto:${intern.email}">${intern.email}</a></p>
          <p>Attending: ${intern.school}</p>
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
        <nav class="navbar">
            <span id="navBarText">Team Profile</span>
        </nav>
    </header>
    <main>
        <div id="cardContainer">
            <div id="teamCards">
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
