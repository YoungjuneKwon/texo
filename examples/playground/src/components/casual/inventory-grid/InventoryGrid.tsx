import { useMemo, useState } from 'react';
import type { DirectiveComponentProps } from '../../shared';
import { useDirectiveAction } from '../../shared';
import type { InventoryGridAttributes, InventoryItem, Rarity } from './types';

const rarityBorder: Record<Rarity, string> = {
  common: '#9ca3af',
  rare: '#3b82f6',
  epic: '#8b5cf6',
  legendary: '#f59e0b',
};

export function InventoryGrid({
  attributes,
  onAction,
}: DirectiveComponentProps<InventoryGridAttributes>): JSX.Element {
  const emit = useDirectiveAction(onAction);
  const [dragging, setDragging] = useState<InventoryItem | null>(null);
  const columns = attributes.columns ?? 4;
  const slots = attributes.slots ?? 16;
  const items = attributes.items ?? [];
  const slotItems = useMemo(() => new Map(items.map((item) => [item.slot, item])), [items]);

  const triggerAction = (action: string): void => {
    if (!dragging) {
      return;
    }
    emit({ type: action, directive: 'inventory-grid', value: { item: dragging.id, action } });
    setDragging(null);
  };

  return (
    <section style={{ border: '1px solid #ddd', borderRadius: 12, padding: 16 }}>
      <h3>Inventory Grid</h3>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 8 }}>
        {Array.from({ length: slots }, (_, slot) => {
          const item = slotItems.get(slot);
          return (
            <div
              key={`slot-${slot}`}
              draggable={Boolean(item)}
              onDragStart={() => item && setDragging(item)}
              style={{
                aspectRatio: '1/1',
                borderRadius: 8,
                border: item ? `2px solid ${rarityBorder[item.rarity]}` : '1px dashed #d1d5db',
                display: 'grid',
                placeItems: 'center',
                position: 'relative',
              }}
              title={item ? `${item.name} · ${item.description ?? ''}` : 'Empty slot'}
            >
              <span style={{ fontSize: 22 }}>{item?.icon ?? ''}</span>
              {item ? (
                <small style={{ position: 'absolute', bottom: 4, right: 6 }}>{item.quantity}</small>
              ) : null}
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        {(attributes.actions ?? ['use', 'drop', 'inspect']).map((action) => (
          <button key={action} type="button" onClick={() => triggerAction(action)}>
            {action}
          </button>
        ))}
      </div>
    </section>
  );
}
