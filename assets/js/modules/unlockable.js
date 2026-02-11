export function initUnlockables() {
    let inputSequence = '';
    const secretCode = 'BLINK';

    window.addEventListener('keydown', (e) => {
        inputSequence += e.key.toUpperCase();

        if (inputSequence.includes(secretCode)) {
            triggerUnlock();
            inputSequence = ''; // Reset
        }

        // Keep buffer short
        if (inputSequence.length > 20) {
            inputSequence = inputSequence.slice(-10);
        }
    });
}

function triggerUnlock() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.5s;
    `;

    modal.innerHTML = `
        <div style="text-align:center; color: var(--accent-color); font-family: 'Syncopate', sans-serif;">
            <h1 style="font-size: 3rem; margin-bottom: 20px;">ACCESS GRANTED</h1>
            <p style="font-size: 1.2rem; margin-bottom: 30px;">YOU ARE A TRUE BLINK.</p>
            <div style="font-size: 5rem;">🖤💖</div>
            <button id="close-modal" class="btn-cyber" style="margin-top:30px;">CLOSE</button>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('close-modal').onclick = () => {
        modal.remove();
    };
}
