import { describe, expect, it } from 'vitest';
import { ImagePicker } from '../ImagePicker';

describe('ImagePicker', () => {
  it('exports component', () => {
    expect(ImagePicker).toBeTypeOf('function');
  });
});
