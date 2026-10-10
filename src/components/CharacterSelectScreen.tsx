import React, { useState } from 'react';
import { CharacterId } from '../types/story';
import { CHARACTERS } from '../data/characters';
import { CharacterAvatar } from './CharacterAvatar';
import { sounds, speakText } from '../utils/audio';
import { Sparkles, Check, ArrowLeft } from 'lucide-react';

interface CharacterSelectScreenProps {
  onConfirmCharacter: (characterId: CharacterId, characterName: string) => void;
  onBackToCover: () => void;
}

export const CharacterSelectScreen: React.FC<CharacterSelectScreenProps> = ({
  onConfirmCharacter,
  onBackToCover,
}) => {
  const [userName, setUserName] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<CharacterId | null>(null);
  const [chosenCharacter, setChosenCharacter] = useState<CharacterId | null>(null);

  const characterKeys: CharacterId[] = ['prince', 'princess', 'fairy', 'knight'];

  // Handle clicking [Select] on bottom of card
  const handleSelectClick = (id: CharacterId) => {
    sounds.playPop();
    setSelectedCandidate(id);
    speakText(CHARACTERS[id].name);
  };

  // Handle clicking [Choose] button that appears on top of the character
  const handleChooseClick = (id: CharacterId) => {
    sounds.playCorrect();
    setChosenCharacter(id);
    speakText(`Great choice! ${CHARACTERS[id].name}.`);
  };

  // Handle starting the story
  const handleStartStory = () => {
    if (!chosenCharacter) return;
    const finalName = userName.trim() || CHARACTERS[chosenCharacter].name;
    sounds.playFanfare();
    onConfirmCharacter(chosenCharacter, finalName);
  };

  return (
    <div className="w-full min-h-[92vh] flex flex-col justify-between p-4 sm:p-6 max-w-lg mx-auto">
      {/* Top Header & Name Input */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => {
              sounds.playPop();
              onBackToCover();
            }}
            className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white/80 px-2.5 py-1.5 rounded-xl border border-slate-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="text-xs font-bold text-amber-800 bg-amber-100/90 px-3 py-1 rounded-full">
            Step 1 · Choose Character
          </div>
        </div>

        {/* Enter name section */}
        <div className="bg-white/95 rounded-2xl p-4 shadow-sm border border-amber-200/90 mt-2 mb-3">
          <label htmlFor="reader-name" className="block text-xs font-bold text-amber-950 uppercase tracking-wide mb-1.5">
            1. Enter your name <span className="font-normal text-slate-500">(이름을 입력하세요)</span>
          </label>
          <input
            id="reader-name"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g. Emma, Leo, 민지..."
            maxLength={18}
            className="w-full px-3.5 py-2.5 text-base font-bold text-slate-800 bg-amber-50/50 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-slate-400"
          />
        </div>

        <p className="text-xs text-center text-slate-600 font-semibold mb-2">
          2. Select your character <span className="font-normal">(함께할 캐릭터를 골라보세요)</span>
        </p>
      </div>

      {/* Middle [▶ Start story] button if a character is chosen */}
      {chosenCharacter && (
        <div className="my-2 p-2 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 rounded-2xl border-2 border-amber-400 animate-fadeIn">
          <button
            onClick={handleStartStory}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black text-lg rounded-xl shadow-lg active:scale-95 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer border border-amber-300"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>▶ Start story</span>
            <span className="text-xs font-medium text-amber-100">
              ({userName.trim() ? userName.trim() : CHARACTERS[chosenCharacter].name}의 모험 시작!)
            </span>
          </button>
        </div>
      )}

      {/* 2 by 2 Character Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 my-2 flex-1 items-stretch">
        {characterKeys.map((id) => {
          const char = CHARACTERS[id];
          const isCandidate = selectedCandidate === id;
          const isChosen = chosenCharacter === id;

          return (
            <div
              key={id}
              className={`relative flex flex-col items-center justify-between p-3.5 rounded-3xl bg-white border-2 transition-all duration-200 shadow-sm ${
                isChosen
                  ? 'border-amber-500 ring-4 ring-amber-400/30 bg-gradient-to-b from-amber-50/70 to-white scale-[1.02] shadow-md'
                  : isCandidate
                  ? 'border-blue-400 ring-2 ring-blue-300/40 bg-gradient-to-b from-blue-50/30 to-white'
                  : 'border-slate-200/90 hover:border-amber-300 hover:shadow-md'
              }`}
            >
              {/* TOP: [Choose] button appears on top of the character after clicking [Select] */}
              <div className="h-9 w-full flex items-center justify-center">
                {isChosen ? (
                  <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 shadow-2xs">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Selected!</span>
                  </div>
                ) : isCandidate ? (
                  <button
                    onClick={() => handleChooseClick(id)}
                    className="w-full py-1.5 px-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-black rounded-xl shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1 animate-bounce border border-emerald-300"
                  >
                    <span>[Choose]</span>
                  </button>
                ) : (
                  <span className="text-[11px] font-extrabold text-slate-500 bg-slate-100/80 px-2.5 py-0.5 rounded-full">
                    {char.koreanName}
                  </span>
                )}
              </div>

              {/* Character Avatar with hover depth */}
              <div
                onClick={() => handleSelectClick(id)}
                className="my-1 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              >
                <CharacterAvatar
                  characterId={id}
                  size="md"
                  isJumping={isChosen}
                />
              </div>

              {/* Character Details */}
              <div className="text-center my-1">
                <p className="font-black text-slate-900 text-sm tracking-tight">{char.name}</p>
                <p className="text-[11px] font-bold text-amber-800/80">{char.koreanTitle}</p>
              </div>

              {/* BOTTOM: [Select] button on bottom of each character */}
              <div className="w-full mt-1">
                <button
                  onClick={() => handleSelectClick(id)}
                  className={`w-full py-2.5 px-3 text-xs font-black rounded-xl transition-all cursor-pointer shadow-xs ${
                    isCandidate || isChosen
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {isCandidate ? '✓ Selected' : '[Select]'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guide text */}
      <div className="text-center text-xs text-slate-500 pt-2 pb-1">
        캐릭터 아래 [Select]를 누르고, 상단에 나타나는 [Choose]를 클릭하면 이야기가 시작됩니다!
      </div>
    </div>
  );
};
