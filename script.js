// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme or prefer-color-scheme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === 'light') {
    themeIcon.className = 'fas fa-sun';
  } else {
    themeIcon.className = 'fas fa-moon';
  }
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

menuToggle.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
  menuToggle.innerHTML = mobileNav.classList.contains('active') 
    ? '<i class="fas fa-times"></i>' 
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      updateActiveNavLink(this);
      
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Update active navigation link
function updateActiveNavLink(clickedLink) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  if (clickedLink.classList.contains('nav-link')) {
    clickedLink.classList.add('active');
  }

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.classList.remove('active');
  });
  if (clickedLink.classList.contains('mobile-nav-link')) {
    clickedLink.classList.add('active');
  }
}

// ====== EMAILJS FORM (FINAL WORKING VERSION) ======

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_5xr4dyy",     // your service ID
      "template_jg583z6",    // ✅ YOUR TEMPLATE ID (added correctly)
      this
    )
    .then(() => {
      alert("Message sent successfully! I’ll check my email.");
      contactForm.reset();
    })
    .catch(error => {
      alert("Message failed. Try again.");
      console.log(error);
    });
  });
}


/* ===============================
   SCROLL ANIMATIONS
   =============================== */

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

document.querySelectorAll('.about-card, .portfolio-card, .skill-category, .contact-item')
  .forEach(el => {
    observer.observe(el);
  });

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');

  if (window.scrollY > 100) {
    nav.style.backgroundColor = 'rgba(22, 22, 24, 0.95)';
    nav.style.backdropFilter = 'blur(10px)';
  } else {
    nav.style.backgroundColor = '';
    nav.style.backdropFilter = '';
  }

  updateActiveNavOnScroll();
});

// Update active nav link based on scroll position
function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id], .cta-section');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {

      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });

      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-bar');
const skillsSection = document.querySelector('.skills-section');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 300);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// Initialize hero animations
document.addEventListener('DOMContentLoaded', () => {
  const heroElements = document.querySelectorAll(
    '.hero-greeting, .hero-name, .hero-title, .hero-description, .hero-buttons'
  );

  heroElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
  });
});
