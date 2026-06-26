"use client";
import { useState, useEffect } from "react";
import { STYLES, type StyleKey } from "@/lib/styles";
import StyleCard from "@/components/StyleCard";
import InputBox from "@/components/InputBox";
import OutputBox from "@/components/OutputBox";
import ParticleBackground from "@/components/ParticleBackground";
import PromptDrawer from "@/components/PromptDrawer";
import { BarChart3, TrendingUp, Clock, Download, Eye } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const COLORS = ['#A855F7', '#22C55E', '#EAB308', '#F472B6', '#3B82F6', '#EF4444'];

export default function Home() {
  const [text, setText] = useState("");
  const [activeKey, setActiveKey] = useState<StyleKey>("genz");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState<{ styleAccuracy: number; entertainment: number; faithfulness: number; overall: number } | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  
  // Prompt Drawer State
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const activeStyle = STYLES.find((s) => s.key === activeKey)!;
  const t = activeStyle.theme;

  // Fetch history from SQLite API
  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/history");
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (e) {
      console.error("Failed to fetch history", e);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Reset output when style changes
  useEffect(() => {
    setOutput("");
    setScores(null);
  }, [activeKey]);

  const handleSubmit = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setOutput("");
    setScores(null);

    try {
      const res = await fetch("/api/transform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, styleKey: activeKey }),
      });
      if (!res.ok || !res.body) throw new Error();

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value);
        setOutput(result);
      }

      // Score and Save to DB
      const scoreRes = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: text, output: result, styleName: activeStyle.name, styleKey: activeKey }),
      });
      const scoreData = await scoreRes.json();
      setScores(scoreData);
      
      // Refresh history
      fetchHistory();

    } catch (e) {
      setOutput("Transformation failed.");
    } finally {
      setLoading(false);
    }
  };

  // View Prompt Engineering
  const handleViewPrompt = async () => {
    const res = await fetch("/api/transform", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, styleKey: activeKey, returnPromptOnly: true }),
    });
    const data = await res.json();
    setCurrentPrompt(data.prompt);
    setIsPromptOpen(true);
  };

  // CSV Export - Robust version
  const handleExportCSV = () => {
    if (history.length === 0) return;
    
    const headers = "ID,Input,Output,Style,Timestamp,Accuracy,Entertainment,Faithfulness,Overall\n";
    const rows = history.map(h => 
      `"${h.id}","${h.input.replace(/"/g, '""')}","${h.output.replace(/"/g, '""')}","${h.style}",${h.timestamp},${h.scores.styleAccuracy},${h.scores.entertainment},${h.scores.faithfulness},${h.scores.overall}`
    ).join("\n");
    
    const csv = headers + rows;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vibeshift_history_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Dashboard Data
  const styleCounts = history.reduce((acc: Record<string, number>, h) => {
    acc[h.style] = (acc[h.style] || 0) + 1; return acc;
  }, {});
  const mostUsed = Object.entries(styleCounts).sort((a,b) => (b[1] as number) - (a[1] as number))[0]?.[0] || "N/A";
  const avgQuality = Math.round((history.reduce((sum, h) => sum + (h.scores?.overall || 0), 0) / history.length) * 10) / 10 || 0;
  
  const pieData = Object.entries(styleCounts).map(([style, count]) => ({
    name: STYLES.find(s => s.key === style)?.name || style,
    value: count as number,
  }));

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B0B0B] to-[#141414] text-white relative overflow-x-hidden font-sans flex flex-col items-center">
      
      <ParticleBackground style={activeStyle} />
      <PromptDrawer isOpen={isPromptOpen} onClose={() => setIsPromptOpen(false)} prompt={currentPrompt} styleName={activeStyle.name} />

      {/* HEADER */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-8 pb-2 flex justify-between items-center border-b border-white/5 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-700"
               style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accent2})`, boxShadow: `0 4px 15px ${t.glow}` }}>
            V
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight transition-colors duration-500" style={{ color: t.text }}>
              VibeShift
            </h1>
          </div>
        </div>

        <button 
          onClick={() => setShowDashboard(!showDashboard)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1c1f] border border-[#2a2a2e] hover:bg-[#2a2a2e] transition-all text-sm text-zinc-400 hover:text-white"
        >
          <BarChart3 size={16} />
          {showDashboard ? "Hide Analytics" : "Analytics"}
        </button>
      </div>

      {/* MAIN APP */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 space-y-6 pb-12">
        
        <div className="space-y-3 animate-enter">
          <div className="flex justify-between items-center">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Select a vibe</p>
            <button 
              onClick={handleViewPrompt}
              disabled={!text.trim()}
              className="text-xs flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Eye size={12} /> View Raw Prompt
            </button>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {STYLES.map((s, i) => (
              <div key={s.key} className={`animate-enter-${(i % 3) + 1} w-[calc(50%-6px)] md:w-[calc(16.666%-12px)] min-w-[100px]`}>
                <StyleCard style={s} isActive={s.key === activeKey} onClick={() => setActiveKey(s.key)} />
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-xl bg-[#18181b] border border-[#27272a] p-4 flex items-center gap-4 transition-all duration-500 animate-enter-1 ${activeStyle.theme.fontClass}`}
             style={{ borderColor: t.border, background: t.badge }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg bg-[#0A0A0A]" style={{ color: t.accent }}>
            {activeStyle.emoji}
          </div>
          <div>
            <p className="text-sm font-semibold transition-colors duration-500" style={{ color: t.accent }}>{activeStyle.name}</p>
            <p className="text-xs text-zinc-500 transition-colors duration-500">{activeStyle.tagline}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-enter-2 items-stretch">
          <div className="h-full flex flex-col">
            <InputBox value={text} onChange={setText} style={activeStyle} onSubmit={handleSubmit} loading={loading} />
          </div>
          <div className="h-full flex flex-col">
            <OutputBox output={output} loading={loading} style={activeStyle} scores={scores} />
          </div>
        </div>
      </div>

      {/* DASHBOARD */}
      {showDashboard && (
        <div className="relative z-10 w-full bg-[#0F0F0F] border-t border-[#27272a] mt-4">
          <div className="max-w-5xl mx-auto px-6 py-10 animate-enter-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-semibold flex items-center gap-2 text-zinc-300">
                <TrendingUp size={18} /> Analytics Dashboard
              </h2>
              {history.length > 0 && (
                <button 
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Download size={14} /> Export CSV
                </button>
              )}
            </div>
            
            {history.length === 0 ? (
              <div className="text-zinc-500 text-sm text-center py-12 border border-dashed border-[#27272a] rounded-xl">
                No transformations recorded yet. Try transforming some text!
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="rounded-xl bg-[#18181b] border border-[#27272a] p-5 transition-colors duration-700" style={{ borderColor: t.border }}>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">Total Transforms</div>
                    <div className="text-2xl font-bold text-white mt-1">{history.length}</div>
                  </div>
                  <div className="rounded-xl bg-[#18181b] border border-[#27272a] p-5 transition-colors duration-700" style={{ borderColor: t.border }}>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">Most Used Style</div>
                    <div className="text-2xl font-bold text-white mt-1 capitalize">{mostUsed}</div>
                  </div>
                  <div className="rounded-xl bg-[#18181b] border border-[#27272a] p-5 transition-colors duration-700" style={{ borderColor: t.border }}>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">Avg. Quality</div>
                    <div className="text-2xl font-bold text-white mt-1">{avgQuality}/10</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="rounded-xl bg-[#18181b] border border-[#27272a] p-5 h-64 transition-colors duration-700" style={{ borderColor: t.border }}>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Style Distribution</p>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                          {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="rounded-xl bg-[#18181b] border border-[#27272a] p-5 h-64 transition-colors duration-700" style={{ borderColor: t.border }}>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Quality Trend</p>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={history.slice().reverse().map(h => ({ time: new Date(h.timestamp).toLocaleTimeString(), score: h.scores?.overall || 0 }))}>
                        <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                        <XAxis dataKey="time" stroke="#52525b" tick={{fill: '#52525b', fontSize: 10}} />
                        <YAxis stroke="#52525b" tick={{fill: '#52525b', fontSize: 10}} />
                        <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff' }} />
                        <Line type="monotone" dataKey="score" stroke="#A855F7" strokeWidth={2} dot={{fill: '#A855F7', strokeWidth: 2, r: 4}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="rounded-xl bg-[#18181b] border border-[#27272a] p-5 max-h-48 overflow-y-auto custom-scrollbar" style={{ borderColor: t.border }}>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Recent Activity</div>
                  <div className="space-y-2">
                    {history.slice(0, 5).map((h) => (
                      <div key={h.id} className="flex justify-between items-center p-3 bg-[#27272a] rounded-lg">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-sm text-zinc-300 truncate max-w-[200px]">{h.input.substring(0, 40)}...</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[#18181b] text-zinc-400 border border-[#3f3f46] shrink-0">{h.style}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500 shrink-0 ml-2">
                          <Clock size={12} />
                          {new Date(h.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}