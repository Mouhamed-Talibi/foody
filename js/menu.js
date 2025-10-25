// Toggle mobile menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Add active class to clicked links
const links = document.querySelectorAll('.nav-links a, .mobile-menu a');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        // Remove active class from all links
        links.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        e.target.classList.add('active');
        
        // Close mobile menu after clicking a link
        if (window.innerWidth <= 768) {
            mobileMenu.classList.remove('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Update active link based on scroll position (for demonstration)
window.addEventListener('scroll', () => {
    // This is a simplified version for demonstration
    // In a real site, you would use Intersection Observer API
    const scrollPosition = window.scrollY;
    
    // For demo purposes, we'll just highlight the Home link
    // when scrolled to top and About when scrolled down a bit
    if (scrollPosition < 300) {
        links.forEach(l => l.classList.remove('active'));
    } else if (scrollPosition < 600) {
        links.forEach(l => l.classList.remove('active'));
        document.querySelector('a[href="#about"]').classList.add('active');
    }
});