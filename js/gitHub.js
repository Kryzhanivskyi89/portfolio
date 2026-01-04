
const username = "Kryzhanivskyi89";
const githubSection = document.getElementById("github-data");
const contributionsBlock = document.getElementById("github-contributions");

async function fetchGitHubProfile() {
  const apiURL = `https://api.github.com/users/${username}`;
  const contributionsAPI = `https://github-contributions-api.jogruber.de/v4/${username}`;

  try {
    const profileResponse = await fetch(apiURL);
    if (!profileResponse.ok) throw new Error("Не вдалося отримати дані GitHub профілю");

    const profileData = await profileResponse.json();
    displayGitHubProfile(profileData);

    const contributionsResponse = await fetch(contributionsAPI);
    if (!contributionsResponse.ok) throw new Error("Не вдалося отримати контрибуції");

    const contributionsData = await contributionsResponse.json();
    displayGitHubContributions(contributionsData);
  } catch (error) {
    githubSection.innerHTML = `<p>Помилка завантаження профілю: ${error.message}</p>`;
    contributionsBlock.innerHTML = `<p>Помилка завантаження контрибуцій: ${error.message}</p>`;
  }
}

function displayGitHubProfile(data) {
  githubSection.innerHTML = `
    <div>
      <img src="${data.avatar_url}" alt="Аватар користувача" style="width: 100px; border-radius: 50%;">
      <p><strong>Subscriptions:</strong> ${data.followers}</p>
    </div>
  `;
}

function displayGitHubContributions(data) {
  const totalContributions = data.contributions.reduce(
    (sum, contribution) => sum + contribution.count,
    0
  );

  contributionsBlock.innerHTML = `
    <h2>My contributions</h2>
    <p>Total contributions: ${totalContributions}</p>
    <div class="github-calendar-wrapper" style="display: flex; padding: 10px;">
      <div class="day-labels" style="display: flex; flex-direction: column; margin-right: 4px; color: #666;">
        <span style="height: 16px; font-size: 12px;">Mo</span>
        <span style="height: 16px; font-size: 12px;">Tu</span>
        <span style="height: 16px; font-size: 12px;">We</span>
        <span style="height: 16px; font-size: 12px;">Th</span>
        <span style="height: 16px; font-size: 12px;">Fr</span>
        <span style="height: 16px; font-size: 12px;">Sa</span>
        <span style="height: 16px; font-size: 12px;">Su</span>
      </div>
      <div id="calendar-grid" style="display: flex; flex-direction: column;"></div>
    </div>
  `;

  const calendarGrid = document.getElementById("calendar-grid");

  // Create grid for the entire year (7 days × 53 weeks)
  const grid = Array.from({ length: 7 }, () => Array(53).fill(0));

  // Set fixed start date for 2026
  const yearStart = new Date(2026, 0, 1); // January 1, 2026 (Wednesday)
  const yearEnd = new Date(2026, 11, 31);
  
  // Calculate offset for the first week
  // Since January 1, 2026 is Wednesday, offset is 2 (Monday = 0, Tuesday = 1, Wednesday = 2)
  const firstDayOffset = 3;

  // Process each contribution
  data.contributions.forEach(contribution => {
    const date = new Date(contribution.date);
    
    // Skip if the date is outside our range
    if (date < yearStart || date > yearEnd) return;

    // Calculate the day position considering the offset
    const timeDiff = date.getTime() - yearStart.getTime();
    const daysSinceStart = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
    
    // Calculate week number considering the offset
    const weekIndex = Math.floor((daysSinceStart + firstDayOffset) / 7);
    
    // Calculate day of week (0 = Monday, 6 = Sunday)
    let dayOfWeek = date.getDay();
    dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    
    if (weekIndex >= 0 && weekIndex < 53) {
      grid[dayOfWeek][weekIndex] = contribution.count;
    }
  });

  // Display the grid
  for (let row = 0; row < 7; row++) {
    const rowDiv = document.createElement('div');
    rowDiv.style.display = 'flex';
    rowDiv.style.height = '12px';
    rowDiv.style.marginBottom = '2px';

    for (let col = 0; col < 53; col++) {
      const cell = document.createElement('div');
      cell.style.width = '10px';
      cell.style.height = '10px';
      cell.style.margin = '1px';
      cell.style.borderRadius = '2px';
      cell.style.border = '1px solid #ddd';
      
      const contributions = grid[row][col];
      let color;
      if (contributions === 0) {
        color = "#ebedf0";
      } else if (contributions <= 2) {
        color = "#c6e48b";
      } else if (contributions <= 5) {
        color = "#7bc96f";
      } else {
        color = "#239a3b";
      }
      
      cell.style.backgroundColor = color;
      
      // Calculate the date for this cell starting from January 1, 2025
      const cellDate = new Date(yearStart);
      // Adjust the date calculation to account for the offset
      const dayOffset = (col * 7) + row - firstDayOffset;
      cellDate.setDate(cellDate.getDate() + dayOffset);
      
      cell.title = `${cellDate.toLocaleDateString()}: ${contributions} контрибуцій`;
      
      rowDiv.appendChild(cell);
    }
    
    calendarGrid.appendChild(rowDiv);
  }
}

fetchGitHubProfile();
