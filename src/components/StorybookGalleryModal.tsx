import React, { useState } from 'react';
import { STORY_PAGES } from '../data/storyData';
import { StorySvgRenderer } from './StorySvgRenderer';
import { sounds, speakText } from '../utils/audio';
import { Volume2, ArrowLeft, ArrowRight, X, BookOpen } from 'lucide-react';

interface StorybookGalleryModalProps {
  coloredHistory: Record<number, string>;
  onClose: () => void;
}

export const StorybookGalleryModal: React.FC<StorybookGalleryModalProps> = ({
  coloredHistory,
  onClose,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const currentPage = STORY_PAGES[currentPageIndex];
  const correctDrawing = currentPage.drawings.find((d) => d.isCorrect) || currentPage.drawings[0];
  const chosenColorHex = coloredHistory[currentPage.pageNumber] || currentPage.targetColor.hex;

  const handleNext = () => {
    sounds.playPop();
    if (currentPageIndex < STORY_PAGES.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    sounds.playPop();
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const handleListen = () => {
    sounds.playPop();
    speakText(currentPage.text);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-amber-50/95 w-full max-w-lg rounded-3xl p-5 shadow-2xl border-2 border-amber-300 flex flex-col justify-between max-h-[92vh] overflow-y-auto animate-scaleIn">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-200">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-700" />
            <div>
              <h2 className="text-base font-black text-amber-950">
                The Necklace · Picture Book
              </h2>
              <span className="text-[11px] font-bold text-slate-500">
                Page {currentPage.pageNumber} of {STORY_PAGES.length}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-amber-200 text-slate-700 transition-colors cursor-pointer"
            aria-label="Close picture book"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Picture Book Page Card */}
        <div className="my-4 bg-white rounded-2xl p-4 shadow-sm border border-amber-200 flex flex-col items-center">
          {/* Illustration with user-colored element */}
          <div className="w-full aspect-[4/3] max-w-[320px] rounded-xl overflow-hidden border border-slate-100 shadow-inner">
            <StorySvgRenderer
              svgType={correctDrawing.svgType}
              fillColor={chosenColorHex}
              mode="gallery"
            />
          </div>

          {/* Story sentence */}
          <div className="mt-4 text-center w-full">
            <div className="flex items-center justify-center gap-2 mb-2">
              <button
                onClick={handleListen}
                className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-full text-xs font-bold transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-amber-700" />
                <span>Listen (듣기)</span>
              </button>
            </div>
            <p className="text-lg font-black text-slate-800 leading-snug font-['Outfit',sans-serif]">
              "{currentPage.text}"
            </p>
            <p className="text-xs text-amber-900/80 font-bold mt-1">
              {correctDrawing.titleKo}
            </p>
          </div>
        </div>

        {/* Page Thumbnail Selector */}
        <div className="flex items-center justify-center gap-1 overflow-x-auto py-1 mb-3">
          {STORY_PAGES.map((page, idx) => (
            <button
              key={page.pageNumber}
              onClick={() => {
                sounds.playPop();
                setCurrentPageIndex(idx);
              }}
              className={`w-6 h-6 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                currentPageIndex === idx
                  ? 'bg-amber-500 text-white scale-110 shadow-xs'
                  : 'bg-white hover:bg-amber-100 text-slate-700 border border-slate-200'
              }`}
            >
              {page.pageNumber}
            </button>
          ))}
        </div>

        {/* Bottom Navigation Controls */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-amber-200">
          <button
            onClick={handlePrev}
            disabled={currentPageIndex === 0}
            className={`flex-1 py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer ${
              currentPageIndex === 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-white hover:bg-amber-100 text-slate-800 border border-slate-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentPageIndex === STORY_PAGES.length - 1}
            className={`flex-1 py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer ${
              currentPageIndex === STORY_PAGES.length - 1
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm'
            }`}
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
