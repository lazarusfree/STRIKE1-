// STRIKE1/// Site JavaScript
// Consolidated and cleaned up functionality

document.addEventListener('DOMContentLoaded', function() {

    // Smooth page load animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length <= 1) return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                history.pushState(null, null, href);
            }
        });
    });

    // Enhanced button press effect
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(2px) scale(0.98)';
        });

        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Section hover effects
    document.querySelectorAll('section').forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--accent)';
        });

        section.addEventListener('mouseleave', function() {
            this.style.borderColor = '';
        });
    });

    // Navigation active state
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPage ||
            (currentPage === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Escape to blur active element
        if (e.key === 'Escape' && document.activeElement) {
            document.activeElement.blur();
        }
    });

    // External link security
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // Project card interactions (if on projects page)
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            // Make cards focusable for keyboard navigation
            card.setAttribute('tabindex', '0');

            // Enhanced hover effect
            card.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
            });

            card.addEventListener('mouseleave', function() {
                this.style.zIndex = '';
            });

            // Keyboard activation
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const firstLink = this.querySelector('a');
                    if (firstLink) firstLink.click();
                }
            });
        });

        // Animate cards on load
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + index * 100);
        });
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    const currentHash = window.location.hash;
    if (currentHash) {
        const target = document.querySelector(currentHash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});