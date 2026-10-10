import React, { useState } from 'react';
import { StoryPage, DrawingOption, CharacterId } from '../types/story';
import { StorySvgRenderer } from './StorySvgRenderer';
import { sounds } from '../utils/audio';
import { CheckCircle2, XCircle, ArrowRight, BookOpen } from 'lucide-react';
import { CharacterAvatar } from './CharacterAvatar';

interface StoryQuizViewProps {
  page: StoryPage;
  totalPages: number;
  characterId: CharacterId;
  characterName: string;
  onQuizComplete: (isCorrectFirstTry: boolean) => void;
}

export const StoryQuizView: React.FC<StoryQuizViewProps> = ({
  page,
  totalPages,
  characterId,
  characterName,
  onQuizComplete,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [firstTryCorrect, setFirstTryCorrect] = useState<boolean | null>(null);
  const [showSentenceReminder, setShowSentenceReminder] = useState(false);

  const handleSelectDrawing = (option: DrawingOption) => {
    if (hasAnswered) return;

    setSelectedOptionId(option.id);
    setHasAnswered(true);

    if (option.isCorrect) {
      sounds.playCorrect();
      setFirstTryCorrect(true);
    } else {
      sounds.playWrong();
      setFirstTryCorrect(false);
    }
  };

  const handleProceedToColoring = () => {
    sounds.playPop();
    onQuizComplete(firstTryCorrect ?? false);
  };

  const selectedOption = page.drawings.find((d) => d.id === selectedOptionId);
  const correctOption = page.drawings.find((d) => d.isCorrect);

  return (
    <div className="w-full h-full max-h-full flex flex-col justify-between p-2.5 sm:p-4 max-w-md mx-auto select-none overflow-hidden">
      {/* Top Header */}
      <div className="w-full shrink-0">
        <div className="flex items-center justify-between mb-1">
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

          <button
            onClick={() => setShowSentenceReminder(!showSentenceReminder)}
            className="flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-xl transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>{showSentenceReminder ? 'Hide sentence' : 'View sentence'}</span>
          </button>
        </div>

        {/* Optional Sentence Reminder dropdown */}
        {showSentenceReminder && (
          <div className="mb-1 p-2 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 font-bold animate-fadeIn">
            "{page.text}"
          </div>
        )}

        {/* Question Title as per PRD */}
        <div className="text-center my-0.5">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 font-['Outfit',sans-serif] leading-tight">
            What is the story?
          </h2>
          <p className="text-[11px] text-slate-600 font-medium">
            이야기에 알맞은 그림을 하나 골라보세요!
          </p>
        </div>
      </div>

      {/* 2 by 2 Drawing Choices Grid (Compact, strictly non-scrollable) */}
      <div className="grid grid-cols-2 gap-2 sm:gap-2.5 my-1.5 flex-1 min-h-0 items-stretch">
        {page.drawings.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isTheCorrectOne = option.isCorrect;

          let cardBorder = 'border-slate-200 hover:border-amber-300 bg-white';
          let overlayBadge = null;

          if (hasAnswered) {
            if (isTheCorrectOne) {
              cardBorder = 'border-emerald-500 ring-2 ring-emerald-400 bg-emerald-50/40';
              overlayBadge = (
                <div className="absolute top-1.5 right-1.5 z-20 flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-sm">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Correct!</span>
                </div>
              );
            } else if (isSelected) {
              cardBorder = 'border-rose-500 ring-2 ring-rose-400 bg-rose-50/40';
              overlayBadge = (
                <div className="absolute inset-0 z-20 bg-rose-500/15 rounded-xl flex items-center justify-center pointer-events-none">
                  <div className="flex flex-col items-center justify-center bg-white/95 px-2.5 py-1.5 rounded-xl shadow border-2 border-rose-500 animate-scaleIn">
                    <XCircle className="w-6 h-6 text-rose-600" />
                    <span className="text-[10px] font-black text-rose-700 mt-0.5">X 틀렸어요!</span>
                  </div>
                </div>
              );
            } else {
              cardBorder = 'border-slate-200 opacity-50 bg-slate-50';
            }
          }

          return (
            <div
              key={option.id}
              onClick={() => handleSelectDrawing(option)}
              className={`relative flex flex-col p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border-2 transition-all duration-150 shadow-2xs cursor-pointer select-none overflow-hidden ${cardBorder} ${
                !hasAnswered ? 'hover:scale-[1.01] active:scale-95' : ''
              }`}
            >
              {/* Option letter badge */}
              <div className="flex items-center justify-between mb-0.5 shrink-0">
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-100 text-slate-800 text-[10px] sm:text-xs font-black flex items-center justify-center">
                  {option.id}
                </span>
                <span className="text-[9px] font-bold text-slate-400">
                  Drawing {option.id}
                </span>
              </div>

              {/* Drawing SVG (Strict uncolored line art in quiz mode) */}
              <div className="relative w-full flex-1 min-h-0 flex items-center justify-center overflow-hidden my-auto">
                <StorySvgRenderer
                  svgType={option.svgType}
                  mode="lineart"
                />
              </div>

              {/* Caption revealed after answering */}
              {hasAnswered && (
                <div className="text-[10px] font-bold text-slate-700 text-center mt-0.5 truncate shrink-0">
                  {option.titleKo}
                </div>
              )}

              {overlayBadge}
            </div>
          );
        })}
      </div>

      {/* Bottom Feedback Area & Proceed Button (Always fixed at bottom without scroll) */}
      <div className="w-full shrink-0 pt-1">
        {hasAnswered ? (
          <div className="space-y-1.5 animate-fadeIn">
            {/* Feedback message banner */}
            <div
              className={`p-2 rounded-xl sm:rounded-2xl border text-xs flex items-center justify-between gap-2 ${
                firstTryCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                {firstTryCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                )}
                <span className="font-black truncate">
                  {firstTryCorrect ? 'Good job! 정답이에요! 🎉' : `정답: ${correctOption?.id}번 (${correctOption?.titleKo})`}
                </span>
              </div>
            </div>

            {/* Next button to coloring */}
            <button
              onClick={handleProceedToColoring}
              className="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-emerald-400"
            >
              <span>▶ Next: Color the Drawing (색칠하러 가기)</span>
              <ArrowRight className="w-4 h-4 text-emerald-200" />
            </button>
          </div>
        ) : (
          <div className="py-2.5 px-3 bg-slate-100/80 rounded-xl sm:rounded-2xl text-center text-xs text-slate-600 font-bold border border-slate-200">
            👆 4개의 그림 중 문장과 일치하는 그림을 터치하세요!
          </div>
        )}
      </div>
    </div>
  );
};
