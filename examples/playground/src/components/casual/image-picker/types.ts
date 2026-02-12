export interface ImagePickerOption {
  id: string;
  image: string;
  label: string;
}

export interface ImagePickerAttributes {
  mode?: 'single' | 'multi-select';
  maxSelect?: number;
  title?: string;
  options: ImagePickerOption[];
}
