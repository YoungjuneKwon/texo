import type { Scenario } from '../../utils/stream-simulator';

export const memeScenario: Scenario = {
  id: 'meme',
  name: 'Meme Editor',
  category: 'casual',
  systemPrompt:
    'Generate a meme caption workflow using texo-input, texo-button, texo-table. Apply a dark-theme preset.',
  content: `Caption board\n\n::: texo-stack\ntitle: "Meme Caption Builder"\ndirection: "column"\ngap: 10\n:::\n\n::: texo-input\nlabel: "Top text"\nname: "topText"\nplaceholder: "WHEN BUILD PASSES"\n:::\n\n::: texo-input\nlabel: "Bottom text"\nname: "bottomText"\nplaceholder: "ON FRIDAY NIGHT"\n:::\n\n::: texo-button\nlabel: "Preview Caption"\naction: "preview-caption"\nvariant: "primary"\n:::\n\n::: texo-button\nlabel: "Export Meme"\naction: "export-meme"\nvariant: "secondary"\n:::\n\n::: texo-table\ncolumns: ["slot", "value"]\nrows:\n  - slot: "Top"\n    value: "WHEN BUILD PASSES"\n  - slot: "Bottom"\n    value: "ON FRIDAY NIGHT"\n:::`,
};
