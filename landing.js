/**
 * PRIVACY LENS - LANDING PAGE INTERACTIONS & BACKGROUND WAVES
 */

// ============================================================================
// 1. BACKGROUND HOLOGRAPHIC WAVE & PARTICLE ANIMATION
// ============================================================================
class LandingHologramCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.waves = [];
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.time = 0;
    this.theme = localStorage.getItem('privacylens_theme') || 'night';

    this.resize();
    this.init();
    this.bindEvents();
    this.animate();
  }

  setTheme(themeName) {
    this.theme = (themeName === 'white') ? 'white' : 'night';
    if (this.theme === 'white') {
      this.waves = [
        { y: 0.65, length: 0.0025, amplitude: 55, speed: 0.014, color: 'rgba(192, 132, 252, 0.35)' },
        { y: 0.75, length: 0.0018, amplitude: 70, speed: -0.011, color: 'rgba(56, 189, 248, 0.38)' },
        { y: 0.82, length: 0.0035, amplitude: 40, speed: 0.016, color: 'rgba(167, 139, 250, 0.32)' }
      ];
    } else {
      this.waves = [
        { y: 0.65, length: 0.0025, amplitude: 55, speed: 0.014, color: 'rgba(139, 92, 246, 0.16)' },
        { y: 0.75, length: 0.0018, amplitude: 70, speed: -0.011, color: 'rgba(6, 182, 212, 0.12)' },
        { y: 0.82, length: 0.0035, amplitude: 40, speed: 0.016, color: 'rgba(236, 72, 153, 0.1)' }
      ];
    }
  }

  resize() {
    this.dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  init() {
    this.particles = [];
    const count = Math.floor((this.width * this.height) / 16000);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.8 + 0.4,
        color: ['#8b5cf6', '#06b6d4', '#ec4899', '#ffffff'][Math.floor(Math.random() * 4)],
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25 - 0.1,
        alpha: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulse: Math.random() * Math.PI
      });
    }

    if (this.theme === 'white') {
      this.waves = [
        { y: 0.65, length: 0.0025, amplitude: 55, speed: 0.014, color: 'rgba(192, 132, 252, 0.35)' },
        { y: 0.75, length: 0.0018, amplitude: 70, speed: -0.011, color: 'rgba(56, 189, 248, 0.38)' },
        { y: 0.82, length: 0.0035, amplitude: 40, speed: 0.016, color: 'rgba(167, 139, 250, 0.32)' }
      ];
    } else {
      this.waves = [
        { y: 0.65, length: 0.0025, amplitude: 55, speed: 0.014, color: 'rgba(139, 92, 246, 0.16)' },
        { y: 0.75, length: 0.0018, amplitude: 70, speed: -0.011, color: 'rgba(6, 182, 212, 0.12)' },
        { y: 0.82, length: 0.0035, amplitude: 40, speed: 0.016, color: 'rgba(236, 72, 153, 0.1)' }
      ];
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      const glow = document.getElementById('ambientGlow');
      if (glow) {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      }
    });
  }

  animate() {
    this.time += 1;
    this.ctx.clearRect(0, 0, this.width, this.height);

    const isWhite = (this.theme === 'white');
    if (isWhite) {
      const bgGrad = this.ctx.createLinearGradient(0, 0, this.width, this.height);
      bgGrad.addColorStop(0, '#f8fbff');
      bgGrad.addColorStop(0.35, '#edf5ff');
      bgGrad.addColorStop(0.70, '#f4f1ff');
      bgGrad.addColorStop(1, '#faf7ff');
      this.ctx.fillStyle = bgGrad;
      this.ctx.fillRect(0, 0, this.width, this.height);
    } else {
      // Deep Midnight Gradient Base
      const bgGrad = this.ctx.createRadialGradient(
        this.width * 0.5, this.height * 0.25, 60,
        this.width * 0.5, this.height * 0.65, this.width * 0.85
      );
      bgGrad.addColorStop(0, '#100726');
      bgGrad.addColorStop(0.5, '#0b041a');
      bgGrad.addColorStop(1, '#05020c');
      this.ctx.fillStyle = bgGrad;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }

    // Flowing Holographic Waves
    this.waves.forEach((wave) => {
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.height);
      const baseY = this.height * wave.y;

      for (let x = 0; x <= this.width; x += 8) {
        const mouseDist = (x - this.mouseX) / this.width;
        const mouseMod = Math.sin(mouseDist * 3) * 12;
        const y = baseY +
          Math.sin(x * wave.length + this.time * wave.speed) * wave.amplitude +
          Math.cos(x * 0.0012 + this.time * 0.008) * 16 +
          mouseMod;

        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }

      this.ctx.lineTo(this.width, this.height);
      this.ctx.lineTo(0, this.height);
      this.ctx.closePath();

      const waveGrad = this.ctx.createLinearGradient(0, baseY - wave.amplitude, 0, this.height);
      waveGrad.addColorStop(0, wave.color);
      waveGrad.addColorStop(1, 'rgba(5, 2, 12, 0)');
      this.ctx.fillStyle = waveGrad;
      this.ctx.fill();
    });

    // Floating Stardust Particles
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += p.pulseSpeed;

      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      const currentAlpha = p.alpha * (0.6 + Math.sin(p.pulse) * 0.4);

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = currentAlpha;
      this.ctx.shadowBlur = 6;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
      this.ctx.restore();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// ============================================================================
