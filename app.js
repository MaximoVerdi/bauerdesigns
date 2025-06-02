const header = document.querySelector('.header');
const burguerBtn = document.getElementById('burguer-btn');
const navMenu = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link'); 

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

window.addEventListener('scroll', function() {
  let current = '';
  
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= (sectionTop - 100)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});


emailjs.init("6Apq6DfihCRoT9Az7"); // reemplazá con la clave pública real
document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const submitBtn = document.getElementById("submit-btn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  emailjs.send("service_axsxooe", "template_bhozcd9", {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    windows: document.getElementById('windows').value,
    email: document.getElementById('email').value,
    address: document.getElementById('address').value,
    product_type: document.getElementById('product-type').value,
    message: document.getElementById('message').value
  })
  .then(function(response) {
    console.log("Email sent succesfully!!", response.status, response.text);
    document.getElementById("success-message").style.display = "block";
    document.getElementById("form").reset();
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  }, function(error) {
    console.error("FAILED...", error);
    alert("There was an error sending your message. Please try again later.");
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  });
});