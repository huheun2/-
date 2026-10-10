import React from 'react';
import { BookOpen, Sparkles, Volume2 } from 'lucide-react';
import { sounds, speakText } from '../utils/audio';

interface CoverScreenProps {
  onStart: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({ onStart }) => {
  const handleStart = () => {
    sounds.playPop();
    onStart();
  };

  const handleReadTitle = () => {
    sounds.playPop();
    speakText('Illustory! The Necklace.');
  };

  return (
    <main className="w-full min-h-[90vh] flex flex-col items-center justify-between p-4 sm:p-6 max-w-lg mx-auto text-center" aria-label="Cover Screen">
      {/* Top Header metadata */}
      <header className="w-full flex items-center justify-between text-xs sm:text-sm font-semibold text-amber-800/80">
        <span className="flex items-center gap-1.5 bg-amber-100/80 px-3 py-1 rounded-full">
          <BookOpen className="w-4 h-4 text-amber-700" />
          <span>Elementary Grade 4–5 · A1 Reading</span>
        </span>
        <button
          onClick={handleReadTitle}
          aria-label="Listen to title"
          className="p-2 rounded-full hover:bg-amber-100/70 transition-colors text-amber-700 cursor-pointer"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </header>

      {/* Main Cover Illustration & Title Area */}
      <div className="flex-1 flex flex-col items-center justify-center my-4 sm:my-6 w-full">
        {/* Story Logo / Title */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 mb-1">
            <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-amber-950 font-['Outfit',sans-serif]">
              Illustory!
            </h1>
            <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-amber-800">
            "The Necklace"
          </p>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            신비한 목걸이의 비밀을 찾아 떠나는 영어 그림책
          </p>
        </div>

        {/* Central Story Picture Book Illustration */}
        <div className="relative w-full max-w-[320px] aspect-[4/3] bg-gradient-to-b from-amber-100/80 via-white to-amber-50 rounded-3xl p-4 shadow-xl border-4 border-amber-200/90 flex flex-col items-center justify-center group overflow-hidden">
          <div className="absolute inset-0 bg-radial from-amber-200/30 to-transparent pointer-events-none" />

          {/* Picture book illustration */}
          <div className="w-full h-full flex flex-col items-center justify-center relative z-10">
            <svg viewBox="0 0 160 120" className="w-48 h-36 drop-shadow-md">
              {/* Tree */}
              <path d="M40 90 L40 60 L50 60 L50 90 Z" fill="#B45309" />
              <circle cx="45" cy="50" r="22" fill="#22C55E" />
              <circle cx="35" cy="42" r="14" fill="#16A34A" />

              {/* Opened Box */}
              <rect x="75" y="70" width="46" height="25" rx="3" fill="#FDE047" stroke="#B45309" strokeWidth="2" />
              <path d="M72 70 L98 50 L125 70 Z" fill="#FACC15" stroke="#B45309" strokeWidth="2" />

              {/* Sparkling Blue Necklace */}
              <path d="M84 66 C84 80, 112 80, 112 66" fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="3 2" />
              <polygon points="98,73 105,79 102,88 94,88 91,79" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />

              {/* Little Yellow Bird */}
              <circle cx="120" cy="35" r="9" fill="#FACC15" />
              <polygon points="129,34 135,36 129,38" fill="#F97316" />
              <circle cx="123" cy="33" r="1.5" fill="#1E293B" />
              <path d="M115 36 C108 30, 116 26, 120 33 Z" fill="#EAB308" />

              {/* Sparkles */}
              <text x="64" y="62" fontSize="12" fill="#EAB308">✨</text>
              <text x="110" y="60" fontSize="14" fill="#38BDF8">✦</text>
              <text x="130" y="24" fontSize="12" fill="#F59E0B">♪</text>
            </svg>
          </div>

          <div className="absolute bottom-2 text-[11px] font-bold text-amber-900/70 tracking-wide uppercase">
            Interactive Reading & Coloring
          </div>
        </div>

        {/* Learning prompt card */}
        <div className="mt-4 px-4 py-2 bg-white/80 backdrop-blur-xs rounded-2xl border border-amber-200/80 shadow-xs max-w-sm">
          <p className="text-xs text-amber-950/80 leading-relaxed">
            문장을 읽고, 모르는 단어는 터치하여 한국어 뜻을 확인해요.
            <br />
            알맞은 그림을 고르고 예쁘게 색칠해 보세요!
          </p>
        </div>

        {/* Character teaser preview */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="text-[11px] font-bold text-amber-800">Choose your character:</span>
          <div className="flex items-center -space-x-1.5">
            <span className="text-lg bg-pink-100 rounded-full p-1 border border-pink-200 shadow-2xs" title="Princess">👑</span>
            <span className="text-lg bg-blue-100 rounded-full p-1 border border-blue-200 shadow-2xs" title="Prince">🤴</span>
            <span className="text-lg bg-amber-100 rounded-full p-1 border border-amber-200 shadow-2xs" title="Knight">🛡️</span>
            <span className="text-lg bg-emerald-100 rounded-full p-1 border border-emerald-200 shadow-2xs" title="Fairy">🧚</span>
          </div>
        </div>

        {/* Large Centered [Start] button as per PRD */}
        <div className="mt-6 w-full flex justify-center">
          <button
            onClick={handleStart}
            className="w-full max-w-xs py-4 px-8 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xl font-black rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all duration-150 cursor-pointer flex items-center justify-center gap-3 border-2 border-amber-400"
          >
            <span>Start</span>
            <span className="text-2xl">▶</span>
          </button>
        </div>
      </div>

      {/* Footer metadata */}
      <footer className="w-full text-center text-xs text-amber-900/60 pb-2">
        <span>Illustory! · 12 Pages English Reading Story</span>
      </footer>
    </main>
  );
};
