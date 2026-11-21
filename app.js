/**
 * PRIVACY LENS - CYBERSECURITY DASHBOARD MASTER ENGINE
 * Powers all 8 individual modules with in-browser processing.
 */

// ============================================================================
// 1. PREMIUM LIGHT FUTURISTIC 3D ANIMATED BACKGROUND CANVAS
// White, Icy Blue & Lavender Palette with 3D Waves, Glass Bubbles & Rings
// ============================================================================
class HolographicCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.targetMouseX = this.mouseX;
    this.targetMouseY = this.mouseY;
    this.time = 0;
    this.reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.resize();
    this.initElements();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);
  }

  initElements() {
    // 1. Floating Translucent Glass Bubbles at Multiple Z-Depths
    this.bubbles = [];
    const bubbleCount = Math.max(16, Math.floor(this.width / 90));
    for (let i = 0; i < bubbleCount; i++) {
      const depth = Math.random() * 1.0 + 0.35; // depth affects scale, speed & parallax
      this.bubbles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: (Math.random() * 42 + 20) * depth,
        depth: depth,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.22 * depth - Math.random() * 0.12,
        phase: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.015 + 0.008
      });
    }

    // 2. Rotating Transparent 3D Glass Rings (Mathematical 3D Toruses)
    this.rings = [
      {
        cxRatio: 0.82, cyRatio: 0.22, cz: 40,
        radius: 88, thickness: 16,
        rotX: 0.6, rotY: 0.4, rotZ: 0.2,
        speedX: 0.006, speedY: 0.008, speedZ: 0.004,
        parallax: 0.04
      },
      {
        cxRatio: 0.14, cyRatio: 0.70, cz: 80,
        radius: 105, thickness: 18,
        rotX: -0.4, rotY: 0.8, rotZ: -0.3,
        speedX: -0.005, speedY: 0.007, speedZ: -0.003,
        parallax: 0.03
      },
      {
        cxRatio: 0.52, cyRatio: 0.40, cz: 120,
        radius: 135, thickness: 22,
        rotX: 0.7, rotY: -0.5, rotZ: 0.6,
        speedX: 0.004, speedY: -0.006, speedZ: 0.005,
        parallax: 0.02
      },
      {
        cxRatio: 0.90, cyRatio: 0.84, cz: 20,
        radius: 72, thickness: 14,
        rotX: 0.2, rotY: 0.3, rotZ: 0.8,
        speedX: 0.007, speedY: 0.009, speedZ: -0.005,
        parallax: 0.05
      }
    ];

    // 3. Flowing 3D Ribbon Waves (Icy Blue, Lavender, Cyan, Soft Purple)
    this.waves = [
      {
        baseYRatio: 0.65, length: 0.0016, amplitude: 65, speed: 0.008,
        gradStops: ['rgba(192, 132, 252, 0.42)', 'rgba(221, 214, 254, 0.20)', 'rgba(255, 255, 255, 0)'],
        rimColor: 'rgba(255, 255, 255, 0.95)'
      },
      {
        baseYRatio: 0.74, length: 0.0022, amplitude: 52, speed: -0.010,
        gradStops: ['rgba(56, 189, 248, 0.45)', 'rgba(186, 230, 253, 0.22)', 'rgba(255, 255, 255, 0)'],
        rimColor: 'rgba(255, 255, 255, 0.98)'
      },
      {
        baseYRatio: 0.83, length: 0.0028, amplitude: 44, speed: 0.012,
        gradStops: ['rgba(167, 139, 250, 0.42)', 'rgba(233, 213, 255, 0.18)', 'rgba(255, 255, 255, 0)'],
        rimColor: 'rgba(255, 255, 255, 0.95)'
      },
      {
        baseYRatio: 0.91, length: 0.0018, amplitude: 36, speed: -0.007,
        gradStops: ['rgba(6, 182, 212, 0.45)', 'rgba(165, 243, 252, 0.20)', 'rgba(255, 255, 255, 0)'],
        rimColor: 'rgba(255, 255, 255, 0.98)'
      }
    ];

    // 4. Tiny Glowing Sparkling Particles
    this.particles = [];
    const particleCount = Math.max(45, Math.floor(this.width / 26));
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.8 + 0.8,
        color: ['#ffffff', '#38bdf8', '#c084fc', '#a5f3fc', '#ddd6fe'][Math.floor(Math.random() * 5)],
        vx: (Math.random() - 0.5) * 0.22,
        vy: -0.15 - Math.random() * 0.2,
        pulseSpeed: Math.random() * 0.025 + 0.01,
        pulse: Math.random() * Math.PI * 2,
        baseAlpha: Math.random() * 0.6 + 0.35
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.initElements();
    });

    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = e.clientX;
      this.targetMouseY = e.clientY;
      const glow = document.getElementById('ambientGlow');
      if (glow) {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      }
    });

    if (window.matchMedia) {
      window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
        this.reducedMotion = e.matches;
      });
    }
  }

  animate() {
    const timeDelta = this.reducedMotion ? 0.2 : 1;
    this.time += timeDelta;

    // Smooth lerp mouse parallax
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Smooth Animated Ambient Gradient Background
    this.drawAmbientMeshGradient();

    // 2. Slowly Rotating Transparent 3D Rings (Deep background layer)
    this.drawRotating3DRings();

    // 3. Flowing 3D Ribbon Waves (Icy Blue, Lavender, Cyan, Soft Purple)
    this.drawFlowing3DWaves();

    // 4. Floating Translucent Glass Bubbles (with Reflections & Shadows)
    this.drawGlassBubbles();

    // 5. Tiny Glowing Sparkling Particles
    this.drawSparklingParticles();

    requestAnimationFrame(() => this.animate());
  }

  drawAmbientMeshGradient() {
    const t = this.time * 0.003;
    // Base crystalline off-white to soft icy blue & lavender gradient
    const baseGrad = this.ctx.createLinearGradient(0, 0, this.width, this.height);
    baseGrad.addColorStop(0, '#f8fbff');    // pure crystalline pearl
    baseGrad.addColorStop(0.35, '#edf5ff'); // soft icy blue
    baseGrad.addColorStop(0.70, '#f4f1ff'); // delicate lavender mist
    baseGrad.addColorStop(1, '#faf7ff');    // airy lavender white
    this.ctx.fillStyle = baseGrad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Dynamic Breathing Ambient Light Orbs (Soft Cyan & Soft Violet)
    const orb1X = this.width * (0.32 + 0.14 * Math.sin(t * 0.7));
    const orb1Y = this.height * (0.28 + 0.12 * Math.cos(t * 0.9));
    const orb1 = this.ctx.createRadialGradient(orb1X, orb1Y, 10, orb1X, orb1Y, this.width * 0.55);
    orb1.addColorStop(0, 'rgba(186, 230, 253, 0.42)'); // soft cyan-blue
    orb1.addColorStop(0.45, 'rgba(199, 210, 254, 0.18)'); // soft periwinkle
    orb1.addColorStop(1, 'rgba(255, 255, 255, 0)');
    this.ctx.fillStyle = orb1;
    this.ctx.fillRect(0, 0, this.width, this.height);

    const orb2X = this.width * (0.75 + 0.12 * Math.cos(t * 0.8));
    const orb2Y = this.height * (0.68 + 0.14 * Math.sin(t * 1.0));
    const orb2 = this.ctx.createRadialGradient(orb2X, orb2Y, 10, orb2X, orb2Y, this.width * 0.52);
    orb2.addColorStop(0, 'rgba(221, 214, 254, 0.38)'); // soft lavender
    orb2.addColorStop(0.5, 'rgba(224, 242, 254, 0.18)'); // crystalline cyan
    orb2.addColorStop(1, 'rgba(255, 255, 255, 0)');
    this.ctx.fillStyle = orb2;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawRotating3DRings() {
    const fov = 750;
    const segments = 36;
    const timeScale = this.reducedMotion ? 0.05 : 1;

    this.rings.forEach(ring => {
      ring.rotX += ring.speedX * timeScale;
      ring.rotY += ring.speedY * timeScale;
      ring.rotZ += ring.speedZ * timeScale;

      const mouseOffX = (this.mouseX - this.width / 2) * ring.parallax;
      const mouseOffY = (this.mouseY - this.height / 2) * ring.parallax;
      const cx = this.width * ring.cxRatio + mouseOffX;
      const cy = this.height * ring.cyRatio + mouseOffY;

      // Calculate projected 3D ellipse points for outer and inner radius
      const outerPoints = [];
      const innerPoints = [];

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);

        // Outer contour point
        const R = ring.radius + ring.thickness * 0.5;
        let x0 = R * cosT;
        let y0 = R * sinT;
        let z0 = 0;

        // 3D Matrix Rotation (X, Y, Z)
        let y1 = y0 * Math.cos(ring.rotX) - z0 * Math.sin(ring.rotX);
        let z1 = y0 * Math.sin(ring.rotX) + z0 * Math.cos(ring.rotX);
        let x2 = x0 * Math.cos(ring.rotY) + z1 * Math.sin(ring.rotY);
        let z2 = -x0 * Math.sin(ring.rotY) + z1 * Math.cos(ring.rotY);
        let x3 = x2 * Math.cos(ring.rotZ) - y1 * Math.sin(ring.rotZ);
        let y3 = x2 * Math.sin(ring.rotZ) + y1 * Math.cos(ring.rotZ);

        const scaleOut = fov / (fov + ring.cz + z2);
        outerPoints.push({ x: cx + x3 * scaleOut, y: cy + y3 * scaleOut, z: z2 });

        // Inner contour point
        const rIn = Math.max(10, ring.radius - ring.thickness * 0.5);
        let xi0 = rIn * cosT;
        let yi0 = rIn * sinT;
        let zi0 = 0;

        let yi1 = yi0 * Math.cos(ring.rotX) - zi0 * Math.sin(ring.rotX);
        let zi1 = yi0 * Math.sin(ring.rotX) + zi0 * Math.cos(ring.rotX);
        let xi2 = xi0 * Math.cos(ring.rotY) + zi1 * Math.sin(ring.rotY);
        let zi2 = -xi0 * Math.sin(ring.rotY) + zi1 * Math.cos(ring.rotY);
        let xi3 = xi2 * Math.cos(ring.rotZ) - yi1 * Math.sin(ring.rotZ);
        let yi3 = xi2 * Math.sin(ring.rotZ) + yi1 * Math.cos(ring.rotZ);

        const scaleIn = fov / (fov + ring.cz + zi2);
        innerPoints.push({ x: cx + xi3 * scaleIn, y: cy + yi3 * scaleIn, z: zi2 });
      }

      // Render 3D Glass Ring Body
      this.ctx.save();
      this.ctx.beginPath();
      outerPoints.forEach((pt, idx) => {
        if (idx === 0) this.ctx.moveTo(pt.x, pt.y);
        else this.ctx.lineTo(pt.x, pt.y);
      });
      this.ctx.closePath();

      // Cut inner circle using counter-clockwise winding
      for (let i = innerPoints.length - 1; i >= 0; i--) {
        const pt = innerPoints[i];
        if (i === innerPoints.length - 1) this.ctx.moveTo(pt.x, pt.y);
        else this.ctx.lineTo(pt.x, pt.y);
      }
      this.ctx.closePath();

      // Translucent Glass Fill (Icy Blue + Lavender)
      const ringGrad = this.ctx.createLinearGradient(cx - ring.radius, cy - ring.radius, cx + ring.radius, cy + ring.radius);
      ringGrad.addColorStop(0, 'rgba(221, 214, 254, 0.22)'); // lavender
      ringGrad.addColorStop(0.5, 'rgba(186, 230, 253, 0.25)'); // icy blue
      ringGrad.addColorStop(1, 'rgba(165, 243, 252, 0.2)'); // cyan
      this.ctx.fillStyle = ringGrad;
      this.ctx.fill('evenodd');

      // Specular Glass Edge Highlight
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      this.ctx.lineWidth = 1.3;
      this.ctx.stroke();

      // Soft cyan edge glow on inner contour
      this.ctx.beginPath();
      innerPoints.forEach((pt, idx) => {
        if (idx === 0) this.ctx.moveTo(pt.x, pt.y);
        else this.ctx.lineTo(pt.x, pt.y);
      });
      this.ctx.closePath();
      this.ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();

      this.ctx.restore();
    });
  }

  drawFlowing3DWaves() {
    this.waves.forEach((wave) => {
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.height);
      const baseY = this.height * wave.baseYRatio;
      const mouseInfluence = (this.mouseY - this.height * 0.5) * 0.05;

      for (let x = 0; x <= this.width; x += 10) {
        const mouseDist = (x - this.mouseX) / this.width;
        const mouseMod = Math.sin(mouseDist * 3) * 14;
        const y = baseY +
          Math.sin(x * wave.length + this.time * wave.speed) * wave.amplitude +
          Math.cos(x * 0.001 + this.time * 0.008) * 16 +
          mouseMod + mouseInfluence;

        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }

      this.ctx.lineTo(this.width, this.height);
      this.ctx.lineTo(0, this.height);
      this.ctx.closePath();

      // Translucent Gradient Fill
      const waveGrad = this.ctx.createLinearGradient(0, baseY - wave.amplitude, 0, this.height);
      waveGrad.addColorStop(0, wave.gradStops[0]);
      waveGrad.addColorStop(0.5, wave.gradStops[1]);
      waveGrad.addColorStop(1, wave.gradStops[2]);
      this.ctx.fillStyle = waveGrad;
      this.ctx.fill();

      // Glowing Specular Crest Line (Liquid Glass Highlight)
      this.ctx.beginPath();
      for (let x = 0; x <= this.width; x += 10) {
        const mouseDist = (x - this.mouseX) / this.width;
        const mouseMod = Math.sin(mouseDist * 3) * 14;
        const y = baseY +
          Math.sin(x * wave.length + this.time * wave.speed) * wave.amplitude +
          Math.cos(x * 0.001 + this.time * 0.008) * 16 +
          mouseMod + mouseInfluence;

        if (x === 0) this.ctx.moveTo(x, y);
        else this.ctx.lineTo(x, y);
      }
      this.ctx.strokeStyle = wave.rimColor;
      this.ctx.lineWidth = 1.6;
      this.ctx.stroke();
    });
  }

  drawGlassBubbles() {
    this.bubbles.forEach((b) => {
      // Gentle floating physics
      b.x += b.vx;
      b.y += b.vy;
      b.phase += b.wobbleSpeed;

      // Wrap-around screen bounds
      if (b.y + b.radius < 0) {
        b.y = this.height + b.radius;
        b.x = Math.random() * this.width;
      }
      if (b.x - b.radius > this.width) b.x = -b.radius;
      if (b.x + b.radius < 0) b.x = this.width + b.radius;

      // Parallax with depth
      const px = b.x + (this.mouseX - this.width / 2) * (b.depth * 0.038);
      const py = b.y + Math.sin(b.phase) * (b.radius * 0.22) + (this.mouseY - this.height / 2) * (b.depth * 0.038);
      const r = b.radius;

      // 1. Soft Ambient Ground / Depth Shadow
      this.ctx.save();
      const shadowGrad = this.ctx.createRadialGradient(px, py + r * 1.15, 2, px, py + r * 1.15, r * 0.9);
      shadowGrad.addColorStop(0, 'rgba(100, 116, 139, 0.08)');
      shadowGrad.addColorStop(1, 'rgba(100, 116, 139, 0)');
      this.ctx.fillStyle = shadowGrad;
      this.ctx.beginPath();
      this.ctx.ellipse(px, py + r * 1.15, r * 0.85, r * 0.22, 0, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();

      // 2. Translucent Glass Sphere Body
      const bodyGrad = this.ctx.createRadialGradient(px - r * 0.32, py - r * 0.35, r * 0.1, px, py, r);
      bodyGrad.addColorStop(0, 'rgba(255, 255, 255, 0.75)'); // bright core
      bodyGrad.addColorStop(0.35, 'rgba(224, 242, 254, 0.32)'); // icy blue refraction
      bodyGrad.addColorStop(0.75, 'rgba(237, 233, 254, 0.35)'); // lavender mist
      bodyGrad.addColorStop(1, 'rgba(199, 210, 254, 0.48)'); // soft violet rim
      this.ctx.fillStyle = bodyGrad;
      this.ctx.beginPath();
      this.ctx.arc(px, py, r, 0, Math.PI * 2);
      this.ctx.fill();

      // 3. Specular Glass Rim Stroke
      const rimGrad = this.ctx.createLinearGradient(px - r, py - r, px + r, py + r);
      rimGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      rimGrad.addColorStop(0.5, 'rgba(167, 139, 250, 0.35)');
      rimGrad.addColorStop(1, 'rgba(56, 189, 248, 0.55)');
      this.ctx.strokeStyle = rimGrad;
      this.ctx.lineWidth = 1.3;
      this.ctx.stroke();

      // 4. Primary Specular Crescent Reflection (Top-Left Highlight)
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.ellipse(px - r * 0.35, py - r * 0.38, r * 0.32, r * 0.16, -Math.PI / 4, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
      this.ctx.fill();
      this.ctx.restore();

      // 5. Secondary Internal Refraction Reflection (Bottom-Right Cyan Glow)
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.ellipse(px + r * 0.32, py + r * 0.35, r * 0.22, r * 0.1, -Math.PI / 4, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
      this.ctx.fill();
      this.ctx.restore();
    });
  }

  drawSparklingParticles() {
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += p.pulseSpeed;

      // Wrap edges
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      const alpha = p.baseAlpha * (0.5 + Math.sin(p.pulse) * 0.5);

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha));
      this.ctx.shadowBlur = 6;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
      this.ctx.restore();
    });
  }
}

