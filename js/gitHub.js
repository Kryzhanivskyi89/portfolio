
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

  // Set fixed start date for 2025
  const yearStart = new Date(2025, 0, 1); // January 1, 2025 (Wednesday)
  const yearEnd = new Date(2025, 11, 31);
  
  // Calculate offset for the first week
  // Since January 1, 2025 is Wednesday, offset is 2 (Monday = 0, Tuesday = 1, Wednesday = 2)
  const firstDayOffset = 2;

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

// const username = "Kryzhanivskyi89";
// const githubSection = document.getElementById("github-data");
// const contributionsBlock = document.getElementById("github-contributions");

// // Функція для отримання та відображення GitHub профілю
// async function fetchGitHubProfile() {
//   const apiURL = `https://api.github.com/users/${username}`;
//   const contributionsAPI = `https://github-contributions-api.jogruber.de/v4/${username}`;

//   try {
//     // Запит профілю
//     const profileResponse = await fetch(apiURL);
//     if (!profileResponse.ok) throw new Error("Не вдалося отримати дані GitHub профілю");

//     const profileData = await profileResponse.json();
//     displayGitHubProfile(profileData);

//     // Запит контрибуцій
//     const contributionsResponse = await fetch(contributionsAPI);
//     if (!contributionsResponse.ok) throw new Error("Не вдалося отримати контрибуції");

//     const contributionsData = await contributionsResponse.json();
//     displayGitHubContributions(contributionsData);
//   } catch (error) {
//     githubSection.innerHTML = `<p>Помилка завантаження профілю: ${error.message}</p>`;
//     contributionsBlock.innerHTML = `<p>Помилка завантаження контрибуцій: ${error.message}</p>`;
//   }
// }

// // Виклик функції для отримання та відображення даних
// fetchGitHubProfile();

// // Функція для відображення профілю
// function displayGitHubProfile(data) {
//   githubSection.innerHTML = `
//     <div>
//       <img src="${data.avatar_url}" alt="Аватар користувача" style="width: 100px; border-radius: 50%;">
//       <p><strong>Subscriptions:</strong> ${data.followers}</p>
//     </div>
//   `;
// }

// // const contributionsBlock = document.getElementById("github-contributions");

// // function displayGitHubContributions(data) {
// //   const totalContributions = data.contributions.reduce(
// //     (sum, contribution) => sum + contribution.count,
// //     0
// //   );

// //   // Очищаємо і створюємо базову структуру
// //   contributionsBlock.innerHTML = `
// //     <h2>Мої контрибуції</h2>
// //     <p>Загальна кількість контрибуцій за рік: ${totalContributions}</p>
// //     <div class="github-calendar-wrapper" style="display: flex; padding: 10px;">
// //       <div class="day-labels" style="display: flex; flex-direction: column; margin-right: 4px; color: #666;">
// //         <span style="height: 12px; font-size: 12px;">Пн</span>
// //         <span style="height: 12px; font-size: 12px;">Вт</span>
// //         <span style="height: 12px; font-size: 12px;">Ср</span>
// //         <span style="height: 12px; font-size: 12px;">Чт</span>
// //         <span style="height: 12px; font-size: 12px;">Пт</span>
// //         <span style="height: 12px; font-size: 12px;">Сб</span>
// //         <span style="height: 12px; font-size: 12px;">Нд</span>
// //       </div>
// //       <div id="calendar-grid" style="display: flex; flex-direction: column;"></div>
// //     </div>
// //   `;

// //   const calendarGrid = document.getElementById("calendar-grid");

// //   // Створюємо масив для днів (7 рядків для днів тижня)
// //   const grid = Array.from({ length: 7 }, () => Array(53).fill(0));

// //   // Сортуємо контрибуції за датою
// //   const sortedContributions = data.contributions.sort((a, b) => 
// //     new Date(a.date) - new Date(b.date)
// //   );

// //   // Заповнюємо сітку даними
// //   sortedContributions.forEach(day => {
// //     const date = new Date(day.date);
// //     let dayOfWeek = date.getDay();
// //     // Конвертуємо в формат де 0 = Понеділок, 6 = Неділя
// //     dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    
// //     const startOfYear = new Date(date.getFullYear(), 0, 1);
// //     const weekNumber = Math.floor((date - startOfYear) / (7 * 24 * 60 * 60 * 1000));
    
// //     if (weekNumber >= 0 && weekNumber < 53) {
// //       grid[dayOfWeek][weekNumber] = day.count;
// //     }
// //   });

// //   // Відображаємо сітку
// //   for (let row = 0; row < 7; row++) {
// //     const rowDiv = document.createElement('div');
// //     rowDiv.style.display = 'flex';
// //     rowDiv.style.height = '12px';
// //     rowDiv.style.marginBottom = '2px';

