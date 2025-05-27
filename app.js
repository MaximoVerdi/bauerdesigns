const header = document.querySelector('.header');const burguerBtn = document.getElementById('burguer-btn');
const navMenu = document.getElementById('nav');

// Alternar clase "show" al hacer clic en el botón hamburguesa
burguerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Controlar el nav al redimensionar la ventana
function handleResize() {
    if (window.innerWidth >= 900) {
        navMenu.classList.add('show');
    } else {
        navMenu.classList.remove('show');
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Llamada inicial
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});