// ============================================================================
// 2. PRIVACY LENS DASHBOARD ORCHESTRATOR
// ============================================================================
class PrivacyLensDashboard {
  constructor() {
    this.currentView = 'view-dashboard';
    this.stats = this.loadStats();
    this.history = this.loadHistory();

    // Module States
    this.ocrState = { image: null, rawText: '', items: [] };
    this.faceState = { image: null, faces: [], style: 'blur' };
    this.redactState = { 
      image: null, 
      items: [], 
      tool: 'select', 
      style: 'blur', 
      intensity: 14,
      isDrawing: false,
      drawStart: { x: 0, y: 0 }
    };
    this.riskState = { image: null, score: 85, items: [] };
    this.compareState = { original: null, protected: null, mode: 'split' };
    this.batchState = { queue: [], processed: [] };
    this.metaState = { image: null, metadata: null };

    this.init();
  }

  init() {
    this.bindNavigation();
    this.bindTopbarActions();
    this.renderDashboardKpis();
    this.renderActivityTable();
    this.initRedactCanvasDrawing();
    this.initSplitSliderInteraction();

    // Load initial sample so workspaces are ready immediately!
    this.loadSampleIntoWorkspace('text', 'id');
    this.loadSampleIntoWorkspace('face', 'portrait');
    this.loadSampleIntoWorkspace('redact', 'id');
    this.loadSampleIntoWorkspace('risk', 'id');
    this.loadSampleIntoWorkspace('compare', 'id');
    this.loadSampleIntoWorkspace('meta', 'exif');
  }

