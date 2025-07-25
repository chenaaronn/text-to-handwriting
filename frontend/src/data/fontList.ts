interface FontData {
  id: string;
  name: string;
  displayName: string;
  previewImage: string; // Path to PNG file
  category?: string;
}

export const FONT_LIST: FontData[] = [
  {
    id: "casual-script",
    name: "casual-script",
    displayName: "Casual Script",
    previewImage: "/assets/font-previews/font-placeholder.svg",
    category: "casual"
  },
  {
    id: "elegant-cursive",
    name: "elegant-cursive",
    displayName: "Elegant Cursive", 
    previewImage: "/assets/font-previews/font-placeholder.svg",
    category: "cursive"
  },
  {
    id: "neat-print",
    name: "neat-print",
    displayName: "Neat Print",
    previewImage: "/assets/font-previews/font-placeholder.svg",
    category: "print"
  },
  {
    id: "flowing-hand",
    name: "flowing-hand", 
    displayName: "Flowing Hand",
    previewImage: "/assets/font-previews/font-placeholder.svg",
    category: "casual"
  },
  {
    id: "modern-signature",
    name: "modern-signature",
    displayName: "Modern Signature",
    previewImage: "/assets/font-previews/font-placeholder.svg", 
    category: "formal"
  },
  {
    id: "quick-notes",
    name: "quick-notes",
    displayName: "Quick Notes",
    previewImage: "/assets/font-previews/font-placeholder.svg",
    category: "casual"
  },
  {
    id: "romantic-script",
    name: "romantic-script",
    displayName: "Romantic Script", 
    previewImage: "/assets/font-previews/font-placeholder.svg",
    category: "cursive"
  },
  {
    id: "business-formal",
    name: "business-formal",
    displayName: "Business Formal",
    previewImage: "/assets/font-previews/font-placeholder.svg",
    category: "formal"
  },
  {
    id: "student-notes",
    name: "student-notes", 
    displayName: "Student Notes",
    previewImage: "/assets/font-previews/font-placeholder.svg",
    category: "casual"
  }
];

export type { FontData };