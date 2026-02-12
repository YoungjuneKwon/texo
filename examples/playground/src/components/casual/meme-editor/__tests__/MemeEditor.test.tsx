import { describe, expect, it } from 'vitest';
import { MemeEditor } from '../MemeEditor';

describe('MemeEditor', () => {
  it('exports component', () => {
    expect(MemeEditor).toBeTypeOf('function');
  });
});
