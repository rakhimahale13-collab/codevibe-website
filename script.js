const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
    menuToggle.focus();
  }
});

const navLinks = [...siteNav.querySelectorAll('a[href^="#"]')];
const navTargets = navLinks
  .map((link) => ({ link, target: document.querySelector(link.getAttribute("href")) }))
  .filter(({ target }) => target);

const navigationObserver = new IntersectionObserver((entries) => {
  const visibleSections = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

  if (visibleSections.length) {
    const activeTarget = visibleSections[0].target;
    navTargets.forEach(({ link, target }) => {
      if (target === activeTarget) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
}, { rootMargin: "-18% 0px -70% 0px", threshold: 0 });

navTargets.forEach(({ target }) => navigationObserver.observe(target));
