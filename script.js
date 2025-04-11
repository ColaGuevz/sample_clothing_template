document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll Effect ---
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {    
            mainNav.classList.toggle('active');
            // Optional: Change hamburger icon to 'X'
            menuToggle.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
        });

        // Close nav when a link is clicked (for single-page nav)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.textContent = '☰';
                }
            });
        });
    }


    // --- Scroll Reveal Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: Stop observing once animated to save resources
                    // observer.unobserve(entry.target);
                } else {
                    // Optional: Remove class to re-animate when scrolling up/down
                    // entry.target.classList.remove('is-visible');
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

        // --- Smooth Scrolling for Nav Links & Mobile Menu Close ---
    const mainNavForScroll = document.querySelector('.main-nav'); // Get reference again if needed
    const menuToggleForScroll = document.querySelector('.menu-toggle'); // Get reference again

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            const targetElement = (hrefAttribute.length > 1) ? document.querySelector(hrefAttribute) : null;

            // Check if it's a valid internal link and the target exists
            if (targetElement) {
                e.preventDefault(); // Prevent the default anchor jump

                // Check if the mobile nav is active and close it
                if (mainNavForScroll && mainNavForScroll.classList.contains('active')) {
                    mainNavForScroll.classList.remove('active');
                    // Also reset the toggle button text if it exists
                    if (menuToggleForScroll) {
                        menuToggleForScroll.textContent = '☰';
                    }
                }

                // Now perform the smooth scroll
                // Calculate offset for fixed header
                const headerOffset = document.querySelector('.site-header')?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

            }
            // If it's just href="#" or target doesn't exist, let default behavior happen or do nothing
            // But still close menu if it was just a menu link click
            else if (mainNavForScroll && mainNavForScroll.classList.contains('active') && this.closest('.main-nav')) {
                mainNavForScroll.classList.remove('active');
                if (menuToggleForScroll) {
                    menuToggleForScroll.textContent = '☰';
                }
            }
        });
    });

});