import { useMemo, useState } from 'react';
import type { DirectiveComponentProps } from '../../shared';
import { useDirectiveAction } from '../../shared';
import type { MemeEditorAttributes } from './types';

export function MemeEditor({
  attributes,
  onAction,
}: DirectiveComponentProps<MemeEditorAttributes>): JSX.Element {
  const emit = useDirectiveAction(onAction);
  const [texts, setTexts] = useState(attributes.textBoxes ?? []);
  const size = useMemo(
    () => ({ width: attributes.width ?? 600, height: attributes.height ?? 400 }),
    [attributes.height, attributes.width],
  );

  const updateText = (idx: number, text: string): void => {
    setTexts((prev) => prev.map((row, i) => (i === idx ? { ...row, text } : row)));
  };

  return (
    <section style={{ border: '1px solid #ddd', borderRadius: 12, padding: 16 }}>
      <h3>Meme Editor</h3>
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: size.width,
          aspectRatio: `${size.width}/${size.height}`,
          background: attributes.backgroundImage
            ? `url(${attributes.backgroundImage}) center/cover`
            : '#111',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        {texts.map((box, idx) => (
          <input
            key={`meme-text-${idx}`}
            value={box.text}
            onChange={(e) => updateText(idx, e.target.value)}
            style={{
              position: 'absolute',
              left: '10%',
              right: '10%',
              top: box.position === 'top' ? '8%' : box.position === 'bottom' ? '80%' : '45%',
              textAlign: 'center',
              background: 'transparent',
              color: box.color ?? '#fff',
              fontSize: box.fontSize ?? 28,
              border: '1px dashed rgba(255,255,255,.4)',
            }}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => emit({ type: 'download', directive: 'meme-editor', value: texts })}
        style={{ marginTop: 12 }}
      >
        Download PNG
      </button>
    </section>
  );
}
