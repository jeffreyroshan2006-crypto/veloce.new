"use client";

import React, { useEffect, useRef } from "react";

export function CreamWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    // Define colors from the image (soft orange, deep royal purple, lavender)
    const blobColors = [
      "rgba(242, 166, 121, 0.7)", // soft orange
      "rgba(212, 196, 216, 0.6)", // subtle lavender
      "rgba(76, 29, 149, 0.7)", // deep royal purple
      "rgba(242, 166, 121, 0.5)", // soft orange again
    ];

    const drawLine = (
      ctx: CanvasRenderingContext2D,
      offset: number,
      yPos: number,
      amplitude: number,
      frequency: number,
      phase: number,
      opacity: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, yPos);

      // We draw a flowing bezier-like curve using sine waves
      for (let x = 0; x <= canvas.width; x += 5) {
        // Create an organic wave shape
        const normalizedX = x / canvas.width;

        // Base sine wave
        let y = yPos
          + Math.sin(normalizedX * frequency + phase) * amplitude
          + Math.sin(normalizedX * frequency * 1.5 + phase * 0.8) * amplitude * 0.5;

        // Tweak the wave to match the image's diagonal swoop
        // High on the left, dips in the middle, swoops up, then down on the right
        const diagonalSwoop = (canvas.height * 0.2) * Math.sin(normalizedX * Math.PI * 2);

        ctx.lineTo(x, y + diagonalSwoop + offset);
      }

      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fill background cream
      ctx.fillStyle = "#FDFBF7";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw blurry colored blobs following the string path
      ctx.globalCompositeOperation = "source-over";

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Blob 1: Orange sweeping from left
      ctx.beginPath();
      const grad1 = ctx.createRadialGradient(
        cx - canvas.width * 0.2 + Math.sin(time) * 50,
        cy - 100 + Math.cos(time * 0.8) * 50,
        0,
        cx - canvas.width * 0.2 + Math.sin(time) * 50,
        cy - 100 + Math.cos(time * 0.8) * 50,
        canvas.width * 0.3
      );
      grad1.addColorStop(0, blobColors[0]);
      grad1.addColorStop(1, "rgba(242, 166, 121, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Blob 2: Lavender in the middle
      ctx.beginPath();
      const grad2 = ctx.createRadialGradient(
        cx + Math.cos(time * 1.2) * 50,
        cy + 100 + Math.sin(time * 1.1) * 50,
        0,
        cx + Math.cos(time * 1.2) * 50,
        cy + 100 + Math.sin(time * 1.1) * 50,
        canvas.width * 0.25
      );
      grad2.addColorStop(0, blobColors[1]);
      grad2.addColorStop(1, "rgba(212, 196, 216, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Blob 3: Peach sweeping to right
      ctx.beginPath();
      const grad3 = ctx.createRadialGradient(
        cx + canvas.width * 0.3 + Math.sin(time * 0.9) * 50,
        cy + Math.cos(time * 1.3) * 50,
        0,
        cx + canvas.width * 0.3 + Math.sin(time * 0.9) * 50,
        cy + Math.cos(time * 1.3) * 50,
        canvas.width * 0.3
      );
      grad3.addColorStop(0, blobColors[2]);
      grad3.addColorStop(1, "rgba(240, 205, 162, 0)");
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);


      // Draw thin white wave lines over the blobs
      const numLines = 12;
      const baseAmplitude = canvas.height * 0.15;
      const baseFrequency = 3;
      const baseY = canvas.height * 0.45;

      for (let i = 0; i < numLines; i++) {
        const offset = i * 8 - (numLines * 4);
        const yPos = baseY + (i * 12);
        const opacity = 0.15 + (1 - i / numLines) * 0.3; // fade out bottom lines
        const phase = time * 0.5 + (i * 0.1);

        drawLine(ctx, offset, yPos, baseAmplitude, baseFrequency, phase, opacity);
      }

      // Add a very subtle noise/grain texture overlay
      // (Optional, can be heavy on performance, but adds to the premium feel)

      time += 0.005;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 bg-[#FDFBF7]"
      style={{ filter: "blur(2px) contrast(1.1) saturate(1.2)" }}
    />
  );
}
