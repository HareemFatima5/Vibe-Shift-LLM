"use client";
import type { VibeStyle } from "@/lib/styles";

interface Props {
  style: VibeStyle;
  isActive: boolean;
  onClick: () => void;
}

export default function StyleCard({ style, isActive, onClick }: Props) {
  const t = style.theme;

  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center text-center rounded-3xl p-4 transition-all duration-300 border-2 min-h-[95px] flex-1 w-full
        ${
          isActive 
            ? "bg-white/[0.06] border-[#333] shadow-[0_0_15px_rgba(255,255,255,0.05)]" 
            : "bg-[#18181b] border-[#27272a] hover:border-[#3f3f46] hover:bg-[#1c1c20]"
        }`
      }
      style={isActive ? { borderColor: t.accent, boxShadow: `0 0 20px ${t.glow}` } : {}}
    >
      {isActive && (
        <div 
          className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#0A0A0A] animate-pulse" 
          style={{ background: t.accent }} 
        />
      )}
      
      <div className="flex flex-col gap-1 w-full px-1">
        {/* FIX: Removed truncate to allow full text, added whitespace-normal */}
        <div className="text-sm font-semibold transition-colors duration-500 whitespace-normal leading-tight" 
             style={{ color: isActive ? t.accent : "#e4e4e7" }}>
          {style.name}
        </div>
        <div className="text-[10px] text-zinc-500 whitespace-normal leading-tight mt-0.5">
          {style.tagline}
        </div>
      </div>
    </button>
  );
}