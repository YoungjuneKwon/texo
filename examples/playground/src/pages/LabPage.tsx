import { createRegistry, TexoRenderer, type TexoAction } from '@texo-ui/react';
import {
  BUILTIN_COMPONENT_CATALOG,
  createBuiltInComponents,
  type CatalogComponent,
} from '@texo-ui/kit';
import { validateIntentPlan, type RecoveryEvent } from '@texo-ui/core';
import { useMemo, useState } from 'react';
import { compileIntentPlanToTexo } from '../utils/intent-compiler';
import { generateMockIntentPlan } from '../utils/mock-llm-planner';

function streamText(
  content: string,
  setContent: (updater: (prev: string) => string) => void,
  onEnd: () => void,
): void {
  let index = 0;
  const chunkSize = 8;
  const tick = (): void => {
    if (index >= content.length) {
      onEnd();
      return;
    }
    const next = content.slice(index, index + chunkSize);
    index += chunkSize;
    setContent((prev) => prev + next);
    globalThis.setTimeout(tick, 20);
  };
  tick();
}

export function LabPage(): JSX.Element {
  const registry = useMemo(() => createRegistry(createBuiltInComponents()), []);
  const [prompt, setPrompt] = useState('Create a compact analytics dashboard with a filter form.');
  const [streamTextValue, setStreamTextValue] = useState('');
  const [planJson, setPlanJson] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [actions, setActions] = useState<TexoAction[]>([]);
  const [recoveryEvents, setRecoveryEvents] = useState<RecoveryEvent[]>([]);

  const run = (): void => {
    setErrors([]);
    setActions([]);
    setRecoveryEvents([]);
    setStreamTextValue('');

    const plan = generateMockIntentPlan(prompt);
    const validated = validateIntentPlan(plan);
    setPlanJson(JSON.stringify(plan, null, 2));
    if (!validated.ok || !validated.value) {
      setErrors(validated.errors);
      return;
    }

    const compiled = compileIntentPlanToTexo(validated.value);
    streamText(compiled, setStreamTextValue, () => {});
  };

  return (
    <section className="lab-page">
      <header className="lab-header">
        <h2>Generative Lab</h2>
        <p>Prompt -&gt; IntentPlan -&gt; Directive stream -&gt; Built-in UI rendering</p>
      </header>

      <div className="lab-grid">
        <article className="panel">
          <h3>Prompt</h3>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="lab-input"
            rows={5}
          />
          <button type="button" className="cta" onClick={run}>
            Generate Plan
          </button>
          {errors.length > 0 ? (
            <pre className="chat-box">{errors.map((error) => `- ${error}`).join('\n')}</pre>
          ) : null}
        </article>

        <article className="panel">
          <h3>Built-in Catalog</h3>
          <ul className="lab-catalog">
            {BUILTIN_COMPONENT_CATALOG.map((item: CatalogComponent) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                <p>{item.summary}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h3>IntentPlan JSON</h3>
          <pre className="chat-box">{planJson || 'Plan appears here after generation.'}</pre>
        </article>

        <article className="panel">
          <h3>Texo Stream</h3>
          <pre className="chat-box">{streamTextValue || 'Compiled directives stream here.'}</pre>
        </article>

        <article className="panel">
          <h3>Rendered UI</h3>
          <TexoRenderer
            content={streamTextValue}
            registry={registry}
            onAction={(action) => setActions((prev) => [...prev, action])}
            onError={(event) => setRecoveryEvents((prev) => [...prev, event])}
          />
        </article>

        <article className="panel">
          <h3>Interaction/Recovery Log</h3>
          <pre className="chat-box">
            {JSON.stringify({ actions, recoveryEvents }, null, 2) || 'No events yet.'}
          </pre>
        </article>
      </div>
    </section>
  );
}
