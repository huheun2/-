import React from 'react';
import { CharacterId } from '../types/story';

interface CharacterAvatarProps {
  characterId: CharacterId;
  equippedUpgrade?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isSpinning?: boolean;
  isJumping?: boolean;
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  characterId,
  equippedUpgrade,
  size = 'md',
  isSpinning = false,
  isJumping = false,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-40 h-40',
    xl: 'w-56 h-56',
  };

  const animClasses = [
    isSpinning ? 'animate-[spin_0.8s_ease-in-out]' : '',
    isJumping ? 'animate-[bounce_0.8s_infinite]' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none transition-transform duration-300 ${sizeMap[size]} ${animClasses} ${className}`}
    >
      <svg
        viewBox="0 0 180 180"
        className="w-full h-full drop-shadow-lg overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Enhanced Aura & Drop Shadows */}
          <radialGradient id={`glow-${characterId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#FEF3C7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0" />
          </radialGradient>

          {/* Metallics & Shading Gradients */}
          <linearGradient id="gold-shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF9C3" />
            <stop offset="25%" stopColor="#FDE047" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          <linearGradient id="silver-plate" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Hair Gradients with Volume & Sheen */}
          <linearGradient id="princess-hair-vol" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="35%" stopColor="#FBBF24" />
            <stop offset="75%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <linearGradient id="prince-hair-vol" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A16207" />
            <stop offset="35%" stopColor="#78350F" />
            <stop offset="80%" stopColor="#451A03" />
            <stop offset="100%" stopColor="#291001" />
          </linearGradient>

          <linearGradient id="knight-hair-vol" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#78716C" />
            <stop offset="40%" stopColor="#44403C" />
            <stop offset="85%" stopColor="#292524" />
            <stop offset="100%" stopColor="#1C1917" />
          </linearGradient>

          <linearGradient id="fairy-hair-vol" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDF4FF" />
            <stop offset="30%" stopColor="#F5D0FE" />
            <stop offset="70%" stopColor="#D946EF" />
            <stop offset="100%" stopColor="#86198F" />
          </linearGradient>

          {/* Rich Jewel Eyes */}
          <linearGradient id="eye-violet-deep" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="40%" stopColor="#4338CA" />
            <stop offset="75%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#C7D2FE" />
          </linearGradient>

          <linearGradient id="eye-sapphire-deep" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#082F49" />
            <stop offset="40%" stopColor="#0369A1" />
            <stop offset="75%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>

          <linearGradient id="eye-emerald-deep" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#022C22" />
            <stop offset="40%" stopColor="#047857" />
            <stop offset="75%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#A7F3D0" />
          </linearGradient>

          <linearGradient id="eye-mint-deep" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#134E4A" />
            <stop offset="40%" stopColor="#0D9488" />
            <stop offset="75%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#CCFBF1" />
          </linearGradient>

          {/* Fabric Shading */}
          <linearGradient id="dress-silk-pink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDF2F8" />
            <stop offset="30%" stopColor="#F472B6" />
            <stop offset="70%" stopColor="#DB2777" />
            <stop offset="100%" stopColor="#9D174D" />
          </linearGradient>

          <linearGradient id="tunic-royal-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="40%" stopColor="#1D4ED8" />
            <stop offset="85%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>

          <linearGradient id="fairy-leaf-silk" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="45%" stopColor="#10B981" />
            <stop offset="85%" stopColor="#047857" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>
        </defs>

        {/* Ambient Halo Ring */}
        <circle cx="90" cy="90" r="82" fill={`url(#glow-${characterId})`} />

        {/* ========================================================================= */}
        {/* 1. PRINCESS: Royal storybook heroine, voluminous golden ringlets,          */}
        {/*    sparkling violet anime eyes with layered highlights, sweet smile       */}
        {/* ========================================================================= */}
        {characterId === 'princess' && (
          <g>
            {/* Back Hair: Flowing wavy golden locks with volumetric layers */}
            <path
              d="M45 60 C20 85, 18 125, 38 152 C48 155, 56 142, 52 125 C48 105, 56 82, 60 65 Z"
              fill="url(#princess-hair-vol)"
              stroke="#B45309"
              strokeWidth="1.2"
            />
            <path
              d="M135 60 C160 85, 162 125, 142 152 C132 155, 124 142, 128 125 C132 105, 124 82, 120 65 Z"
              fill="url(#princess-hair-vol)"
              stroke="#B45309"
              strokeWidth="1.2"
            />
            {/* Hair curl ribbons */}
            <path d="M36 120 Q28 140 40 150 Q52 145 44 130" fill="#FDE047" opacity="0.6" />
            <path d="M144 120 Q152 140 140 150 Q128 145 136 130" fill="#FDE047" opacity="0.6" />

            {/* Cloak Upgrade (Rose Silk Cloak with Golden Trim) */}
            {equippedUpgrade === 'princess_cloak' && (
              <g>
                <path
                  d="M52 98 C28 120, 32 160, 56 164 C90 168, 90 168, 124 164 C148 160, 152 120, 128 98 Z"
                  fill="#FDA4AF"
                  stroke="#E11D48"
                  strokeWidth="2.5"
                />
                <path d="M56 164 Q90 168 124 164" stroke="url(#gold-shimmer)" strokeWidth="3" fill="none" />
              </g>
            )}

            {/* Dress Body */}
            {equippedUpgrade === 'princess_dress' ? (
              // Royal Sparkle Dress Upgrade (Layered ballroom gown)
              <g>
                <path
                  d="M62 98 L40 158 C58 166, 122 166, 140 158 L118 98 Z"
                  fill="url(#dress-silk-pink)"
                  stroke="#831843"
                  strokeWidth="2.2"
                />
                {/* Tulle Frills & Golden Scallop Trims */}
                <path
                  d="M40 158 Q65 148 90 155 Q115 148 140 158 Q115 152 90 162 Q65 152 40 158 Z"
                  fill="url(#gold-shimmer)"
                />
                {/* Starlight Jewels & Embroidery */}
                <path d="M78 98 L90 114 L102 98" stroke="url(#gold-shimmer)" strokeWidth="2.5" fill="none" />
                <circle cx="90" cy="126" r="5" fill="#67E8F9" stroke="#0891B2" strokeWidth="1.2" />
                <text x="58" y="136" fontSize="12" fill="#FEF08A">✦</text>
                <text x="112" y="132" fontSize="12" fill="#FEF08A">✦</text>
                <text x="86" y="148" fontSize="11" fill="#FEF08A">✨</text>
              </g>
            ) : (
              // Classic Princess Dress with lace collar
              <g>
                <path
                  d="M66 98 L50 156 C68 164, 112 164, 130 156 L114 98 Z"
                  fill="url(#dress-silk-pink)"
                  stroke="#BE185D"
                  strokeWidth="2"
                />
                {/* White Scalloped Hem */}
                <path
                  d="M50 156 Q70 150 90 154 Q110 150 130 156 Q110 160 90 158 Q70 160 50 156 Z"
                  fill="#FFF1F2"
                />
                {/* Golden Bodice Trim */}
                <line x1="90" y1="98" x2="90" y2="124" stroke="url(#gold-shimmer)" strokeWidth="2.5" />
                <circle cx="90" cy="112" r="3" fill="#FDE047" />
              </g>
            )}

            {/* Dainty Hands / Arms */}
            <path d="M64 102 C50 112, 54 126, 62 125" stroke="#FFE4E6" strokeWidth="7" strokeLinecap="round" />
            <path d="M116 102 C130 112, 126 126, 118 125" stroke="#FFE4E6" strokeWidth="7" strokeLinecap="round" />

            {/* Pearled Choker & Neck */}
            <path d="M84 86 L84 100 L96 100 L96 86 Z" fill="#FFE4E6" />
            <path d="M83 95 Q90 100 97 95" stroke="#FDE047" strokeWidth="2" fill="none" />
            <circle cx="90" cy="99" r="2.2" fill="#38BDF8" />

            {/* Heart-Shaped Face with smooth porcelain tone */}
            <path
              d="M60 62 C58 88, 74 102, 90 104 C106 102, 122 88, 120 62 C120 44, 60 44, 60 62 Z"
              fill="#FFF1E6"
              stroke="#FDBA74"
              strokeWidth="1.2"
            />

            {/* Soft Luminous Airbrushed Cheeks & Sparkles */}
            <ellipse cx="71" cy="80" rx="8" ry="4" fill="#FB7185" opacity="0.65" />
            <ellipse cx="109" cy="80" rx="8" ry="4" fill="#FB7185" opacity="0.65" />
            <circle cx="70" cy="78" r="1.4" fill="#FFFFFF" />
            <circle cx="110" cy="78" r="1.4" fill="#FFFFFF" />
            <text x="66" y="86" fontSize="7" fill="#F43F5E">✦</text>
            <text x="110" y="86" fontSize="7" fill="#F43F5E">✦</text>

            {/* EXQUISITE PRINCESS EYES: Large anime jewel eyes with fluttery lashes */}
            {/* Left Eye */}
            <g transform="translate(68, 62)">
              <path d="M-3 9 Q7 0 17 9" stroke="#3B0764" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              <path d="M16 8 L21 5" stroke="#3B0764" strokeWidth="2" strokeLinecap="round" />
              <path d="M13 3 L16 -1" stroke="#3B0764" strokeWidth="1.5" strokeLinecap="round" />
              <ellipse cx="8" cy="13" rx="7.5" ry="9.5" fill="url(#eye-violet-deep)" />
              <ellipse cx="8" cy="13" rx="4.5" ry="5.5" fill="#1E1B4B" />
              {/* Catchlights */}
              <circle cx="11" cy="9" r="2.8" fill="#FFFFFF" />
              <circle cx="5" cy="16" r="1.5" fill="#FFFFFF" />
              <path d="M9 14 L10 12 L11 14 L10 16 Z" fill="#E0E7FF" opacity="0.9" />
              {/* Eyelid crease */}
              <path d="M-1 3 Q7 -1 15 3" stroke="#C4B5FD" strokeWidth="1.2" fill="none" />
            </g>

            {/* Right Eye */}
            <g transform="translate(94, 62)">
              <path d="M-1 9 Q9 0 19 9" stroke="#3B0764" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              <path d="M0 8 L-5 5" stroke="#3B0764" strokeWidth="2" strokeLinecap="round" />
              <path d="M3 3 L0 -1" stroke="#3B0764" strokeWidth="1.5" strokeLinecap="round" />
              <ellipse cx="8" cy="13" rx="7.5" ry="9.5" fill="url(#eye-violet-deep)" />
              <ellipse cx="8" cy="13" rx="4.5" ry="5.5" fill="#1E1B4B" />
              {/* Catchlights */}
              <circle cx="11" cy="9" r="2.8" fill="#FFFFFF" />
              <circle cx="5" cy="16" r="1.5" fill="#FFFFFF" />
              <path d="M9 14 L10 12 L11 14 L10 16 Z" fill="#E0E7FF" opacity="0.9" />
              {/* Eyelid crease */}
              <path d="M1 3 Q9 -1 17 3" stroke="#C4B5FD" strokeWidth="1.2" fill="none" />
            </g>

            {/* Delicate Graceful Eyebrows */}
            <path d="M68 59 Q76 54 84 57" stroke="#B45309" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M96 57 Q104 54 112 59" stroke="#B45309" strokeWidth="1.8" fill="none" strokeLinecap="round" />

            {/* Cute Dainty Nose */}
            <path d="M90 73 L89 77 L91 77" stroke="#FDBA74" strokeWidth="1.4" strokeLinecap="round" fill="none" />

            {/* Sweet Radiant Smile with Rose Tint */}
            <path d="M84 83 Q90 90 96 83" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M86 85 Q90 87 94 85" stroke="#FDA4AF" strokeWidth="1.6" strokeLinecap="round" fill="none" />

            {/* Front Hair Fringe: Volumetric shiny layered bangs */}
            <path
              d="M58 64 C60 42, 120 42, 122 64 C112 54, 102 58, 90 56 C78 58, 68 54, 58 64 Z"
              fill="url(#princess-hair-vol)"
            />
            {/* Glossy Hair Sheen Ribbons */}
            <path d="M68 50 Q90 44 112 50" stroke="#FEF9C3" strokeWidth="2.5" fill="none" opacity="0.75" />
            {/* Side Curls flowing over shoulders */}
            <path d="M58 62 C52 76, 52 92, 58 100" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M122 62 C128 76, 128 92, 122 100" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />

            {/* Royal Tiara Upgrade / Base Crown */}
            {equippedUpgrade === 'princess_tiara' ? (
              <g>
                <path
                  d="M68 46 L76 26 L84 38 L90 18 L96 38 L104 26 L112 46 Z"
                  fill="url(#gold-shimmer)"
                  stroke="#92400E"
                  strokeWidth="1.8"
                />
                <circle cx="90" cy="20" r="4.2" fill="#67E8F9" stroke="#0891B2" strokeWidth="1.2" />
                <circle cx="76" cy="28" r="3.2" fill="#F472B6" stroke="#9D174D" strokeWidth="1" />
                <circle cx="104" cy="28" r="3.2" fill="#F472B6" stroke="#9D174D" strokeWidth="1" />
                <circle cx="84" cy="40" r="2" fill="#FFFFFF" />
                <circle cx="96" cy="40" r="2" fill="#FFFFFF" />
              </g>
            ) : (
              <g>
                <path
                  d="M74 48 L80 36 L90 43 L100 36 L106 48 Z"
                  fill="url(#gold-shimmer)"
                  stroke="#B45309"
                  strokeWidth="1.4"
                />
                <circle cx="90" cy="40" r="2.8" fill="#E11D48" />
              </g>
            )}
          </g>
        )}

        {/* ========================================================================= */}
        {/* 2. PRINCE: Handsome noble prince, stylish layered chestnut hair,            */}
        {/*    deep sapphire eyes with confident spark, charming gallant smile        */}
        {/* ========================================================================= */}
        {characterId === 'prince' && (
          <g>
            {/* Cape (Back) */}
            {equippedUpgrade === 'prince_cape' ? (
              <g>
                <path
                  d="M48 94 C22 118, 26 162, 52 165 C90 170, 90 170, 128 165 C154 162, 158 118, 132 94 Z"
                  fill="#DC2626"
                  stroke="#7F1D1D"
                  strokeWidth="2.8"
                />
                {/* Ermine / Golden Hem lining */}
                <path d="M52 165 Q90 170 128 165" stroke="url(#gold-shimmer)" strokeWidth="3.5" fill="none" />
              </g>
            ) : (
              <path
                d="M54 96 C38 122, 40 156, 56 158 C90 162, 90 162, 124 158 C140 156, 142 122, 126 96 Z"
                fill="#1D4ED8"
                stroke="#1E3A8A"
                strokeWidth="2.2"
              />
            )}

            {/* Prince Military-Style Tunic */}
            <path
              d="M64 96 L58 148 L122 148 L116 96 Z"
              fill="url(#tunic-royal-blue)"
              stroke="#0F172A"
              strokeWidth="2.2"
            />
            {/* Gold Shoulder Epaulets with fringing */}
            <g>
              <ellipse cx="62" cy="98" rx="8" ry="4" fill="url(#gold-shimmer)" stroke="#92400E" strokeWidth="1.2" />
              <line x1="56" y1="102" x2="56" y2="108" stroke="#F59E0B" strokeWidth="1.8" />
              <line x1="62" y1="102" x2="62" y2="109" stroke="#F59E0B" strokeWidth="1.8" />
              <line x1="68" y1="102" x2="68" y2="108" stroke="#F59E0B" strokeWidth="1.8" />
            </g>
            <g>
              <ellipse cx="118" cy="98" rx="8" ry="4" fill="url(#gold-shimmer)" stroke="#92400E" strokeWidth="1.2" />
              <line x1="112" y1="102" x2="112" y2="108" stroke="#F59E0B" strokeWidth="1.8" />
              <line x1="118" y1="102" x2="118" y2="109" stroke="#F59E0B" strokeWidth="1.8" />
              <line x1="124" y1="102" x2="124" y2="108" stroke="#F59E0B" strokeWidth="1.8" />
            </g>

            {/* Golden Belt & Buckle */}
            <rect x="62" y="124" width="56" height="8" fill="url(#gold-shimmer)" rx="2" />
            <rect x="85" y="122.5" width="10" height="11" fill="#FEF08A" stroke="#92400E" strokeWidth="1.2" rx="2" />
            <circle cx="90" cy="128" r="2.5" fill="#EF4444" />

            {/* Legs & Riding Boots */}
            <line x1="76" y1="148" x2="76" y2="164" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
            <line x1="104" y1="148" x2="104" y2="164" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />

            {/* Arms & Hands */}
            <path d="M62 102 C48 114, 52 128, 58 132" stroke="#FFEDD5" strokeWidth="7" strokeLinecap="round" />
            {equippedUpgrade === 'prince_scepter' ? (
              // Royal Scepter with radiant sapphire top
              <g>
                <path d="M118 102 C128 114, 128 124, 124 130" stroke="#FFEDD5" strokeWidth="7" strokeLinecap="round" />
                <line x1="128" y1="94" x2="128" y2="156" stroke="url(#gold-shimmer)" strokeWidth="4.5" strokeLinecap="round" />
                <circle cx="128" cy="92" r="8.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
                <polygon points="128,80 133,87 123,87" fill="#FDE047" stroke="#D97706" strokeWidth="1" />
                <circle cx="128" cy="92" r="3" fill="#FFFFFF" opacity="0.8" />
              </g>
            ) : (
              <path d="M118 102 C132 114, 128 128, 122 132" stroke="#FFEDD5" strokeWidth="7" strokeLinecap="round" />
            )}

            {/* Neck & Mandarin Collar with gold frog latch */}
            <rect x="84" y="86" width="12" height="12" fill="#FFEDD5" />
            <polygon points="84,94 90,100 96,94" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

            {/* Handsome, chiseled young noble face */}
            <path
              d="M62 60 C60 84, 76 102, 90 104 C104 102, 120 84, 118 60 C118 40, 62 40, 62 60 Z"
              fill="#FFEDD5"
              stroke="#FDBA74"
              strokeWidth="1.2"
            />

            {/* Subtle warm apricot cheek glow */}
            <ellipse cx="71" cy="80" rx="7" ry="3.5" fill="#FDBA74" opacity="0.6" />
            <ellipse cx="109" cy="80" rx="7" ry="3.5" fill="#FDBA74" opacity="0.6" />

            {/* GALLANT PRINCE EYES: Striking, noble, deep sapphire blue */}
            {/* Left Eye */}
            <g transform="translate(68, 63)">
              <path d="M-1 6 Q8 0 17 6" stroke="#0F172A" strokeWidth="3" fill="none" strokeLinecap="round" />
              <ellipse cx="8" cy="12" rx="6.8" ry="8" fill="url(#eye-sapphire-deep)" />
              <ellipse cx="8" cy="12" rx="3.8" ry="4.8" fill="#032B44" />
              <circle cx="11" cy="9" r="2.4" fill="#FFFFFF" />
              <circle cx="5" cy="15" r="1.2" fill="#BAE6FD" />
            </g>
            {/* Right Eye */}
            <g transform="translate(94, 63)">
              <path d="M0 6 Q9 0 18 6" stroke="#0F172A" strokeWidth="3" fill="none" strokeLinecap="round" />
              <ellipse cx="9" cy="12" rx="6.8" ry="8" fill="url(#eye-sapphire-deep)" />
              <ellipse cx="9" cy="12" rx="3.8" ry="4.8" fill="#032B44" />
              <circle cx="12" cy="9" r="2.4" fill="#FFFFFF" />
              <circle cx="6" cy="15" r="1.2" fill="#BAE6FD" />
            </g>

            {/* Confident Noble Arched Eyebrows */}
            <path d="M66 57 Q75 51 84 55" stroke="#451A03" strokeWidth="2.8" fill="none" strokeLinecap="round" />
            <path d="M96 55 Q105 51 114 57" stroke="#451A03" strokeWidth="2.8" fill="none" strokeLinecap="round" />

            {/* Defined Straight Nose */}
            <path d="M90 70 L89 76 L92 76" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Confident, handsome royal smile */}
            <path d="M83 83 Q90 90 97 83" stroke="#991B1B" strokeWidth="2.6" strokeLinecap="round" fill="none" />

            {/* Wavy styled layered chestnut hair with wind-swept bangs */}
            <path
              d="M58 66 C56 42, 124 42, 122 66 C116 54, 106 50, 96 54 C90 50, 82 50, 74 54 C66 50, 60 56, 58 66 Z"
              fill="url(#prince-hair-vol)"
            />
            {/* Glossy hair highlight arcs */}
            <path d="M66 52 Q90 46 114 52" stroke="#F59E0B" strokeWidth="2.4" fill="none" opacity="0.65" />
            {/* Sideburns & Ear accents */}
            <path d="M59 62 C54 70, 54 82, 58 86" stroke="#78350F" strokeWidth="3.2" fill="none" strokeLinecap="round" />
            <path d="M121 62 C126 70, 126 82, 122 86" stroke="#78350F" strokeWidth="3.2" fill="none" strokeLinecap="round" />

            {/* Golden Sun Crown Upgrade / Base Crown */}
            {equippedUpgrade === 'prince_crown' ? (
              <g>
                <path
                  d="M64 46 L68 20 L80 34 L90 12 L100 34 L112 20 L116 46 Z"
                  fill="url(#gold-shimmer)"
                  stroke="#78350F"
                  strokeWidth="2.2"
                />
                <circle cx="90" cy="15" r="4.5" fill="#EF4444" stroke="#7F1D1D" strokeWidth="1.2" />
                <circle cx="68" cy="22" r="3.2" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
                <circle cx="112" cy="22" r="3.2" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
              </g>
            ) : (
              <path
                d="M72 48 L78 34 L90 42 L102 34 L108 48 Z"
                fill="url(#gold-shimmer)"
                stroke="#B45309"
                strokeWidth="1.4"
              />
            )}
          </g>
        )}

        {/* ========================================================================= */}
        {/* 3. KNIGHT: Courageous, spirited hero, radiant emerald eyes,                 */}
        {/*    cute hero bandage on cheek, toothy open grin, shiny plate armor        */}
        {/* ========================================================================= */}
        {characterId === 'knight' && (
          <g>
            {/* Scarlet Knight Cape */}
            <path
              d="M56 94 C38 120, 40 156, 56 160 C90 164, 90 164, 124 160 C140 156, 142 120, 124 94 Z"
              fill="#B91C1C"
              stroke="#7F1D1D"
              strokeWidth="2.2"
            />

            {/* Embossed Silver Armor Breastplate with golden trim */}
            <path
              d="M62 94 L56 148 L124 148 L118 94 Z"
              fill="url(#silver-plate)"
              stroke="#1E293B"
              strokeWidth="2.2"
            />
            {/* Golden Lion Cross Heraldry on chest */}
            <polygon points="90,106 99,120 81,120" fill="url(#gold-shimmer)" stroke="#92400E" strokeWidth="1.2" />
            <line x1="90" y1="102" x2="90" y2="124" stroke="#B45309" strokeWidth="1.5" />

            {/* Greaves & Boots */}
            <line x1="76" y1="148" x2="76" y2="164" stroke="#475569" strokeWidth="9" strokeLinecap="round" />
            <line x1="104" y1="148" x2="104" y2="164" stroke="#475569" strokeWidth="9" strokeLinecap="round" />

            {/* Shield Upgrade (Left Hand) */}
            {equippedUpgrade === 'knight_shield' ? (
              <g>
                <path
                  d="M38 102 C38 102, 52 98, 62 104 C62 134, 48 152, 38 158 C28 152, 14 134, 14 104 C24 98, 38 102, 38 102 Z"
                  fill="url(#gold-shimmer)"
                  stroke="#92400E"
                  strokeWidth="2.5"
                />
                <circle cx="38" cy="125" r="8.5" fill="#DC2626" />
                <polygon points="38,119 42,126 34,126" fill="#FEF08A" />
              </g>
            ) : (
              <path d="M60 102 C46 114, 48 128, 54 134" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />
            )}

            {/* Sword Upgrade (Right Hand) */}
            {equippedUpgrade === 'knight_sword' ? (
              <g>
                <path d="M118 102 C130 114, 130 126, 122 132" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />
                {/* Gleaming Runed Sword Blade */}
                <line x1="126" y1="132" x2="154" y2="48" stroke="#F8FAFC" strokeWidth="6" strokeLinecap="round" />
                <line x1="126" y1="132" x2="154" y2="48" stroke="#38BDF8" strokeWidth="2" />
                {/* Crossguard & Pommel */}
                <line x1="116" y1="126" x2="138" y2="136" stroke="url(#gold-shimmer)" strokeWidth="5" strokeLinecap="round" />
                <circle cx="122" cy="134" r="4" fill="#F59E0B" />
              </g>
            ) : (
              <path d="M118 102 C132 114, 130 128, 124 134" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />
            )}

            {/* Armored Collar / Gorget & Neck */}
            <rect x="84" y="86" width="12" height="12" fill="#FED7AA" />
            <path d="M78 92 Q90 98 102 92" stroke="#334155" strokeWidth="3.5" fill="none" />

            {/* Round, lively hero face */}
            <path
              d="M60 60 C58 84, 74 102, 90 104 C106 102, 122 84, 120 60 C120 40, 60 40, 60 60 Z"
              fill="#FED7AA"
              stroke="#F97316"
              strokeWidth="1.2"
            />

            {/* Energetic Rosy Cheeks + Cute Hero Adhesive Bandage */}
            <ellipse cx="71" cy="80" rx="7" ry="3.5" fill="#FDA4AF" opacity="0.65" />
            <ellipse cx="109" cy="80" rx="7" ry="3.5" fill="#FDA4AF" opacity="0.65" />
            {/* Cute Bandage on right cheek with adventure cross */}
            <g transform="translate(106, 78) rotate(-15)">
              <rect x="-7" y="-3.5" width="14" height="7" rx="2" fill="#FEF08A" stroke="#EAB308" strokeWidth="1" />
              <line x1="0" y1="-2.5" x2="0" y2="2.5" stroke="#F97316" strokeWidth="1.2" />
              <line x1="-2.5" y1="0" x2="2.5" y2="0" stroke="#F97316" strokeWidth="1.2" />
            </g>

            {/* HEROIC KNIGHT EYES: Fearless, wide, brilliant emerald green */}
            {/* Left Eye */}
            <g transform="translate(68, 62)">
              <path d="M-1 7 Q8 0 17 6" stroke="#1E293B" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              <ellipse cx="8" cy="12" rx="7.2" ry="8.5" fill="url(#eye-emerald-deep)" />
              <ellipse cx="8" cy="12" rx="4.2" ry="5" fill="#022C22" />
              <circle cx="11" cy="9" r="2.6" fill="#FFFFFF" />
              <circle cx="5" cy="15" r="1.4" fill="#A7F3D0" />
            </g>
            {/* Right Eye */}
            <g transform="translate(94, 62)">
              <path d="M0 6 Q9 0 18 7" stroke="#1E293B" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              <ellipse cx="9" cy="12" rx="7.2" ry="8.5" fill="url(#eye-emerald-deep)" />
              <ellipse cx="9" cy="12" rx="4.2" ry="5" fill="#022C22" />
              <circle cx="12" cy="9" r="2.6" fill="#FFFFFF" />
              <circle cx="6" cy="15" r="1.4" fill="#A7F3D0" />
            </g>

            {/* Determined Heroic Eyebrows */}
            <path d="M65 57 Q75 49 84 56" stroke="#292524" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M96 56 Q105 49 115 57" stroke="#292524" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Cute Button Nose */}
            <circle cx="90" cy="74" r="1.4" fill="#EA580C" />

            {/* Toothy Heroic Open Grin */}
            <path d="M83 82 Q90 92 97 82 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
            <path d="M85 82 Q90 86 95 82" fill="#FFFFFF" />

            {/* Tousled spiky dark hero hair with energetic cowlick */}
            <path
              d="M58 64 C56 38, 124 38, 122 64 C114 54, 104 50, 96 54 C90 44, 84 44, 78 52 C70 50, 64 54, 58 64 Z"
              fill="url(#knight-hair-vol)"
            />
            {/* Energetic Cowlick (Ahoge) */}
            <path d="M90 44 C92 28, 104 30, 99 40" stroke="url(#knight-hair-vol)" strokeWidth="3.8" fill="none" strokeLinecap="round" />

            {/* Helmet Upgrade / Silver Circlet */}
            {equippedUpgrade === 'knight_helm' ? (
              <g>
                <path
                  d="M56 60 C56 32, 124 32, 124 60 C124 70, 56 70, 56 60 Z"
                  fill="url(#silver-plate)"
                  stroke="#1E293B"
                  strokeWidth="2.5"
                />
                {/* Plumed scarlet feather */}
                <path
                  d="M90 34 C82 8, 106 -2, 124 12 C110 16, 108 28, 96 34 Z"
                  fill="#DC2626"
                  stroke="#991B1B"
                  strokeWidth="1.8"
                />
                <line x1="90" y1="46" x2="90" y2="66" stroke="#334155" strokeWidth="3.8" strokeLinecap="round" />
              </g>
            ) : (
              <path
                d="M58 60 C70 50, 110 50, 122 60"
                stroke="url(#silver-plate)"
                strokeWidth="5.5"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </g>
        )}

        {/* ========================================================================= */}
        {/* 4. FAIRY: Ethereal dreamy sprite, large doe mint eyes with star pupils,    */}
        {/*    pointed elf ears, pastel lilac twin ponytails, glowing wings           */}
        {/* ========================================================================= */}
        {characterId === 'fairy' && (
          <g>
            {/* Shimmering Fairy Wings (Back) */}
            {equippedUpgrade === 'fairy_wings' ? (
              // Iridescent Crystal Wings Upgrade
              <g>
                <path
                  d="M80 88 C26 40, 2 68, 20 118 C36 145, 74 125, 80 100 Z"
                  fill="#A7F3D0"
                  fillOpacity="0.85"
                  stroke="#059669"
                  strokeWidth="2.2"
                />
                <path
                  d="M100 88 C154 40, 178 68, 160 118 C144 145, 106 125, 100 100 Z"
                  fill="#A7F3D0"
                  fillOpacity="0.85"
                  stroke="#059669"
                  strokeWidth="2.2"
                />
                <circle cx="36" cy="80" r="4" fill="#FFFFFF" />
                <circle cx="144" cy="80" r="4" fill="#FFFFFF" />
                <path d="M42 86 Q64 92 80 96" stroke="#34D399" strokeWidth="1.8" fill="none" />
                <path d="M138 86 Q116 92 100 96" stroke="#34D399" strokeWidth="1.8" fill="none" />
              </g>
            ) : (
              // Standard Delicate Fairy Wings
              <g>
                <path
                  d="M82 90 C46 62, 28 84, 44 114 C56 128, 76 112, 82 102 Z"
                  fill="#D1FAE5"
                  fillOpacity="0.8"
                  stroke="#10B981"
                  strokeWidth="2"
                />
                <path
                  d="M98 90 C134 62, 152 84, 136 114 C124 128, 104 112, 98 102 Z"
                  fill="#D1FAE5"
                  fillOpacity="0.8"
                  stroke="#10B981"
                  strokeWidth="2"
                />
              </g>
            )}

            {/* Whimsical Leaf Silk Dress */}
            <path
              d="M66 98 L50 158 C70 166, 110 166, 130 158 L114 98 Z"
              fill="url(#fairy-leaf-silk)"
              stroke="#064E3B"
              strokeWidth="2.2"
            />
            {/* Scalloped Petal Hem */}
            <path
              d="M50 158 Q66 148 78 160 Q90 148 102 160 Q114 148 130 158"
              fill="#A7F3D0"
              stroke="#047857"
              strokeWidth="1.6"
            />

            {/* Wand in hand */}
            {equippedUpgrade === 'fairy_wand' ? (
              // Shining Star Wand Upgrade
              <g>
                <path d="M116 102 C126 112, 132 122, 126 128" stroke="#FEF3C7" strokeWidth="6.5" strokeLinecap="round" />
                <line x1="126" y1="134" x2="148" y2="72" stroke="url(#gold-shimmer)" strokeWidth="4" strokeLinecap="round" />
                <polygon
                  points="148,60 153,69 164,70 155,78 158,88 148,82 138,88 141,78 132,70 143,69"
                  fill="#FDE047"
                  stroke="#D97706"
                  strokeWidth="2"
                />
                <text x="156" y="60" fontSize="12" fill="#6EE7B7">✦</text>
                <text x="130" y="66" fontSize="11" fill="#F472B6">✧</text>
              </g>
            ) : (
              <path d="M116 102 C128 114, 124 126, 116 128" stroke="#FEF3C7" strokeWidth="6.5" strokeLinecap="round" />
            )}

            {/* Left Arm */}
            <path d="M64 102 C52 114, 56 128, 64 128" stroke="#FEF3C7" strokeWidth="6.5" strokeLinecap="round" />

            {/* POINTED FAIRY ELF EARS with golden pearl studs */}
            <path
              d="M60 66 C42 60, 32 52, 30 48 C32 58, 44 72, 60 76 Z"
              fill="#FFF7ED"
              stroke="#FDBA74"
              strokeWidth="1.4"
            />
            <circle cx="32" cy="50" r="1.8" fill="#FDE047" />

            <path
              d="M120 66 C138 60, 148 52, 150 48 C148 58, 136 72, 120 76 Z"
              fill="#FFF7ED"
              stroke="#FDBA74"
              strokeWidth="1.4"
            />
            <circle cx="148" cy="50" r="1.8" fill="#FDE047" />

            {/* Petite Fairy Chin & Face */}
            <rect x="84" y="86" width="12" height="12" fill="#FFF7ED" />
            <path
              d="M60 62 C58 86, 74 102, 90 104 C106 102, 122 86, 120 62 C120 42, 60 42, 60 62 Z"
              fill="#FFF7ED"
              stroke="#FDBA74"
              strokeWidth="1.2"
            />

            {/* Luminous Magenta Cheek Blush + Glowing Stardust Freckles */}
            <ellipse cx="71" cy="80" rx="8" ry="4" fill="#F472B6" opacity="0.7" />
            <ellipse cx="109" cy="80" rx="8" ry="4" fill="#F472B6" opacity="0.7" />
            <text x="67" y="82" fontSize="8" fill="#FDE047">✦</text>
            <text x="109" y="82" fontSize="8" fill="#FDE047">✦</text>
            <circle cx="90" cy="80" r="1" fill="#FDE047" />

            {/* MAGICAL FAIRY DOE-EYES: Huge, starry mint-emerald with star pupils */}
            {/* Left Eye */}
            <g transform="translate(68, 62)">
              <path d="M-3 9 Q7 0 17 9" stroke="#4C1D95" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              <path d="M16 8 L21 5" stroke="#4C1D95" strokeWidth="1.8" strokeLinecap="round" />
              <ellipse cx="8" cy="13" rx="7.8" ry="9.8" fill="url(#eye-mint-deep)" />
              {/* Star Pupil */}
              <polygon points="8,9 9.5,13 13,13 10,15.5 11.5,19 8,16.5 4.5,19 6,15.5 3,13 6.5,13" fill="#042F2E" />
              {/* Sparkle catchlights */}
              <circle cx="11" cy="9" r="2.8" fill="#FFFFFF" />
              <circle cx="5" cy="16" r="1.6" fill="#FFFFFF" />
            </g>
            {/* Right Eye */}
            <g transform="translate(94, 62)">
              <path d="M-1 9 Q9 0 19 9" stroke="#4C1D95" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              <path d="M0 8 L-5 5" stroke="#4C1D95" strokeWidth="1.8" strokeLinecap="round" />
              <ellipse cx="8" cy="13" rx="7.8" ry="9.8" fill="url(#eye-mint-deep)" />
              {/* Star Pupil */}
              <polygon points="8,9 9.5,13 13,13 10,15.5 11.5,19 8,16.5 4.5,19 6,15.5 3,13 6.5,13" fill="#042F2E" />
              {/* Sparkle catchlights */}
              <circle cx="11" cy="9" r="2.8" fill="#FFFFFF" />
              <circle cx="5" cy="16" r="1.6" fill="#FFFFFF" />
            </g>

            {/* Soft Lilac Eyebrows */}
            <path d="M68 59 Q76 54 84 57" stroke="#9333EA" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M96 57 Q104 54 112 59" stroke="#9333EA" strokeWidth="1.8" fill="none" strokeLinecap="round" />

            {/* Dainty Fairy Nose */}
            <circle cx="90" cy="74" r="1" fill="#F472B6" />

            {/* Playful 'ω' Cat / Fairy Smile */}
            <path d="M83 83 Q86.5 88 90 84 Q93.5 88 97 83" stroke="#BE185D" strokeWidth="2.2" strokeLinecap="round" fill="none" />

            {/* Airy Pastel Lilac Fairy Hair with floating side twintails */}
            <path
              d="M58 64 C56 40, 124 40, 122 64 C112 54, 102 58, 90 56 C78 58, 68 54, 58 64 Z"
              fill="url(#fairy-hair-vol)"
            />
            {/* Twin Floating Pigtails with blossom ties */}
            <g transform="translate(48, 76)">
              <circle cx="0" cy="0" r="8" fill="url(#fairy-hair-vol)" />
              <circle cx="-5" cy="14" r="6" fill="url(#fairy-hair-vol)" />
              <circle cx="0" cy="0" r="3.5" fill="#FDE047" />
            </g>
            <g transform="translate(132, 76)">
              <circle cx="0" cy="0" r="8" fill="url(#fairy-hair-vol)" />
              <circle cx="5" cy="14" r="6" fill="url(#fairy-hair-vol)" />
              <circle cx="0" cy="0" r="3.5" fill="#FDE047" />
            </g>

            {/* Floral Crown Upgrade */}
            {equippedUpgrade === 'fairy_halo' ? (
              <g>
                <ellipse cx="90" cy="46" rx="26" ry="8" fill="none" stroke="#22C55E" strokeWidth="2.8" />
                <circle cx="72" cy="45" r="5" fill="#F472B6" />
                <circle cx="90" cy="41" r="6" fill="#FDE047" />
                <circle cx="108" cy="45" r="5" fill="#67E8F9" />
                <text x="86" y="34" fontSize="11" fill="#FEF08A">✦</text>
              </g>
            ) : (
              <circle cx="90" cy="45" r="4" fill="#FDE047" />
            )}
          </g>
        )}
      </svg>
    </div>
  );
};
