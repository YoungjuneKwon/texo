import { TEXO_THEME_PRESETS, type ASTNode, type DirectiveNode, type RootNode } from '@texo-ui/core';
import React from 'react';
import { defaultRenderers, hasChildren } from './default-renderers';
import { DirectiveRenderer } from './directive-renderer';
import type { ComponentRegistry } from '../registry';
import type { FallbackProps } from './types';

type ThemeTokens = Record<string, string>;

interface GridCellDef {
  id: string;
  row: number;
  column: number;
  rowSpan: number;
  columnSpan: number;
}

interface GridEntry {
  kind: 'grid';
  key: string;
  id: string;
  rows: number;
  columns: number;
  cells: GridCellDef[];
  mountedByCellId: Map<string, React.ReactNode[]>;
  theme: ThemeTokens;
}

interface NodeEntry {
  kind: 'node';
  key: string;
  node: React.ReactNode;
}

type RootEntry = GridEntry | NodeEntry;

function isDirectiveNode(node: ASTNode): node is DirectiveNode {
  return node.type === 'directive';
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function asNumber(value: unknown, fallback: number): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.max(1, Math.floor(value));
  }
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return Math.max(1, Math.floor(parsed));
    }
  }
  return fallback;
}

function asFiniteNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }
  return undefined;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function mergeTheme(base: ThemeTokens, next: ThemeTokens): ThemeTokens {
  return { ...base, ...next };
}

function shouldUsePixelUnit(tokenKey: string): boolean {
  const normalized = tokenKey.toLowerCase();
  return (
    normalized === 'radius' ||
    normalized === 'paddingx' ||
    normalized === 'paddingy' ||
    normalized.endsWith('radius') ||
    normalized.endsWith('padding') ||
    normalized.endsWith('gap') ||
    normalized.endsWith('width') ||
    normalized.endsWith('height') ||
    normalized.endsWith('size') ||
    normalized.endsWith('margin')
  );
}

function serializeThemeToken(tokenKey: string, value: string | number): string {
  if (typeof value === 'string') {
    return value;
  }
  return shouldUsePixelUnit(tokenKey) ? `${value}px` : String(value);
}

function parseThemeTokens(attributes: Record<string, unknown>): ThemeTokens {
  const reserved = new Set([
    'scope',
    'mount',
    'target',
    'targetMount',
    'grid',
    'targetGrid',
    'tokens',
  ]);
  const tokens: ThemeTokens = {};
  const preset = asString(attributes.preset);

  if (preset && TEXO_THEME_PRESETS[preset]) {
    Object.assign(tokens, TEXO_THEME_PRESETS[preset]);
  }

  if (isObject(attributes.tokens)) {
    Object.entries(attributes.tokens).forEach(([key, value]) => {
      if (typeof value === 'string' && value.length > 0) {
        tokens[key] = serializeThemeToken(key, value);
      } else if (typeof value === 'number' && Number.isFinite(value)) {
        tokens[key] = serializeThemeToken(key, value);
      }
    });
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (reserved.has(key)) {
      return;
    }
    if (typeof value === 'string' && value.length > 0) {
      tokens[key] = serializeThemeToken(key, value);
    } else if (typeof value === 'number' && Number.isFinite(value)) {
      tokens[key] = serializeThemeToken(key, value);
    }
  });

  return tokens;
}

function themeToStyle(tokens: ThemeTokens): React.CSSProperties {
  const style: React.CSSProperties & Record<string, string> = {};
  Object.entries(tokens).forEach(([key, value]) => {
    style[`--texo-theme-${key}`] = value;
  });

  if (tokens.foreground) {
    style.color = tokens.foreground;
  }
  return style;
}

