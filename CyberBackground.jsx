import React, { useEffect, useRef, useState } from 'react';

export const CyberBackground = ({ activeTheme }) => {
  const canvasRef = useRef(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('cybershield_bg_theme') || 'network-grid');

  useEffect(() => {
    const handleThemeChange = () => {
      const saved = localStorage.getItem('cybershield_bg_theme') || 'network-grid';
      setTheme(saved);
      
      const root = document.documentElement;
      root.classList.remove('theme-plain-white', 'theme-plain-black', 'theme-red-alert', 'theme-acid');
      
      if (saved === 'plain-white') {
        root.classList.add('theme-plain-white');
        root.classList.remove('dark');
      } else if (saved === 'plain-black') {
        root.classList.add('theme-plain-black', 'dark');
      } else {
        root.classList.add('dark');
        if (saved === 'red-alert') root.classList.add('theme-red-alert');
        if (saved === 'acid-hazard') root.classList.add('theme-acid');
      }
    };

    handleThemeChange();

    window.addEventListener('storage', handleThemeChange);
    window.addEventListener('cybershield_theme_updated', handleThemeChange);
    return () => {
      window.removeEventListener('storage', handleThemeChange);
      window.removeEventListener('cybershield_theme_updated', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    if (activeTheme) {
      setTheme(activeTheme);
      localStorage.setItem('cybershield_bg_theme', activeTheme);
      window.dispatchEvent(new Event('cybershield_theme_updated'));
    }
  }, [activeTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000, radius: 160 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particles system
    const particleCount = Math.min(65, Math.floor((width * height) / 18000));
    const particles = [];
    const getThemeColors = (t) => {
      if (t === 'red-alert') return ['#ef4444', '#f87171', '#dc2626', '#b91c1c'];
      if (t === 'acid-hazard') return ['#10b981', '#22c55e', '#84cc16', '#a3e635'];
      if (t === 'crt-terminal') return ['#f59e0b', '#fbbf24', '#d97706', '#10b981'];
      if (t === 'hex-matrix') return ['#3b82f6', '#6366f1', '#8b5cf6', '#06b6d4'];
      if (t === 'plain-white') return ['#0284c7', '#2563eb', '#059669', '#6366f1'];
      return ['#06b6d4', '#3b82f6', '#10b981', '#6366f1', '#ec4899'];
    };

    const colors = getThemeColors(theme);
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.4 + 0.2
      });
    }

    // Matrix Rain Setup
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100);
    }

    // Radar & Waves State
    let radarAngle = 0;
    const radarPings = [];
    let waveStep = 0;
    let scanLineY = 0;
    let crtScanY = 0;

    const render = () => {
      // ----------------------------------------------------
      // PLAIN BLACK THEME (Pure pitch-black OLED)
      // ----------------------------------------------------
      if (theme === 'plain-black') {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += 80) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += 80) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // ----------------------------------------------------
      // PLAIN CLEAN WHITE THEME — WITH VIVID CYBER GRID FILAMENTS
      // ----------------------------------------------------
      if (theme === 'plain-white') {
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, width, height);

        // Crisp light blue cybersecurity grid
        ctx.strokeStyle = 'rgba(2, 132, 199, 0.04)';
        ctx.lineWidth = 1;
        const gridSize = 50;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Floating subtle high-key cyber particles with mouse physics
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 2;
            p.y -= (dy / dist) * force * 2;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.35;
          ctx.fill();
          ctx.globalAlpha = 1.0;

          // Connective blue filaments
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const distNodes = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (distNodes < 110) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(2, 132, 199, ${(1 - distNodes / 110) * 0.15})`;
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }
        }

        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // ----------------------------------------------------
      // MATRIX CODE RAIN
      // ----------------------------------------------------
      if (theme === 'matrix-rain') {
        ctx.fillStyle = 'rgba(7, 11, 20, 0.12)';
        ctx.fillRect(0, 0, width, height);

        ctx.font = `${fontSize}px "Fira Code", monospace`;
        for (let i = 0; i < drops.length; i++) {
          const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          ctx.fillStyle = '#ffffff';
          ctx.fillText(char, x, y);

          ctx.fillStyle = i % 2 === 0 ? 'rgba(6, 182, 212, 0.85)' : 'rgba(16, 185, 129, 0.85)';
          ctx.fillText(char, x, y - fontSize);

          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }
      // ----------------------------------------------------
      // PULSE RADAR
      // ----------------------------------------------------
      else if (theme === 'pulse-radar') {
        ctx.clearRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;
        const maxRadius = Math.min(width, height) * 0.45;

        ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
        ctx.lineWidth = 1;
        for (let r = 50; r < maxRadius; r += 70) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.moveTo(centerX - maxRadius, centerY);
        ctx.lineTo(centerX + maxRadius, centerY);
        ctx.moveTo(centerX, centerY - maxRadius);
        ctx.lineTo(centerX, centerY + maxRadius);
        ctx.stroke();

        radarAngle += 0.02;
        const sweepGradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, maxRadius);
        sweepGradient.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
        sweepGradient.addColorStop(1, 'rgba(6, 182, 212, 0)');

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, maxRadius, radarAngle - 0.4, radarAngle);
        ctx.closePath();
        ctx.fillStyle = sweepGradient;
        ctx.fill();

        if (Math.random() > 0.96) {
          radarPings.push({
            x: centerX + (Math.random() - 0.5) * maxRadius * 1.5,
            y: centerY + (Math.random() - 0.5) * maxRadius * 1.5,
            alpha: 1.0,
            radius: 4
          });
        }

        for (let p = radarPings.length - 1; p >= 0; p--) {
          const ping = radarPings[p];
          ctx.beginPath();
          ctx.arc(ping.x, ping.y, ping.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(239, 68, 68, ${ping.alpha})`;
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
          ping.alpha -= 0.015;
          if (ping.alpha <= 0) radarPings.splice(p, 1);
        }
      }
      // ----------------------------------------------------
      // NEON CYBER WAVES
      // ----------------------------------------------------
      else if (theme === 'neon-wave') {
        ctx.clearRect(0, 0, width, height);
        waveStep += 0.02;

        const waveColors = ['rgba(6, 182, 212, 0.4)', 'rgba(59, 130, 246, 0.3)', 'rgba(168, 85, 247, 0.3)'];
        waveColors.forEach((color, index) => {
          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.strokeStyle = color;
          const offset = index * 1.5;
          const amp = 35 + index * 15;
          for (let x = 0; x < width; x += 5) {
            const y = height * 0.5 + Math.sin(x * 0.003 + waveStep + offset) * amp + Math.cos(x * 0.001 + waveStep * 0.5) * 20;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        });
      }
      // ----------------------------------------------------
      // RED ALERT / CYBER WAR ROOM
      // ----------------------------------------------------
      else if (theme === 'red-alert') {
        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(239, 68, 68, 0.04)';
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += 60) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += 60) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        scanLineY = (scanLineY + 1.2) % height;
        const scanGrad = ctx.createLinearGradient(0, scanLineY - 40, 0, scanLineY);
        scanGrad.addColorStop(0, 'rgba(239, 68, 68, 0)');
        scanGrad.addColorStop(1, 'rgba(239, 68, 68, 0.08)');
        ctx.fillStyle = scanGrad;
        ctx.fillRect(0, scanLineY - 40, width, 40);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444';
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(239, 68, 68, ${(1 - dist / 120) * 0.25})`;
              ctx.stroke();
            }
          }
        }
      }
      // ----------------------------------------------------
      // HEX MATRIX
      // ----------------------------------------------------
      else if (theme === 'hex-matrix') {
        ctx.clearRect(0, 0, width, height);

        const hexSize = 35;
        const h = hexSize * Math.sqrt(3);
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.04)';
        ctx.lineWidth = 1;

        for (let y = 0; y < height + h; y += h) {
          for (let x = 0; x < width + hexSize * 3; x += hexSize * 3) {
            ctx.beginPath();
            for (let k = 0; k < 6; k++) {
              const angle = (Math.PI / 3) * k;
              const hx = x + hexSize * Math.cos(angle);
              const hy = y + hexSize * Math.sin(angle);
              if (k === 0) ctx.moveTo(hx, hy);
              else ctx.lineTo(hx, hy);
            }
            ctx.closePath();
            ctx.stroke();
          }
        }

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#818cf8';
          ctx.shadowColor = '#6366f1';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      // ----------------------------------------------------
      // CRT TERMINAL
      // ----------------------------------------------------
      else if (theme === 'crt-terminal') {
        ctx.clearRect(0, 0, width, height);

        crtScanY = (crtScanY + 1.5) % height;
        ctx.fillStyle = 'rgba(245, 158, 11, 0.015)';
        for (let y = 0; y < height; y += 4) {
          ctx.fillRect(0, y, width, 1.5);
        }

        ctx.fillStyle = 'rgba(245, 158, 11, 0.04)';
        ctx.fillRect(0, crtScanY - 20, width, 20);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx * 0.8;
          p.y += p.vy * 0.8;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#f59e0b';
          ctx.fill();
        }
      }
      // ----------------------------------------------------
      // ACID HAZARD
      // ----------------------------------------------------
      else if (theme === 'acid-hazard') {
        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(34, 197, 94, 0.035)';
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += 55) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += 55) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#22c55e';
          ctx.shadowColor = '#22c55e';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 130) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(34, 197, 94, ${(1 - dist / 130) * 0.25})`;
              ctx.stroke();
            }
          }
        }
      }
      // ----------------------------------------------------
      // DEFAULT: NETWORK GRID (Cyber Cyan)
      // ----------------------------------------------------
      else {
        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(6, 182, 212, 0.03)';
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += 60) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += 60) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        scanLineY = (scanLineY + 0.8) % height;
        const scanGrad = ctx.createLinearGradient(0, scanLineY - 40, 0, scanLineY);
        scanGrad.addColorStop(0, 'rgba(6, 182, 212, 0)');
        scanGrad.addColorStop(1, 'rgba(6, 182, 212, 0.05)');
        ctx.fillStyle = scanGrad;
        ctx.fillRect(0, scanLineY - 40, width, 40);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 3;
            p.y -= (dy / dist) * force * 3;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.baseAlpha;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1.0;

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const distNodes = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (distNodes < 130) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - distNodes / 130) * 0.25})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
