import { useEffect, useRef } from "react";

interface PixelArtCanvasProps {
  size?: number;
}

const PixelArtCanvas = ({ size = 190 }: PixelArtCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.getContext("2d")!;
    const S = 5; // pixel size
    const W = size;
    const H = size;
    let frame = 0;
    let animId = 0;

    // Spark system
    interface Spark {
      x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string; size: number;
    }
    const sparks: Spark[] = [];
    const sparkColors = ['#fff8b0','#ffaa00','#ff5500','#ffffff','#00e5ff','#aa44ff'];

    // Orbitals
    const orbs = [
      { angle: 0,   r: 5,   spd: +0.022, color: '#00e5ff', size: 1 },
      { angle: 2.1, r: 4.3, spd: -0.018, color: '#ff2299', size: 1 },
      { angle: 4.2, r: 5.5, spd: +0.015, color: '#aa44ff', size: 1 },
      { angle: 1.1, r: 3.8, spd: -0.025, color: '#ffcc00', size: 1 },
      { angle: 3.5, r: 6.0, spd: +0.012, color: '#22ff77', size: 1 },
    ];

    const diamonds = [
      { x: 5, y: 4, phase: 0 },
      { x: 33, y: 5, phase: 1.2 },
      { x: 35, y: 21, phase: 2.4 },
      { x: 2, y: 22, phase: 3.6 },
      { x: 19, y: 2, phase: 4.8 },
    ];

    const termStrings = ['boot()','load()','sync()','run()','ok ✓'];

    function px(col: number, row: number, w: number, h: number, color: string) {
      cx.fillStyle = color;
      cx.fillRect(col * S, row * S, w * S, h * S);
    }

    function glowPx(col: number, row: number, w: number, h: number, color: string, shadowColor: string, blur: number) {
      cx.shadowColor = shadowColor;
      cx.shadowBlur = blur;
      cx.fillStyle = color;
      cx.fillRect(col * S, row * S, w * S, h * S);
      cx.shadowBlur = 0;
    }

    function drawBg() {
      // Fill bg
      px(0, 0, 38, 38, '#04060e');
      
      // Dot grid
      cx.fillStyle = '#080c18';
      for (let r = 0; r < 38; r += 4) {
        cx.fillRect(0, r * S, W, 1);
        cx.fillRect(r * S, 0, 1, H);
      }

      // Ambient purple glow
      const gp = cx.createRadialGradient(19*S, 18*S, 0, 19*S, 18*S, 15*S);
      gp.addColorStop(0, 'rgba(139,92,246,0.12)');
      gp.addColorStop(1, 'transparent');
      cx.fillStyle = gp;
      cx.fillRect(0, 0, W, H);

      // Ambient teal glow
      const gt = cx.createRadialGradient(5*S, 28*S, 0, 5*S, 28*S, 9*S);
      gt.addColorStop(0, 'rgba(0,229,255,0.09)');
      gt.addColorStop(1, 'transparent');
      cx.fillStyle = gt;
      cx.fillRect(0, 0, W, H);
    }

    function drawEnv() {
      // Floor
      px(0, 33, 38, 5, '#040609');
      glowPx(0, 33, 38, 0.2, 'rgba(0,229,255,0.3)', '#00e5ff', 6);
      
      // Floor grid
      cx.fillStyle = 'rgba(0,229,255,0.06)';
      for (let c = 0; c < 38; c += 4) {
        cx.fillRect(c * S, 33 * S, 1, 5 * S);
      }

      // Floor reflection
      const fr = cx.createRadialGradient(20*S, 33*S, 0, 20*S, 33*S, 10*S);
      fr.addColorStop(0, 'rgba(0,229,255,0.14)');
      fr.addColorStop(1, 'transparent');
      cx.fillStyle = fr;
      cx.fillRect(5*S, 33*S, 30*S, 5*S);

      // Desk top
      px(1, 24, 35, 2, '#152540');
      glowPx(1, 24, 35, 0.2, 'rgba(0,229,255,0.2)', '#2dd4bf', 5);
      
      // Desk body
      px(1, 26, 35, 7, '#091220');
      px(1, 26, 1, 7, '#0f1c30'); // left highlight
      
      // Desk legs
      px(2, 33, 2, 2, '#091220');
      px(33, 33, 2, 2, '#091220');

      // Components on desk right
      const compColors = ['#ff2299','#00e5ff','#ffcc00','#aa44ff','#22ff77'];
      for (let i = 0; i < 5; i++) {
        px(28 + i * 1.6, 23, 0.8, 0.8, compColors[i]);
      }

      // Cable
      cx.strokeStyle = 'rgba(0,229,255,0.4)';
      cx.lineWidth = 1;
      cx.beginPath();
      cx.moveTo(12*S, 24*S);
      cx.quadraticCurveTo(15*S, 22*S, 18*S, 24*S);
      cx.stroke();
    }

    function drawScreens() {
      // TOP-LEFT Terminal
      cx.shadowColor = '#22ff77';
      cx.shadowBlur = 6;
      cx.strokeStyle = '#22ff77';
      cx.lineWidth = 1;
      cx.strokeRect(0.5*S, 1*S, 10*S, 11*S);
      cx.shadowBlur = 0;

      cx.fillStyle = 'rgba(0,8,2,0.92)';
      cx.fillRect(1*S, 1.5*S, 9*S, 10*S);

      cx.font = '6px monospace';
      cx.fillStyle = '#22ff77';
      cx.fillText('> SYS', 1.5*S, 3*S);

      for (let li = 0; li < 3; li++) {
        const idx = Math.floor(frame * 0.04 + li) % termStrings.length;
        cx.globalAlpha = li === 2 ? 1 : 0.5;
        cx.fillStyle = '#22ff77';
        cx.fillText(termStrings[idx], 1.5*S, (4.5 + li * 2)*S);
      }
      cx.globalAlpha = 1;

      // Blinking cursor
      if (Math.floor(frame / 15) % 2 === 0) {
        cx.fillStyle = '#22ff77';
        cx.fillRect(7*S, 8*S, 0.8*S, 1*S);
      }

      // Corner dots green
      cx.fillStyle = '#22ff77';
      for (const [dx, dy] of [[0.5,1],[10,1],[0.5,11.5],[10,11.5]]) {
        cx.fillRect(dx*S, dy*S, 2, 2);
      }

      // TOP-RIGHT Robot Status
      cx.shadowColor = '#00e5ff';
      cx.shadowBlur = 6;
      cx.strokeStyle = '#00e5ff';
      cx.strokeRect(27*S, 1*S, 10*S, 11*S);
      cx.shadowBlur = 0;

      cx.fillStyle = 'rgba(0,5,12,0.92)';
      cx.fillRect(27.5*S, 1.5*S, 9*S, 10*S);

      cx.font = '6px monospace';
      cx.fillStyle = '#00e5ff';
      cx.fillText('UNIT-7', 28*S, 3*S);

      const barColors = ['#22ff77','#00e5ff','#ff2299'];
      const barLabels = ['PWR','AI','SYN'];
      for (let bi = 0; bi < 3; bi++) {
        const barY = (4 + bi * 2.5) * S;
        const maxW = 7 * S;
        const fillW = Math.floor(maxW * (0.45 + 0.45 * Math.sin(frame * 0.025 + bi * 1.6)));
        
        cx.fillStyle = '#091220';
        cx.fillRect(28*S, barY, maxW, 1.2*S);
        
        cx.shadowColor = barColors[bi];
        cx.shadowBlur = 4;
        cx.fillStyle = barColors[bi];
        cx.fillRect(28*S, barY, fillW, 1.2*S);
        cx.shadowBlur = 0;

        cx.font = '5px monospace';
        cx.globalAlpha = 0.6;
        cx.fillText(barLabels[bi], 28.2*S, barY + 1*S);
        cx.globalAlpha = 1;
      }

      // Corner dots cyan
      cx.fillStyle = '#00e5ff';
      for (const [dx, dy] of [[27,1],[36.5,1],[27,11.5],[36.5,11.5]]) {
        cx.fillRect(dx*S, dy*S, 2, 2);
      }
    }

    function drawRobot() {
      const corePulse = 0.55 + 0.45 * Math.sin(frame * 0.11);
      const armBob = Math.round(Math.sin(frame * 0.09));

      // FEET
      px(14, 32, 3, 1, '#0e1b2b');
      px(22, 32, 3, 1, '#0e1b2b');
      glowPx(14, 32.8, 3, 0.2, 'rgba(0,229,255,0.3)', '#00e5ff', 5);
      glowPx(22, 32.8, 3, 0.2, 'rgba(0,229,255,0.3)', '#00e5ff', 5);

      // LOWER LEGS
      px(14, 26, 3, 6, '#1b2b42');
      px(15, 27, 1, 4, '#0e1b2b');
      px(22, 26, 3, 6, '#1b2b42');
      px(23, 27, 1, 4, '#0e1b2b');

      // Knee joints
      px(14, 25, 3, 1, '#090f1a');
      px(14, 25, 3, 0.3, '#7aaad8');
      px(22, 25, 3, 1, '#090f1a');
      px(22, 25, 3, 0.3, '#7aaad8');
      
      // Knee glow
      cx.globalAlpha = 0.2 + 0.15 * Math.sin(frame * 0.07);
      px(15, 25, 1, 1, '#aa44ff');
      px(23, 25, 1, 1, '#aa44ff');
      cx.globalAlpha = 1;

      // UPPER LEGS
      px(14, 21, 3, 4, '#253d5e');
      px(14, 21, 0.5, 4, '#7aaad8');
      px(22, 21, 3, 4, '#253d5e');
      px(22, 21, 0.5, 4, '#7aaad8');

      // HIP
      px(12, 19, 14, 2, '#1b2b42');
      px(12, 19, 14, 0.5, '#253d5e');
      px(12, 19, 0.5, 2, '#7aaad8');
      px(25.5, 19, 0.5, 2, '#7aaad8');
      px(18, 19.5, 2, 1, '#090f1a');

      // TORSO
      px(12, 9, 14, 10, '#1b2b42');
      px(12, 9, 14, 0.5, '#253d5e');
      px(12, 9, 0.5, 10, '#7aaad8');
      px(25.5, 9, 0.5, 10, '#0e1b2b');
      px(12, 9, 1.5, 10, '#0e1b2b');
      px(24.5, 9, 1.5, 10, '#0e1b2b');

      // Chest core recess
      px(16, 11, 6, 6, '#090f1a');
      
      // Core gradient
      const cg = cx.createRadialGradient(19*S, 14*S, 0, 19*S, 14*S, 4*S);
      cg.addColorStop(0, `rgba(255,34,153,${corePulse})`);
      cg.addColorStop(0.5, `rgba(170,68,255,${corePulse * 0.5})`);
      cg.addColorStop(1, 'transparent');
      cx.fillStyle = cg;
      cx.fillRect(16*S, 11*S, 6*S, 6*S);

      // Inner core
      px(17, 13, 4, 2, '#090f1a');
      glowPx(18, 13, 2, 1, '#ff2299', '#ff2299', 10 * corePulse);

      // Orbiting ring
      cx.beginPath();
      cx.ellipse(19*S, 14*S, 3.5*S, 1.2*S, frame * 0.025, 0, Math.PI * 2);
      cx.strokeStyle = 'rgba(170,68,255,0.4)';
      cx.lineWidth = 1;
      cx.shadowColor = '#aa44ff';
      cx.shadowBlur = 3;
      cx.stroke();
      cx.shadowBlur = 0;

      // Side indicator lights
      const lightColors = ['#22ff77','#ffcc00','#00e5ff'];
      const lightRows = [10, 12, 14];
      for (let i = 0; i < 3; i++) {
        glowPx(13, lightRows[i], 0.6, 0.6, lightColors[i], lightColors[i], 4);
        cx.globalAlpha = 0.7;
        glowPx(25, lightRows[i], 0.6, 0.6, lightColors[i], lightColors[i], 4);
        cx.globalAlpha = 1;
      }
      // Alternating light
      const altColor = Math.floor(frame / 18) % 2 === 0 ? '#ff2299' : '#090f1a';
      glowPx(13, 16, 0.6, 0.6, altColor, altColor === '#090f1a' ? 'transparent' : '#ff2299', 4);

      // Circuit traces
      cx.fillStyle = 'rgba(0,229,255,0.18)';
      cx.fillRect(13.8*S, 11*S, 2*S, 1);
      cx.fillRect(13.8*S, 13*S, 2*S, 1);
      cx.fillRect(22*S, 12*S, 2.5*S, 1);
      cx.fillRect(14*S, 14*S, 1, 2*S);

      // SHOULDERS
      px(9, 8, 3, 2, '#253d5e');
      px(9, 8, 3, 0.4, '#7aaad8');
      px(26, 8, 3, 2, '#253d5e');
      px(26, 8, 3, 0.4, '#7aaad8');
      
      // Shoulder glow
      cx.globalAlpha = 0.35 + 0.2 * Math.sin(frame * 0.07);
      cx.fillStyle = '#00e5ff';
      cx.fillRect(9*S, 8*S, 3*S, 1);
      cx.fillRect(26*S, 8*S, 3*S, 1);
      cx.globalAlpha = 1;

      // LEFT ARM (animated)
      px(8, 9 + armBob, 2, 4, '#253d5e');
      px(8, 9 + armBob, 0.5, 4, '#7aaad8');
      px(8, 13 + armBob, 3, 1, '#090f1a');
      px(9, 13 + armBob, 1, 1, '#7aaad8');
      px(7, 14 + armBob, 2, 5, '#1b2b42');
      px(6, 19 + armBob, 4, 3, '#253d5e');
      // Fingers
      px(6, 21 + armBob, 0.8, 0.8, '#253d5e');
      px(8, 21 + armBob, 0.8, 0.8, '#253d5e');
      px(9.5, 21 + armBob, 0.8, 0.8, '#253d5e');

      // Palm energy
      const palmGlow = 0.4 + 0.5 * Math.sin(frame * 0.14);
      cx.shadowColor = '#00e5ff';
      cx.shadowBlur = 8 * palmGlow;
      cx.fillStyle = `rgba(0,229,255,${0.5 + 0.4 * Math.sin(frame * 0.14)})`;
      cx.fillRect(6.5*S, (19.5 + armBob)*S, 3*S, 2*S);
      cx.shadowBlur = 0;

      // RIGHT ARM (static)
      px(27, 9, 2, 4, '#253d5e');
      px(28.5, 9, 0.5, 4, '#7aaad8');
      px(26, 13, 3, 1, '#090f1a');
      px(27, 13, 1, 1, '#7aaad8');
      px(28, 14, 2, 5, '#1b2b42');
      px(27, 19, 4, 3, '#253d5e');

      // Right hand panel
      px(29, 20, 3, 2, '#090f1a');
      cx.strokeStyle = 'rgba(0,229,255,0.3)';
      cx.lineWidth = 1;
      cx.shadowColor = '#00e5ff';
      cx.shadowBlur = 4;
      cx.strokeRect(29.2*S, 20.2*S, 2.6*S, 1.6*S);
      cx.shadowBlur = 0;

      // NECK
      px(17, 7, 4, 2, '#1b2b42');
      px(18, 7, 2, 2, '#090f1a');
      px(17, 7, 0.5, 2, '#7aaad8');
      px(20.5, 7, 0.5, 2, '#7aaad8');

      // HEAD
      px(15, 3, 8, 5, '#1b2b42');
      px(15, 3, 8, 0.5, '#253d5e');
      px(15, 3, 0.5, 5, '#7aaad8');
      px(22.5, 3, 0.5, 5, '#0e1b2b');
      
      // Ear guards
      px(14, 4, 1, 2, '#0e1b2b');
      px(23, 4, 1, 2, '#0e1b2b');

      // Visor recess
      px(16, 4, 6, 2, '#090f1a');

      // Scanning eye
      const eyePos = Math.sin(frame * 0.08) * 0.5 + 0.5;
      const eyeGrad = cx.createLinearGradient(16*S, 0, 22*S, 0);
      eyeGrad.addColorStop(Math.max(0, eyePos - 0.2), 'rgba(0,229,255,0)');
      eyeGrad.addColorStop(eyePos, 'rgba(0,229,255,0.95)');
      eyeGrad.addColorStop(Math.min(1, eyePos + 0.2), 'rgba(0,229,255,0)');
      cx.shadowColor = '#00e5ff';
      cx.shadowBlur = 10;
      cx.fillStyle = eyeGrad;
      cx.fillRect(16*S, 4*S, 6*S, 2*S);
      
      // Bright lead pixel
      const edx = 16 + Math.floor(eyePos * 6);
      cx.fillStyle = '#00e5ff';
      cx.shadowBlur = 14;
      cx.fillRect(edx*S, 4*S, S, S);
      cx.shadowBlur = 0;

      // Head vents
      for (let v = 0; v < 4; v++) {
        px(16 + v * 1.5, 3, 0.8, 0.3, '#090f1a');
      }

      // Unit number
      cx.font = '5px monospace';
      cx.fillStyle = '#00e5ff';
      cx.fillText('7', 18.8*S, 6.5*S);

      // ANTENNA
      px(18, 1, 1, 2, '#1b2b42');
      const antennaOn = Math.floor(frame / 10) % 4 !== 0;
      if (antennaOn) {
        glowPx(18, 0.5, 1, 0.8, '#ffcc00', '#ffcc00', 10);
        cx.globalAlpha = 0.3;
        px(17.5, 0, 2, 1.5, 'rgba(255,204,0,0.2)');
        cx.globalAlpha = 1;
      } else {
        px(18, 0.5, 1, 0.8, '#1a1000');
      }
    }

    function drawDeveloper() {
      const armWave = Math.round(Math.sin(frame * 0.09) * 0.5);

      // Stool
      px(2, 32, 4, 0.5, '#152540');
      px(3, 32.5, 0.5, 2, '#091220');
      px(5, 32.5, 0.5, 2, '#091220');

      // Legs/shoes
      px(2, 27, 1.5, 5, '#060c18');
      px(4, 27, 1.5, 5, '#060c18');
      px(1, 31.5, 2.5, 0.8, '#090f1a');
      px(4, 31.5, 2.5, 0.8, '#090f1a');

      // Body (lab coat)
      px(1, 17, 6, 10, '#0d1b30');
      px(1, 17, 0.5, 10, '#162540');
      px(3, 17, 1.5, 10, '#0e1b2b'); // lapel
      px(2, 19, 1.5, 5, '#162a44'); // shirt
      px(4, 22, 1.5, 2, '#1f3354'); // pocket
      px(4, 22, 1.5, 0.3, '#2a4570'); // pocket highlight

      // ID badge
      glowPx(2, 20, 1, 1, 'rgba(0,229,255,0.6)', '#00e5ff', 3);

      // Head
      px(2, 14, 4, 1, '#1a0e04'); // hair
      px(2, 16, 0.5, 0.5, '#1a0e04');
      px(5.5, 16, 0.5, 0.5, '#1a0e04');
      px(2, 15, 4, 4, '#e8b07a'); // face
      px(2, 15, 0.5, 4, '#c89060'); // shadow

      // Eyes
      px(5, 16, 0.5, 0.5, '#1a0e04');
      px(5.2, 16, 0.2, 0.2, '#ffffff'); // glint

      // Nose & mouth
      px(4, 17, 0.5, 0.5, '#c89060');
      cx.fillStyle = '#c89060';
      cx.fillRect(3*S, 18.3*S, 2*S, 1);

      // Goggles
      cx.strokeStyle = 'rgba(0,229,255,0.5)';
      cx.lineWidth = 1;
      cx.strokeRect(2.5*S, 14.5*S, 3*S, 1*S);

      // Right arm (reaching toward robot)
      px(6, 17, 2, 2, '#0d1b30');
      px(8, 17, 2 + armWave, 1.5, '#0d1b30');
      px(10 + armWave, 16, 2, 2, '#e8b07a'); // hand

      // Tool in hand
      px(11 + armWave, 16.5, 1.5, 1, '#0f1e30');
      px(11 + armWave, 16.5, 1.5, 0.3, '#182c44');

      // Tool tip
      const toolGlow = 0.4 + 0.55 * Math.sin(frame * 0.2);
      glowPx(12.5 + armWave, 16.5, 0.8, 0.8, '#aa44ff', '#aa44ff', 9 * toolGlow);

      // Scan beam
      cx.globalAlpha = 0.4 + 0.2 * Math.sin(frame * 0.15);
      cx.fillStyle = 'rgba(170,68,255,0.6)';
      cx.fillRect((13 + armWave)*S, 16.8*S, 3*S, 1.5);
      cx.globalAlpha = 1;

      // Left arm (relaxed)
      px(0, 18, 2, 5, '#0d1b30');
      px(0, 22, 1.5, 2, '#e8b07a');
    }

    function drawParticles() {
      const centerX = 19;
      const centerY = 14;

      // Orbital particles
      for (const orb of orbs) {
        orb.angle += orb.spd;
        const ox = centerX*S + Math.cos(orb.angle) * orb.r * S;
        const oy = centerY*S + Math.sin(orb.angle) * orb.r * S;
        
        // Trail
        for (let ti = 1; ti <= 3; ti++) {
          const ta = orb.angle - orb.spd * ti * 4;
          const tx = centerX*S + Math.cos(ta) * orb.r * S;
          const ty = centerY*S + Math.sin(ta) * orb.r * S;
          cx.globalAlpha = 0.3 / ti;
          cx.fillStyle = orb.color;
          cx.fillRect(tx, ty, 0.8*S, 0.8*S);
        }
        cx.globalAlpha = 1;

        cx.shadowColor = orb.color;
        cx.shadowBlur = 6;
        cx.fillStyle = orb.color;
        cx.fillRect(ox, oy, orb.size * S, orb.size * S);
        cx.shadowBlur = 0;
      }

      // Energy beam
      for (let i = 0; i < 6; i++) {
        const frac = i / 5;
        let bx = 12 + (11 - 12) * frac;
        let by = 17 + (15 - 17) * frac;
        bx += (i % 2 === 0 ? 0.7 : -0.7) * Math.sin(frame * 0.25 + i);
        by += Math.cos(frame * 0.18 + i * 0.8) * 0.5;
        cx.globalAlpha = 0.6 + 0.3 * (1 - frac);
        cx.shadowColor = i % 2 === 0 ? '#aa44ff' : '#00e5ff';
        cx.shadowBlur = 5;
        cx.fillStyle = cx.shadowColor;
        cx.fillRect(bx * S, by * S, S * 0.8, S * 0.8);
      }
      cx.globalAlpha = 1;
      cx.shadowBlur = 0;

      // Sparks
      if (frame % 5 === 0 && sparks.length < 22) {
        sparks.push({
          x: (11 + (Math.random() - 0.5) * 3) * S,
          y: (16 + (Math.random() - 0.5) * 1.5) * S,
          vx: (Math.random() - 0.5) * 3.5,
          vy: -Math.random() * 4 - 0.5,
          life: 14 + Math.random() * 12,
          maxLife: 26,
          color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
          size: 1.5 + Math.random() * 2.5,
        });
      }

      for (let si = sparks.length - 1; si >= 0; si--) {
        const s = sparks[si];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.22;
        s.vx *= 0.97;
        s.life--;
        if (s.life <= 0) { sparks.splice(si, 1); continue; }
        cx.globalAlpha = s.life / 24;
        cx.shadowColor = s.color;
        cx.shadowBlur = 4;
        cx.fillStyle = s.color;
        cx.fillRect(s.x, s.y, s.size, s.size);
      }
      cx.globalAlpha = 1;
      cx.shadowBlur = 0;

      // Floating diamonds
      for (const d of diamonds) {
        const fy = d.y + Math.sin(frame * 0.05 + d.phase) * 1.5;
        const da = 0.18 + 0.18 * Math.sin(frame * 0.07 + d.phase);
        cx.globalAlpha = da;
        cx.fillStyle = '#00e5ff';
        cx.beginPath();
        cx.moveTo(d.x * S, (fy - 0.5) * S);
        cx.lineTo((d.x + 0.5) * S, fy * S);
        cx.lineTo(d.x * S, (fy + 0.5) * S);
        cx.lineTo((d.x - 0.5) * S, fy * S);
        cx.closePath();
        cx.fill();
      }
      cx.globalAlpha = 1;

      // CRT scanlines
      cx.fillStyle = 'rgba(0,0,0,0.05)';
      for (let row = 0; row < 38; row += 2) {
        cx.fillRect(0, row * S, W, 1);
      }

      // Sweep highlight
      const sweepY = (frame * 0.7) % H;
      cx.globalAlpha = 0.015;
      cx.fillStyle = '#ffffff';
      cx.fillRect(0, sweepY, W, 2);
      cx.globalAlpha = 1;
    }

    function render() {
      cx.clearRect(0, 0, W, H);
      drawBg();
      drawEnv();
      drawScreens();
      drawRobot();
      drawDeveloper();
      drawParticles();
      frame++;
      animId = requestAnimationFrame(render);
    }

    render();
    return () => cancelAnimationFrame(animId);
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{
        imageRendering: 'pixelated',
        display: 'block',
        width: size,
        height: size,
      }}
    />
  );
};

export default PixelArtCanvas;
