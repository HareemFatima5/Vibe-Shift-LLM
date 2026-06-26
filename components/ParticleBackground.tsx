"use client";
import { useEffect, useRef } from "react";
import type { VibeStyle } from "@/lib/styles";

interface Props {
  style: VibeStyle;
}

export default function ParticleBackground({ style }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = "";

    // Generate 50 sparkles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      
      // Random size (2px to 6px)
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      
      // Random speed (5s to 20s)
      const duration = Math.random() * 15 + 5;
      particle.style.animationDuration = `${duration}s`;
      
      // Random delay
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      // Color is set dynamically via CSS variable
      particle.style.transition = "background 0.8s ease";
      
      container.appendChild(particle);
    }
  }, []);

  // Update color based on style
  useEffect(() => {
    if (!containerRef.current) return;
    const particles = containerRef.current.querySelectorAll(".particle");
    particles.forEach((p) => {
      (p as HTMLElement).style.background = style.theme.accent;
      (p as HTMLElement).style.boxShadow = `0 0 6px ${style.theme.accent}`;
    });
  }, [style]);

  return <div ref={containerRef} className="particle-container" />;
}