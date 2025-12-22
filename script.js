document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initLanguageSwitcher();
});

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (btn) {
    btn.addEventListener('click', function() {
      btn.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });
  }

  links.forEach(link => {
    link.addEventListener('click', function() {
      btn.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll(".lang-btn");
  const translatable = document.querySelectorAll("[data-lang-content]");

  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      langButtons.forEach(b => b.classList.toggle("active", b === btn));
      translatable.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
      });
    });
  });
}
