# VibeShift — LLM Style Transformer

<p align="center">
  <a href="https://vibe-shift-three.vercel.app">
    <img src="https://img.shields.io/badge/Live_Demo-Click_Here-8A2BE2?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo Badge"/>
  </a>
</p>

> **Live URL:** [https://vibe-shift-three.vercel.app](https://vibe-shift-three.vercel.app)

VibeShift is a production-grade **LLM text transformation engine** built with Next.js and Google's Gemini API. It goes beyond simple API wrappers demonstrating advanced prompt engineering, few-shot learning, automated quality scoring and persistent local analytics. 

## UI & Interface

<div align="center">
  <img src="images/genz-output.png" alt="Gen Z Transformation" width="45%" />
  <img src="images/prompt-drawer.png" alt="Prompt Engineering Drawer" width="45%" />
  <br />
  <img src="images/aunty-output.png" alt="Aunty WhatsApp Transformation" width="45%" />
  <img src="images/analytics-dashboard.png" alt="Analytics Dashboard" width="45%" />
</div>


## Engineering Highlights

### 1. Few-Shot Prompting & Prompt Engineering
Instead of basic zero-shot instructions, VibeShift utilizes a **curated few-shot example bank** (4-5 input/output pairs per style). These are dynamically injected into the system prompt before the user's text is sent to the LLM. 
- **Why it matters:** This guides the LLM to produce consistent, highly accurate stylistic outputs rather than guessing the tone.

### 2. System Prompt Visualizer
A dedicated **"View Raw Prompt"** drawer allows users (and recruiters) to inspect the exact raw payload sent to the Gemini API in real-time. 
- **Why it matters:** This proves the backend isn't just an API wrapper—it demonstrates a deep understanding of prompt structure and LLM context windows.

### 3. Automated Quality Scoring (LLM Self-Evaluation)
After every transformation, the output is sent back to Gemini via a secondary API route (`/api/score`) to rate the result on 3 axes:
- **Style Accuracy:** How well does it match the target style?
- **Entertainment Value:** How engaging is the output?
- **Faithfulness:** How well does it preserve the original meaning?

These scores are presented in live-animated progress bars under the output, adding transparency to the LLM's performance.

### 4. Dynamic Custom Style Generator
Users are not limited to pre-built styles. Through a modal window, they can create their **own custom vibe** by defining a system instruction and a style name. The app dynamically constructs a new prompt and adds it to the style selector instantly. (Persisted via `localStorage`).

### 5. Prompt Chaining ("Chain Vibes")
Users can run two styles in sequence. Example: **Corporate → Gen Z**. The text is first translated into Corporate buzzwords, and then that intermediate output is fed back into the pipeline to be translated into Gen Z slang. Both the intermediate and final outputs are displayed.

### 6. Persistent Local SQLite Database
Unlike standard demos that use ephemeral `localStorage`, VibeShift writes transformation history, input/output text, timestamp, and quality scores to a **local SQLite database** (`better-sqlite3`). 
- **Why it matters:** It demonstrates the ability to build persistent backend infrastructure, crucial for data science pipelines.

### 7. Interactive Analytics Dashboard with CSV Export
An integrated dashboard provides real-time insights:
- **Total Transforms & Most Used Style**
- **Average Quality Score**
- **Style Distribution (Pie Chart)** & **Quality Trend (Line Chart)** via Recharts
- **Recent Activity Feed**
- **One-click CSV Export** for offline data analysis (showcasing data extraction skills).

---

## Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 14 (App Router), React, TypeScript, Tailwind CSS |
| **UI Components** | Lucide React (Icons), Recharts (Data Visualization) |
| **LLM Provider** | Google Generative AI (Gemini 3.1 Flash Lite) |
| **Database** | Better-SQLite3 (Local persistent storage) |
| **Deployment** | Vercel (Production, CI/CD) |
| **Styling** | Custom CSS Animations, Glassmorphism, Dynamic Theme Switching |

---

## Project Structure

```text
vibe-shift/
├── app/
│   ├── api/
│   │   ├── classify/       # Style classification endpoint
│   │   ├── history/        # SQLite data retrieval endpoint
│   │   ├── score/          # Quality scoring endpoint
│   │   └── transform/      # Main LLM transformation endpoint
│   ├── page.tsx            # Main application UI
│   └── layout.tsx          # Root layout & metadata
├── components/
│   ├── StyleCard.tsx
│   ├── InputBox.tsx
│   ├── OutputBox.tsx
│   ├── ParticleBackground.tsx
│   ├── PromptDrawer.tsx
│   └── CustomStyleModal.tsx
├── lib/
│   ├── styles.ts           # Vibe themes & few-shot examples
│   └── db.ts               # SQLite database wrapper
├── images/                 # Screenshots for README
├── public/
├── .env.local              # Environment variables (GEMINI_API_KEY)
├── package.json
└── README.md
