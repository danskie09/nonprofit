document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbar = document.querySelector('.navbar');
    const elements = document.querySelectorAll('.mission-card, .value-card, .event-card, .gallery-item');
    
    // Initialize animations
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    setTimeout(animateOnScroll, 300);
    
    // Function to handle navbar appearance on scroll
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.remove('navbar-transparent');
            navbar.classList.add('navbar-hero-bg');
        } else {
            navbar.classList.add('navbar-transparent');
            navbar.classList.remove('navbar-hero-bg');
        }
    }
    
    // Initial check on page load
    updateNavbar();
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        // Update active navigation link
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Navbar transition effect
        updateNavbar();
        
        // Animate elements when scrolled into view
        animateOnScroll();
    });
    
    // Smooth scrolling for navbar links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const navbarHeight = navbar.offsetHeight;
            
            window.scrollTo({
                top: targetSection.offsetTop - navbarHeight,
                behavior: 'smooth'
            });
            
            // Close mobile menu after click
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
    
    // Animation on scroll function
    function animateOnScroll() {
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
});