import type { IntentNode, IntentPlan } from '@texo-ui/core';

function hasKeyword(prompt: string, keywords: string[]): boolean {
  return keywords.some((keyword) => prompt.includes(keyword));
}

export function generateMockIntentPlan(promptInput: string): IntentPlan {
  const prompt = promptInput.toLowerCase();
  const nodes: IntentNode[] = [];
  let id = 1;
  const nextId = (prefix: string): string => `${prefix}-${id++}`;

  nodes.push({
    id: nextId('text'),
    type: 'text',
    title: 'Plan summary',
    content: `Generated from prompt: ${promptInput}`,
  });

  if (hasKeyword(prompt, ['form', 'input', 'signup', 'login', '입력', '폼'])) {
    nodes.push({
      id: nextId('input'),
      type: 'input',
      name: 'name',
      label: 'Name',
      placeholder: 'Jane Doe',
    });
    nodes.push({
      id: nextId('input'),
      type: 'input',
      name: 'email',
      label: 'Email',
      inputType: 'email',
    });
    nodes.push({ id: nextId('button'), type: 'button', label: 'Submit', action: 'submit-form' });
  }

  if (hasKeyword(prompt, ['dashboard', 'chart', 'report', 'analytics', '매출', '차트'])) {
    nodes.push({
      id: nextId('chart'),
      type: 'chart',
      chartType: 'bar',
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      series: [{ name: 'Visits', values: [120, 180, 90, 220, 260] }],
    });
    nodes.push({
      id: nextId('table'),
      type: 'table',
      columns: ['metric', 'value'],
      rows: [
        { metric: 'Conversion', value: '2.8%' },
        { metric: 'Revenue', value: '$12,400' },
      ],
    });
  }

  if (hasKeyword(prompt, ['todo', 'task', 'checklist', '할일'])) {
    nodes.push({
      id: nextId('stack'),
      type: 'stack',
      direction: 'column',
      gap: 10,
      title: 'Task board',
      children: [],
    });
    nodes.push({
      id: nextId('input'),
      type: 'input',
      name: 'task',
      label: 'New task',
      placeholder: 'Write docs',
    });
    nodes.push({
      id: nextId('button'),
      type: 'button',
      label: 'Add task',
      action: 'add-task',
      variant: 'secondary',
    });
  }

  if (nodes.length <= 1) {
    nodes.push({
      id: nextId('grid'),
      type: 'grid',
      columns: 2,
      title: 'Quick layout',
      children: [],
    });
    nodes.push({
      id: nextId('input'),
      type: 'input',
      name: 'query',
      label: 'Search',
      placeholder: 'Ask something',
    });
    nodes.push({ id: nextId('button'), type: 'button', label: 'Run', action: 'run-query' });
  }

  return {
    version: '1.0',
    meta: {
      prompt: promptInput,
      generatedAt: new Date().toISOString(),
      locale: 'en-US',
    },
    root: {
      id: 'screen-1',
      type: 'screen',
      title: 'Generated UI',
      children: nodes,
    },
  };
}
