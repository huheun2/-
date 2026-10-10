import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CharacterId, UpgradeItem } from '../types/story';
import { CHARACTERS } from '../data/characters';
import { CharacterAvatar } from './CharacterAvatar';
import { sounds, speakText } from '../utils/audio';
import { Trophy, Sparkles, BookOpen, RotateCcw, Check, Share2 } from 'lucide-react';

interface ResultScreenProps {
  characterId: CharacterId;
  characterName: string;
  drawingsCorrect: number;
  colorsCorrect: number;
  totalQuestions: number;
  onOpenGallery: () => void;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  characterId,
  characterName,
  drawingsCorrect,
  colorsCorrect,
  totalQuestions,
  onOpenGallery,
  onRestart,
}) => {
  const characterConfig = CHARACTERS[characterId];
  const [selectedUpgradeId, setSelectedUpgradeId] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [congratsPopup, setCongratsPopup] = useState<string | null>(null);

  // Trigger celebration fanfare and confetti upon entering result screen
  useEffect(() => {
    sounds.playFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    speakText(`Good job ${characterName}, you finished!`);
  }, [characterName]);

  // Handle equipping an upgrade item
  const handleSelectUpgrade = (upgrade: UpgradeItem) => {
    setSelectedUpgradeId(upgrade.id);
    sounds.playCorrect();

    // Trigger turn around once (360 spin) and jump
    setIsSpinning(true);
    setIsJumping(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
    });

    setCongratsPopup(`${upgrade.name} (${upgrade.koreanName}) 획득!`);
    speakText(`You got the ${upgrade.name}!`);

    // Reset spinning after 800ms
    setTimeout(() => {
      setIsSpinning(false);
    }, 850);

    // Stop jumping after 1600ms
    setTimeout(() => {
      setIsJumping(false);
    }, 1600);
  };

  const equippedUpgrade = characterConfig.upgrades.find((u) => u.id === selectedUpgradeId);

  return (
    <div className="w-full min-h-[92vh] flex flex-col justify-between p-4 sm:p-6 max-w-lg mx-auto text-center">
      {/* Top Badge & Congratulations Banner */}
      <div className="w-full">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-black mb-2 shadow-xs border border-amber-200">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>Story Completed! 완독 축하합니다!</span>
        </div>

        {/* Heading formatted exactly as required: "Good job 'character name', you finished!" */}
        <h1 className="text-2xl sm:text-3xl font-black text-amber-950 font-['Outfit',sans-serif] mt-1">
          Good job {characterName}, you finished!
        </h1>
        <p className="text-xs text-slate-600 font-semibold mt-0.5">
          열두 쪽의 이야기를 모두 읽고 그림책을 완성했어요!
        </p>

        {/* Score Line formatted exactly: "You answered 8 / 12 drawings correctly, 7 / 12 colors correctly" */}
        <div className="my-3 p-3.5 bg-white rounded-2xl border-2 border-amber-300 shadow-sm">
          <p className="text-sm sm:text-base font-black text-slate-800 font-mono tracking-tight">
            You answered {drawingsCorrect} / {totalQuestions} drawings correctly, {colorsCorrect} / {totalQuestions} colors correctly
          </p>
          <div className="flex items-center justify-center gap-4 mt-2 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1 text-emerald-700">
              <Check className="w-3.5 h-3.5" /> 그림 퀴즈: {drawingsCorrect}/{totalQuestions}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-teal-700">
              <Sparkles className="w-3.5 h-3.5" /> 색칠 퀴즈: {colorsCorrect}/{totalQuestions}
            </span>
          </div>
        </div>
      </div>

      {/* Center Avatar with Celebration Animations */}
      <div className="my-2 relative flex flex-col items-center justify-center">
        {/* Congratulations item acquisition popup banner */}
        {congratsPopup && (
          <div className="absolute -top-4 z-30 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg border border-amber-200 animate-bounce">
            ✨ {congratsPopup} ✨
          </div>
        )}

        <div className="relative p-4 rounded-3xl bg-gradient-to-b from-amber-100/60 to-white border-2 border-amber-200 shadow-inner flex items-center justify-center">
          <CharacterAvatar
            characterId={characterId}
            equippedUpgrade={selectedUpgradeId}
            size="lg"
            isSpinning={isSpinning}
            isJumping={isJumping}
          />
        </div>

        <div className="mt-2 text-xs font-extrabold text-slate-800">
          {equippedUpgrade ? (
            <span className="text-amber-800">
              현재 장착: <span className="underline">{equippedUpgrade.name} ({equippedUpgrade.koreanName})</span>
            </span>
          ) : (
            <span className="text-slate-500">
              아래에서 보상 아이템을 골라 캐릭터에 입혀보세요!
            </span>
          )}
        </div>
      </div>

      {/* Upgrade Options Selector as per PRD:
          (Princess dress, Prince crown, Knight weapon, Fairy shining wand) */}
      <div className="w-full my-2 bg-white rounded-3xl p-4 border border-amber-200 shadow-sm text-left">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-black text-amber-950 uppercase tracking-wide">
            Choose your upgrade ({characterConfig.name} 보상 선택):
          </span>
          <span className="text-[11px] text-amber-700 font-bold">
            선택 시 한 바퀴 돌며 점프해요!
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {characterConfig.upgrades.map((upgrade) => {
            const isEquipped = selectedUpgradeId === upgrade.id;

            return (
              <button
                key={upgrade.id}
                onClick={() => handleSelectUpgrade(upgrade)}
                className={`relative flex flex-col items-center justify-between p-2.5 rounded-2xl border-2 transition-all cursor-pointer ${
                  isEquipped
                    ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-300 scale-105 shadow-sm'
                    : 'border-slate-200 hover:border-amber-300 bg-slate-50/50 hover:bg-white'
                }`}
              >
                <span className="text-2xl mb-1">{upgrade.icon}</span>
                <span className="text-xs font-black text-slate-900 text-center leading-tight">
                  {upgrade.name}
                </span>
                <span className="text-[10px] text-slate-500 text-center mt-0.5 truncate w-full">
                  {upgrade.koreanName}
                </span>

                {isEquipped && (
                  <span className="mt-1 text-[9px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                    Equipped
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions: View Picture Book & Restart */}
      <div className="w-full space-y-2 mt-2">
        <button
          onClick={() => {
            sounds.playPop();
            onOpenGallery();
          }}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-base rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300"
        >
          <BookOpen className="w-5 h-5" />
          <span>View Complete Picture Book (완성된 그림책 보기) 📖</span>
        </button>

        <button
          onClick={() => {
            sounds.playPop();
            onRestart();
          }}
          className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Read Again with Another Character (다시 읽기)</span>
        </button>
      </div>
    </div>
  );
};