function parseGridCells(
  attributes: Record<string, unknown>,
  rows: number,
  columns: number,
): GridCellDef[] {
  const cells = attributes.cells;
  if (Array.isArray(cells) && cells.length > 0) {
    const rawCoords = cells
      .map((entry) => {
        if (!isObject(entry)) {
          return null;
        }
        return {
          row: asFiniteNumber(entry.row),
          column: asFiniteNumber(entry.column),
        };
      })
      .filter(
        (entry): entry is { row: number | undefined; column: number | undefined } => entry !== null,
      );

    const hasZeroRow = rawCoords.some((entry) => entry.row === 0);
    const hasZeroColumn = rawCoords.some((entry) => entry.column === 0);

    const parsed = cells
      .map((entry, index) => {
        if (!isObject(entry)) {
          return null;
        }
        const id = asString(entry.id) ?? `cell-${index + 1}`;
        const fallbackRow = Math.floor(index / columns) + 1;
        const fallbackColumn = (index % columns) + 1;
        const explicitRow = asFiniteNumber(entry.row);
        const explicitColumn = asFiniteNumber(entry.column);
        const row =
          explicitRow !== undefined
            ? hasZeroRow
              ? Math.floor(explicitRow) + 1
              : Math.floor(explicitRow)
            : fallbackRow;
        const column =
          explicitColumn !== undefined
            ? hasZeroColumn
              ? Math.floor(explicitColumn) + 1
              : Math.floor(explicitColumn)
            : fallbackColumn;
        const rowSpan = asNumber(entry.rowSpan, 1);
        const columnSpan = asNumber(entry.columnSpan ?? entry.colSpan, 1);
        return {
          id,
          row: Math.min(Math.max(row, 1), rows),
          column: Math.min(Math.max(column, 1), columns),
          rowSpan,
          columnSpan,
        };
      })
      .filter((entry): entry is GridCellDef => entry !== null);

    if (parsed.length > 0) {
      return parsed;
    }
  }

  const generated: GridCellDef[] = [];
  let index = 1;
  for (let row = 1; row <= rows; row += 1) {
    for (let column = 1; column <= columns; column += 1) {
      generated.push({ id: `cell-${index}`, row, column, rowSpan: 1, columnSpan: 1 });
      index += 1;
    }
  }
  return generated;
}

function withTheme(node: React.ReactNode, key: string, theme: ThemeTokens): React.ReactNode {
  if (Object.keys(theme).length === 0) {
    return node;
  }
  return (
    <div key={key} style={themeToStyle(theme)}>
      {node}
    </div>
  );
}

function renderNode(
  node: ASTNode,
  registry: ComponentRegistry,
  fallback?: React.ComponentType<FallbackProps>,
): React.ReactNode {
  if (node.type === 'directive') {
    return <DirectiveRenderer key={node.id} node={node} registry={registry} fallback={fallback} />;
  }

  const Renderer = defaultRenderers[node.type];
  const children = hasChildren(node)
    ? node.children?.map((child) => renderNode(child, registry, fallback))
    : undefined;

  return (
    <Renderer key={node.id} node={node}>
      {children}
    </Renderer>
  );
}

function shouldRenderDirectiveNode(
  node: DirectiveNode,
  registry: ComponentRegistry,
  directivesOnly?: boolean,
): boolean {
  if (!directivesOnly) {
    return true;
  }
  return registry.get(node.name) !== undefined;
}

function renderGridEntry(entry: GridEntry): React.ReactNode {
  return (
    <section
      key={entry.key}
      className="texo-grid-layout"
      style={{
        ...themeToStyle(entry.theme),
        display: 'grid',
        gap: 'var(--texo-theme-grid-gap, 12px)',
        gridTemplateColumns: `repeat(${entry.columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${entry.rows}, minmax(var(--texo-theme-grid-row-min-height, 64px), auto))`,
        margin: 'var(--texo-theme-grid-margin, 0.75em 0)',
        width: '100%',
      }}
    >
      {entry.cells.map((cell) => {
        const mounted = entry.mountedByCellId.get(cell.id) ?? [];
        return (
          <div
            key={`${entry.key}-${cell.id}`}
            data-texo-cell-id={cell.id}
            style={{
              gridColumn: `${cell.column} / span ${cell.columnSpan}`,
              gridRow: `${cell.row} / span ${cell.rowSpan}`,
              minHeight: 'var(--texo-theme-grid-cell-min-height, 64px)',
              minWidth: 0,
            }}
          >
            {mounted}
          </div>
        );
      })}
    </section>
  );
}

