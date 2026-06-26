"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { VibeStyle } from "@/lib/styles";

interface Props {
  output: string;
  loading: boolean;
  style: VibeStyle;
  scores: { styleAccuracy: number; entertainment: number; faithfulness: number; overall: number } | null;
}

export default function OutputBox({ output, loading, style: s, scores }: Props) {
  const [copied, setCopied] = useState(false);
  const t = s.theme;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!output && !loading) return null;

  return (
    <div className={`rounded-3xl bg-[#18181b] border-2 border-[#27272a] overflow-hidden flex flex-col h-full min-h-[300px] transition-all duration-700 ${t.fontClass}`}
         style={{ borderColor: t.border }}>
      <div className="p-5 border-b border-[#27272a] flex items-center justify-between transition-colors duration-700" style={{ borderColor: t.border }}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium transition-colors duration-700" style={{ color: t.accent }}>{s.name} Translation</span>
        </div>
        {output && !loading && (
          <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#27272a] hover:bg-[#3f3f46] transition-all text-xs text-zinc-400">
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {loading && (
          <div className="flex-1 space-y-3">
            <div className="h-4 w-full bg-[#27272a] rounded-full animate-pulse" />
            <div className="h-4 w-5/6 bg-[#27272a] rounded-full animate-pulse" />
            <div className="h-4 w-4/6 bg-[#27272a] rounded-full animate-pulse" />
          </div>
        )}

        {output && (
          <div className="flex-1 flex flex-col gap-6">
            <p className={`text-base leading-relaxed whitespace-pre-wrap text-zinc-200 transition-all duration-700 ${t.fontClass}`}>
              {output}
            </p>

            {/* Score Bars */}
            {scores && (
              <div className="mt-auto pt-4 border-t border-[#27272a] transition-colors duration-700" style={{ borderColor: t.border }}>
                <div className="text-xs text-zinc-500 mb-3 font-medium">Quality Assessment</div>
                <div className="space-y-3">
                  {[
                    { label: "Style Accuracy", value: scores.styleAccuracy },
                    { label: "Entertainment", value: scores.entertainment },
                    { label: "Faithfulness", value: scores.faithfulness },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-zinc-500">{item.label}</span>
                        <span style={{ color: t.accent }}>{item.value}/10</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#27272a] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${Math.min(Math.max(item.value, 0), 10) * 10}%`,
                            background: `linear-gradient(90deg, ${t.accent}, ${t.accent2})`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}