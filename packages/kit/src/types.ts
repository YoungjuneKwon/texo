import type React from 'react';

export interface CatalogProp {
  name: string;
  type: string;
  required?: boolean;
  description: string;
}

export interface CatalogComponent {
  name: string;
  summary: string;
  props: CatalogProp[];
  example: string;
}

export type KitComponent = React.ComponentType<Record<string, unknown>>;
