import { useState } from 'react';
import { CharacterId, ScreenState } from './types/story';
import { STORY_PAGES } from './data/storyData';
import { CoverScreen } from './components/CoverScreen';
import { CharacterSelectScreen } from './components/CharacterSelectScreen';
import { StoryReadingView } from './components/StoryReadingView';
import { StoryQuizView } from './components/StoryQuizView';
import { StoryColoringView } from './components/StoryColoringView';
import { ResultScreen } from './components/ResultScreen';
import { StorybookGalleryModal } from './components/StorybookGalleryModal';
import { WordBankModal } from './components/WordBankModal';
import { BookMarked, BookOpen, Volume2 } from 'lucide-react';
import { sounds, speakText } from './utils/audio';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('cover');
  const [selectedCharacterId, setSelectedCharacterId] = useState<CharacterId | null>(null);
  const [characterCustomName, setCharacterCustomName] = useState<string>('');
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  // Scoring records
  const [drawingsCorrect, setDrawingsCorrect] = useState<number>(0);
  const [colorsCorrect, setColorsCorrect] = useState<number>(0);
  const [coloredHistory, setColoredHistory] = useState<Record<number, string>>({});

  // Modals
  const [showGalleryModal, setShowGalleryModal] = useState<boolean>(false);
  const [showWordBankModal, setShowWordBankModal] = useState<boolean>(false);

  const currentPage = STORY_PAGES[currentPageIndex];
  const totalPages = STORY_PAGES.length;

  // Handlers for Navigation Flow
  const handleStartFromCover = () => {
    setScreen('character_select');
  };

  const handleBackToCover = () => {
    setScreen('cover');
  };

  const handleConfirmCharacter = (charId: CharacterId, charName: string) => {
    setSelectedCharacterId(charId);
    setCharacterCustomName(charName);
    setCurrentPageIndex(0);
    setDrawingsCorrect(0);
    setColorsCorrect(0);
    setColoredHistory({});
    setScreen('story_reading');
  };

  const handleProceedToQuiz = () => {
    setScreen('story_quiz');
  };

  const handleQuizComplete = (isCorrectFirstTry: boolean) => {
    if (isCorrectFirstTry) {
      setDrawingsCorrect((prev) => prev + 1);
    }
    setScreen('story_coloring');
  };

  const handleColoringComplete = (isCorrectFirstTry: boolean, selectedColorHex: string) => {
    if (isCorrectFirstTry) {
      setColorsCorrect((prev) => prev + 1);
    }

    setColoredHistory((prev) => ({
      ...prev,
      [currentPage.pageNumber]: selectedColorHex,
    }));

    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex((prev) => prev + 1);
      setScreen('story_reading');
    } else {
      setScreen('result');
    }
  };

  const handleRestart = () => {
    setScreen('cover');
    setSelectedCharacterId(null);
    setCharacterCustomName('');
    setCurrentPageIndex(0);
    setDrawingsCorrect(0);
    setColorsCorrect(0);
    setColoredHistory({});
  };

  const isStoryInSession =
    screen === 'story_reading' ||
    screen === 'story_quiz' ||
    screen === 'story_coloring';

  return (
    <div className={`w-full bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-amber-100/60 flex flex-col items-center font-['Nunito',sans-serif] ${
      isStoryInSession ? 'h-[100dvh] max-h-[100dvh] overflow-hidden' : 'min-h-screen overflow-y-auto justify-between'
    }`}>
      {/* Top App Utility Bar (only shown during story sessions for word bank & reading helpers) */}
      {isStoryInSession && (
        <header className="w-full max-w-md px-3 pt-2 pb-1 shrink-0 flex items-center justify-between border-b border-amber-200/60 text-xs select-none">
          <div className="flex items-center gap-1.5 font-black text-amber-950">
            <span className="text-amber-600 font-extrabold font-['Outfit',sans-serif]">
              Illustory!
            </span>
            <span className="text-slate-400 font-normal">·</span>
            <span className="text-slate-600 text-[11px] font-bold">The Necklace</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                sounds.playPop();
                setShowWordBankModal(true);
              }}
              className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-amber-100 text-amber-900 rounded-lg border border-amber-200 font-bold text-[11px] transition-colors cursor-pointer shadow-2xs"
            >
              <BookMarked className="w-3.5 h-3.5 text-amber-600" />
              <span>Word Bank</span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                speakText(currentPage.text);
              }}
              className="p-1.5 bg-white hover:bg-amber-100 text-amber-900 rounded-lg border border-amber-200 transition-colors cursor-pointer shadow-2xs"
              aria-label="Read sentence"
              title="문장 듣기"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-600" />
            </button>
          </div>
        </header>
      )}

      {/* Screen Views */}
      <main className={`w-full flex-1 flex flex-col justify-center ${isStoryInSession ? 'min-h-0 overflow-hidden' : ''}`}>
        {screen === 'cover' && (
          <CoverScreen onStart={handleStartFromCover} />
        )}

        {screen === 'character_select' && (
          <CharacterSelectScreen
            onConfirmCharacter={handleConfirmCharacter}
            onBackToCover={handleBackToCover}
          />
        )}

        {screen === 'story_reading' && selectedCharacterId && (
          <StoryReadingView
            page={currentPage}
            totalPages={totalPages}
            characterId={selectedCharacterId}
            characterName={characterCustomName}
            onProceedToQuiz={handleProceedToQuiz}
          />
        )}

        {screen === 'story_quiz' && selectedCharacterId && (
          <StoryQuizView
            page={currentPage}
            totalPages={totalPages}
            characterId={selectedCharacterId}
            characterName={characterCustomName}
            onQuizComplete={handleQuizComplete}
          />
        )}

        {screen === 'story_coloring' && selectedCharacterId && (
          <StoryColoringView
            page={currentPage}
            totalPages={totalPages}
            characterId={selectedCharacterId}
            characterName={characterCustomName}
            onColoringComplete={handleColoringComplete}
          />
        )}

        {screen === 'result' && selectedCharacterId && (
          <ResultScreen
            characterId={selectedCharacterId}
            characterName={characterCustomName}
            drawingsCorrect={drawingsCorrect}
            colorsCorrect={colorsCorrect}
            totalQuestions={totalPages}
            onOpenGallery={() => setShowGalleryModal(true)}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Modals */}
      {showGalleryModal && (
        <StorybookGalleryModal
          coloredHistory={coloredHistory}
          onClose={() => setShowGalleryModal(false)}
        />
      )}

      {showWordBankModal && (
        <WordBankModal
          onClose={() => setShowWordBankModal(false)}
        />
      )}
    </div>
  );
}
