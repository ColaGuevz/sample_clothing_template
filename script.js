// --- START OF FILE script.js ---

document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll Effect ---
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        // 1. Toggle menu visibility and icon on button click
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
        });

        // Note: We are removing the separate general link click listener for closing.
        // Closing will now be handled explicitly within the smooth scroll logic below
        // for hash links, and default browser navigation handles it for external links.
    }


    // --- Scroll Reveal Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // observer.unobserve(entry.target); // Optional: uncomment to animate only once
                } else {
                    // entry.target.classList.remove('is-visible'); // Optional: uncomment to re-animate on scroll up
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.1
        });
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // --- Smooth Scrolling for Internal (#) Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');

            // Ensure it's not just "#"
            if (hrefAttribute.length > 1) {
                try {
                    // Check if the target element exists on the *current* page
                    const targetElement = document.querySelector(hrefAttribute);

                    if (targetElement) {
                        // Prevent the default anchor jump *immediately*
                        e.preventDefault();

                        // Check if the mobile nav is active and close it *immediately*
                        if (mainNav && mainNav.classList.contains('active')) {
                            mainNav.classList.remove('active');
                            if (menuToggle) { // Check if menuToggle exists before using it
                                menuToggle.textContent = '☰';
                            }
                        }

                        // Calculate offset for fixed header
                        const headerOffset = header?.offsetHeight || 0; // Use header variable defined earlier
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        // Use setTimeout to slightly delay the scroll.
                        // This gives the browser time to render the menu closing.
                        setTimeout(() => {
                            window.scrollTo({
                                top: offsetPosition,
                                behavior: "smooth"
                            });
                        }, 50); // Delay in milliseconds (adjust 50 or 100 if needed)

                    }
                    // If targetElement is null, default behavior happens (no preventDefault called).

                } catch (error) {
                    console.error("Error during smooth scroll:", error);
                }
            }
            // If href is just "#" or invalid, allow default behavior.
            // Also, if the link is NOT a hash link (e.g., "shop.html"), this listener
            // doesn't run, and the browser handles the navigation, effectively closing the menu.
        });
    });

}); // End DOMContentLoaded

// --- END OF FILE script.js ---