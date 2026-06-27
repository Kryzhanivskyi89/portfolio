const escapeHTML = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const getInitials = (title = '') => title
  .split(/\s|—|-/)
  .filter(Boolean)
  .slice(0, 2)
  .map((word) => word[0]?.toUpperCase())
  .join('') || 'AK';

function createCard(data, category = 'all') {
  const portfolioList = document.getElementById('portfolio-list');
  if (!portfolioList) return;

  const filteredData = category === 'all'
    ? data
    : data.filter((item) => item.category === category);

  if (!filteredData.length) {
    portfolioList.innerHTML = '<li class="portfolio-empty">No projects in this category yet.</li>';
    return;
  }

  const markup = filteredData.map(({ title, image, src, category: itemCategory, technology, description }, index) => {
    const safeTitle = escapeHTML(title);
    const safeImage = escapeHTML(image || '');
    const safeSrc = String(src || '').trim();
    const safeCategory = escapeHTML(itemCategory || category);
    const safeTech = escapeHTML(technology || '');
    const safeDescription = escapeHTML(description || '');
    const imageMarkup = safeImage
      ? `<img src="${safeImage}" alt="${safeTitle} project preview" loading="lazy" decoding="async" class="portfolioImage" />`
      : `<div class="portfolioImage--placeholder" aria-hidden="true">${escapeHTML(getInitials(title))}</div>`;
    const linkAttrs = safeSrc
      ? `href="${escapeHTML(safeSrc)}" target="_blank" rel="noopener noreferrer"`
      : 'href="#portfolio" aria-disabled="true"';

    return `
      <li class="card" data-category="${safeCategory}" style="animation-delay:${Math.min(index * 35, 350)}ms">
        <a class="card-link" ${linkAttrs}>
          <div class="back">
            ${imageMarkup}
          </div>
          <div class="front">
            <div class="project-meta">
              <span class="project-category">${safeCategory}</span>
              <span class="project-arrow" aria-hidden="true">↗</span>
            </div>
            <h3 class="content__title">${safeTitle}</h3>
            <p class="descr descr--tech">${safeTech}</p>
            <p class="descr">${safeDescription}</p>
          </div>
        </a>
      </li>
    `;
  }).join('');

  portfolioList.innerHTML = markup;
}

function setupFilters(data) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((button) => button.classList.remove('active'));
      btn.classList.add('active');
      createCard(data, btn.dataset.category);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('./data.json')
    .then((response) => {
      if (!response.ok) throw new Error('Portfolio data request failed');
      return response.json();
    })
    .then((data) => {
      createCard(data);
      setupFilters(data);
    })
    .catch((error) => {
      const portfolioList = document.getElementById('portfolio-list');
      if (portfolioList) {
        portfolioList.innerHTML = `<li class="portfolio-empty">Error loading portfolio projects: ${escapeHTML(error.message)}</li>`;
      }
      console.error('Error loading portfolio projects:', error);
    });
});