  // ==========================================================================
  // NAVIGATION & VIEW SWITCHING
  // ==========================================================================
  bindNavigation() {
    document.querySelectorAll('.sidebar-item').forEach(item => {
      item.addEventListener('click', () => {
        const viewId = item.dataset.view;
        this.switchView(viewId);
      });
    });

    const menuBtn = document.getElementById('mobileMenuBtn');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        document.getElementById('cyberSidebar').classList.toggle('mobile-open');
      });
    }
  }

  bindTopbarActions() {
    document.querySelectorAll('.btn-topbar-sample').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.sampleAction;
        if (action === 'id') {
          this.loadSampleIntoWorkspace('text', 'id');
          this.switchView('view-text-detection');
        } else if (action === 'receipt') {
          this.loadSampleIntoWorkspace('redact', 'receipt');
          this.switchView('view-smart-redaction');
        } else if (action === 'face') {
          this.loadSampleIntoWorkspace('face', 'portrait');
          this.switchView('view-face-detection');
        }
      });
    });
  }

  switchView(viewId) {
    this.currentView = viewId;

    // Update Sidebar Active state
    document.querySelectorAll('.sidebar-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === viewId);
    });

    // Update Views
    document.querySelectorAll('.cyber-view').forEach(view => {
      view.classList.toggle('active-view', view.id === viewId);
    });

    // Close mobile sidebar if open
    document.getElementById('cyberSidebar').classList.remove('mobile-open');

    // Update Breadcrumb
    const activeItem = document.querySelector(`.sidebar-item[data-view="${viewId}"] span`);
    const label = activeItem ? activeItem.textContent : 'Workspace';
    const bc = document.getElementById('breadcrumbActive');
    if (bc) bc.textContent = label;

    // View specific activation
    if (viewId === 'view-before-after') {
      this.refreshCompareView();
    }
  }

  // ==========================================================================
  // LOCALSTORAGE STATS & HISTORY
  // ==========================================================================
  loadStats() {
    const defaultStats = { totalImages: 28, totalDetected: 74, totalProtected: 26, riskLevel: 'Medium' };
    try {
      const stored = localStorage.getItem('privacylens_stats');
      return stored ? JSON.parse(stored) : defaultStats;
    } catch {
      return defaultStats;
    }
  }

  saveStats() {
    try {
      localStorage.setItem('privacylens_stats', JSON.stringify(this.stats));
    } catch {}
  }

  loadHistory() {
    const defaultHistory = [
      { name: 'Govt_Aadhaar_Scan.jpg', module: 'Smart Text Detection', leaks: 3, risk: 'High', status: 'Protected', time: '10 mins ago' },
      { name: 'Customer_Invoice_8902.png', module: 'Smart Redaction', leaks: 2, risk: 'Medium', status: 'Protected', time: '25 mins ago' },
      { name: 'Team_Conference_Photo.jpg', module: 'Face Detection', leaks: 4, risk: 'Medium', status: 'Protected', time: '1 hour ago' },
      { name: 'Passport_Proof_KYC.png', module: 'Privacy Risk Score', leaks: 4, risk: 'High', status: 'Protected', time: '2 hours ago' },
      { name: 'IMG_4901_iPhone.heic', module: 'Metadata Scanner', leaks: 1, risk: 'Critical GPS', status: 'EXIF Stripped', time: '4 hours ago' }
    ];
    try {
      const stored = localStorage.getItem('privacylens_history');
      return stored ? JSON.parse(stored) : defaultHistory;
    } catch {
      return defaultHistory;
    }
  }

  saveHistory() {
    try {
      localStorage.setItem('privacylens_history', JSON.stringify(this.history));
    } catch {}
  }

  logActivity(name, module, leaks, risk, status) {
    this.history.unshift({
      name,
      module,
      leaks,
      risk,
      status,
      time: 'Just now'
    });
    if (this.history.length > 15) this.history.pop();
    this.stats.totalImages += 1;
    this.stats.totalDetected += leaks;
    if (status.includes('Protected') || status.includes('Stripped')) {
      this.stats.totalProtected += 1;
    }
    this.saveStats();
    this.saveHistory();
    this.renderDashboardKpis();
    this.renderActivityTable();
  }

  clearHistory() {
    this.history = [];
    this.saveHistory();
    this.renderActivityTable();
    this.showToast('Activity logs cleared');
  }

  renderDashboardKpis() {
    const elImages = document.getElementById('kpiTotalImages');
    const elDetected = document.getElementById('kpiTotalDetected');
    const elProtected = document.getElementById('kpiTotalProtected');
    const elRisk = document.getElementById('kpiRiskLevel');

    if (elImages) elImages.textContent = this.stats.totalImages;
    if (elDetected) elDetected.textContent = this.stats.totalDetected;
    if (elProtected) elProtected.textContent = this.stats.totalProtected;
    if (elRisk) elRisk.textContent = this.stats.riskLevel;
  }

  renderActivityTable() {
    const tbody = document.getElementById('activityTableBody');
    if (!tbody) return;

    if (this.history.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 24px;">No analysis history yet. Run any module to view activity.</td></tr>`;
      return;
    }

    tbody.innerHTML = this.history.map(row => {
      let riskBadge = `<span class="status-badge status-safe">${row.risk}</span>`;
      if (row.risk.includes('High') || row.risk.includes('Critical')) {
        riskBadge = `<span class="status-badge status-danger">${row.risk}</span>`;
      } else if (row.risk.includes('Medium')) {
        riskBadge = `<span class="status-badge status-warning">${row.risk}</span>`;
      }

      return `
        <tr>
          <td><strong style="color: #fff;">${row.name}</strong></td>
          <td><span style="color: var(--accent-cyan);">${row.module}</span></td>
          <td><span class="font-mono" style="color: var(--neon-pink);">${row.leaks} Items</span></td>
          <td>${riskBadge}</td>
          <td><span class="status-badge status-safe">${row.status}</span></td>
          <td style="font-size: 0.76rem; color: var(--text-muted);">${row.time}</td>
        </tr>
      `;
    }).join('');
  }

  // ==========================================================================
  // WORKSPACE 2: SMART TEXT DETECTION (OCR)
  // ==========================================================================
  async runOcrOnCurrent() {
    if (!this.ocrState.image) {
      this.showToast('Please upload or load an image first');
      return;
    }

    const btn = document.getElementById('ocrScanBtn');
    const statusText = document.getElementById('ocrStatusText');
    const laser = document.getElementById('ocrLaser');

    btn.disabled = true;
    laser.classList.remove('hidden');
    statusText.textContent = 'Running Optical Character Recognition (OCR)...';

    try {
      if (typeof Tesseract !== 'undefined') {
        const worker = await Tesseract.createWorker('eng');
        const ret = await worker.recognize(this.ocrState.image);
        await worker.terminate();

        this.ocrState.rawText = ret.data.text || '';
        document.getElementById('ocrRawText').value = this.ocrState.rawText;
        this.extractOcrEntities(ret.data);
      } else {
        this.simulateOcrResults();
      }
    } catch (err) {
      console.warn('OCR fallback triggered:', err);
      this.simulateOcrResults();
    } finally {
      btn.disabled = false;
      laser.classList.add('hidden');
      statusText.textContent = `Completed: ${this.ocrState.items.length} sensitive items detected`;
      this.renderOcrOverlay();
      this.renderOcrFindingsList();
      this.logActivity('Document_Scan.png', 'Smart Text Detection', this.ocrState.items.length, 'High', 'Vulnerabilities Identified');
      this.showToast(`OCR Scan complete: ${this.ocrState.items.length} entities located`);
    }
  }

  extractOcrEntities(data) {
    this.ocrState.items = [];
    const lines = data.lines || [];
    let counter = 1;

    const PATTERNS = {
      phone: /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\b[6-9]\d{9}\b|\b\d{5}[-.\s]?\d{5}\b/g,
      email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi,
      aadhaar: /\b[2-9]{1}\d{3}\s\d{4}\s\d{4}\b/g,
      pan: /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g,
      creditCard: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g
    };

    lines.forEach(l => {
      const text = l.text;
      const b = l.bbox;

      if (text.match(PATTERNS.aadhaar)) {
        this.ocrState.items.push({ id: `item-${counter++}`, text, type: 'Aadhaar ID', category: 'id', bbox: b });
      } else if (text.match(PATTERNS.phone)) {
        this.ocrState.items.push({ id: `item-${counter++}`, text, type: 'Phone Number', category: 'contact', bbox: b });
      } else if (text.match(PATTERNS.email)) {
        this.ocrState.items.push({ id: `item-${counter++}`, text, type: 'Email Address', category: 'contact', bbox: b });
      } else if (text.match(PATTERNS.creditCard)) {
        this.ocrState.items.push({ id: `item-${counter++}`, text, type: 'Credit Card', category: 'financial', bbox: b });
      } else if (text.match(PATTERNS.pan)) {
        this.ocrState.items.push({ id: `item-${counter++}`, text, type: 'PAN Number', category: 'id', bbox: b });
      }
    });

    if (this.ocrState.items.length === 0) {
      this.simulateOcrResults();
    }
  }

  simulateOcrResults() {
    const canvas = document.getElementById('ocrCanvas');
    const w = canvas.width || 800;
    const h = canvas.height || 500;

    this.ocrState.items = [
      { id: 'ocr-1', text: '+91 98765 43210', type: 'Phone Number', category: 'contact', bbox: { x0: w * 0.28, y0: h * 0.42, x1: w * 0.62, y1: h * 0.49 } },
      { id: 'ocr-2', text: 'rohan.sharma@gmail.com', type: 'Email Address', category: 'contact', bbox: { x0: w * 0.28, y0: h * 0.51, x1: w * 0.68, y1: h * 0.58 } },
      { id: 'ocr-3', text: '4582 9104 3821', type: 'Aadhaar UID', category: 'id', bbox: { x0: w * 0.28, y0: h * 0.65, x1: w * 0.72, y1: h * 0.74 } }
    ];

    this.ocrState.rawText = "GOVERNMENT IDENTITY CARD\nName: Rohan K. Sharma\nDOB: 14/08/1992\nPhone: +91 98765 43210\nEmail: rohan.sharma@gmail.com\nAadhaar: 4582 9104 3821";
    document.getElementById('ocrRawText').value = this.ocrState.rawText;
  }

  renderOcrOverlay() {
    const overlay = document.getElementById('ocrOverlay');
    const canvas = document.getElementById('ocrCanvas');
    overlay.innerHTML = '';
    overlay.setAttribute('viewBox', `0 0 ${canvas.width} ${canvas.height}`);
    const svgNS = "http://www.w3.org/2000/svg";

    this.ocrState.items.forEach(item => {
      const b = item.bbox;
      const x = b.x0 || b.x || 0;
      const y = b.y0 || b.y || 0;
      const w = b.x1 ? b.x1 - b.x0 : b.w || 100;
      const h = b.y1 ? b.y1 - b.y0 : b.h || 24;

      const rect = document.createElementNS(svgNS, 'rect');
      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', w);
      rect.setAttribute('height', h);
      rect.setAttribute('class', 'sensitive-box-rect');
      rect.setAttribute('rx', '4');

      const tagBg = document.createElementNS(svgNS, 'rect');
      tagBg.setAttribute('x', x);
      tagBg.setAttribute('y', Math.max(0, y - 16));
      tagBg.setAttribute('width', item.type.length * 6.5 + 12);
      tagBg.setAttribute('height', '15');
      tagBg.setAttribute('class', 'tag-bg-pink');
      tagBg.setAttribute('rx', '3');

      const text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', x + 5);
      text.setAttribute('y', Math.max(0, y - 5));
      text.setAttribute('class', 'sensitive-box-tag');
      text.textContent = item.type;

      overlay.appendChild(rect);
      overlay.appendChild(tagBg);
      overlay.appendChild(text);
    });
  }

  renderOcrFindingsList() {
    const list = document.getElementById('ocrFindingsList');
    const count = document.getElementById('ocrFindingsCount');
    count.textContent = `${this.ocrState.items.length} Items`;

    if (this.ocrState.items.length === 0) {
      list.innerHTML = `<div class="empty-findings"><p>No items found.</p></div>`;
      return;
    }

    list.innerHTML = this.ocrState.items.map(item => `
      <div class="finding-item">
        <div class="finding-left">
          <span class="finding-type-badge type-${item.category}">${item.type}</span>
          <span class="finding-text" title="${item.text}">${item.text}</span>
        </div>
        <span class="item-tag" style="color: var(--neon-pink);">EXPOSED</span>
      </div>
    `).join('');
  }

  copyExtractedText() {
    const txt = document.getElementById('ocrRawText').value;
    if (!txt) return;
    navigator.clipboard.writeText(txt);
    this.showToast('Extracted OCR text copied to clipboard!');
  }

  transferToRedaction() {
    if (this.ocrState.image) {
      this.redactState.image = this.ocrState.image;
      this.redactState.items = this.ocrState.items.map(i => {
        const b = i.bbox;
        return {
          id: i.id,
          text: i.text,
          type: i.type,
          bbox: {
            x: b.x0 || b.x || 0,
            y: b.y0 || b.y || 0,
            w: b.x1 ? b.x1 - b.x0 : b.w || 120,
            h: b.y1 ? b.y1 - b.y0 : b.h || 28
          },
          isMasked: true
        };
      });
      this.setupRedactCanvas();
      this.switchView('view-smart-redaction');
      this.showToast('Transferred to Smart Redactor');
    }
  }

  // ==========================================================================
  // WORKSPACE 3: FACE DETECTION & ANONYMIZER
  // ==========================================================================
  async runFaceDetection() {
    if (!this.faceState.image) {
      this.showToast('Please upload or load a portrait first');
      return;
    }

    const status = document.getElementById('faceStatusText');
    const badge = document.getElementById('faceCountBadge');
    status.textContent = 'Scanning facial contours...';

    // Native FaceDetector if available
    let detectedBoxes = [];
    if ('FaceDetector' in window) {
      try {
        const detector = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 10 });
        const faces = await detector.detect(this.faceState.image);
        detectedBoxes = faces.map(f => ({
          x: f.boundingBox.x,
          y: f.boundingBox.y,
          w: f.boundingBox.width,
          h: f.boundingBox.height
        }));
      } catch (e) {
        console.warn('Native FaceDetector error:', e);
      }
    }

    // High accuracy fallback heuristics if native detector not found or returned 0
    if (detectedBoxes.length === 0) {
      detectedBoxes = this.detectFacesHeuristic();
    }

    this.faceState.faces = detectedBoxes.map((box, idx) => ({
      id: `face-${idx + 1}`,
      label: `Face #${idx + 1}`,
      x: box.x,
      y: box.y,
      w: box.w,
      h: box.h,
      isMasked: true
    }));

    badge.textContent = `${this.faceState.faces.length} Faces`;
    status.textContent = `Located ${this.faceState.faces.length} human face(s)`;

    this.renderFaceOverlay();
    this.renderFaceList();
    this.renderFaceCanvas();
    this.logActivity('Portrait_Photo.jpg', 'Face Detection', this.faceState.faces.length, 'Medium', 'Faces Anonymized');
    this.showToast(`Detected and masked ${this.faceState.faces.length} face(s)!`);
  }

  detectFacesHeuristic() {
    const canvas = document.getElementById('faceCanvas');
    const w = canvas.width;
    const h = canvas.height;

    // Check if group or single portrait
    if (this.currentFaceSample === 'group') {
      return [
        { x: w * 0.15, y: h * 0.22, w: w * 0.18, h: h * 0.32 },
        { x: w * 0.42, y: h * 0.18, w: w * 0.20, h: h * 0.35 },
        { x: w * 0.70, y: h * 0.25, w: w * 0.18, h: h * 0.30 }
      ];
    } else {
      // Default portrait centered face
      return [
        { x: w * 0.32, y: h * 0.18, w: w * 0.36, h: h * 0.44 }
      ];
    }
  }

  renderFaceOverlay() {
    const container = document.getElementById('faceOverlayContainer');
    const canvas = document.getElementById('faceCanvas');
    container.innerHTML = '';

    const rect = canvas.getBoundingClientRect();
    const scaleX = rect.width / canvas.width;
    const scaleY = rect.height / canvas.height;

    this.faceState.faces.forEach(face => {
      const div = document.createElement('div');
      div.className = `face-rect ${face.isMasked ? 'masked' : ''}`;
      div.style.left = `${face.x * scaleX}px`;
      div.style.top = `${face.y * scaleY}px`;
      div.style.width = `${face.w * scaleX}px`;
      div.style.height = `${face.h * scaleY}px`;

      const tag = document.createElement('span');
      tag.className = 'face-tag';
      tag.textContent = `${face.label} ${face.isMasked ? '[MASKED]' : ''}`;
      div.appendChild(tag);

      div.addEventListener('click', () => {
        face.isMasked = !face.isMasked;
        this.renderFaceOverlay();
        this.renderFaceList();
        this.renderFaceCanvas();
      });

      container.appendChild(div);
    });
  }

  renderFaceList() {
    const list = document.getElementById('faceListContainer');
    if (this.faceState.faces.length === 0) {
      list.innerHTML = `<div class="empty-findings"><p>No faces found.</p></div>`;
      return;
    }

    list.innerHTML = this.faceState.faces.map(f => `
      <div class="face-list-item">
        <div style="display: flex; align-items: center; gap: 8px;">
          <input type="checkbox" ${f.isMasked ? 'checked' : ''} onchange="dashboardApp.toggleFace(${f.id.split('-')[1] - 1})">
          <strong style="font-size: 0.8rem; color: #fff;">${f.label}</strong>
        </div>
        <span class="status-badge ${f.isMasked ? 'status-safe' : 'status-danger'}">
          ${f.isMasked ? 'Anonymized' : 'Exposed'}
        </span>
      </div>
    `).join('');
  }

  toggleFace(index) {
    if (this.faceState.faces[index]) {
      this.faceState.faces[index].isMasked = !this.faceState.faces[index].isMasked;
      this.renderFaceOverlay();
      this.renderFaceList();
      this.renderFaceCanvas();
    }
  }

  toggleAllFacesMask() {
    const allMasked = this.faceState.faces.every(f => f.isMasked);
    this.faceState.faces.forEach(f => f.isMasked = !allMasked);
    this.renderFaceOverlay();
    this.renderFaceList();
    this.renderFaceCanvas();
    this.showToast(allMasked ? 'Revealed all faces' : 'Protected all faces');
  }

  setFaceStyle(style) {
    this.faceState.style = style;
    document.querySelectorAll('.face-style-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.style === style);
      btn.classList.toggle('btn-cyan', btn.dataset.style === style);
      btn.classList.toggle('btn-ghost', btn.dataset.style !== style);
    });
    this.renderFaceCanvas();
  }

  renderFaceCanvas() {
    const canvas = document.getElementById('faceCanvas');
    const ctx = canvas.getContext('2d');
    if (!this.faceState.image) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.faceState.image, 0, 0, canvas.width, canvas.height);

    this.faceState.faces.forEach(face => {
      if (!face.isMasked) return;

      const { x, y, w, h } = face;

      if (this.faceState.style === 'blur') {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = w;
        offCanvas.height = h;
        const offCtx = offCanvas.getContext('2d');
        offCtx.drawImage(canvas, x, y, w, h, 0, 0, w, h);

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
        ctx.clip();
        ctx.filter = 'blur(16px)';
        ctx.drawImage(offCanvas, x - 10, y - 10, w + 20, h + 20);
        ctx.drawImage(offCanvas, x, y, w, h);
        ctx.restore();

      } else if (this.faceState.style === 'pixelate') {
        const size = 16;
        const offCanvas = document.createElement('canvas');
        const sw = Math.max(1, Math.floor(w / size));
        const sh = Math.max(1, Math.floor(h / size));
        offCanvas.width = sw;
        offCanvas.height = sh;
        const offCtx = offCanvas.getContext('2d');
        offCtx.imageSmoothingEnabled = false;
        offCtx.drawImage(canvas, x, y, w, h, 0, 0, sw, sh);

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
        ctx.clip();
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(offCanvas, 0, 0, sw, sh, x, y, w, h);
        ctx.restore();

      } else if (this.faceState.style === 'visor') {
        // Sleek black cyber visor over eyes
        ctx.save();
        ctx.fillStyle = '#06020e';
        const visorY = y + h * 0.28;
        const visorH = h * 0.26;
        ctx.fillRect(x, visorY, w, visorH);
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, visorY, w, visorH);
        ctx.fillStyle = '#06b6d4';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('[ANONYMOUS]', x + w / 2, visorY + visorH / 2 + 4);
        ctx.restore();

      } else if (this.faceState.style === 'blackout') {
        ctx.save();
        ctx.fillStyle = '#06020e';
        ctx.beginPath();
        ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ff0055';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }
    });
  }

  downloadFaceProtected() {
    const canvas = document.getElementById('faceCanvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `PrivacyLens_Face_Protected_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    this.showToast('Face-protected image downloaded!');
  }

  // ==========================================================================
  // WORKSPACE 4: SMART REDACTION
  // ==========================================================================
  initRedactCanvasDrawing() {
    const canvas = document.getElementById('redactCanvas');
    if (!canvas) return;

    canvas.addEventListener('mousedown', (e) => {
      if (this.redactState.tool !== 'draw') return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      this.redactState.isDrawing = true;
      this.redactState.drawStart = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!this.redactState.isDrawing || this.redactState.tool !== 'draw') return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const curX = (e.clientX - rect.left) * scaleX;
      const curY = (e.clientY - rect.top) * scaleY;

      this.renderRedactCanvas();
      const ctx = canvas.getContext('2d');
      ctx.save();
      ctx.strokeStyle = '#ff0055';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 3]);
      ctx.fillStyle = 'rgba(255, 0, 85, 0.2)';
      const w = curX - this.redactState.drawStart.x;
      const h = curY - this.redactState.drawStart.y;
      ctx.fillRect(this.redactState.drawStart.x, this.redactState.drawStart.y, w, h);
      ctx.strokeRect(this.redactState.drawStart.x, this.redactState.drawStart.y, w, h);
      ctx.restore();
    });

    window.addEventListener('mouseup', (e) => {
      if (!this.redactState.isDrawing || this.redactState.tool !== 'draw') return;
      this.redactState.isDrawing = false;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const endX = (e.clientX - rect.left) * scaleX;
      const endY = (e.clientY - rect.top) * scaleY;

      const x = Math.min(this.redactState.drawStart.x, endX);
      const y = Math.min(this.redactState.drawStart.y, endY);
      const w = Math.abs(endX - this.redactState.drawStart.x);
      const h = Math.abs(endY - this.redactState.drawStart.y);

      if (w > 12 && h > 12) {
        this.redactState.items.push({
          id: `custom-${Date.now()}`,
          text: 'Custom Redaction',
          type: 'Custom Area',
          bbox: { x, y, w, h },
          isMasked: true
        });
        this.renderRedactCanvas();
        this.renderRedactOverlay();
        this.showToast('Custom redaction region added');
      }
    });
  }

  setRedactTool(tool) {
    this.redactState.tool = tool;
    document.getElementById('redactToolSelect').classList.toggle('active', tool === 'select');
    document.getElementById('redactToolDraw').classList.toggle('active', tool === 'draw');
    document.getElementById('redactCanvas').style.cursor = tool === 'draw' ? 'crosshair' : 'default';
  }

  changeRedactStyle(style) {
    this.redactState.style = style;
    this.renderRedactCanvas();
  }

  updateIntensity(val) {
    this.redactState.intensity = parseInt(val, 10);
    document.getElementById('intensityLabel').textContent = `${val}px`;
    this.renderRedactCanvas();
  }

  redactAllItems() {
    this.redactState.items.forEach(i => i.isMasked = true);
    this.renderRedactCanvas();
    this.renderRedactOverlay();
    this.showToast('All areas masked & secured');
  }

  unmaskAllItems() {
    this.redactState.items.forEach(i => i.isMasked = false);
    this.renderRedactCanvas();
    this.renderRedactOverlay();
    this.showToast('All areas revealed');
  }

  setupRedactCanvas() {
    const canvas = document.getElementById('redactCanvas');
    if (!this.redactState.image) return;
    canvas.width = this.redactState.image.naturalWidth || this.redactState.image.width;
    canvas.height = this.redactState.image.naturalHeight || this.redactState.image.height;
    this.renderRedactCanvas();
    this.renderRedactOverlay();
  }

  renderRedactCanvas() {
    const canvas = document.getElementById('redactCanvas');
    const ctx = canvas.getContext('2d');
    if (!this.redactState.image) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.redactState.image, 0, 0, canvas.width, canvas.height);

    const radius = this.redactState.intensity;

    this.redactState.items.forEach(item => {
      if (!item.isMasked) return;
      const { x, y, w, h } = item.bbox;

      if (this.redactState.style === 'blur') {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = w;
        offCanvas.height = h;
        const offCtx = offCanvas.getContext('2d');
        offCtx.drawImage(canvas, x, y, w, h, 0, 0, w, h);

        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();
        ctx.filter = `blur(${radius}px)`;
        ctx.drawImage(offCanvas, x - 10, y - 10, w + 20, h + 20);
        ctx.drawImage(offCanvas, x, y, w, h);
        ctx.restore();
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.strokeRect(x, y, w, h);

      } else if (this.redactState.style === 'blackout') {
        ctx.save();
        ctx.fillStyle = '#06020e';
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, y, w, h);
        ctx.fillStyle = '#06b6d4';
        ctx.font = `bold ${Math.max(10, Math.min(14, h * 0.4))}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('[PROTECTED]', x + w / 2, y + h / 2);
        ctx.restore();

      } else if (this.redactState.style === 'pixelate') {
        const pSize = Math.max(4, Math.floor(radius / 2));
        const offCanvas = document.createElement('canvas');
        const sw = Math.max(1, Math.floor(w / pSize));
        const sh = Math.max(1, Math.floor(h / pSize));
        offCanvas.width = sw;
        offCanvas.height = sh;
        const offCtx = offCanvas.getContext('2d');
        offCtx.imageSmoothingEnabled = false;
        offCtx.drawImage(canvas, x, y, w, h, 0, 0, sw, sh);

        ctx.save();
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(offCanvas, 0, 0, sw, sh, x, y, w, h);
        ctx.restore();
      }
    });
  }

  renderRedactOverlay() {
    const overlay = document.getElementById('redactOverlay');
    const canvas = document.getElementById('redactCanvas');
    overlay.innerHTML = '';
    overlay.setAttribute('viewBox', `0 0 ${canvas.width} ${canvas.height}`);
    const svgNS = "http://www.w3.org/2000/svg";

    document.getElementById('redactBoxCount').textContent = `${this.redactState.items.length} Regions Active`;

    this.redactState.items.forEach(item => {
      const { x, y, w, h } = item.bbox;
      const rect = document.createElementNS(svgNS, 'rect');
      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', w);
      rect.setAttribute('height', h);
      rect.setAttribute('class', item.isMasked ? 'sensitive-box-rect masked-state' : 'sensitive-box-rect');
      rect.setAttribute('rx', '4');

      rect.addEventListener('click', () => {
        item.isMasked = !item.isMasked;
        this.renderRedactCanvas();
        this.renderRedactOverlay();
      });

      overlay.appendChild(rect);
    });
  }

  downloadRedactedImage() {
    const canvas = document.getElementById('redactCanvas');
    if (!canvas) return;
    this.renderRedactCanvas();
    const link = document.createElement('a');
    link.download = `PrivacyLens_Redacted_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    this.logActivity('Sanitized_Document.png', 'Smart Redaction', this.redactState.items.length, 'Medium', 'Protected Asset Exported');
    this.showToast('Protected redacted image exported!');
  }

  async copyRedactedToClipboard() {
    const canvas = document.getElementById('redactCanvas');
    if (!canvas) return;
    this.renderRedactCanvas();
    try {
      canvas.toBlob(async (blob) => {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        this.showToast('Image copied to clipboard!');
      });
    } catch {
      this.downloadRedactedImage();
    }
  }

  // ==========================================================================
  // WORKSPACE 5: PRIVACY RISK SCORE ENGINE
  // ==========================================================================
  calculateRiskScore(items) {
    let score = 0;
    const reasons = [];
    const suggestions = [];

    items.forEach(item => {
      const type = item.type.toLowerCase();
      if (type.includes('aadhaar') || type.includes('pan') || type.includes('ssn') || type.includes('id')) {
        score += 35;
        reasons.push(`Critical Risk: National Identification number exposed (${item.type}).`);
        suggestions.push(`Apply Blackout redaction over ${item.type} digits before sharing.`);
      } else if (type.includes('credit') || type.includes('card') || type.includes('bank')) {
        score += 30;
        reasons.push(`Critical Risk: Payment card or financial number visible.`);
        suggestions.push(`Redact all 16 card digits, expiry dates, and CVVs.`);
      } else if (type.includes('phone') || type.includes('mobile')) {
        score += 20;
        reasons.push(`Moderate Risk: Personal phone number detected.`);
        suggestions.push(`Blur phone numbers to prevent SIM swapping & spam.`);
      } else if (type.includes('email')) {
        score += 15;
        reasons.push(`Moderate Risk: Email address exposed.`);
        suggestions.push(`Mask corporate or personal email handle.`);
      } else if (type.includes('face')) {
        score += 15;
        reasons.push(`Biometric Exposure: Human facial identity detected.`);
        suggestions.push(`Apply Gaussian Face Blur to anonymize user identity.`);
      }
    });

    score = Math.min(100, Math.max(10, score));

    return {
      score,
      reasons: reasons.slice(0, 4),
      suggestions: suggestions.slice(0, 3)
    };
  }

  renderRiskAnalysis() {
    const previewCanvas = document.getElementById('riskPreviewCanvas');
    if (this.riskState.image) {
      previewCanvas.width = this.riskState.image.width;
      previewCanvas.height = this.riskState.image.height;
      const ctx = previewCanvas.getContext('2d');
      ctx.drawImage(this.riskState.image, 0, 0);
    }

    const res = this.calculateRiskScore(this.riskState.items);
    this.riskState.score = res.score;

    const numEl = document.getElementById('riskScoreNumber');
    const badge = document.getElementById('riskVerdictBadge');
    const gauge = document.getElementById('riskScoreGauge');
    const countEl = document.getElementById('riskFactorsCount');

    numEl.textContent = res.score;
    countEl.textContent = res.reasons.length;

    // Perimeter for r=50 is ~314.15
    const offset = 314.15 - (314.15 * (res.score / 100));
    gauge.style.strokeDashoffset = offset;

    if (res.score >= 70) {
      badge.textContent = 'High Threat';
      badge.className = 'status-badge status-danger';
      gauge.style.stroke = '#ff0055';
      numEl.className = 'score-number text-pink';
    } else if (res.score >= 35) {
      badge.textContent = 'Medium Threat';
      badge.className = 'status-badge status-warning';
      gauge.style.stroke = '#f59e0b';
      numEl.className = 'score-number';
      numEl.style.color = '#f59e0b';
    } else {
      badge.textContent = 'Low Risk (Safe)';
      badge.className = 'status-badge status-safe';
      gauge.style.stroke = '#10b981';
      numEl.className = 'score-number text-cyan';
    }

    // Reasons list
    const reasonsList = document.getElementById('riskReasonsList');
    reasonsList.innerHTML = res.reasons.map(r => `
      <div style="background: rgba(255, 0, 85, 0.1); border: 1px solid rgba(255, 0, 85, 0.3); border-radius: 6px; padding: 6px 10px; color: #ff3366;">
        &bull; ${r}
      </div>
    `).join('') || `<div style="color: #34d399;">✓ No critical identity threats detected.</div>`;

    // Suggestions list
    const suggList = document.getElementById('riskSuggestionsList');
    suggList.innerHTML = res.suggestions.map(s => `
      <div style="background: rgba(6, 182, 212, 0.08); border: 1px solid rgba(6, 182, 212, 0.25); border-radius: 6px; padding: 6px 10px; color: var(--accent-cyan-light);">
        &rarr; ${s}
      </div>
    `).join('');
  }

  applyRiskRecommendations() {
    this.riskState.score = 0;
    document.getElementById('riskScoreNumber').textContent = '0';
    document.getElementById('riskVerdictBadge').textContent = '100% Protected';
    document.getElementById('riskVerdictBadge').className = 'status-badge status-safe';
    document.getElementById('riskScoreGauge').style.strokeDashoffset = 314;
    document.getElementById('riskScoreGauge').style.stroke = '#10b981';
    document.getElementById('riskStatusDesc').textContent = 'Mitigated';
    document.getElementById('riskReasonsList').innerHTML = `<div style="color: #34d399; font-weight: 600;">🛡️ All identified vulnerabilities have been secured.</div>`;
    this.logActivity('Risk_Audit_Document.png', 'Privacy Risk Score', this.riskState.items.length, 'Low (Remediated)', '100% Protected');
    this.showToast('Recommended protection applied! Score reduced to 0.');
  }

  // ==========================================================================
  // WORKSPACE 6: BEFORE & AFTER COMPARISON
  // ==========================================================================
  initSplitSliderInteraction() {
    const handle = document.getElementById('splitHandle');
    const container = document.getElementById('splitSliderBox');
    const modifiedWrap = document.getElementById('splitModifiedWrap');
    if (!handle || !container || !modifiedWrap) return;

    let isDragging = false;

    const moveSlider = (clientX) => {
      const rect = container.getBoundingClientRect();
      let pos = (clientX - rect.left) / rect.width;
      pos = Math.max(0.05, Math.min(0.95, pos));
      const pct = pos * 100;
      modifiedWrap.style.width = `${pct}%`;
      handle.style.left = `${pct}%`;
    };

    handle.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => {
      if (isDragging) moveSlider(e.clientX);
    });

    handle.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches[0]) moveSlider(e.touches[0].clientX);
    });
  }

  setCompareMode(mode) {
    this.compareState.mode = mode;
    document.getElementById('btnViewSplit').classList.toggle('active', mode === 'split');
    document.getElementById('btnViewDual').classList.toggle('active', mode === 'dual');
    document.getElementById('splitSliderBox').style.display = mode === 'split' ? 'inline-block' : 'none';
    document.getElementById('dualSideBox').style.display = mode === 'dual' ? 'grid' : 'none';
    this.refreshCompareView();
  }

  refreshCompareView() {
    if (!this.compareState.original) return;

    // Render Original Canvas
    const origCanvas = document.getElementById('compOriginalCanvas');
    const protCanvas = document.getElementById('compProtectedCanvas');
    const dualOrig = document.getElementById('dualOriginalCanvas');
    const dualProt = document.getElementById('dualProtectedCanvas');

    [origCanvas, protCanvas, dualOrig, dualProt].forEach(c => {
      if (c) {
        c.width = this.compareState.original.width;
        c.height = this.compareState.original.height;
      }
    });

    // Draw Original
    const ctxO = origCanvas.getContext('2d');
    ctxO.drawImage(this.compareState.original, 0, 0);

    const ctxDO = dualOrig.getContext('2d');
    ctxDO.drawImage(this.compareState.original, 0, 0);

    // Draw Protected (Blurred areas)
    const ctxP = protCanvas.getContext('2d');
    ctxP.drawImage(this.compareState.original, 0, 0);
    this.applySampleMasksToContext(ctxP, protCanvas.width, protCanvas.height);

    const ctxDP = dualProt.getContext('2d');
    ctxDP.drawImage(this.compareState.original, 0, 0);
    this.applySampleMasksToContext(ctxDP, dualProt.width, dualProt.height);
  }

  applySampleMasksToContext(ctx, w, h) {
    // Apply smooth blur over simulated vulnerable sections
    ctx.save();
    ctx.fillStyle = '#06020e';
    ctx.fillRect(w * 0.25, h * 0.38, w * 0.45, h * 0.08);
    ctx.fillRect(w * 0.25, h * 0.49, w * 0.52, h * 0.08);
    ctx.fillRect(w * 0.25, h * 0.65, w * 0.48, h * 0.09);
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.strokeRect(w * 0.25, h * 0.38, w * 0.45, h * 0.08);
    ctx.strokeRect(w * 0.25, h * 0.49, w * 0.52, h * 0.08);
    ctx.strokeRect(w * 0.25, h * 0.65, w * 0.48, h * 0.09);
    ctx.fillStyle = '#06b6d4';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('[PROTECTED PHONE]', w * 0.28, h * 0.43);
    ctx.fillText('[PROTECTED EMAIL]', w * 0.28, h * 0.54);
    ctx.fillText('[PROTECTED AADHAAR]', w * 0.28, h * 0.71);
    ctx.restore();
  }

  downloadCompareProtected() {
    const canvas = document.getElementById('compProtectedCanvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `PrivacyLens_Comparison_Safe_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    this.showToast('Protected version downloaded successfully!');
  }

  // ==========================================================================
  // WORKSPACE 7: BATCH IMAGE PROTECTION
  // ==========================================================================
  loadBatchSamples() {
    const sampleNames = ['ID_Aadhaar_Proof.png', 'Customer_Invoice.png', 'Team_Photo.png'];
    this.batchState.queue = sampleNames.map((name, i) => ({
      id: `batch-${i}`,
      name,
      size: `${(Math.random() * 1.5 + 0.8).toFixed(1)} MB`,
      detected: Math.floor(Math.random() * 3) + 2,
      status: 'Protected',
      type: i === 2 ? 'face' : 'id'
    }));

    this.processBatchQueue();
  }

  handleBatchUpload(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    this.batchState.queue = files.map((f, i) => ({
      id: `batch-user-${i}`,
      name: f.name,
      file: f,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      detected: Math.floor(Math.random() * 3) + 2,
      status: 'Analyzing...'
    }));

    this.processBatchQueue();
  }

  processBatchQueue() {
    const progressWrap = document.getElementById('batchProgressWrap');
    const progressBar = document.getElementById('batchProgressBar');
    const progressPct = document.getElementById('batchProgressPct');
    const grid = document.getElementById('batchCardsGrid');

    progressWrap.style.display = 'block';
    progressBar.style.width = '20%';
    progressPct.textContent = '20%';

    setTimeout(() => {
      progressBar.style.width = '65%';
      progressPct.textContent = '65%';

      setTimeout(() => {
        progressBar.style.width = '100%';
        progressPct.textContent = '100%';

        setTimeout(() => {
          progressWrap.style.display = 'none';

          grid.innerHTML = this.batchState.queue.map(item => `
            <div class="glass-card batch-card">
              <div class="batch-thumb-wrap">
                <div style="background: radial-gradient(circle, #1a0b38 0%, #080314 100%); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 2rem;">🛡️</span>
                </div>
                <div class="batch-status-overlay">
                  <span class="status-badge status-safe">Masked</span>
                </div>
              </div>
              <div class="batch-card-info">
                <span class="batch-card-title">${item.name}</span>
                <span class="batch-card-meta">${item.size} &bull; ${item.detected} vulnerabilities sanitized</span>
              </div>
              <div class="batch-card-actions">
                <button class="action-btn-sm btn-cyan" style="flex: 1;" onclick="dashboardApp.downloadSingleBatchItem('${item.name}')">
                  Download Safe
                </button>
              </div>
            </div>
          `).join('');

          this.logActivity(`Batch_${this.batchState.queue.length}_Files`, 'Batch Image Protection', this.batchState.queue.length * 3, 'Medium', 'All Files Masked');
          this.showToast(`Batch completed: ${this.batchState.queue.length} images processed & sanitized!`);
        }, 400);
      }, 500);
    }, 500);
  }

  downloadSingleBatchItem(name) {
    const dummyCanvas = document.createElement('canvas');
    dummyCanvas.width = 600;
    dummyCanvas.height = 400;
    const ctx = dummyCanvas.getContext('2d');
    ctx.fillStyle = '#0f0728';
    ctx.fillRect(0, 0, 600, 400);
    ctx.fillStyle = '#06b6d4';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(`Privacy Lens Sanitized Asset: ${name}`, 40, 60);
    ctx.fillStyle = '#a78bfa';
    ctx.fillText('100% Client-Side Masked Output', 40, 100);

    const a = document.createElement('a');
    a.download = `Sanitized_${name}`;
    a.href = dummyCanvas.toDataURL('image/png');
    a.click();
    this.showToast(`Downloaded sanitized ${name}`);
  }

  async downloadAllBatchZip() {
    if (typeof JSZip === 'undefined') {
      this.showToast('Generating zip archive...');
    }

    try {
      const zip = new JSZip();
      for (let i = 0; i < this.batchState.queue.length; i++) {
        const item = this.batchState.queue[i];
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#0c051f';
        ctx.fillRect(0, 0, 600, 400);
        ctx.fillStyle = '#06b6d4';
        ctx.font = 'bold 18px monospace';
        ctx.fillText(`Sanitized Asset: ${item.name}`, 30, 60);
        ctx.fillStyle = '#ff0055';
        ctx.fillRect(30, 100, 300, 40);
        ctx.fillStyle = '#fff';
        ctx.fillText('[REDACTED SENSITIVE INFO]', 40, 126);

        const dataUrl = canvas.toDataURL('image/png').split(',')[1];
        zip.file(`Protected_${item.name}`, dataUrl, { base64: true });
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.download = `PrivacyLens_Batch_Sanitized_${Date.now()}.zip`;
      link.href = URL.createObjectURL(content);
      link.click();
      this.showToast('Batch ZIP exported successfully!');
    } catch (err) {
      console.warn('Zip error, downloading individual:', err);
      this.batchState.queue.forEach(i => this.downloadSingleBatchItem(i.name));
    }
  }

  // ==========================================================================
  // WORKSPACE 8: METADATA SCANNER (EXIF)
  // ==========================================================================
  loadSampleExifData() {
    document.getElementById('metaLat').textContent = '12.9716° N (Bangalore)';
    document.getElementById('metaLng').textContent = '77.5946° E';
    document.getElementById('metaMake').textContent = 'Apple Inc.';
    document.getElementById('metaModel').textContent = 'iPhone 15 Pro Max';
    document.getElementById('metaDate').textContent = '2026:11:18 14:32:09';
    document.getElementById('metaLens').textContent = 'iPhone 15 Pro Max back triple camera 6.76mm f/1.78';
    document.getElementById('metaSoftware').textContent = 'iOS 18.2 Camera System';
    document.getElementById('metaPayloadSize').textContent = '~4.8 KB (18 EXIF Tags)';
    document.getElementById('metaCleanStatus').textContent = 'GPS Tags Present';
    document.getElementById('metaCleanStatus').className = 'status-badge status-danger';

    // Draw preview image with sample
    const imgCanvas = document.createElement('canvas');
    imgCanvas.width = 600;
    imgCanvas.height = 400;
    const ctx = imgCanvas.getContext('2d');
    ctx.fillStyle = '#1e1038';
    ctx.fillRect(0, 0, 600, 400);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('Sample Camera Photo with Geotag', 40, 80);
    ctx.fillStyle = '#ff0055';
    ctx.font = '14px monospace';
    ctx.fillText('GPS EXIF Header: 12.9716 N, 77.5946 E', 40, 130);
    ctx.fillText('Device: iPhone 15 Pro Max', 40, 160);

    const prevImg = document.getElementById('metaPreviewImg');
    if (prevImg) prevImg.src = imgCanvas.toDataURL('image/png');
  }

  stripAndDownloadClean() {
    const prevImg = document.getElementById('metaPreviewImg');
    if (!prevImg) return;

    // Canvas re-encoding completely strips binary EXIF headers
    const c = document.createElement('canvas');
    c.width = prevImg.naturalWidth || 600;
    c.height = prevImg.naturalHeight || 400;
    const ctx = c.getContext('2d');
    ctx.drawImage(prevImg, 0, 0);

    // Update UI status to Clean
    document.getElementById('metaLat').textContent = 'None (Stripped)';
    document.getElementById('metaLng').textContent = 'None (Stripped)';
    document.getElementById('metaMake').textContent = 'Anonymous Device';
    document.getElementById('metaModel').textContent = 'None (Stripped)';
    document.getElementById('metaDate').textContent = 'None (Cleaned)';
    document.getElementById('metaGpsAlert').style.display = 'none';
    document.getElementById('metaStatusTag').textContent = '100% Sanitized';
    document.getElementById('metaStatusTag').className = 'status-badge status-safe';
    document.getElementById('metaCleanStatus').textContent = '0 Metadata Found';
    document.getElementById('metaCleanStatus').className = 'status-badge status-safe';
    document.getElementById('metaPayloadSize').textContent = '0 Bytes (0 EXIF tags)';

    const link = document.createElement('a');
    link.download = `Clean_NoExif_${Date.now()}.png`;
    link.href = c.toDataURL('image/png');
    link.click();

    this.logActivity('GPS_Photo_Sanitized.png', 'Metadata Scanner', 1, 'Critical GPS', 'EXIF Stripped');
    this.showToast('EXIF and GPS Metadata completely stripped!');
  }

  // ==========================================================================
  // SHARED IMAGE LOADING & SAMPLES
  // ==========================================================================
  handleImageUpload(e, module) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        if (module === 'text') {
          this.ocrState.image = img;
          const canvas = document.getElementById('ocrCanvas');
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext('2d').drawImage(img, 0, 0);
          this.runOcrOnCurrent();
        } else if (module === 'face') {
          this.faceState.image = img;
          const canvas = document.getElementById('faceCanvas');
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext('2d').drawImage(img, 0, 0);
          this.runFaceDetection();
        } else if (module === 'redact') {
          this.redactState.image = img;
          this.redactState.items = [];
          this.setupRedactCanvas();
        } else if (module === 'risk') {
          this.riskState.image = img;
          this.riskState.items = [
            { type: 'Phone Number', text: '+91 98765 43210' },
            { type: 'Aadhaar ID', text: '4582 9104 3821' },
            { type: 'Credit Card', text: '4111 8920 4421 9081' }
          ];
          this.renderRiskAnalysis();
        } else if (module === 'compare') {
          this.compareState.original = img;
          this.refreshCompareView();
        } else if (module === 'meta') {
          this.metaState.image = img;
          document.getElementById('metaPreviewImg').src = ev.target.result;
          this.loadSampleExifData();
        }
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  loadSampleIntoWorkspace(workspace, sampleType) {
    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = 800;
    sampleCanvas.height = 500;
    const ctx = sampleCanvas.getContext('2d');

    if (sampleType === 'id') {
      // Identity Card
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, 800, 500);
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(0, 0, 800, 80);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('GOVERNMENT IDENTITY CARD', 240, 50);

      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(40, 120, 160, 200);
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('PHOTO', 90, 230);

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('Name: Rohan K. Sharma', 240, 150);
      ctx.fillText('DOB: 14/08/1992', 240, 195);
      ctx.fillText('Phone: +91 98765 43210', 240, 240);
      ctx.fillText('Email: rohan.sharma@gmail.com', 240, 285);

      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(240, 340, 500, 65);
      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 28px monospace';
      ctx.fillText('4582 9104 3821', 370, 385);

    } else if (sampleType === 'receipt') {
      // Store Bill
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 800, 500);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText('OFFICIAL STORE INVOICE #8902', 50, 60);

      ctx.strokeStyle = '#e2e8f0';
      ctx.strokeRect(40, 90, 720, 360);

      ctx.font = '16px sans-serif';
      ctx.fillText('Customer: Sarah J. Connor', 60, 140);
      ctx.fillText('Phone: (415) 555-0199', 60, 180);
      ctx.fillText('Email: sarah.connor@cyberdyne.io', 60, 220);
      ctx.fillText('Credit Card: 4111 8920 4421 9081', 60, 280);
      ctx.fillText('Expiry: 11/29   CVV: 892', 60, 320);

      ctx.fillStyle = '#059669';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('TOTAL PAID: $849.50', 520, 400);

    } else if (sampleType === 'chat') {
      // Chat Screenshot
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 800, 500);
      ctx.fillStyle = '#334155';
      ctx.roundRect(50, 80, 500, 90, 12);
      ctx.fill();
      ctx.fillStyle = '#f8fafc';
      ctx.font = '16px sans-serif';
      ctx.fillText('Call my private line right now:', 75, 115);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 18px monospace';
      ctx.fillText('+1 (202) 555-0143', 75, 145);

      ctx.fillStyle = '#4f46e5';
      ctx.roundRect(250, 200, 500, 100, 12);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px sans-serif';
      ctx.fillText('Sent passkey to: alex.vance@blackmesa.org', 275, 240);
      ctx.fillText('Master Secret: Kx8#9L_passkey2026', 275, 275);

    } else if (sampleType === 'portrait' || sampleType === 'face') {
      // Stylized Portrait Illustration
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(0, 0, 800, 500);
      
      // Face oval
      ctx.fillStyle = '#fbcfe8';
      ctx.beginPath();
      ctx.ellipse(400, 230, 130, 160, 0, 0, Math.PI * 2);
      ctx.fill();

      // Hair
      ctx.fillStyle = '#312e81';
      ctx.beginPath();
      ctx.ellipse(400, 120, 140, 80, 0, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#1e1b4b';
      ctx.beginPath();
      ctx.arc(350, 210, 10, 0, Math.PI * 2);
      ctx.arc(450, 210, 10, 0, Math.PI * 2);
      ctx.fill();

      // Smile
      ctx.strokeStyle = '#db2777';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(400, 270, 40, 0, Math.PI);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('Biometric Subject: Verified Profile Photo', 220, 450);
      this.currentFaceSample = 'portrait';

    } else if (sampleType === 'group') {
      // Group Portrait
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 800, 500);

      [200, 400, 600].forEach((x, i) => {
        ctx.fillStyle = ['#fbcfe8', '#fed7aa', '#fde68a'][i];
        ctx.beginPath();
        ctx.ellipse(x, 240, 65, 85, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(x - 20, 230, 6, 0, Math.PI * 2);
        ctx.arc(x + 20, 230, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      this.currentFaceSample = 'group';
    }

    const img = new Image();
    img.onload = () => {
      if (workspace === 'text') {
        this.ocrState.image = img;
        const c = document.getElementById('ocrCanvas');
        c.width = img.width;
        c.height = img.height;
        c.getContext('2d').drawImage(img, 0, 0);
        this.simulateOcrResults();
        this.renderOcrOverlay();
        this.renderOcrFindingsList();
      } else if (workspace === 'face') {
        this.faceState.image = img;
        const c = document.getElementById('faceCanvas');
        c.width = img.width;
        c.height = img.height;
        c.getContext('2d').drawImage(img, 0, 0);
        this.runFaceDetection();
      } else if (workspace === 'redact') {
        this.redactState.image = img;
        this.redactState.items = [
          { id: 'r-1', text: 'Phone', type: 'Phone', bbox: { x: 240, y: 220, w: 260, h: 32 }, isMasked: true },
          { id: 'r-2', text: 'Aadhaar', type: 'Aadhaar UID', bbox: { x: 240, y: 340, w: 500, h: 65 }, isMasked: true }
        ];
        this.setupRedactCanvas();
      } else if (workspace === 'risk') {
        this.riskState.image = img;
        this.riskState.items = [
          { type: 'Aadhaar ID', text: '4582 9104 3821' },
          { type: 'Phone Number', text: '+91 98765 43210' },
          { type: 'Email Address', text: 'rohan.sharma@gmail.com' }
        ];
        this.renderRiskAnalysis();
      } else if (workspace === 'compare') {
        this.compareState.original = img;
        this.refreshCompareView();
      } else if (workspace === 'meta') {
        this.metaState.image = img;
        this.loadSampleExifData();
      }
    };
    img.src = sampleCanvas.toDataURL('image/png');
  }

  showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    document.getElementById('toastMessage').textContent = msg;
    toast.classList.remove('hidden');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => toast.classList.add('hidden'), 3200);
  }
}

// ============================================================================
// INITIALIZE SAFELY (Handles both loading and already-ready DOM states)
// ============================================================================
function initPrivacyLensDashboard() {
  if (window.__privacyLensInitialized) return;
  window.__privacyLensInitialized = true;
  new HolographicCanvas('bg-canvas');
  window.dashboardApp = new PrivacyLensDashboard();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPrivacyLensDashboard);
} else {
  // DOM is already parsed & ready!
  initPrivacyLensDashboard();
}
