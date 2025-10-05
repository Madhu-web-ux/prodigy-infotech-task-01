window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const loginForm = document.querySelector('.login-form');
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  alert('Login successful! (Demo Only)');
});
