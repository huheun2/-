import React, { useState } from 'react';
import { StoryPage, WordInfo, CharacterId } from '../types/story';
import { Volume2, ArrowRight, X, Sparkles, BookOpen } from 'lucide-react';
import { sounds, speakText } from '../utils/audio';
import { CharacterAvatar } from './CharacterAvatar';

interface StoryReadingViewProps {
  page: StoryPage;
  totalPages: number;
  characterId: CharacterId;
  characterName: string;
  onProceedToQuiz: () => void;
}

export const StoryReadingView: React.FC<StoryReadingViewProps> = ({
  page,
  totalPages,
  characterId,
  characterName,
  onProceedToQuiz,
}) => {
  const [selectedWord, setSelectedWord] = useState<{ word: string; info: WordInfo } | null>(null);

  // Split sentence into words, stripping punctuation for vocabulary lookup
  const rawWords = page.text.split(' ');

  const handleWordClick = (wordText: string) => {
    sounds.playPop();
    const cleanWord = wordText.replace(/^[“"'(]+|[.,!?;:"')]+$/g, '');
    const baseWord = cleanWord.replace(/'s$/i, '');
    
    const foundInfo =
      page.vocabulary[cleanWord] ||
      page.vocabulary[cleanWord.toLowerCase()] ||
      page.vocabulary[baseWord] ||
      page.vocabulary[baseWord.toLowerCase()] || {
        korean: cleanWord,
        meaning: '문맥에 맞추어 읽어보세요',
        partOfSpeech: '단어',
      };

    setSelectedWord({
      word: cleanWord,
      info: foundInfo,
    });

    // Pronounce the word in English
    speakText(cleanWord);
  };

  const handleReadFullSentence = () => {
    sounds.playPop();
    speakText(page.text);
  };

  const handleProceed = () => {
    sounds.playPop();
    onProceedToQuiz();
  };

  return (
    <div className="w-full h-full max-h-full flex flex-col justify-between p-3 sm:p-4 max-w-md mx-auto select-none overflow-hidden">
      {/* Top Header: Progress & Character info */}
      <div className="w-full shrink-0">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <CharacterAvatar characterId={characterId} size="sm" />
            <div>
              <span className="text-xs font-extrabold text-amber-950 block leading-tight">
                {characterName}
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                Page {page.pageNumber} of {totalPages}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex-1 max-w-[130px] bg-amber-200/80 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(page.pageNumber / totalPages) * 100}%` }}
            />
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between text-[11px] text-amber-900 font-extrabold bg-amber-100/70 px-2.5 py-1 rounded-xl">
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-black">1</span>
            <span>Read & Tap Words (문장 읽기)</span>
          </span>
          <span className="text-[10px] text-slate-600 font-medium">
            단어를 누르면 한국어 뜻이 나와요!
          </span>
        </div>
      </div>

      {/* Main Story Book Card (No scrolling, perfectly proportioned) */}
      <div className="w-full flex-1 min-h-0 my-2 flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-md border-2 border-amber-200 overflow-hidden">
        {/* Top audio helper */}
        <div className="flex items-center justify-between pb-2 border-b border-amber-100 shrink-0">
          <span className="text-[11px] font-black text-amber-800 tracking-wider uppercase flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Story Sentence ({rawWords.length} words)</span>
          </span>
          <button
            onClick={handleReadFullSentence}
            className="flex items-center gap-1 px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-full text-[11px] font-extrabold transition-colors cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-700" />
            <span>Listen All (전체 듣기)</span>
          </button>
        </div>

        {/* Passage Display: ~20 words, no inner scrolling needed! */}
        <div className="my-auto py-2">
          <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed font-['Outfit',sans-serif] flex flex-wrap gap-x-1.5 gap-y-2 justify-start items-center">
            {rawWords.map((wordWithPunc, idx) => {
              const clean = wordWithPunc.replace(/^[“"'(]+|[.,!?;:"')]+$/g, '');
              const leadPunc = wordWithPunc.match(/^[“"'(]+/)?.[0] || '';
              const trailPunc = wordWithPunc.slice(leadPunc.length + clean.length);
              const isSelected = selectedWord?.word.toLowerCase() === clean.toLowerCase();

              return (
                <span key={idx} className="inline-flex items-baseline">
                  {leadPunc && <span className="text-slate-800 mr-0.5">{leadPunc}</span>}
                  <button
                    onClick={() => handleWordClick(wordWithPunc)}
                    className={`px-1.5 py-0.5 rounded-lg transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-amber-400 text-amber-950 font-black ring-2 ring-amber-500 scale-105'
                        : 'hover:bg-amber-100 hover:text-amber-950 border-b border-dashed border-amber-300 active:scale-95'
                    }`}
                  >
                    {clean}
                  </button>
                  {trailPunc && <span className="text-slate-800 ml-0.5">{trailPunc}</span>}
                </span>
              );
            })}
          </p>
        </div>

        {/* Dedicated Fixed-Height Word Definition Box (Zero layout shift, no screen resizing!) */}
        <div className="h-[74px] shrink-0 w-full bg-amber-50 rounded-xl sm:rounded-2xl border border-amber-200 p-2 sm:p-2.5 flex items-center justify-between">
          {selectedWord ? (
            <div className="w-full flex items-center justify-between gap-2 animate-fadeIn">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-sm font-black text-amber-950 truncate">
                    {selectedWord.word}
                  </span>
                  <button
                    onClick={() => speakText(selectedWord.word)}
                    className="p-1 hover:bg-amber-200 rounded-full text-amber-700 cursor-pointer shrink-0"
                    aria-label="Listen word"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  {selectedWord.info.partOfSpeech && (
                    <span className="text-[9px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-bold shrink-0">
                      {selectedWord.info.partOfSpeech}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1.5 truncate">
                  <span className="text-xs font-black text-amber-900">
                    {selectedWord.info.korean}
                  </span>
                  {selectedWord.info.meaning && (
                    <span className="text-[11px] text-slate-600 truncate">
                      · {selectedWord.info.meaning}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedWord(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-md cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-full flex items-center gap-2 text-amber-900/80 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-amber-950">💡 Tap any word to see Korean meaning!</span>
                <span className="text-[10px] text-slate-500 font-medium">단어를 터치하면 한국어 뜻과 원어민 발음이 나와요.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action: [▶ Choose the right story picture] Button (Always visible without scrolling) */}
      <div className="w-full shrink-0 pt-1 pb-1">
        <button
          onClick={handleProceed}
          className="w-full py-3 sm:py-3.5 px-4 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-md active:scale-95 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer border-2 border-amber-300"
        >
          <span>▶ Choose the right story picture</span>
          <ArrowRight className="w-5 h-5 text-amber-200" />
        </button>
      </div>
    </div>
  );
};
