export interface MemeTextBox {
  text: string;
  position?: 'top' | 'bottom' | 'center';
  fontSize?: number;
  color?: string;
}

export interface MemeEditorAttributes {
  backgroundImage?: string;
  width?: number;
  height?: number;
  textBoxes?: MemeTextBox[];
}
