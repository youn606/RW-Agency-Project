 const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const links = document.querySelectorAll('.nav-link, .btn');
  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (this.hash !== '') {
        e.preventDefault();
        const target = document.querySelector(this.hash);
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });