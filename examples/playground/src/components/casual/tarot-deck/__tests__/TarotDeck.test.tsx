import { describe, expect, it } from 'vitest';
import { TarotDeck } from '../TarotDeck';

describe('TarotDeck', () => {
  it('exports component', () => {
    expect(TarotDeck).toBeTypeOf('function');
  });
});
