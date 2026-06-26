// lib/styles.ts
export type StyleKey = "genz" | "aunty" | "medieval" | "shakespeare" | "corporate" | "pirate" | "custom";

export interface VibeStyle {
  key: StyleKey;
  name: string;
  emoji: string;
  tagline: string;
  prompt: string;
  theme: {
    bg: string;
    cardBg: string;
    accent: string;
    accent2: string;
    text: string;
    textMuted: string;
    border: string;
    glow: string;
    outputBg: string;
    badge: string;
    badgeText: string;
    fontClass: string;
  };
}

export interface FewShotExample {
  input: string;
  output: string;
}

export const FEW_SHOT_EXAMPLES: Record<StyleKey, FewShotExample[]> = {
  genz: [
    { input: "I'm really excited about the new project.", output: "Lowkey hype for the project fr fr. It's giving main character energy rn." },
    { input: "The weather is nice for a walk.", output: "The vibes are immaculate. Need a park walk asap, no cap." },
    { input: "Send the report by Friday.", output: "Can you send the report by Friday? I need it for the meeting, ngl." },
    { input: "We should consider a different approach.", output: "We need to pivot the approach, it's not hitting the mark." }
  ],
  aunty: [
    { input: "I'll arrive at 8pm and stay until Tuesday.", output: "Assalamualaikum! You arrive at 8pm? MASHALLAH! Beta, have you eaten? I will make halwa!" },
    { input: "I got a promotion at work.", output: "Allah ka shukr! Promotion! Subhanallah! Beta, you work so hard. Don't forget your health!" },
    { input: "I'm going to the supermarket.", output: "Beta, going to the supermarket? Haan ji! Check the expiry dates, beta!" },
    { input: "My flight is delayed by two hours.", output: "Beta! Two hours delayed? Subhanallah! This is too much! Are you okay, beta?" }
  ],
  medieval: [
    { input: "I need to speak to the manager.", output: "HEAR YE! Prithee, I must speak with thy manager forthwith! Forsooth!" },
    { input: "We should meet at noon.", output: "Verily! We shall convene at the castle gates come noon! Hark!" },
    { input: "The weather is cold and rainy.", output: "Forsooth! A chill most bitter drencheth both knight and peasant!" },
    { input: "I am writing to my friend.", output: "Thus do I take quill in hand to send words to mine dear friend!" }
  ],
  shakespeare: [
    { input: "I love you so much.", output: "I love thee more than all the words that ever sprang from mortal tongue!" },
    { input: "We must win this game.", output: "Hark! This battle we must win to secure our place upon the final stage!" },
    { input: "I feel sad and lonely.", output: "Alas! What sorrow doth consume my soul! Wherefore is mine heart so heavy?" },
    { input: "She is very intelligent.", output: "O, she doth shine with intellect surpassing all! Her wit is sharper than a sword!" }
  ],
  corporate: [
    { input: "Get the project done by next week.", output: "Let's circle back. We need to leverage core competencies to deliver by next week." },
    { input: "This plan won't work.", output: "I suggest we pivot. The plan isn't scalable and hinders our KPIs." },
    { input: "Let's discuss the budget.", output: "We need to touch base on the budget. Stakeholder alignment is key." },
    { input: "I'm quitting to start my business.", output: "I'm pivoting my career to pursue entrepreneurship and create scalable value." }
  ],
  pirate: [
    { input: "I found treasure on the beach.", output: "AHOY! Shiver me timbers! I've plundered a treasure most fine!" },
    { input: "Leave the harbor before sunrise.", output: "Avast! We must weigh anchor before sunrise! Davy Jones awaits!" },
    { input: "He betrayed us and stole our cargo.", output: "That bilge rat! He hath betrayed us! He'll walk the plank!" },
    { input: "The journey was very long.", output: "Blimey! The journey across the seven seas were long and treacherous!" }
  ],
  custom: []
};

