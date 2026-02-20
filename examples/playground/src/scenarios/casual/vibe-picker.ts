import type { Scenario } from '../../utils/stream-simulator';

export const vibePickerScenario: Scenario = {
  id: 'vibe-picker',
  name: 'Vibe Picker',
  category: 'casual',
  systemPrompt:
    'Generate a preference picker with texo-button and texo-chart. Apply a dark-theme preset.',
  content: `Choose your interior vibe\n\n::: texo-grid\ntitle: "Select up to 2 vibes"\ncolumns: 2\n:::\n\n::: texo-button\nlabel: "Minimal"\naction: "pick-minimal"\nvariant: "secondary"\n:::\n\n::: texo-button\nlabel: "Vintage"\naction: "pick-vintage"\nvariant: "secondary"\n:::\n\n::: texo-button\nlabel: "Modern"\naction: "pick-modern"\nvariant: "secondary"\n:::\n\n::: texo-button\nlabel: "Natural"\naction: "pick-natural"\nvariant: "secondary"\n:::\n\n::: texo-chart\nchartType: "donut"\nlabels: ["Minimal", "Vintage", "Modern", "Natural"]\nseries:\n  - name: "votes"\n    values: [16, 9, 13, 7]\n:::`,
};
