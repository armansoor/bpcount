export class GlobalMap {
    constructor(canvasId, counterId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.counterElement = document.getElementById(counterId);

        this.resize();
        this.blinks = [];
        this.blinkCount = 14203; // Starting fake number

        window.addEventListener('resize', () => this.resize());

        this.animate();
        this.addRandomBlinkLoop();
        this.updateCounterLoop();
    }

    resize() {
        this.canvas.width = this.canvas.parentElement.offsetWidth;
        this.canvas.height = 400;
        this.drawWorldMapOutline(); // In a real app, this would draw a map path
    }

    drawWorldMapOutline() {
        // Simplified "Cyber" Grid for map background
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        this.ctx.lineWidth = 1;

        const step = 40;
        for (let x = 0; x < this.canvas.width; x += step) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = 0; y < this.canvas.height; y += step) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    addRandomBlinkLoop() {
        setInterval(() => {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.blinks.push({ x, y, alpha: 1, size: 0 });
            this.blinkCount += Math.floor(Math.random() * 5);
        }, 200);
    }

    updateCounterLoop() {
         setInterval(() => {
            if (this.counterElement) {
                this.counterElement.innerText = this.blinkCount.toLocaleString();
            }
         }, 1000);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawWorldMapOutline();

        // Draw Blinks
        this.blinks.forEach((b, i) => {
            b.alpha -= 0.01;
            b.size += 0.2;

            if (b.alpha <= 0) {
                this.blinks.splice(i, 1);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
                this.ctx.strokeStyle = `rgba(255, 105, 180, ${b.alpha})`;
                this.ctx.lineWidth = 2;
                this.ctx.stroke();

                this.ctx.beginPath();
                this.ctx.arc(b.x, b.y, 1, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha})`;
                this.ctx.fill();
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}
