import type { Scenario } from '../../utils/stream-simulator';

export const tarotScenario: Scenario = {
  id: 'tarot',
  name: 'Tarot Reading',
  category: 'casual',
  systemPrompt:
    'Generate tarot-like mood UI using texo-grid, texo-button, texo-table. Apply a dark-theme preset.',
  content: `Daily card guidance\n\n::: texo-grid\ntitle: "Pick one card"\ncolumns: 3\n:::\n\n::: texo-button\nlabel: "Draw Left Card"\naction: "draw-left"\nvariant: "primary"\n:::\n\n::: texo-button\nlabel: "Draw Center Card"\naction: "draw-center"\nvariant: "secondary"\n:::\n\n::: texo-button\nlabel: "Draw Right Card"\naction: "draw-right"\nvariant: "ghost"\n:::\n\n::: texo-table\ncolumns: ["position", "card", "message"]\nrows:\n  - position: "Past"\n    card: "The Fool"\n    message: "Try a fresh angle."\n  - position: "Present"\n    card: "The Star"\n    message: "Keep steady hope."\n  - position: "Future"\n    card: "Strength"\n    message: "Stay patient and consistent."\n:::`,
};
