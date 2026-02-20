import type { Scenario } from '../../utils/stream-simulator';

export const inventoryScenario: Scenario = {
  id: 'inventory',
  name: 'RPG Inventory',
  category: 'casual',
  systemPrompt:
    'Generate inventory management UI using texo-table, texo-button, texo-chart. Apply a dark-theme preset.',
  content: `Manage your inventory\n\n::: texo-table\ncolumns: ["item", "qty", "rarity"]\nrows:\n  - item: "Health Potion"\n    qty: 3\n    rarity: "common"\n  - item: "Flame Sword"\n    qty: 1\n    rarity: "legendary"\n  - item: "Mana Elixir"\n    qty: 5\n    rarity: "rare"\n:::\n\n::: texo-button\nlabel: "Use Potion"\naction: "use-potion"\nvariant: "primary"\n:::\n\n::: texo-button\nlabel: "Inspect Sword"\naction: "inspect-sword"\nvariant: "secondary"\n:::\n\n::: texo-chart\nchartType: "bar"\nlabels: ["Common", "Rare", "Legendary"]\nseries:\n  - name: "items"\n    values: [10, 6, 2]\n:::`,
};
