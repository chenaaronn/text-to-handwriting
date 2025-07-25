export interface FontOption {
  id: string;
  name: string;
  displayName: string;
  previewImage: string;
  category?: 'casual' | 'formal' | 'cursive' | 'print';
}