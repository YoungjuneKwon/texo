import type { IntentNode, IntentPlan } from '@texo-ui/core';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function scalarToYaml(value: unknown): string {
  if (typeof value === 'string') {
    return JSON.stringify(value);
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (value === null) {
    return 'null';
  }
  return JSON.stringify(String(value));
}

function toYaml(value: unknown, indent = 0): string {
  const pad = '  '.repeat(indent);
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '[]';
    }
    return value
      .map((entry) => {
        if (isPlainObject(entry) || Array.isArray(entry)) {
          return `${pad}- ${toYaml(entry, indent + 1).replace(/^\s+/, '')}`;
        }
        return `${pad}- ${scalarToYaml(entry)}`;
      })
      .join('\n');
  }

  if (isPlainObject(value)) {
    const entries = Object.entries(value);
    if (entries.length === 0) {
      return '{}';
    }
    return entries
      .map(([key, entry]) => {
        if (Array.isArray(entry) || isPlainObject(entry)) {
          return `${pad}${key}:\n${toYaml(entry, indent + 1)}`;
        }
        return `${pad}${key}: ${scalarToYaml(entry)}`;
      })
      .join('\n');
  }

  return `${pad}${scalarToYaml(value)}`;
}

function toDirective(
  node: IntentNode,
): { name: string; attributes: Record<string, unknown> } | null {
  switch (node.type) {
    case 'stack':
      return {
        name: 'texo-stack',
        attributes: { title: node.title, direction: node.direction, gap: node.gap },
      };
    case 'grid':
      return { name: 'texo-grid', attributes: { title: node.title, columns: node.columns } };
    case 'button':
      return {
        name: 'texo-button',
        attributes: { label: node.label, action: node.action, variant: node.variant },
      };
    case 'input':
      return {
        name: 'texo-input',
        attributes: {
          label: node.label,
          name: node.name,
          inputType: node.inputType,
          placeholder: node.placeholder,
        },
      };
    case 'table':
      return { name: 'texo-table', attributes: { columns: node.columns, rows: node.rows } };
    case 'chart':
      return {
        name: 'texo-chart',
        attributes: { chartType: node.chartType, labels: node.labels, series: node.series },
      };
    default:
      return null;
  }
}

export function compileIntentPlanToTexo(plan: IntentPlan): string {
  const lines: string[] = ['# Generated UI', ''];

  for (const node of plan.root.children) {
    if (node.type === 'text') {
      lines.push(node.content);
      lines.push('');
      continue;
    }

    const directive = toDirective(node);
    if (!directive) {
      continue;
    }
    lines.push(`::: ${directive.name}`);
    lines.push(toYaml(directive.attributes));
    lines.push(':::');
    lines.push('');
  }

  return lines.join('\n').trim();
}
