const username = 'Kryzhanivskyi89';
const githubSection = document.getElementById('github-data');
// const contributionsBlock = document.getElementById('github-contributions');

async function fetchGitHubProfile() {
  if (!githubSection) return;

  const apiURL = `https://api.github.com/users/${username}`;

  try {
    const profileResponse = await fetch(apiURL);
    if (!profileResponse.ok) throw new Error('Could not load GitHub profile data');

    const profileData = await profileResponse.json();
    displayGitHubProfile(profileData);

    // GitHub contribution calendar is intentionally disabled/commented.
    // You can restore it later by uncommenting the HTML block in index.html
    // and the preserved calendar code at the bottom of this file.
  } catch (error) {
    githubSection.innerHTML = `<p>GitHub profile fallback: <a href="https://github.com/${username}" target="_blank" rel="noopener noreferrer">github.com/${username}</a></p>`;
    console.error(error);
  }
}

function displayGitHubProfile(data) {
  githubSection.innerHTML = `
    <div class="github-profile-card">
      <img src="${data.avatar_url}" alt="${username} GitHub avatar" loading="lazy" decoding="async" />
      <div>
        <strong>${data.name || username}</strong>
        <p>${data.bio || 'Full Stack / Web3 Developer'}</p>
        <p>${data.followers} followers · ${data.public_repos} public repositories</p>
        <a href="${data.html_url}" target="_blank" rel="noopener noreferrer">Open GitHub profile</a>
      </div>
    </div>
  `;
}

fetchGitHubProfile();

/*
================================================================================
PRESERVED / COMMENTED GITHUB CONTRIBUTION CALENDAR
================================================================================
This is kept here because the contribution calendar took time to build.
To restore it:
1. Uncomment the <div id="github-contributions"> block in index.html.
2. Uncomment `const contributionsBlock = document.getElementById('github-contributions');`.
3. Call fetch/display logic below after displayGitHubProfile(profileData).

const contributionsAPI = `https://github-contributions-api.jogruber.de/v4/${username}`;

async function fetchGitHubContributions() {
  if (!contributionsBlock) return;

  try {
    const contributionsResponse = await fetch(contributionsAPI);
    if (!contributionsResponse.ok) throw new Error('Could not load contributions');
    const contributionsData = await contributionsResponse.json();
    displayGitHubContributions(contributionsData);
  } catch (error) {
    contributionsBlock.innerHTML = `<p>Contribution calendar fallback: ${error.message}</p>`;
  }
}

function displayGitHubContributions(data) {
  const totalContributions = data.contributions.reduce(
    (sum, contribution) => sum + contribution.count,
    0
  );

  contributionsBlock.innerHTML = `
    <h2>My contributions</h2>
    <p>Total contributions: ${totalContributions}</p>
    <div class="github-calendar-wrapper" style="display: flex; padding: 10px; overflow-x: auto;">
      <div class="day-labels" style="display: flex; flex-direction: column; margin-right: 4px; color: #94a3b8;">
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

  const calendarGrid = document.getElementById('calendar-grid');
  const grid = Array.from({ length: 7 }, () => Array(53).fill(0));
  const yearStart = new Date(2026, 0, 1);
  const yearEnd = new Date(2026, 11, 31);
  const firstDayOffset = 3;

  data.contributions.forEach((contribution) => {
    const date = new Date(contribution.date);
    if (date < yearStart || date > yearEnd) return;

    const timeDiff = date.getTime() - yearStart.getTime();
    const daysSinceStart = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
    const weekIndex = Math.floor((daysSinceStart + firstDayOffset) / 7);
    let dayOfWeek = date.getDay();
    dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    if (weekIndex >= 0 && weekIndex < 53) {
      grid[dayOfWeek][weekIndex] = contribution.count;
    }
  });

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
      cell.style.border = '1px solid rgba(148,163,184,0.24)';

      const contributions = grid[row][col];
      let color;
      if (contributions === 0) color = '#111827';
      else if (contributions <= 2) color = '#064e3b';
      else if (contributions <= 5) color = '#10b981';
      else color = '#34d399';

      cell.style.backgroundColor = color;

      const cellDate = new Date(yearStart);
      const dayOffset = (col * 7) + row - firstDayOffset;
      cellDate.setDate(cellDate.getDate() + dayOffset);
      cell.title = `${cellDate.toLocaleDateString()}: ${contributions} contributions`;

      rowDiv.appendChild(cell);
    }

    calendarGrid.appendChild(rowDiv);
  }
}
*/
