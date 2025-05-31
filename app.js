const header = document.querySelector('.header');const burguerBtn = document.getElementById('burguer-btn');
const navMenu = document.getElementById('nav');


burguerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

function handleResize() {
    if (window.innerWidth >= 1024) {
        navMenu.classList.add('show');
    } else {
        navMenu.classList.remove('show');
    }
}

window.addEventListener('resize', handleResize);
handleResize();
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.fade-in-section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  sections.forEach(section => {
    observer.observe(section);
  });
});
