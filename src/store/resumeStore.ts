import { create } from 'zustand';

interface ResumeSection {
  id: string;
  type: 'personal' | 'experience' | 'education' | 'skills';
  content: any;
  order: number;
}

interface ResumeStore {
  sections: ResumeSection[];
  addSection: (section: Omit<ResumeSection, 'id'>) => void;
  updateSection: (id: string, content: any) => void;
  reorderSections: (startIndex: number, endIndex: number) => void;
  removeSection: (id: string) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  sections: [],
  addSection: (section) =>
    set((state) => ({
      sections: [...state.sections, { ...section, id: crypto.randomUUID() }],
    })),
  updateSection: (id, content) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === id ? { ...section, content } : section
      ),
    })),
  reorderSections: (startIndex, endIndex) =>
    set((state) => {
      const newSections = Array.from(state.sections);
      const [removed] = newSections.splice(startIndex, 1);
      newSections.splice(endIndex, 0, removed);
      return { sections: newSections };
    }),
  removeSection: (id) =>
    set((state) => ({
      sections: state.sections.filter((section) => section.id !== id),
    })),
}));