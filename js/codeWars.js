// The Codewars badge is already loaded directly in HTML.
// This file remains as a safe hook in case you want to extend the section later.
document.addEventListener('DOMContentLoaded', () => {
  const badge = document.querySelector('.codewars-badge');
  if (badge) badge.loading = 'lazy';
});
