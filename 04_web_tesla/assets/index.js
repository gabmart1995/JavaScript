import './components/Logo.js';
import './components/LandingHeader.js';
import './components/HeroSection.js';
import './components/ChargeSection.js';

/** @type {HTMLHeadingElement} */
const header = document.querySelector('#landing-header');
if (header) {
    // intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.90 // porcentaje de visbilidad
    };
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const color = entry.target.getAttribute('data-header-color');
                header.style.color = color;

                console.log(color);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.landing-sections');
    
    if (sections.length > 0) sections.forEach(section => observer.observe(section));
} 
