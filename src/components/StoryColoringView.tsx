import React, { useState } from 'react';
import { StoryPage, ColorOption, CharacterId } from '../types/story';
import { StorySvgRenderer } from './StorySvgRenderer';
import { sounds, speakText } from '../utils/audio';
import { Sparkles, ArrowRight } from 'lucide-react';
import { CharacterAvatar } from './CharacterAvatar';

interface StoryColoringViewProps {
  page: StoryPage;
  totalPages: number;
  characterId: CharacterId;
  characterName: string;
  onColoringComplete: (isCorrectFirstTry: boolean, selectedColorHex: string) => void;
}

export const StoryColoringView: React.FC<StoryColoringViewProps> = ({
  page,
  totalPages,
  characterId,
  characterName,
  onColoringComplete,
}) => {
  const [coloredHex, setColoredHex] = useState<string | null>(null);
  const [firstTryCorrect, setFirstTryCorrect] = useState<boolean | null>(null);
  const [hasWrongAttempt, setHasWrongAttempt] = useState(false);

  const correctOption = page.drawings.find((d) => d.isCorrect) || page.drawings[0];
  const targetColor = page.targetColor;

  const handlePickColor = (color: ColorOption) => {
    const isCorrect = color.name.toLowerCase() === targetColor.name.toLowerCase();

    if (firstTryCorrect === null) {
      setFirstTryCorrect(isCorrect);
    }

    if (isCorrect) {
      sounds.playColorPlop();
      sounds.playCorrect();
      setColoredHex(color.hex);
      setHasWrongAttempt(false);
      speakText(`${color.name}! Great job!`);
    } else {
      sounds.playWrong();
      setHasWrongAttempt(true);
      speakText(`The story says ${targetColor.name}.`);
    }
  };

  const handleProceed = () => {
    if (!coloredHex) return;
    sounds.playPop();
    onColoringComplete(firstTryCorrect ?? false, coloredHex);
  };

  const isLastPage = page.pageNumber === totalPages;

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

          <div className="text-[11px] font-black text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
            Coloring Step 🎨
          </div>
        </div>

        {/* Prompt Header */}
        <div className="text-center my-0.5">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 font-['Outfit',sans-serif] leading-tight">
            What color was in the story?
          </h2>
          <p className="text-[11px] text-slate-600 font-medium">
            이야기에 나온 색으로 <span className="text-amber-900 font-black underline decoration-amber-400 decoration-2">{page.targetObjectKo}</span>을(를) 칠해봐요!
          </p>
        </div>
      </div>

      {/* Center Drawing Canvas (Scales to viewport, never scrolls) */}
      <div className="w-full flex-1 min-h-0 my-1 flex items-center justify-center">
        <div className="relative w-full max-h-[190px] sm:max-h-[220px] aspect-[4/3] bg-white rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 shadow-md border-2 border-amber-200 overflow-hidden flex items-center justify-center">
          <StorySvgRenderer
            svgType={correctOption.svgType}
            fillColor={coloredHex}
            isHighlighted={!coloredHex}
            mode="coloring"
          />

          {/* Color Sparkle Overlay */}
          {coloredHex && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-full shadow-xs border border-amber-200 animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
              <span className="text-[11px] font-black text-amber-950">
                {targetColor.name} ({targetColor.koreanName})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 5 Color Palette Choices as per PRD */}
      <div className="w-full shrink-0 my-1">
        <div className="text-[11px] font-bold text-slate-700 text-center mb-1 flex items-center justify-center gap-1">
          <span>5 Color Choices (색깔 5가지 중 선택):</span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {page.colorOptions.map((color) => {
            const isTarget = color.name.toLowerCase() === targetColor.name.toLowerCase();
            const isSelected = coloredHex === color.hex;
            const isPointedAt = hasWrongAttempt && isTarget;

            return (
              <div key={color.name} className="relative flex flex-col items-center">
                {/* Pointer arrow if user made an incorrect choice */}
                {isPointedAt && (
                  <div className="absolute -top-6 z-20 flex flex-col items-center animate-bounce">
                    <span className="text-[9px] font-black bg-amber-500 text-white px-1 py-0.2 rounded shadow-xs whitespace-nowrap">
                      여기!
                    </span>
                    <span className="text-amber-500 text-[10px] font-black leading-none">▼</span>
                  </div>
                )}

                <button
                  onClick={() => handlePickColor(color)}
                  className={`w-full aspect-square rounded-xl sm:rounded-2xl flex flex-col items-center justify-center transition-all duration-150 cursor-pointer p-1 shadow-xs border-2 ${
                    isSelected
                      ? 'ring-3 ring-amber-500 scale-105 border-white shadow-md'
                      : isPointedAt
                      ? 'border-amber-500 ring-2 ring-amber-400 scale-105 animate-pulse'
                      : 'border-slate-200 hover:scale-105 active:scale-95'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={`${color.name} color`}
                >
                  {isSelected && (
                    <span className="text-white drop-shadow-md text-sm font-black">
                      ✓
                    </span>
                  )}
                </button>

                <span className="text-[10px] font-extrabold text-slate-800 mt-0.5 truncate max-w-full">
                  {color.name}
                </span>
                <span className="text-[9px] font-medium text-slate-500 truncate max-w-full">
                  {color.koreanName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action: Proceed Button (Fixed at bottom without scrolling) */}
      <div className="w-full shrink-0 pt-1 pb-0.5">
        <button
          onClick={handleProceed}
          disabled={!coloredHex}
          className={`w-full py-2.5 sm:py-3 px-4 font-black text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 ${
            coloredHex
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white cursor-pointer active:scale-95 border-2 border-amber-300'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed border-2 border-slate-300'
          }`}
        >
          <span>{isLastPage ? '▶ Complete Story! (결과 보기)' : '▶ Next page (다음 페이지로)'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