// //     for (let col = 0; col < 53; col++) {
// //       const cell = document.createElement('div');
// //       cell.style.width = '10px';
// //       cell.style.height = '10px';
// //       cell.style.margin = '1px';
// //       cell.style.borderRadius = '2px';
// //       cell.style.border = '1px solid #ddd';
      
// //       const contributions = grid[row][col];
// //       // Визначаємо колір клітинки
// //       let color;
// //       if (contributions === 0) {
// //         color = "#ebedf0";
// //       } else if (contributions <= 2) {
// //         color = "#c6e48b";
// //       } else if (contributions <= 5) {
// //         color = "#7bc96f";
// //       } else {
// //         color = "#239a3b";
// //       }
      
// //       cell.style.backgroundColor = color;
// //       cell.title = `Контрибуції: ${contributions}`;
      
// //       rowDiv.appendChild(cell);
// //     }
    
// //     calendarGrid.appendChild(rowDiv);
// //   }
// // }

// // // Допоміжна функція для отримання ISO номера тижня
// // function getISOWeek(date) {
// //   const d = new Date(date);
// //   d.setHours(0, 0, 0, 0);
// //   d.setDate(d.getDate() + 4 - (d.getDay() || 7));
// //   const yearStart = new Date(d.getFullYear(), 0, 1);
// //   return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
// // }

// function displayGitHubContributions(data) {
//   // Сортування контрибуцій за датою
//   const sortedContributions = data.contributions.sort((a, b) => new Date(a.date) - new Date(b.date));

//   const totalContributions = sortedContributions.reduce(
//     (sum, contribution) => sum + contribution.count,
//     0
//   );

//   contributionsBlock.innerHTML = `
//     <p>Total number of contributions for the year: ${totalContributions}</p>
//     <div id="contributions-calendar"></div>
//   `;

//   const calendarContainer = document.getElementById("contributions-calendar");
//   calendarContainer.innerHTML = ''; // Очищаємо попередній вміст

//   // Ініціалізація календаря: 7 рядків (дні тижня) та 53 стовпці (тижні)
//   const contributionGrid = Array.from({ length: 7 }, () => Array(53).fill(0));

//   // Визначаємо останній день у даних
//   const lastDate = new Date(sortedContributions[sortedContributions.length - 1].date);
//   const currentYear = lastDate.getFullYear();

//   sortedContributions.forEach((day) => {
//     const date = new Date(day.date);
    
//     // Розрахунок номера тижня від кінця року
//     const weekFromEnd = getWeekFromEndOfYear(date, currentYear);
//     const dayOfWeek = (date.getDay() + 6) % 7; // Перетворення неділі на останній день тижня

//     // Перевірка меж grid
//     if (weekFromEnd >= 0 && weekFromEnd < 53) {
//       contributionGrid[dayOfWeek][weekFromEnd] = day.count;
//     }
//   });

//   // Відображення календаря
//   contributionGrid.forEach((row) => {
//     const rowContainer = document.createElement("div");
//     rowContainer.style.display = "flex";
//     rowContainer.style.marginBottom = "2px";

//     // Інвертуємо стовпці, щоб показувати з кінця
//     row.slice().reverse().forEach((contributions) => {
//       const dayElement = document.createElement("div");
//       dayElement.style.width = "10px";
//       dayElement.style.height = "10px";
//       dayElement.style.margin = "1px";
//       dayElement.style.borderRadius = "2px";
//       dayElement.style.border = "1px solid #ddd";
//       dayElement.title = `Контрибуції: ${contributions}`;

//       // Визначаємо колір залежно від кількості контрибуцій
//       let color;
//       if (contributions === 0) {
//         color = "#ebedf0"; // Без активності
//       } else if (contributions <= 2) {
//         color = "#c6e48b"; // Легкі контрибуції
//       } else if (contributions <= 5) {
//         color = "#7bc96f"; // Середня активність
//       } else {
//         color = "#239a3b"; // Висока активність
//       }

//       dayElement.style.backgroundColor = color;
//       rowContainer.appendChild(dayElement);
//     });

//     calendarContainer.appendChild(rowContainer);
//   });
// }

// // Функція для розрахунку номера тижня від кінця року
// function getWeekFromEndOfYear(date, year) {
//   const endOfYear = new Date(year, 11, 31); // 31 грудня
//   const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
  
//   // Різниця в тижнях від кінця року
//   const weeksDifference = Math.floor((endOfYear - date) / millisecondsPerWeek);
  
//   return 52 - weeksDifference;
// }
