import { create } from "zustand";

export type Mode = "my-handwriting" | "prebuilt-fonts";

interface GenerationSettings {
  spacing: number;
  size: number;
  inkType: string;
}

interface FontSettings {
  size: number;
  color: string;
  lineSpacing: number;
  strokeWidth: number;
  strokeColor: string;
  strokeColorName: string;
}

interface CustomColor {
  id: string;
  hex: string;
  name: string;
  createdAt: Date;
}

interface TextInputState {
  // Mode state
  mode: Mode;
  setMode: (mode: Mode) => void;

  // Shared state
  inputText: string;
  setInputText: (text: string) => void;

  // My Handwriting mode
  userStyle: string | null;
  setUserStyle: (style: string | null) => void;
  modelLoading: boolean;
  setModelLoading: (loading: boolean) => void;
  generationSettings: GenerationSettings;
  setGenerationSettings: (settings: Partial<GenerationSettings>) => void;

  // Prebuilt Fonts mode
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  fontSettings: FontSettings;
  setFontSettings: (settings: Partial<FontSettings>) => void;

  // Custom Colors
  customStrokeColors: CustomColor[];
  addCustomStrokeColor: (color: CustomColor) => void;
  removeCustomStrokeColor: (id: string) => void;

  // Canvas/Preview
  canvasData: any;
  setCanvasData: (data: any) => void;
  previewReady: boolean;
  setPreviewReady: (ready: boolean) => void;
}

export const useTextInputStore = create<TextInputState>((set) => ({
  // Mode state
  mode: "my-handwriting",
  setMode: (mode) => set({ mode }),

  // Shared state
  inputText: "",
  setInputText: (inputText) => set({ inputText }),

  // My Handwriting mode
  userStyle: null,
  setUserStyle: (userStyle) => set({ userStyle }),
  modelLoading: false,
  setModelLoading: (modelLoading) => set({ modelLoading }),
  generationSettings: {
    spacing: 1.0,
    size: 1.0,
    inkType: "blue",
  },
  setGenerationSettings: (settings) =>
    set((state) => ({
      generationSettings: { ...state.generationSettings, ...settings },
    })),

  // Prebuilt Fonts mode
  selectedFont: "casual-script",
  setSelectedFont: (selectedFont) => set({ selectedFont }),
  fontSettings: {
    size: 16,
    color: "#000000",
    lineSpacing: 1.2,
    strokeWidth: 1.0,
    strokeColor: "#000000",
    strokeColorName: "Black",
  },
  setFontSettings: (settings) =>
    set((state) => ({
      fontSettings: { ...state.fontSettings, ...settings },
    })),

  // Custom Colors
  customStrokeColors: [],
  addCustomStrokeColor: (color) =>
    set((state) => ({
      customStrokeColors: [...state.customStrokeColors, color],
    })),
  removeCustomStrokeColor: (id) =>
    set((state) => ({
      customStrokeColors: state.customStrokeColors.filter(color => color.id !== id),
    })),

  // Canvas/Preview
  canvasData: null,
  setCanvasData: (canvasData) => set({ canvasData }),
  previewReady: false,
  setPreviewReady: (previewReady) => set({ previewReady }),
}));