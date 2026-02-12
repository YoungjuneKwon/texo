import { useState } from 'react';
import type { DirectiveComponentProps } from '../../shared';
import { useDirectiveAction } from '../../shared';
import type { ImagePickerAttributes } from './types';

export function ImagePicker({
  attributes,
  onAction,
}: DirectiveComponentProps<ImagePickerAttributes>): JSX.Element {
  const emit = useDirectiveAction(onAction);
  const max = attributes.maxSelect ?? 3;
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string): void => {
    const has = selected.includes(id);
    if (attributes.mode === 'single') {
      setSelected([id]);
      return;
    }
    if (!has && selected.length >= max) {
      return;
    }
    setSelected(has ? selected.filter((v) => v !== id) : [...selected, id]);
  };

  return (
    <section style={{ border: '1px solid #ddd', borderRadius: 12, padding: 16 }}>
      <h3>{attributes.title ?? 'Image Picker'}</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))',
          gap: 12,
        }}
      >
        {attributes.options.map((option) => {
          const isOn = selected.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggle(option.id)}
              style={{
                borderRadius: 10,
                border: isOn ? '2px solid #2563eb' : '1px solid #ccc',
                padding: 4,
                background: '#fff',
              }}
            >
              <img
                src={option.image}
                alt={option.label}
                loading="lazy"
                style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 8 }}
              />
              <div>{option.label}</div>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => emit({ type: 'confirm', directive: 'image-picker', value: selected })}
        style={{ marginTop: 12 }}
      >
        Confirm
      </button>
    </section>
  );
}
