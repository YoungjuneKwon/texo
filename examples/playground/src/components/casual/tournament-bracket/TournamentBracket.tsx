import { useMemo, useState } from 'react';
import type { DirectiveComponentProps } from '../../shared';
import { useDirectiveAction } from '../../shared';
import type { TournamentBracketAttributes } from './types';

function pairItems(items: string[]): string[][] {
  const pairs: string[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push([items[i], items[i + 1]].filter(Boolean) as string[]);
  }
  return pairs;
}

export function TournamentBracket({
  attributes,
  status,
  onAction,
}: DirectiveComponentProps<TournamentBracketAttributes>): JSX.Element {
  const emit = useDirectiveAction(onAction);
  const [current, setCurrent] = useState<string[]>(attributes.items ?? []);
  const [winners, setWinners] = useState<string[]>([]);
  const pairs = useMemo(() => pairItems(current), [current]);

  const pickWinner = (winner: string): void => {
    const nextWinners = [...winners, winner];
    setWinners(nextWinners);
    if (nextWinners.length >= pairs.length) {
      if (nextWinners.length === 1) {
        emit({ type: 'winner', directive: 'tournament-bracket', value: nextWinners[0] });
      }
      setCurrent(nextWinners);
      setWinners([]);
    }
  };

  return (
    <section style={{ border: '1px solid #ddd', borderRadius: 12, padding: 16 }}>
      <h3>{attributes.title ?? 'Tournament Bracket'}</h3>
      <p style={{ color: '#666' }}>
        Round {Math.max(1, attributes.round ?? Math.log2(Math.max(current.length, 1)))} · {status}
      </p>
      <div style={{ display: 'grid', gap: 12 }}>
        {pairs.map((pair, idx) => (
          <div
            key={`pair-${idx}`}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}
          >
            {pair.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => pickWinner(item)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: '1px solid #bbb',
                  cursor: 'pointer',
                  transition: 'all .2s ease',
                }}
              >
                {item}
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
