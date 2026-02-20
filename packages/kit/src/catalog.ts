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
      {
        name: 'stylePreset',
        type: 'compact|wide|raised|pill|flat|outline-bold',
        description: 'Optional shape/size/shadow preset.',
      },
    ],
    example:
      '::: texo-button\nlabel: "Save"\naction: "save-form"\nvariant: "primary"\nstylePreset: "raised"\n:::',
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
      {
        name: 'xAxisMode',
        type: 'label|index|date',
        description: 'Line chart x-axis mode.',
      },
      {
        name: 'xEditable',
        type: 'boolean',
        description: 'Enable interactive x-axis controls.',
      },
      {
        name: 'startDate',
        type: 'YYYY-MM-DD',
        description: 'Dataset start date when xAxisMode is date.',
      },
      {
        name: 'rangeStartDate',
        type: 'YYYY-MM-DD',
        description: 'Visible range start date for line chart.',
      },
      {
        name: 'rangeEndDate',
        type: 'YYYY-MM-DD',
        description: 'Visible range end date for line chart.',
      },
      {
        name: 'dayStep',
        type: 'number',
        description: 'Date increment step in days.',
      },
    ],
    example:
      '::: texo-chart\nchartType: "line"\nxAxisMode: "date"\nxEditable: true\nstartDate: "2026-02-01"\nrangeStartDate: "2026-02-05"\nrangeEndDate: "2026-02-20"\ndayStep: 1\nlabels: ["1", "2", "3"]\nseries:\n  - name: "Sales"\n    values: [12, 18, 16]\n:::',
  },
  {
    name: 'texo-rect',
    summary: 'Draw a simple rectangle block using SVG.',
    props: [
      { name: 'width', type: 'number', description: 'Rectangle width in px.' },
      { name: 'height', type: 'number', description: 'Rectangle height in px.' },
      { name: 'radius', type: 'number', description: 'Corner radius.' },
      { name: 'fill', type: 'string', description: 'Fill color.' },
      { name: 'stroke', type: 'string', description: 'Border color.' },
      { name: 'strokeWidth', type: 'number', description: 'Border thickness.' },
    ],
    example:
      '::: texo-rect\nwidth: 240\nheight: 120\nradius: 12\nfill: "#1d4ed8"\nstroke: "#93c5fd"\nstrokeWidth: 2\n:::',
  },
  {
    name: 'texo-svg',
    summary: 'Render custom SVG shapes from a declarative list.',
    props: [
      { name: 'width', type: 'number', description: 'Rendered max width in px.' },
      { name: 'height', type: 'number', description: 'Rendered minimum height in px.' },
      { name: 'viewBox', type: 'string', description: 'SVG viewBox value.' },
      { name: 'background', type: 'string', description: 'Optional background fill.' },
      {
        name: 'shapes',
        type: 'Array<{type:string,...attrs}>',
        required: true,
        description: 'Supported types: rect,circle,ellipse,line,path,polyline,polygon,text.',
      },
    ],
    example:
      '::: texo-svg\nwidth: 320\nheight: 180\nviewBox: "0 0 320 180"\nshapes:\n  - type: "rect"\n    x: 20\n    y: 20\n    width: 120\n    height: 80\n    rx: 10\n    fill: "#0ea5e9"\n  - type: "text"\n    x: 28\n    y: 66\n    fill: "#ffffff"\n    font-size: 14\n    text: "Hello SVG"\n:::',
  },
];
