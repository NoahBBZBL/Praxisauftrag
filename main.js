class App {
    constructor() {
        this.initSmoothScrolling();
        this.highlightActiveSection();
        this.initNavToggle();
    }

    initSmoothScrolling() {
        document.querySelectorAll('nav ul li a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    highlightActiveSection() {
        window.addEventListener('scroll', () => {
            let fromTop = window.scrollY + 60; // Adjust to avoid overlapping with header
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

    initNavToggle() {
        let toggleNav = document.querySelector('#toggle-nav');
        if (!toggleNav) {
            toggleNav = document.createElement('button');
            toggleNav.innerText = '☰';
            toggleNav.id = 'toggle-nav';
            document.body.appendChild(toggleNav);
        }

        toggleNav.addEventListener('click', () => {
            const nav = document.querySelector('nav');
            const isOpen = nav.classList.toggle('open');
            if (isOpen) {
                toggleNav.style.left = '262px'; // Move button to the right side of nav when open
            } else {
                toggleNav.style.left = '1rem'; // Move button back to original position when closed
            }
        });

        document.addEventListener('click', (e) => {
            const nav = document.querySelector('nav');
            if (!toggleNav.contains(e.target) && !nav.contains(e.target) && nav.classList.contains('open')) {
                nav.classList.remove('open');
                toggleNav.style.left = '1rem'; // Ensure button moves back when nav is closed
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
