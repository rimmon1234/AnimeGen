document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("inview");
    });
  }, { threshold: 0.2 });

  cards.forEach(c => observer.observe(c));

  // Simple nav active on scroll
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = [...document.querySelectorAll(".panel")];

  const secObserver = new IntersectionObserver((ents) => {
    ents.forEach(en => {
      if (en.isIntersecting) {
        const id = en.target.id;
        navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href")==`#${id}`));
      }
    });
  }, { threshold: 0.55 });

  sections.forEach(s => secObserver.observe(s));
});