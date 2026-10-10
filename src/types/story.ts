export type CharacterId = 'princess' | 'prince' | 'knight' | 'fairy';

export interface UpgradeItem {
  id: string;
  name: string;
  koreanName: string;
  category: string;
  description: string;
  icon: string;
}

export interface CharacterConfig {
  id: CharacterId;
  name: string;
  koreanName: string;
  title: string;
  koreanTitle: string;
  accentColor: string;
  badgeBg: string;
  upgrades: UpgradeItem[];
}

export interface WordInfo {
  korean: string;
  phonetic?: string;
  partOfSpeech?: string;
  meaning?: string;
}

export interface ColorOption {
  name: string;
  koreanName: string;
  hex: string;
  borderHex: string;
}

export interface DrawingOption {
  id: 'A' | 'B' | 'C' | 'D';
  titleEn: string;
  titleKo: string;
  isCorrect: boolean;
  explanationKo: string;
  explanationEn: string;
  svgType: string;
}

export interface StoryPage {
  pageNumber: number;
  text: string;
  targetObject: string;
  targetObjectKo: string;
  targetColor: ColorOption;
  colorOptions: ColorOption[];
  vocabulary: Record<string, WordInfo>;
  drawings: DrawingOption[];
}

export type ScreenState = 
  | 'cover'
  | 'character_select'
  | 'story_reading'
  | 'story_quiz'
  | 'story_coloring'
  | 'result'
  | 'storybook_gallery';

export interface ScoreState {
  drawingsCorrect: number;
  colorsCorrect: number;
  drawingAttempts: Record<number, number>;
  colorAttempts: Record<number, number>;
  coloredHistory: Record<number, string>; // hex color chosen per page
}
