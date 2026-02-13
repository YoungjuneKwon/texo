import type { CatalogComponent } from './types';

export const BUILTIN_COMPONENT_CATALOG: CatalogComponent[] = [
  {
    name: 'texo-stack',
    summary: 'Linear layout container for arranging child blocks.',
    props: [
      { name: 'direction', type: 'row|column', description: 'Main axis direction.' },
      { name: 'gap', type: 'number', description: 'Gap between child nodes.' },
      { name: 'title', type: 'string', description: 'Optional heading text.' },
    ],
    example: '::: texo-stack\ndirection: "column"\ngap: 12\ntitle: "Profile"\n:::',
  },
  {
    name: 'texo-button',
    summary: 'Action trigger button that emits an action payload.',
    props: [
      { name: 'label', type: 'string', required: true, description: 'Visible button text.' },
      { name: 'action', type: 'string', required: true, description: 'Action id to emit.' },
      { name: 'variant', type: 'primary|secondary|ghost', description: 'Visual style.' },
    ],
    example: '::: texo-button\nlabel: "Save"\naction: "save-form"\nvariant: "primary"\n:::',
  },
  {
    name: 'texo-input',
    summary: 'Labeled input field for text-like values.',
    props: [
      { name: 'label', type: 'string', required: true, description: 'Field label.' },
      { name: 'name', type: 'string', required: true, description: 'Field key.' },
      { name: 'inputType', type: 'text|number|email|date', description: 'HTML input type.' },
    ],
    example: '::: texo-input\nlabel: "Email"\nname: "email"\ninputType: "email"\n:::',
  },
  {
    name: 'texo-grid',
    summary: 'Grid layout helper for presenting cards and stats.',
    props: [
      { name: 'columns', type: 'number', description: 'Number of columns.' },
      { name: 'title', type: 'string', description: 'Optional heading text.' },
    ],
    example: '::: texo-grid\ncolumns: 2\ntitle: "Overview"\n:::',
  },
  {
    name: 'texo-table',
    summary: 'Simple table renderer for row data.',
    props: [
      { name: 'columns', type: 'string[]', required: true, description: 'Ordered column keys.' },
      { name: 'rows', type: 'object[]', required: true, description: 'Data rows.' },
    ],
    example:
      '::: texo-table\ncolumns: ["name", "value"]\nrows:\n  - name: "CPU"\n    value: 42\n:::',
  },
  {
    name: 'texo-chart',
    summary: 'Lightweight chart-like visualization for numeric series.',
    props: [
      {
        name: 'chartType',
        type: 'bar|line|pie|donut',
        required: true,
        description: 'Chart style.',
      },
      { name: 'labels', type: 'string[]', required: true, description: 'X-axis labels.' },
      {
        name: 'series',
        type: 'Array<{name:string,values:number[]}>',
        required: true,
        description: 'Numeric series by label index.',
      },
    ],
    example:
      '::: texo-chart\nchartType: "bar"\nlabels: ["Mon", "Tue"]\nseries:\n  - name: "Sales"\n    values: [12, 18]\n:::',
  },
];
