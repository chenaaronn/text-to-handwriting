import { create } from 'zustand';
import { handwritingApi } from '../api/handwriting';

interface Point {
  x: number;
  y: number;
  pressure: number;
}

interface HandwritingState {
  stylePoints: Point[];
  generatedPoints: Point[];
  text: string;
  background: 'blank' | 'lined' | 'dotted';
  isGenerating: boolean;
  error: string | null;
  
  // Actions
  setText: (text: string) => void;
  setBackground: (background: 'blank' | 'lined' | 'dotted') => void;
  addStylePoint: (point: Point) => void;
  clearStylePoints: () => void;
  generateHandwriting: () => Promise<void>;
  analyzeStyle: () => Promise<void>;
}

export const useHandwritingStore = create<HandwritingState>((set, get) => ({
  stylePoints: [],
  generatedPoints: [],
  text: '',
  background: 'blank',
  isGenerating: false,
  error: null,

  setText: (text) => set({ text }),
  
  setBackground: (background) => set({ background }),
  
  addStylePoint: (point) => set((state) => ({
    stylePoints: [...state.stylePoints, point]
  })),
  
  clearStylePoints: () => set({ stylePoints: [] }),
  
  generateHandwriting: async () => {
    const { text, stylePoints } = get();
    
    if (!text.trim()) {
      set({ error: 'Please enter some text' });
      return;
    }
    
    if (stylePoints.length === 0) {
      set({ error: 'Please provide some handwriting samples' });
      return;
    }
    
    set({ isGenerating: true, error: null });
    
    try {
      const response = await handwritingApi.synthesizeHandwriting({
        style_points: stylePoints,
        text,
        max_length: 100
      });
      
      set({ generatedPoints: response.points });
    } catch (error) {
      set({ error: 'Failed to generate handwriting' });
    } finally {
      set({ isGenerating: false });
    }
  },
  
  analyzeStyle: async () => {
    const { stylePoints } = get();
    
    if (stylePoints.length === 0) {
      set({ error: 'Please provide some handwriting samples' });
      return;
    }
    
    set({ isGenerating: true, error: null });
    
    try {
      const response = await handwritingApi.analyzeStyle({
        style_points: stylePoints,
        text: 'sample'
      });
      
      // TODO: Handle style analysis response
      console.log('Style analysis:', response);
    } catch (error) {
      set({ error: 'Failed to analyze handwriting style' });
    } finally {
      set({ isGenerating: false });
    }
  }
})); 