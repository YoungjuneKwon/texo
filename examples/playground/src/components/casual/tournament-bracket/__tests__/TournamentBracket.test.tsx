import { describe, expect, it } from 'vitest';
import { TournamentBracket } from '../TournamentBracket';

describe('TournamentBracket', () => {
  it('exports component', () => {
    expect(TournamentBracket).toBeTypeOf('function');
  });
});