// 2. HERO INTERACTIVE CARD CONTROLS & THEME SWITCHER
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  const landingCanvas = new LandingHologramCanvas('bg-canvas');
  window.landingCanvas = landingCanvas;

  // Theme Switcher for Landing Page (Only Two: White & Night)
  function applyLandingTheme(theme) {
    const active = (theme === 'white') ? 'white' : 'night';
    document.documentElement.setAttribute('data-theme', active);
    localStorage.setItem('privacylens_theme', active);

    const btnWhite = document.getElementById('themeLandingWhite');
    const btnNight = document.getElementById('themeLandingNight');
    if (btnWhite && btnNight) {
      if (active === 'white') {
        btnWhite.classList.add('active');
        btnNight.classList.remove('active');
      } else {
        btnNight.classList.add('active');
        btnWhite.classList.remove('active');
      }
    }
    if (landingCanvas && typeof landingCanvas.setTheme === 'function') {
      landingCanvas.setTheme(active);
    }
  }

  const initialTheme = localStorage.getItem('privacylens_theme') || 'night';
  applyLandingTheme(initialTheme);

  const btnWhite = document.getElementById('themeLandingWhite');
  const btnNight = document.getElementById('themeLandingNight');
  if (btnWhite) {
    btnWhite.addEventListener('click', (e) => {
      e.preventDefault();
      applyLandingTheme('white');
    });
  }
  if (btnNight) {
    btnNight.addEventListener('click', (e) => {
      e.preventDefault();
      applyLandingTheme('night');
    });
  }

  // Hero Card Live Toggle
  const toggleBtn = document.getElementById('heroToggleMaskBtn');
  const heroMockup = document.getElementById('heroMockupCard');
  let isMasked = false;

  if (toggleBtn && heroMockup) {
    toggleBtn.addEventListener('click', () => {
      isMasked = !isMasked;
      heroMockup.classList.toggle('masked-state', isMasked);
      
      const phoneEl = document.getElementById('heroPhone');
      const emailEl = document.getElementById('heroEmail');
      const uidEl = document.getElementById('heroUid');
      const scoreBadge = document.getElementById('heroScoreBadge');

      if (isMasked) {
        toggleBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          Reveal Original
        `;
        if (phoneEl) phoneEl.className = 'hero-data-box masked-blur';
        if (emailEl) emailEl.className = 'hero-data-box masked-blackout';
        if (uidEl) uidEl.className = 'hero-data-box masked-blur';
        if (scoreBadge) {
          scoreBadge.textContent = '100% Protected';
          scoreBadge.className = 'status-badge status-safe';
        }
      } else {
        toggleBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          Simulate Masking
        `;
        if (phoneEl) phoneEl.className = 'hero-data-box detected-pink';
        if (emailEl) emailEl.className = 'hero-data-box detected-pink';
        if (uidEl) uidEl.className = 'hero-data-box detected-pink';
        if (scoreBadge) {
          scoreBadge.textContent = 'High Risk (3 Leaks)';
          scoreBadge.className = 'status-badge status-danger';
        }
      }
    });

    // Auto-toggle demo every 4 seconds to attract user's eye!
    setInterval(() => {
      if (document.hidden) return;
      toggleBtn.click();
    }, 4500);
  }

  // Smooth Scroll for navigation anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
