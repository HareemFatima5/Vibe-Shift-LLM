"use client";
import type { VibeStyle } from "@/lib/styles";
import { ArrowRight } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  style: VibeStyle;
  onSubmit: () => void;
  loading: boolean;
}

export default function InputBox({ value, onChange, style: s, onSubmit, loading }: Props) {
  const t = s.theme;

  return (
    <div className={`rounded-3xl bg-[#18181b] border-2 border-[#27272a] overflow-hidden flex flex-col h-full transition-all duration-700 ${t.fontClass}`}
         style={{ borderColor: t.border }}>
      <div className="p-5 border-b border-[#27272a] transition-colors duration-700" style={{ borderColor: t.border }}>
        <p className="text-sm font-medium text-zinc-400">Input Text</p>
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste anything here..."
        rows={5}
        className={`flex-1 w-full bg-transparent resize-none p-5 text-base leading-relaxed text-zinc-200 placeholder:text-zinc-600 outline-none transition-all duration-700 ${t.fontClass}`}
      />
      
      <div className="p-4 border-t border-[#27272a] flex items-center justify-between transition-colors duration-700" style={{ borderColor: t.border }}>
        <p className="text-xs text-zinc-600">{value.length > 0 ? `${value.length} characters` : "Ready to transform"}</p>
        
        <button
          onClick={onSubmit}
          disabled={!value.trim() || loading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${t.accent}, ${t.accent2})`,
            boxShadow: `0 4px 15px ${t.glow}`,
          }}
        >
          {loading ? (
            <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <>
              Transform <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}