# VibeShift — LLM Style Transformer

<p align="center">
  <a href="https://vibe-shift-three.vercel.app">
    <img src="https://img.shields.io/badge/Live_Demo-Click_Here-8A2BE2?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"/>
  </a>
</p>

A text style transformer powered by Google Gemini. Paste any text and watch it get rewritten in Gen Z slang, Shakespearean English, Corporate speak, and more.

---

## Screenshots

<table>
  <tr>
    <td align="center" width="50%">
      <img src="images/genz-output.png" width="100%" alt="Gen Z Output"/>
      <sub>Gen Z Style</sub>
    </td>
    <td align="center" width="50%">
      <img src="images/prompt-drawer.png" width="100%" alt="Prompt Drawer"/>
      <sub>System Prompt Viewer</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="images/aunty-output.png" width="100%" alt="Aunty WhatsApp"/>
      <sub>Aunty WhatsApp Style</sub>
    </td>
    <td align="center" width="50%">
      <img src="images/analytics-dashboard.png" width="100%" alt="Analytics"/>
      <sub>Analytics Dashboard</sub>
    </td>
  </tr>
</table>

---

## Features

- **Few-shot prompting** — 4–5 curated examples per style injected into the system prompt
- **Prompt visualizer** — inspect the exact raw payload sent to the LLM
- **Quality scoring** — automated self-evaluation on style accuracy, faithfulness, and entertainment
- **Custom styles** — define your own vibe with a custom instruction
- **Prompt chaining** — chain two styles in sequence and see both outputs
- **SQLite history** — all transforms saved locally with timestamps and scores
- **Analytics dashboard** — style distribution, quality trends, and CSV export

---

## Tech Stack

| | |
|:---|:---|
| Frontend | Next.js 14, React, TypeScript, Tailwind CSS |
| LLM | Google Gemini (Flash Lite) |
| Database | better-sqlite3 |
| Charts | Recharts |
| Deployment | Vercel |

---

## Setup

```bash
git clone https://github.com/hhdjej/vibeshift.git
cd vibeshift
npm install
```

Create `.env.local`:
```
GEMINI_API_KEY=your_key_here
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## License

MIT
