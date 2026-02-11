export function initCyberPet() {
    const pet = document.createElement('div');
    pet.id = 'cyber-pet';
    pet.innerHTML = '❤️'; // Simple heart for now, or lightstick SVG
    pet.style.cssText = `
        position: fixed;
        pointer-events: none;
        font-size: 20px;
        z-index: 9999;
        transition: transform 0.1s ease-out;
        filter: drop-shadow(0 0 5px var(--accent-color));
        left: 0; top: 0;
    `;
    document.body.appendChild(pet);

    let mouseX = 0, mouseY = 0;
    let petX = 0, petY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animatePet() {
        // Smooth follow
        petX += (mouseX - petX) * 0.1;
        petY += (mouseY - petY) * 0.1;

        pet.style.transform = `translate(${petX + 20}px, ${petY + 20}px)`;
        requestAnimationFrame(animatePet);
    }
    animatePet();
}
