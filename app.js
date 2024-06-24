class App {
  constructor() {
      this.initSmoothScrolling();
      this.highlightActiveSection();
      this.initMobileNav();
  }

  initSmoothScrolling() {
      document.querySelectorAll('nav ul li a').forEach(anchor => {
          anchor.addEventListener('click', function(e) {
              e.preventDefault();
              document.querySelector(this.getAttribute('href')).scrollIntoView({
                  behavior: 'smooth'
              });
          });
      });
  }

  highlightActiveSection() {
      window.addEventListener('scroll', () => {
          let fromTop = window.scrollY;
          document.querySelectorAll('nav ul li a').forEach(link => {
              let section = document.querySelector(link.getAttribute('href'));
              if (
                  section.offsetTop <= fromTop &&
                  section.offsetTop + section.offsetHeight > fromTop
              ) {
                  link.classList.add('active');
              } else {
                  link.classList.remove('active');
              }
          });
      });
  }

  initMobileNav() {
      const toggleNav = document.createElement('button');
      toggleNav.innerText = '☰';
      toggleNav.classList.add('toggle-nav');
      document.body.appendChild(toggleNav);

      toggleNav.addEventListener('click', () => {
          document.querySelector('nav').classList.toggle('open');
      });

      document.addEventListener('click', (e) => {
          if (!toggleNav.contains(e.target) && !document.querySelector('nav').contains(e.target)) {
              document.querySelector('nav').classList.remove('open');
          }
      });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