export const STYLES: VibeStyle[] = [
  {
    key: "genz",
    name: "Gen Z",
    emoji: "⚡",
    tagline: "digital native energy",
    // UPDATED: Chaotic Gen Z prompt with explicit emoji instructions
    prompt: `Rewrite this in Gen Z internet slang. Use: 'no cap', 'fr fr', 'bussin', 'slay', 'it's giving', 'lowkey', 'ngl', 'periodt', 'rent free'. Be chaotic but intelligent. Keep it punchy. Use emojis like 💀✨😭🙏💅. Sound exactly like a 19-year-old on Twitter/X at 2 AM. Overuse the word 'literally'.`,
    theme: {
      bg: "linear-gradient(135deg, #0F0A1E 0%, #1A0A2E 50%, #0A0F1E 100%)",
      cardBg: "rgba(139,92,246,0.08)",
      accent: "#A855F7",
      accent2: "#EC4899",
      text: "#F0E6FF",
      textMuted: "rgba(240,230,255,0.5)",
      border: "rgba(168,85,247,0.25)",
      glow: "rgba(168,85,247,0.3)",
      outputBg: "rgba(139,92,246,0.06)",
      badge: "rgba(168,85,247,0.15)",
      badgeText: "#C084FC",
      fontClass: "font-mono",
    },
  },
  {
    key: "aunty",
    name: "Aunty WhatsApp",
    emoji: "📱",
    tagline: "dramatic over-explanation",
    prompt: "Rewrite this as a South Asian aunty sending a WhatsApp message. Dramatic over-explaining, 'beta', 'mashallah', 'subhanallah', excessive punctuation!!!!, forwarded message energy, health tips. Start with 'Assalamualaikum beta' and end with a prayer.You can also use emojis where necessary",
    theme: {
      bg: "linear-gradient(135deg, #0A1A0F 0%, #0F2010 50%, #0A180A 100%)",
      cardBg: "rgba(34,197,94,0.06)",
      accent: "#22C55E",
      accent2: "#86EFAC",
      text: "#E0FFE8",
      textMuted: "rgba(224,255,232,0.5)",
      border: "rgba(34,197,94,0.2)",
      glow: "rgba(34,197,94,0.25)",
      outputBg: "rgba(34,197,94,0.05)",
      badge: "rgba(34,197,94,0.12)",
      badgeText: "#4ADE80",
      fontClass: "font-sans",
    },
  },
  {
    key: "medieval",
    name: "Medieval",
    emoji: "⚔️",
    tagline: "royal proclamation",
    prompt: "Rewrite this as a medieval proclamation. Use: 'Hear ye', 'forsooth', 'verily', 'henceforth', 'thou', 'thee', 'thy'. Add dramatic medieval flair — kingdoms, lords, peasants, quills. Start with 'HEAR YE HEAR YE' and end with a formal seal declaration.",
    theme: {
      bg: "linear-gradient(135deg, #1A1000 0%, #2A1800 50%, #1A0E00 100%)",
      cardBg: "rgba(234,179,8,0.06)",
      accent: "#EAB308",
      accent2: "#FDE047",
      text: "#FFFBEB",
      textMuted: "rgba(255,251,235,0.5)",
      border: "rgba(234,179,8,0.2)",
      glow: "rgba(234,179,8,0.25)",
      outputBg: "rgba(234,179,8,0.05)",
      badge: "rgba(234,179,8,0.12)",
      badgeText: "#FACC15",
      fontClass: "font-serif",
    },
  },
  {
    key: "shakespeare",
    name: "Shakespeare",
    emoji: "🎭",
    tagline: "iambic drama",
    prompt: "Rewrite this in Shakespearean Early Modern English. Use: 'dost', 'wouldst', 'wherefore', 'methinks', 'hark', 'prithee', 'fie', 'alas'. Make it poetic with iambic rhythm. Include dramatic soliloquy energy. Add theatrical stage directions in brackets.",
    theme: {
      bg: "linear-gradient(135deg, #0E0A1A 0%, #1A0E2A 50%, #120818 100%)",
      cardBg: "rgba(244,114,182,0.06)",
      accent: "#F472B6",
      accent2: "#E879F9",
      text: "#FFF0F8",
      textMuted: "rgba(255,240,248,0.5)",
      border: "rgba(244,114,182,0.2)",
      glow: "rgba(244,114,182,0.25)",
      outputBg: "rgba(244,114,182,0.05)",
      badge: "rgba(244,114,182,0.12)",
      badgeText: "#F9A8D4",
      fontClass: "font-serif",
    },
  },
  {
    key: "corporate",
    name: "Corporate",
    emoji: "💼",
    tagline: "buzzword mastery",
    prompt: "Rewrite this in maximum corporate buzzword speak. Use: 'synergize', 'leverage', 'circle back', 'deep dive', 'bandwidth', 'move the needle', 'low-hanging fruit', 'pivot', 'scalable', 'value-add', 'actionable insights'. Make it 3x longer than needed.",
    theme: {
      bg: "linear-gradient(135deg, #030712 0%, #0A1628 50%, #030B1A 100%)",
      cardBg: "rgba(59,130,246,0.06)",
      accent: "#3B82F6",
      accent2: "#60A5FA",
      text: "#EFF6FF",
      textMuted: "rgba(239,246,255,0.5)",
      border: "rgba(59,130,246,0.2)",
      glow: "rgba(59,130,246,0.25)",
      outputBg: "rgba(59,130,246,0.05)",
      badge: "rgba(59,130,246,0.12)",
      badgeText: "#93C5FD",
      fontClass: "font-sans",
    },
  },
  {
    key: "pirate",
    name: "Pirate",
    emoji: "🏴‍☠️",
    tagline: "swashbuckling adventure",
    prompt: "Rewrite this as a pirate speaking. Use: 'Arrr', 'matey', 'ye', 'yer', 'shiver me timbers', 'blimey', 'landlubber', 'Davy Jones', 'plunder', 'treasure', 'seven seas', 'walk the plank'. Be enthusiastic and dramatic. Reference ships, seas, gold.",
    theme: {
      bg: "linear-gradient(135deg, #0A0A0A 0%, #1A0A0A 50%, #100508 100%)",
      cardBg: "rgba(239,68,68,0.06)",
      accent: "#EF4444",
      accent2: "#FB923C",
      text: "#FFF5F5",
      textMuted: "rgba(255,245,245,0.5)",
      border: "rgba(239,68,68,0.2)",
      glow: "rgba(239,68,68,0.25)",
      outputBg: "rgba(239,68,68,0.05)",
      badge: "rgba(239,68,68,0.12)",
      badgeText: "#FCA5A5",
      fontClass: "font-sans",
    },
  },
  {
    key: "custom",
    name: "Custom Style",
    emoji: "✨",
    tagline: "your own vibe",
    prompt: "",
    theme: {
      bg: "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F0F1A 100%)",
      cardBg: "rgba(255,255,255,0.05)",
      accent: "#FFFFFF",
      accent2: "#AAAAAA",
      text: "#FFFFFF",
      textMuted: "rgba(255,255,255,0.5)",
      border: "rgba(255,255,255,0.1)",
      glow: "rgba(255,255,255,0.1)",
      outputBg: "rgba(255,255,255,0.03)",
      badge: "rgba(255,255,255,0.08)",
      badgeText: "#CCCCCC",
      fontClass: "font-sans",
    },
  },
];