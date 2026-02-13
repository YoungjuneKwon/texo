import type { KitComponent } from './types';
import { TexoButton, TexoChart, TexoGrid, TexoInput, TexoStack, TexoTable } from './components';

export function createBuiltInComponents(): Record<string, KitComponent> {
  return {
    'texo-stack': TexoStack,
    'texo-grid': TexoGrid,
    'texo-button': TexoButton,
    'texo-input': TexoInput,
    'texo-table': TexoTable,
    'texo-chart': TexoChart,
  };
}
