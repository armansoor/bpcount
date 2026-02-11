export function initSocialFeatures() {
    // 1. Social Sharing
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const text = encodeURIComponent("Waiting for BLACKPINK's Comeback... #DEADLINE #BLACKPINK");
            const url = encodeURIComponent(window.location.href);
            window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
        });
    }

    // 2. Simulated Comment Wall
    const comments = [
        "JISOO IS COMING", "QUEEN LISA", "ROSÉ VOICE OMG", "JENNIE RUBY JANE",
        "CAN'T WAIT!!!", "BLINKS ASSEMBLE", "THE WORLD IS PINK", "YG FINALLY",
        "COUNTDOWN HYPE", "SEOUL IS READY", "NYC BLINKS HERE", "LA BLINKS PRESENT"
    ];

    const commentList = document.getElementById('comment-list');
    if (commentList) {
        // Create random comment string
        let html = '';
        // Duplicate list for seamless scrolling
        [...comments, ...comments, ...comments].forEach(c => {
            const user = "BLINK_" + Math.floor(Math.random() * 9000 + 1000);
            html += `
                <div class="comment-item">
                    <span class="comment-user">[${user}]</span>
                    <span class="comment-text">${c}</span>
                </div>
            `;
        });
        commentList.innerHTML = html;
    }
}
