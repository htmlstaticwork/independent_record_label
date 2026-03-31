document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Global Fade Up (Exclude Hero elements which have their own sequence)
        const fadeUps = document.querySelectorAll('.fade-up:not(.hero *)');
        fadeUps.forEach((el) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });

        // Hero Content Entrance Sequence
        const hero = document.querySelector('.hero-content, .hero-v2');
        if (hero) {
            const heroElements = hero.querySelectorAll('.container .row > div > *');
            gsap.from(heroElements, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                delay: 0.2,
                ease: 'power3.out',
                clearProps: "all" // Ensure the DOM is clean after animation
            });
        }
        
        // Image Reveal
        const imgWrappers = document.querySelectorAll('.artist-img-wrapper, .album-cover-wrapper');
        imgWrappers.forEach((wrapper) => {
            gsap.from(wrapper, {
                scrollTrigger: {
                    trigger: wrapper,
                    start: 'top 85%',
                },
                scale: 1.1,
                duration: 1.5,
                ease: 'power2.out'
            });
        });
    }
});
