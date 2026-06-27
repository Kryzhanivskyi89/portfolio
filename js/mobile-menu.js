(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');
  const menuLinks = document.querySelectorAll('.menu-link');

  if (!mobileMenu || !openMenuBtn || !closeMenuBtn) return;

  const setMenuState = (isOpen) => {
    openMenuBtn.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    mobileMenu.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('modal-open', isOpen);
  };

  openMenuBtn.addEventListener('click', () => setMenuState(true));
  closeMenuBtn.addEventListener('click', () => setMenuState(false));

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  mobileMenu.addEventListener('click', (event) => {
    if (event.target === mobileMenu) setMenuState(false);
  });

  window.matchMedia('(min-width: 861px)').addEventListener('change', (event) => {
    if (event.matches) setMenuState(false);
  });
})();
