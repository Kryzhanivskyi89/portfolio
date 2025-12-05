export function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  console.log('Theme toggled');
  if(document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  if(localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
  }
});

window.toggleTheme = toggleTheme;
