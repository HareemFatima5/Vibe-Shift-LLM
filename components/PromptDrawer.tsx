// components/PromptDrawer.tsx
"use client";
import { X, Code } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  prompt: string;
  styleName: string;
}

export default function PromptDrawer({ isOpen, onClose, prompt, styleName }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getInstruction = (p: string) => {
    if (!p) return "";
    const parts = p.split("Here are some examples of this style:");
    return parts[0]?.trim() || "";
  };

  const getExamples = (p: string) => {
    if (!p) return "";
    if (!p.includes("Here are some examples of this style:")) return "No examples loaded";
    const parts = p.split("Here are some examples of this style:");
    const examplesPart = parts[1]?.split("Now rewrite the following text")[0] || "";
    return examplesPart.trim();
  };

  // FIX: Gets the LAST input in the prompt (which is the user's actual input)
  const getInput = (p: string) => {
    if (!p) return "Loading...";
    // Split by "Input:" and take the last one
    const parts = p.split('Input: "');
    if (parts.length > 1) {
      // Look at the last segment
      const lastPart = parts[parts.length - 1];
      const extracted = lastPart.split('"')[0];
      return extracted || "Unable to extract";
    }
    return "Unable to extract";
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`fixed right-0 top-0 h-full w-full max-w-2xl bg-[#121212] border-l border-[#27272a] z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="flex items-center justify-between p-6 border-b border-[#27272a]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Code size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Prompt Engineering</h2>
              <p className="text-xs text-zinc-500">Raw payload sent to Gemini for {styleName}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-[#0A0A0A] rounded-xl border border-[#27272a] p-4 overflow-auto max-h-[65vh] font-mono">
            
            <div className="text-xs text-zinc-500 mb-3 font-bold tracking-wider uppercase border-b border-[#27272a] pb-2">
              System Prompt Payload
            </div>

            <div className="text-xs md:text-sm text-zinc-300 whitespace-pre-wrap break-words leading-relaxed">
              <span className="text-pink-400 font-semibold"># INSTRUCTION</span>
              <br />
              <span className="text-zinc-400">{getInstruction(prompt)}</span>
              <br /><br />
              
              <span className="text-pink-400 font-semibold"># FEW-SHOT EXAMPLES</span>
              <br />
              <span className="text-zinc-400">{getExamples(prompt)}</span>
              <br /><br />
              
              <span className="text-pink-400 font-semibold"># CURRENT USER INPUT</span>
              <br />
              <span className="text-yellow-300">"{getInput(prompt)}"</span>
            </div>

          </div>
        </div>
        
        <div className="p-6 border-t border-[#27272a]">
          <p className="text-xs text-zinc-500">
            This exact prompt structure demonstrates Few-Shot prompting techniques used in production LLM apps.
          </p>
        </div>
      </div>
    </>
  );
}