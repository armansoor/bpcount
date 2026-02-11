export function initTilt() {
    const cards = document.querySelectorAll('.concept-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation based on mouse position
            // Center of card is (rect.width/2, rect.height/2)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Max rotation degrees
            const maxRotate = 15;

            const rotateX = ((y - centerY) / centerY) * -maxRotate; // Invert Y for correct tilt
            const rotateY = ((x - centerX) / centerX) * maxRotate;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}
