import type { Scenario } from '../../utils/stream-simulator';

export const tournamentScenario: Scenario = {
  id: 'tournament',
  name: 'Lunch Tournament',
  category: 'casual',
  systemPrompt:
    'Generate a lunch vote flow with texo-stack, texo-input, texo-button, texo-table. Apply a dark-theme preset.',
  content: `Lunch decision round\n\n::: texo-stack\ntitle: "Lunch Tournament Lite"\ndirection: "column"\ngap: 12\n:::\n\n::: texo-input\nlabel: "Candidate A"\nname: "candidateA"\nplaceholder: "Bibimbap"\n:::\n\n::: texo-input\nlabel: "Candidate B"\nname: "candidateB"\nplaceholder: "Kalguksu"\n:::\n\n::: texo-button\nlabel: "Vote Candidate A"\naction: "vote-a"\nvariant: "primary"\n:::\n\n::: texo-button\nlabel: "Vote Candidate B"\naction: "vote-b"\nvariant: "secondary"\n:::\n\n::: texo-table\ncolumns: ["option", "votes"]\nrows:\n  - option: "Candidate A"\n    votes: 12\n  - option: "Candidate B"\n    votes: 9\n:::`,
  chunkDelay: 30,
  chunkSize: 5,
};
