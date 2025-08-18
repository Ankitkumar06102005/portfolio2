document.addEventListener('DOMContentLoaded', () => {
    // Enhanced parallax effect with smooth performance
    const layers = document.querySelectorAll('.parallax-layer');
    let ticking = false;
    
    function updateParallax() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        layers.forEach((layer, index) => {
            const speed = parseFloat(layer.getAttribute('data-speed')) || 0.1;
            const yOffset = scrollY * speed;
            
            // Add depth effect based on layer index
            const depth = (index + 1) * 0.1;
            const scale = 1 + (scrollY * depth * 0.0001);
            
            // Apply smooth transform with scale effect
            layer.style.transform = `translateY(${yOffset}px) scale(${scale})`;
            
            // Add subtle rotation for more dynamic effect
            const rotation = scrollY * 0.01 * speed;
            layer.style.transform += ` rotate(${rotation}deg)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });
    
    // Initialize parallax
    updateParallax();
    
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                entry.target.style.setProperty('--section-index', index);
                entry.target.style.animationDelay = `${index * 0.2}s`;
                
                // Add entrance animation class
                entry.target.classList.add('animate-in');
                
                // Animate skills with staggered effect
                if (entry.target.id === 'skills') {
                    const skillItems = entry.target.querySelectorAll('.skills-grid span');
                    skillItems.forEach((item, skillIndex) => {
                        setTimeout(() => {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                            
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 50);
                        }, skillIndex * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.content section').forEach(section => {
        observer.observe(section);
    });
    
    // Smooth scroll for navigation (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Enhanced mouse movement effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const x = (clientX / innerWidth - 0.5) * 20;
            const y = (clientY / innerHeight - 0.5) * 20;
            
            heroSection.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
        });
        
        heroSection.addEventListener('mouseleave', () => {
            heroSection.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }
    
    // Add floating animation to profile picture
    const profilePic = document.querySelector('.profile-pic');
    if (profilePic) {
        let floatDirection = 1;
        let floatOffset = 0;
        
        function animateProfile() {
            floatOffset += 0.02 * floatDirection;
            if (floatOffset > 1) {
                floatDirection = -1;
            } else if (floatOffset < -1) {
                floatDirection = 1;
            }
            
            const translateY = Math.sin(floatOffset) * 10;
            const rotate = Math.sin(floatOffset * 0.5) * 2;
            
            profilePic.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
            requestAnimationFrame(animateProfile);
        }
        
        animateProfile();
    }
    
    // Add typing effect to hero text
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let charIndex = 0;
        const typeSpeed = 150;
        
        function typeWriter() {
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typeSpeed);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
    
    // Add particle effect to background
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            animation: float-up ${5 + Math.random() * 10}s linear infinite;
        `;
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 15000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
    
    // Add CSS for enhanced animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-up {
            0% {
                transform: translateY(0) rotate(0deg) scale(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
                transform: translateY(-10vh) rotate(36deg) scale(1);
            }
            90% {
                opacity: 1;
                transform: translateY(-90vh) rotate(324deg) scale(1);
            }
            100% {
                transform: translateY(-100vh) rotate(360deg) scale(0);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
        }
        
        .project-card {
            animation: slideInFromBottom 0.8s ease-out forwards;
        }
        
        .project-card:nth-child(1) { animation-delay: 0.2s; }
        .project-card:nth-child(2) { animation-delay: 0.4s; }
        .project-card:nth-child(3) { animation-delay: 0.6s; }
        
        .skill-category {
            animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .skill-category:nth-child(2) {
            animation: slideInRight 0.8s ease-out forwards;
        }
        
        .timeline-item {
            animation: slideInFromBottom 0.8s ease-out forwards;
        }
        
        .timeline-item:nth-child(1) { animation-delay: 0.3s; }
        .timeline-item:nth-child(2) { animation-delay: 0.6s; }
        
        .contact-card {
            animation: scaleIn 0.6s ease-out forwards;
        }
        
        .contact-card:nth-child(1) { animation-delay: 0.1s; }
        .contact-card:nth-child(2) { animation-delay: 0.2s; }
        .contact-card:nth-child(3) { animation-delay: 0.3s; }
        .contact-card:nth-child(4) { animation-delay: 0.4s; }
        
        .about-card {
            animation: slideInFromBottom 0.8s ease-out forwards;
        }
        
        .about-card:nth-child(1) { animation-delay: 0.2s; }
        .about-card:nth-child(2) { animation-delay: 0.4s; }
        .about-card:nth-child(3) { animation-delay: 0.6s; }
        
        .hero-buttons .btn {
            animation: bounce 1s ease-out forwards;
        }
        
        .hero-buttons .btn:nth-child(1) { animation-delay: 1.5s; }
        .hero-buttons .btn:nth-child(2) { animation-delay: 1.7s; }
        
        .profile-pic {
            animation: scaleIn 1s ease-out forwards;
        }
        
        .hero h1 {
            animation: slideInFromBottom 1s ease-out forwards;
        }
        
        .hero p {
            animation: slideInFromBottom 1s ease-out 0.3s forwards;
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization: Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Clean up any performance-heavy operations here
        }, 100);
    }, { passive: true });
    
    // Animate skill bars on scroll
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    skillProgressBars.forEach(bar => skillObserver.observe(bar));
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Enhanced hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-20px) scale(1.05) rotateY(5deg)';
            card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2)';
            
            // Add floating animation to project image
            const projectImage = card.querySelector('.project-image');
            if (projectImage) {
                projectImage.style.animation = 'bounce 1s ease-in-out infinite';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
            card.style.boxShadow = 'var(--shadow-soft)';
            
            // Remove floating animation
            const projectImage = card.querySelector('.project-image');
            if (projectImage) {
                projectImage.style.animation = '';
            }
        });
    });
    
    // Add wave effect to skill bars
    const skillBarElements = document.querySelectorAll('.skill-progress');
    skillBarElements.forEach(bar => {
        bar.addEventListener('mouseenter', () => {
            bar.style.animation = 'wave 0.5s ease-in-out';
        });
        
        bar.addEventListener('animationend', () => {
            bar.style.animation = '';
        });
    });
    
    // Add morphing gradient to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.animation = 'morphingGradient 10s ease-in-out infinite';
    }
    
    // Add floating effect to contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
            card.style.animation = `float ${2 + index * 0.5}s ease-in-out infinite`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.animation = '';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});