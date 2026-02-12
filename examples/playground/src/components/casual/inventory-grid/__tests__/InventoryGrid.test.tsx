import { describe, expect, it } from 'vitest';
import { InventoryGrid } from '../InventoryGrid';

describe('InventoryGrid', () => {
  it('exports component', () => {
    expect(InventoryGrid).toBeTypeOf('function');
  });
});
