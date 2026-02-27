import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  type: 'spark' | 'dust' | 'star';
  life: number;
  maxLife: number;
}

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = [];
    const colors = [
      'rgba(212, 175, 55,',
      'rgba(240, 192, 64,',
      'rgba(255, 140, 0,',
      'rgba(200, 160, 40,',
      'rgba(255, 215, 80,',
    ];

    const spawnParticle = (): Particle => {
      const type = Math.random() < 0.6 ? 'dust' : Math.random() < 0.7 ? 'spark' : 'star';
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(0.3 + Math.random() * 0.8),
        size: type === 'star' ? 2 + Math.random() * 3 : 1 + Math.random() * 2,
        opacity: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
        life: 0,
        maxLife: 150 + Math.random() * 200,
      };
    };

    for (let i = 0; i < 40; i++) {
      const p = spawnParticle();
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    let frameId: number;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      if (frame % 8 === 0 && particles.length < 60) {
        particles.push(spawnParticle());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx + Math.sin(p.life * 0.02) * 0.3;
        p.y += p.vy;

        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio < 0.15) {
          p.opacity = lifeRatio / 0.15;
        } else if (lifeRatio > 0.75) {
          p.opacity = 1 - (lifeRatio - 0.75) / 0.25;
        } else {
          p.opacity = 1;
        }

        if (p.life >= p.maxLife || p.y < -20) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = p.opacity * (p.type === 'dust' ? 0.5 : 0.8);

        if (p.type === 'star') {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.life * 0.03);
          ctx.fillStyle = `${p.color}${alpha})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = `${p.color}0.6)`;
          for (let j = 0; j < 4; j++) {
            ctx.beginPath();
            ctx.moveTo(0, -p.size);
            ctx.lineTo(p.size * 0.3, -p.size * 0.3);
            ctx.lineTo(p.size, 0);
            ctx.lineTo(p.size * 0.3, p.size * 0.3);
            ctx.lineTo(0, p.size);
            ctx.lineTo(-p.size * 0.3, p.size * 0.3);
            ctx.lineTo(-p.size, 0);
            ctx.lineTo(-p.size * 0.3, -p.size * 0.3);
            ctx.closePath();
            ctx.fill();
            ctx.rotate(Math.PI / 2);
          }
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${alpha})`;
          if (p.type === 'spark') {
            ctx.shadowBlur = 8;
            ctx.shadowColor = `${p.color}0.8)`;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      frameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
