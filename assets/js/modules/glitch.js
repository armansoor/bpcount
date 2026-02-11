export function initGlitchScroll() {
    let lastScrollTop = 0;
    const body = document.body;

    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        const speed = Math.abs(st - lastScrollTop);

        // Apply chromatic aberration based on scroll speed
        if (speed > 5) {
            const skew = Math.min(speed / 2, 5); // Cap skew
            const blur = Math.min(speed / 5, 2);

            body.style.filter = `blur(${blur}px)`;
            body.style.transform = `skewY(${speed > 0 ? skew : -skew}deg)`;

            // Reset after a short delay
            clearTimeout(body.scrollTimeout);
            body.scrollTimeout = setTimeout(() => {
                 body.style.filter = 'none';
                 body.style.transform = 'none';
            }, 100);
        }
        lastScrollTop = st <= 0 ? 0 : st;
    }, { passive: true });
}
