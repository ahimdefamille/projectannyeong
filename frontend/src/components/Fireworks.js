import React, { useEffect, useRef } from 'react';

const Fireworks = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Particle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.radius = Math.random() * 2 + 1;
                this.velocity = {
                    x: Math.random() * 5 - 2.5,
                    y: Math.random() * 5 - 2.5
                };
                this.life = 100;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.life--;
                this.draw();
            }
        }

        let particles = [];

        function createFirework(x, y) {
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
            for (let i = 0; i < 100; i++) {
                particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas for transparency

            particles = particles.filter(particle => particle.life > 0);
            particles.forEach(particle => particle.update());

            if (Math.random() < 0.05) {
                createFirework(Math.random() * canvas.width, Math.random() * canvas.height);
            }

            requestAnimationFrame(animate);
        }

        animate();

        return () => {
            cancelAnimationFrame(animate);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0"
            style={{ background: 'transparent', pointerEvents: 'none' }} // Ensure background is transparent
        />
    );
};

export default Fireworks;