function renderRootWithMounting(
  ast: RootNode,
  registry: ComponentRegistry,
  fallback?: React.ComponentType<FallbackProps>,
  directivesOnly?: boolean,
): React.ReactNode {
  const entries: RootEntry[] = [];
  const gridById = new Map<string, GridEntry>();
  const cellToGrid = new Map<string, GridEntry>();
  const localThemeByMount = new Map<string, ThemeTokens>();
  const localThemeByGrid = new Map<string, ThemeTokens>();

  let globalTheme: ThemeTokens = {};
  let pendingLocalTheme: ThemeTokens | null = null;
  let gridCount = 0;

  const consumePendingTheme = (): ThemeTokens => {
    if (!pendingLocalTheme) {
      return {};
    }
    const theme = pendingLocalTheme;
    pendingLocalTheme = null;
    return theme;
  };

  ast.children.forEach((node) => {
    if (node.type === 'newline') {
      return;
    }

    if (directivesOnly && !isDirectiveNode(node)) {
      return;
    }

    if (isDirectiveNode(node) && node.name === 'texo-theme') {
      const scope = asString(node.attributes.scope) === 'local' ? 'local' : 'global';
      const tokens = parseThemeTokens(node.attributes);

      if (scope === 'global') {
        globalTheme = mergeTheme(globalTheme, tokens);
      } else {
        const mountTarget =
          asString(node.attributes.mount) ??
          asString(node.attributes.targetMount) ??
          asString(node.attributes.target);
        const gridTarget = asString(node.attributes.grid) ?? asString(node.attributes.targetGrid);

        if (mountTarget) {
          localThemeByMount.set(
            mountTarget,
            mergeTheme(localThemeByMount.get(mountTarget) ?? {}, tokens),
          );
        } else if (gridTarget) {
          localThemeByGrid.set(
            gridTarget,
            mergeTheme(localThemeByGrid.get(gridTarget) ?? {}, tokens),
          );
        } else {
          pendingLocalTheme = mergeTheme(pendingLocalTheme ?? {}, tokens);
        }
      }
      return;
    }

    if (isDirectiveNode(node) && node.name === 'texo-grid') {
      gridCount += 1;
      const rows = asNumber(node.attributes.rows, 1);
      const columns = asNumber(node.attributes.columns, 2);
      const gridId = asString(node.attributes.id) ?? `grid-${gridCount}`;
      const cells = parseGridCells(node.attributes, rows, columns);
      const mountedByCellId = new Map<string, React.ReactNode[]>();
      cells.forEach((cell) => {
        mountedByCellId.set(cell.id, []);
      });

      const gridTheme = mergeTheme(consumePendingTheme(), localThemeByGrid.get(gridId) ?? {});

      const entry: GridEntry = {
        kind: 'grid',
        key: node.id,
        id: gridId,
        rows,
        columns,
        cells,
        mountedByCellId,
        theme: gridTheme,
      };

      entries.push(entry);
      gridById.set(gridId, entry);
      cells.forEach((cell) => {
        cellToGrid.set(cell.id, entry);
        cellToGrid.set(`${gridId}:${cell.id}`, entry);
      });
      return;
    }

    if (isDirectiveNode(node)) {
      if (!shouldRenderDirectiveNode(node, registry, directivesOnly)) {
        consumePendingTheme();
        return;
      }

      const mountTarget = asString(node.attributes.mount);
      const nextTheme = mergeTheme(
        consumePendingTheme(),
        mountTarget ? (localThemeByMount.get(mountTarget) ?? {}) : {},
      );

      const renderedDirective = withTheme(
        <DirectiveRenderer key={node.id} node={node} registry={registry} fallback={fallback} />,
        `${node.id}-themed`,
        nextTheme,
      );

      if (mountTarget) {
        const directGrid = gridById.get(mountTarget);
        if (directGrid && directGrid.cells.length > 0) {
          const firstCell = directGrid.cells[0].id;
          const mounted = directGrid.mountedByCellId.get(firstCell) ?? [];
          mounted.push(renderedDirective);
          directGrid.mountedByCellId.set(firstCell, mounted);
          return;
        }

        const mountedGrid = cellToGrid.get(mountTarget);
        if (mountedGrid) {
          const cellId = mountTarget.includes(':') ? mountTarget.split(':')[1] : mountTarget;
          const mounted = mountedGrid.mountedByCellId.get(cellId) ?? [];
          mounted.push(renderedDirective);
          mountedGrid.mountedByCellId.set(cellId, mounted);
          return;
        }
      }

      entries.push({ kind: 'node', key: node.id, node: renderedDirective });
      return;
    }

    const nextTheme = consumePendingTheme();
    const renderedNode = withTheme(
      renderNode(node, registry, fallback),
      `${node.id}-node-theme`,
      nextTheme,
    );
    entries.push({ kind: 'node', key: node.id, node: renderedNode });
  });

  return (
    <div className="texo-root" style={themeToStyle(globalTheme)}>
      {entries.map((entry) => {
        if (entry.kind === 'grid') {
          return renderGridEntry(entry);
        }
        return <React.Fragment key={entry.key}>{entry.node}</React.Fragment>;
      })}
    </div>
  );
}

export function reconcile(
  ast: RootNode,
  registry: ComponentRegistry,
  fallback?: React.ComponentType<FallbackProps>,
  directivesOnly?: boolean,
): React.ReactNode {
  return renderRootWithMounting(ast, registry, fallback, directivesOnly);
}
