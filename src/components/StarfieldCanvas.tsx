"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
}

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for gravitational deflection
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const starCount = Math.min(180, Math.floor((width * height) / 8000));
    const stars: Star[] = [];

    const starColors = [
      "rgba(255, 255, 255,",      // Pure starlight
      "rgba(0, 229, 255,",        // Tron / Stargate cyan
      "rgba(245, 158, 11,",       // Gargantua amber
      "rgba(147, 197, 253,",      // Cold blue
    ];

    for (let i = 0; i < starCount; i++) {
      const baseAlpha = 0.2 + Math.random() * 0.7;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.5,
        size: Math.random() * 1.6 + 0.4,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: 0.005 + Math.random() * 0.02,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Draw faint gravitational orbital ring centered on viewport center
      const centerX = width * 0.5;
      const centerY = height * 0.45;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.min(width, height) * 0.42, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 229, 255, 0.035)";
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 16]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw stars with subtle parallax and gravitational drift
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Twinkle effect
        star.alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed * 50 + i) * 0.25;
        const currentAlpha = Math.max(0.1, Math.min(1, star.alpha));

        // Gravitational deflection away from cursor slightly
        const dx = star.x - mouseX;
        const dy = star.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let offsetX = 0;
        let offsetY = 0;

        if (dist < 280 && dist > 1) {
          const force = (280 - dist) / 280;
          offsetX = (dx / dist) * force * 15;
          offsetY = (dy / dist) * force * 15;
        }

        ctx.fillStyle = `${star.color} ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x + offsetX, star.y + offsetY, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow for larger stars
        if (star.size > 1.4 && currentAlpha > 0.6) {
          ctx.fillStyle = `${star.color} ${currentAlpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(star.x + offsetX, star.y + offsetY, star.size * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Slow upward drift
        star.y -= 0.15 * star.z;
        if (star.y < -10) {
          star.y = height + 10;
          star.x = Math.random() * width;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
