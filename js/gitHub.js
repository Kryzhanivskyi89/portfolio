const username = "Kryzhanivskyi89";
const githubSection = document.getElementById("github-data");
const contributionsBlock = document.getElementById("github-contributions");

// Функція для отримання та відображення GitHub профілю
async function fetchGitHubProfile() {
  const apiURL = `https://api.github.com/users/${username}`;
  const contributionsAPI = `https://github-contributions-api.jogruber.de/v4/${username}`;

  try {
    // Запит профілю
    const profileResponse = await fetch(apiURL);
    if (!profileResponse.ok) throw new Error("Не вдалося отримати дані GitHub профілю");

    const profileData = await profileResponse.json();
    displayGitHubProfile(profileData);

    // Запит контрибуцій
    const contributionsResponse = await fetch(contributionsAPI);
    if (!contributionsResponse.ok) throw new Error("Не вдалося отримати контрибуції");

    const contributionsData = await contributionsResponse.json();
    displayGitHubContributions(contributionsData);
  } catch (error) {
    // githubSection.innerHTML = `<p>Помилка завантаження профілю: ${error.message}</p>`;
    // contributionsBlock.innerHTML = `<p>Помилка завантаження контрибуцій: ${error.message}</p>`;
  }
}


// Виклик функції для отримання та відображення даних
fetchGitHubProfile();

// Функція для відображення профілю
function displayGitHubProfile(data) {
  githubSection.innerHTML = `
    <div>
      <img src="${data.avatar_url}" alt="Аватар користувача" style="width: 100px; border-radius: 50%;">
      <p><strong>Subscriptions:</strong> ${data.followers}</p>
    </div>
  `;
}


function displayGitHubContributions(data) {
  // Сортування контрибуцій за датою
  const sortedContributions = data.contributions.sort((a, b) => new Date(a.date) - new Date(b.date));

  const totalContributions = sortedContributions.reduce(
    (sum, contribution) => sum + contribution.count,
    0
  );

  contributionsBlock.innerHTML = `
    <p>Total number of contributions for the year: ${totalContributions}</p>
    <div id="contributions-calendar"></div>
  `;

  const calendarContainer = document.getElementById("contributions-calendar");
  calendarContainer.innerHTML = ''; // Очищаємо попередній вміст

  // Ініціалізація календаря: 7 рядків (дні тижня) та 53 стовпці (тижні)
  const contributionGrid = Array.from({ length: 7 }, () => Array(53).fill(0));

  // Визначаємо останній день у даних
  const lastDate = new Date(sortedContributions[sortedContributions.length - 1].date);
  const currentYear = lastDate.getFullYear();

  sortedContributions.forEach((day) => {
    const date = new Date(day.date);
    
    // Розрахунок номера тижня від кінця року
    const weekFromEnd = getWeekFromEndOfYear(date, currentYear);
    const dayOfWeek = (date.getDay() + 6) % 7; // Перетворення неділі на останній день тижня

    // Перевірка меж grid
    if (weekFromEnd >= 0 && weekFromEnd < 53) {
      contributionGrid[dayOfWeek][weekFromEnd] = day.count;
    }
  });

  // Відображення календаря
  contributionGrid.forEach((row) => {
    const rowContainer = document.createElement("div");
    rowContainer.style.display = "flex";
    rowContainer.style.marginBottom = "2px";

    // Інвертуємо стовпці, щоб показувати з кінця
    row.slice().reverse().forEach((contributions) => {
      const dayElement = document.createElement("div");
      dayElement.style.width = "10px";
      dayElement.style.height = "10px";
      dayElement.style.margin = "1px";
      dayElement.style.borderRadius = "2px";
      dayElement.style.border = "1px solid #ddd";
      dayElement.title = `Контрибуції: ${contributions}`;

      // Визначаємо колір залежно від кількості контрибуцій
      let color;
      if (contributions === 0) {
        color = "#ebedf0"; // Без активності
      } else if (contributions <= 2) {
        color = "#c6e48b"; // Легкі контрибуції
      } else if (contributions <= 5) {
        color = "#7bc96f"; // Середня активність
      } else {
        color = "#239a3b"; // Висока активність
      }

      dayElement.style.backgroundColor = color;
      rowContainer.appendChild(dayElement);
    });

    calendarContainer.appendChild(rowContainer);
  });
}

// Функція для розрахунку номера тижня від кінця року
function getWeekFromEndOfYear(date, year) {
  const endOfYear = new Date(year, 11, 31); // 31 грудня
  const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
  
  // Різниця в тижнях від кінця року
  const weeksDifference = Math.floor((endOfYear - date) / millisecondsPerWeek);
  
  return 52 - weeksDifference;
}
