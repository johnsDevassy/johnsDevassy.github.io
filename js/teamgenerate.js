document.getElementById('generateBtn').addEventListener('click', generateTeams);

function generateTeams() {
  const namesTextArea = document.getElementById('names');
  const teamSizeInput = document.getElementById('teamSize');
  const teamsContainer = document.getElementById('teams');
  
  const names = namesTextArea.value.trim().split('\n');
  const teamSize = parseInt(teamSizeInput.value, 10);

  if (names.length === 0 || isNaN(teamSize) || teamSize <= 0) {
    teamsContainer.innerHTML = '<p>Please enter valid names and team size.</p>';
    return;
  }

  shuffleArray(names);
  
  const numTeams = Math.ceil(names.length / teamSize);
  teamsContainer.innerHTML = '';

  for (let i = 0; i < numTeams; i++) {
    const team = names.slice(i * teamSize, (i + 1) * teamSize);
    const teamDiv = document.createElement('div');
    teamDiv.className = 'team';
    teamDiv.innerHTML = `<h3>Team ${i + 1}</h3><p>${team.join(', ')}</p>`;
    teamsContainer.appendChild(teamDiv);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}