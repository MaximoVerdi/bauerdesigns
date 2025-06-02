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


document.getElementById('form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const successMessage = document.getElementById('success-message');
    const submitBtn = document.getElementById('submit-btn');
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i class="bx bx-loader-alt bx-spin"></i>';
    
    try {
        const formData = new FormData(form);
        formData.append('_subject', 'New Quote Request');
        formData.append('_template', 'table');
        
        const response = await fetch('https://formsubmit.co/ajax/maximoverdi21@gmail.com', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if(result.success) {
            successMessage.style.display = 'block';
            form.reset();
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 10000);
        } else {
            alert('Error: ' + (result.message || 'Failed to send email'));
        }
    } catch (error) {
        alert('Connection error: ' + error.message);
    } finally {
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit <i class="bx bx-send"></i>';
    }
});