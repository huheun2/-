import React, { useState } from 'react';
import { STORY_PAGES } from '../data/storyData';
import { sounds, speakText } from '../utils/audio';
import { Volume2, X, Search, BookMarked } from 'lucide-react';

interface WordBankModalProps {
  onClose: () => void;
}

export const WordBankModal: React.FC<WordBankModalProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Collect all unique vocabulary across all 12 pages
  const allVocabMap = new Map<string, { korean: string; meaning?: string; partOfSpeech?: string; page: number }>();

  STORY_PAGES.forEach((page) => {
    Object.entries(page.vocabulary).forEach(([word, info]) => {
      const lower = word.toLowerCase();
      if (!allVocabMap.has(lower)) {
        allVocabMap.set(lower, {
          ...info,
          page: page.pageNumber,
        });
      }
    });
  });

  const vocabList = Array.from(allVocabMap.entries()).map(([word, info]) => ({
    word: word.charAt(0).toUpperCase() + word.slice(1),
    ...info,
  }));

  const filtered = vocabList.filter(
    (item) =>
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.korean.includes(searchQuery)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl p-5 shadow-2xl border-2 border-amber-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-amber-600" />
            <div>
              <h2 className="text-base font-black text-slate-900">
                Story Word Bank (단어 사전)
              </h2>
              <span className="text-xs text-slate-500 font-semibold">
                총 {vocabList.length}개 단어 수록
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 cursor-pointer"
            aria-label="Close word bank"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar */}
        <div className="my-3 relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="단어나 한국어 뜻 검색..."
            className="w-full pl-9 pr-3 py-2 text-xs font-bold bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Vocab List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filtered.map((item) => (
            <div
              key={item.word}
              className="p-3 bg-amber-50/40 rounded-xl border border-amber-100 flex items-center justify-between gap-3 hover:bg-amber-100/40 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-slate-900">
                    {item.word}
                  </span>
                  {item.partOfSpeech && (
                    <span className="text-[10px] bg-amber-200/80 text-amber-900 font-bold px-1.5 py-0.2 rounded">
                      {item.partOfSpeech}
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400 font-bold">
                    P.{item.page}
                  </span>
                </div>
                <p className="text-xs font-extrabold text-amber-900 mt-0.5">
                  {item.korean}
                </p>
                {item.meaning && (
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {item.meaning}
                  </p>
                )}
              </div>

              <button
                onClick={() => {
                  sounds.playPop();
                  speakText(item.word);
                }}
                className="p-2 hover:bg-amber-200 text-amber-700 rounded-full transition-colors cursor-pointer shrink-0"
                aria-label={`Listen ${item.word}`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
