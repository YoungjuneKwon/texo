import { useMemo, useState } from 'react';
import type { DirectiveComponentProps } from '../../shared';
import { useDirectiveAction } from '../../shared';
import type { TarotDeckAttributes } from './types';

const CARD_BACK = '✦';

export function TarotDeck({
  attributes,
  status,
  onAction,
}: DirectiveComponentProps<TarotDeckAttributes>): JSX.Element {
  const emit = useDirectiveAction(onAction);
  const count = attributes.cardCount ?? 3;
  const mode = attributes.mode ?? 'pick';
  const [picked, setPicked] = useState<number[]>([]);
  const placeholders = useMemo(
    () => Array.from({ length: Math.max(3, count) }, (_, i) => i),
    [count],
  );

  const togglePick = (idx: number): void => {
    if (mode !== 'pick') {
      return;
    }
    const has = picked.includes(idx);
    const next = has
      ? picked.filter((v) => v !== idx)
      : picked.length < count
        ? [...picked, idx]
        : picked;
    setPicked(next);
    if (next.length === count) {
      emit({ type: 'pick-complete', directive: 'tarot-deck', value: next });
    }
  };

  return (
    <section style={{ border: '1px solid #ddd', borderRadius: 12, padding: 16 }}>
      <h3>Tarot Deck · {mode}</h3>
      <p style={{ color: '#666' }}>
        Spread: {attributes.spread ?? 'three-card'} · {status}
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(100px,1fr))',
          gap: 10,
        }}
      >
        {(mode === 'reveal' ? (attributes.cards ?? []) : placeholders).map((card, idx) => {
          const revealed = mode === 'reveal';
          const selected = picked.includes(idx);
          return (
            <button
              key={`tarot-${idx}`}
              type="button"
              onClick={() => togglePick(idx)}
              style={{
                minHeight: 140,
                borderRadius: 10,
                border: selected ? '2px solid #2563eb' : '1px solid #a78bfa',
                background: revealed ? '#111827' : '#312e81',
                color: 'white',
                transform:
                  revealed && (card as { reversed?: boolean }).reversed ? 'rotate(180deg)' : 'none',
                transition: 'transform .5s ease, opacity .3s ease',
              }}
            >
              {revealed ? (
                <>
                  <div>{(card as { name?: string }).name}</div>
                  <small>{(card as { meaning?: string }).meaning}</small>
                </>
              ) : (
                <span style={{ fontSize: 28 }}>{CARD_BACK}</span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
