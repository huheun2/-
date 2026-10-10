import React from 'react';

interface StorySvgRendererProps {
  svgType: string;
  fillColor?: string | null; // Color applied to the target object during coloring or review
  isHighlighted?: boolean;  // When waiting for color, pulse or show target border
  mode?: 'lineart' | 'coloring' | 'gallery';
  className?: string;
}

export const StorySvgRenderer: React.FC<StorySvgRendererProps> = ({
  svgType,
  fillColor = null,
  isHighlighted = false,
  mode = 'lineart',
  className = '',
}) => {
  const isLineArt = mode === 'lineart';
  const strokeColor = '#334155'; // Clean dark outline

  // Helper function: strictly returns clean uncolored lineart neutral (#FFFFFF or subtle line-fill) in quiz mode!
  // In coloring or gallery mode, it returns the real vibrant palette color.
  const c = (colorHex: string, lineartHex = '#FFFFFF'): string => {
    return isLineArt ? lineartHex : colorHex;
  };

  // In lineart mode, the target object MUST be uncolored white, so students cannot cheat by spotting the color!
  const objectFill = isLineArt ? '#FFFFFF' : (fillColor || '#FEF3C7');
  const targetHighlight = isHighlighted && !isLineArt ? 'animate-pulse stroke-amber-500 stroke-[3.5]' : '';

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 220 160"
        className="w-full h-full max-h-full drop-shadow-xs select-none overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sky-soft-color" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EFF6FF" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>
          <linearGradient id="grass-soft-color" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DCFCE7" />
            <stop offset="100%" stopColor="#BBF7D0" />
          </linearGradient>
        </defs>

        {/* Backdrop: Clean white in quiz lineart mode; gentle pastel gradient in coloring/gallery mode */}
        <rect
          width="220"
          height="160"
          fill={isLineArt ? '#FFFFFF' : 'url(#sky-soft-color)'}
          rx="12"
          stroke={isLineArt ? '#E2E8F0' : 'none'}
          strokeWidth="1"
        />

        {/* ========================================================================= */}
        {/* PAGE 1: Emma finds a shiny box under a tall green tree.                   */}
        {/* ========================================================================= */}
        {svgType === 'p1_correct' && (
          <g>
            {/* Rolling hills */}
            <path
              d="M0 120 Q60 110 120 118 Q180 125 220 115 L220 160 L0 160 Z"
              fill={c('url(#grass-soft-color)', '#F8FAFC')}
              stroke={strokeColor}
              strokeWidth="1.5"
            />
            {/* Flowers on grass */}
            <circle cx="25" cy="135" r="2" fill={c('#F472B6')} stroke={strokeColor} strokeWidth={isLineArt ? 1 : 0} />
            <circle cx="75" cy="140" r="2" fill={c('#FDE047')} stroke={strokeColor} strokeWidth={isLineArt ? 1 : 0} />
            <circle cx="190" cy="132" r="2" fill={c('#60A5FA')} stroke={strokeColor} strokeWidth={isLineArt ? 1 : 0} />

            {/* Tree Trunk */}
            <path d="M140 60 Q136 95 132 130 L160 130 Q156 95 152 60 Z" fill={c('#D7CCC8')} stroke={strokeColor} strokeWidth="2" />
            <path d="M142 85 Q146 100 144 115" stroke={c('#8D6E63', strokeColor)} strokeWidth="1.5" fill="none" />

            {/* TARGET OBJECT: Tall Green Tree Foliage (NO COLOR in lineart mode!) */}
            <g className={targetHighlight}>
              <path
                d="M146 12 C110 12 100 45 116 68 C100 90 128 110 146 104 C172 110 196 90 184 68 C198 45 178 12 146 12 Z"
                fill={objectFill}
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="2.5"
                style={{ transition: 'fill 0.4s ease' }}
              />
              <circle cx="132" cy="50" r="7" fill="none" stroke={strokeColor} strokeWidth="1.2" opacity="0.4" />
              <circle cx="160" cy="56" r="8" fill="none" stroke={strokeColor} strokeWidth="1.2" opacity="0.4" />
              <circle cx="146" cy="35" r="9" fill="none" stroke={strokeColor} strokeWidth="1.2" opacity="0.4" />
            </g>

            {/* Expressive Emma discovering the box */}
            <g transform="translate(36, 68)">
              {/* Twin braids with ribbons */}
              <path d="M10 20 C6 30, 4 42, 8 48" stroke={c('#B45309', strokeColor)} strokeWidth="4" strokeLinecap="round" fill="none" />
              <circle cx="8" cy="48" r="2.5" fill={c('#F472B6')} stroke={strokeColor} strokeWidth={isLineArt ? 1 : 0} />
              <path d="M28 20 C32 30, 34 42, 30 48" stroke={c('#B45309', strokeColor)} strokeWidth="4" strokeLinecap="round" fill="none" />
              <circle cx="30" cy="48" r="2.5" fill={c('#F472B6')} stroke={strokeColor} strokeWidth={isLineArt ? 1 : 0} />

              {/* Head with cute face */}
              <circle cx="19" cy="18" r="14" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="1.8" />
              <path d="M7 16 C10 8, 28 8, 31 16 C25 12, 13 12, 7 16 Z" fill={c('#B45309', '#F1F5F9')} stroke={strokeColor} strokeWidth="1" />

              {/* Expressive Eyes & Smile */}
              <circle cx="15" cy="18" r="2.8" fill={strokeColor} />
              <circle cx="16" cy="17" r="1" fill="#FFFFFF" />
              <circle cx="23" cy="18" r="2.8" fill={strokeColor} />
              <circle cx="24" cy="17" r="1" fill="#FFFFFF" />
              <path d="M13 13 Q16 11 19 13" stroke={strokeColor} strokeWidth="1.2" fill="none" />
              <path d="M21 13 Q24 11 27 13" stroke={strokeColor} strokeWidth="1.2" fill="none" />
              <ellipse cx="12" cy="22" rx="2.5" ry="1.5" fill={c('#FDA4AF', '#E2E8F0')} />
              <ellipse cx="26" cy="22" rx="2.5" ry="1.5" fill={c('#FDA4AF', '#E2E8F0')} />
              <path d="M17 23 Q19 28 21 23 Z" fill={c('#DC2626', strokeColor)} stroke={strokeColor} strokeWidth="1" />

              {/* Dress body */}
              <path d="M14 31 L8 55 L30 55 L24 31 Z" fill={c('#F472B6')} stroke={strokeColor} strokeWidth="1.8" />
              <path d="M22 36 Q34 38 46 45" stroke={c('#FED7AA', strokeColor)} strokeWidth="5" strokeLinecap="round" fill="none" />
              <circle cx="47" cy="46" r="3" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="1" />
            </g>

            {/* Shiny Box under tree */}
            <g transform="translate(100, 114)">
              <rect x="0" y="5" width="26" height="18" rx="3" fill={c('#FEF08A')} stroke={strokeColor} strokeWidth="2" />
              <rect x="-3" y="0" width="32" height="6" rx="2" fill={c('#FDE047')} stroke={strokeColor} strokeWidth="2" />
              <line x1="13" y1="0" x2="13" y2="23" stroke={c('#D97706', strokeColor)} strokeWidth="2" />
              <circle cx="13" cy="14" r="3" fill={c('#67E8F9', '#FFFFFF')} stroke={strokeColor} strokeWidth="1" />
              <text x="28" y="2" fontSize="13" fill={c('#F59E0B', strokeColor)}>✨</text>
            </g>
          </g>
        )}

        {/* p1_sleeping: Emma sleeping peacefully (Uncolored lineart in quiz mode) */}
        {svgType === 'p1_sleeping' && (
          <g transform="translate(15, 5)">
            <rect x="25" y="85" width="145" height="48" rx="6" fill={c('#F1F5F9')} stroke={strokeColor} strokeWidth="2" />
            <rect x="15" y="65" width="14" height="72" rx="3" fill={c('#94A3B8')} stroke={strokeColor} strokeWidth="2" />
            <rect x="35" y="75" width="36" height="24" rx="8" fill="#FFFFFF" stroke={strokeColor} strokeWidth="1.8" />
            <circle cx="53" cy="84" r="11" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="1.8" />
            <path d="M48 85 Q52 89 56 85" stroke={strokeColor} strokeWidth="1.8" fill="none" />
            <ellipse cx="46" cy="89" rx="3" ry="1.5" fill={c('#FDA4AF', '#E2E8F0')} />
            <ellipse cx="60" cy="89" rx="3" ry="1.5" fill={c('#FDA4AF', '#E2E8F0')} />
            <circle cx="68" cy="74" r="5" fill={c('#BAE6FD')} opacity="0.8" stroke={strokeColor} strokeWidth="1" />
            <text x="80" y="68" fontSize="14" fill={strokeColor} fontWeight="bold">Zzz...</text>
            <path d="M60 92 L165 92 L165 125 L60 125 Z" fill={c('#BFDBFE')} stroke={strokeColor} strokeWidth="2" />
          </g>
        )}

        {/* p1_bicycle: Boy riding bike */}
        {svgType === 'p1_bicycle' && (
          <g transform="translate(30, 25)">
            <circle cx="40" cy="90" r="24" fill="none" stroke={strokeColor} strokeWidth="3" />
            <circle cx="120" cy="90" r="24" fill="none" stroke={strokeColor} strokeWidth="3" />
            <path d="M40 90 L78 90 L102 62 L60 62 Z" fill="none" stroke={strokeColor} strokeWidth="3.2" />
            <circle cx="82" cy="30" r="11" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="1.8" />
            <path d="M72 22 Q82 14 92 22" stroke={c('#EF4444', strokeColor)} strokeWidth="5" fill="none" />
            <circle cx="86" cy="30" r="2" fill={strokeColor} />
            <path d="M82 36 Q86 40 90 36 Z" fill={c('#DC2626', strokeColor)} />
          </g>
        )}

        {/* p1_swimming_cat: Cat in pool tube */}
        {svgType === 'p1_swimming_cat' && (
          <g transform="translate(10, 5)">
            <ellipse cx="100" cy="100" rx="90" ry="36" fill={c('#BAE6FD')} stroke={strokeColor} strokeWidth="2" />
            <ellipse cx="100" cy="96" rx="40" ry="20" fill={c('#FDE047')} stroke={strokeColor} strokeWidth="2.8" />
            <circle cx="100" cy="74" r="16" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="2" />
            <polygon points="88,64 84,48 97,58" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="1.8" />
            <polygon points="112,64 116,48 103,58" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="1.8" />
            <rect x="88" y="70" width="10" height="7" rx="2" fill={strokeColor} />
            <rect x="102" y="70" width="10" height="7" rx="2" fill={strokeColor} />
            <line x1="98" y1="73" x2="102" y2="73" stroke={strokeColor} strokeWidth="2" />
          </g>
        )}

        {/* ========================================================================= */}
        {/* PAGE 2: Inside the box, she sees a sparkling blue necklace.               */}
        {/* ========================================================================= */}
        {svgType === 'p2_correct' && (
          <g>
            <rect x="65" y="74" width="100" height="60" rx="8" fill={c('#FDE68A')} stroke={strokeColor} strokeWidth="2.8" />
            <rect x="73" y="80" width="84" height="48" rx="4" fill={c('#991B1B', '#F1F5F9')} stroke={strokeColor} strokeWidth={isLineArt ? 1.5 : 0} />
            <path d="M60 74 L105 28 L160 28 L165 74 Z" fill={c('#FCD34D')} stroke={strokeColor} strokeWidth="2.8" />
            <circle cx="72" cy="74" r="3" fill={c('#D97706', strokeColor)} />
            <circle cx="158" cy="74" r="3" fill={c('#D97706', strokeColor)} />

            {/* TARGET OBJECT: Sparkling Blue Necklace (NO COLOR in lineart mode!) */}
            <g className={targetHighlight} transform="translate(115, 96)">
              <path
                d="M-36 -12 C-36 26, 36 26, 36 -12"
                fill="none"
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="3.2"
                strokeDasharray="4 3"
              />
              <polygon
                points="0,6 18,17 11,36 -11,36 -18,17"
                fill={objectFill}
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="2.8"
                style={{ transition: 'fill 0.4s ease' }}
              />
              <line x1="-11" y1="17" x2="11" y2="17" stroke={isLineArt ? strokeColor : '#FFFFFF'} strokeWidth="1.8" opacity="0.8" />
              <line x1="0" y1="6" x2="0" y2="36" stroke={isLineArt ? strokeColor : '#FFFFFF'} strokeWidth="1.8" opacity="0.8" />
              <text x="24" y="6" fontSize="15" fill={c('#38BDF8', strokeColor)}>✨</text>
              <text x="-38" y="10" fontSize="13" fill={c('#38BDF8', strokeColor)}>✦</text>
            </g>

            {/* Emma's face admiring box */}
            <g transform="translate(20, 50)">
              <circle cx="20" cy="22" r="14" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="1.8" />
              <path d="M8 20 C11 12, 29 12, 32 20 Z" fill={c('#B45309', '#F1F5F9')} stroke={strokeColor} strokeWidth="1" />
              <text x="13" y="24" fontSize="9" fill={strokeColor}>★</text>
              <text x="22" y="24" fontSize="9" fill={strokeColor}>★</text>
              <ellipse cx="14" cy="28" rx="2.5" ry="1.5" fill={c('#FDA4AF', '#E2E8F0')} />
              <ellipse cx="27" cy="28" rx="2.5" ry="1.5" fill={c('#FDA4AF', '#E2E8F0')} />
              <path d="M19 28 Q21 33 23 28 Z" fill={c('#DC2626', strokeColor)} />
            </g>
          </g>
        )}

        {svgType === 'p2_key' && (
          <g transform="translate(60, 40)">
            <rect x="25" y="35" width="60" height="50" rx="8" fill={c('#CBD5E1')} stroke={strokeColor} strokeWidth="2.8" />
            <path d="M40 35 L40 18 C40 6, 70 6, 70 18 L70 35" fill="none" stroke={strokeColor} strokeWidth="4.5" />
            <circle cx="90" cy="55" r="10" fill="none" stroke={strokeColor} strokeWidth="3" />
            <line x1="80" y1="55" x2="48" y2="55" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {svgType === 'p2_apple' && (
          <g transform="translate(65, 40)">
            <polygon points="15,75 70,75 64,30 21,30" fill={c('#E2E8F0')} stroke={strokeColor} strokeWidth="2.8" />
            <ellipse cx="42" cy="25" rx="14" ry="16" fill={c('#EF4444')} stroke={strokeColor} strokeWidth="2" />
            <path d="M42 12 Q46 6 44 2" stroke={strokeColor} strokeWidth="2.5" fill="none" />
          </g>
        )}

        {svgType === 'p2_shoe' && (
          <g transform="translate(45, 50)">
            <path d="M10 50 C20 48, 40 46, 50 25 C60 25, 75 25, 85 45 C100 48, 120 50, 120 62 L10 62 Z" fill={c('#94A3B8')} stroke={strokeColor} strokeWidth="2.8" />
            <circle cx="65" cy="52" r="3.5" fill={c('#78350F', strokeColor)} />
            <circle cx="95" cy="54" r="4.5" fill={c('#78350F', strokeColor)} />
          </g>
        )}

        {/* ========================================================================= */}
        {/* PAGE 3: A friendly yellow bird flies down and sings.                      */}
        {/* ========================================================================= */}
        {svgType === 'p3_correct' && (
          <g>
            <path d="M0 70 Q70 65 130 80 Q170 82 220 70" stroke={c('#78350F', strokeColor)} strokeWidth="7" strokeLinecap="round" fill="none" />
            <ellipse cx="65" cy="60" rx="14" ry="7" fill={c('#86EFAC')} stroke={strokeColor} strokeWidth="1.5" />
            <ellipse cx="150" cy="74" rx="12" ry="6" fill={c('#86EFAC')} stroke={strokeColor} strokeWidth="1.5" />

            {/* TARGET OBJECT: Friendly Yellow Bird (NO COLOR in lineart mode!) */}
            <g className={targetHighlight} transform="translate(100, 36)">
              <path
                d="M16 28 C-2 10, 16 0, 26 22 Z"
                fill={objectFill}
                stroke={strokeColor}
                strokeWidth="2.2"
              />
              <ellipse
                cx="22"
                cy="32"
                rx="22"
                ry="16"
                fill={objectFill}
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="2.8"
                style={{ transition: 'fill 0.4s ease' }}
              />
              <circle
                cx="35"
                cy="22"
                r="12"
                fill={objectFill}
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="2.5"
                style={{ transition: 'fill 0.4s ease' }}
              />
              <circle cx="39" cy="20" r="2.8" fill={strokeColor} />
              <circle cx="40" cy="19" r="1.1" fill="#FFFFFF" />
              <ellipse cx="36" cy="25" rx="2.5" ry="1.5" fill={c('#FDA4AF', '#E2E8F0')} />
              <polygon points="46,21 58,24 46,28" fill={c('#F97316')} stroke={strokeColor} strokeWidth="1.8" />
              <text x="56" y="10" fontSize="16" fill={c('#EAB308', strokeColor)} fontWeight="bold">♪</text>
              <text x="72" y="4" fontSize="18" fill={c('#F59E0B', strokeColor)} fontWeight="bold">♫</text>
            </g>

            {/* Emma listening peacefully below */}
            <g transform="translate(30, 80)">
              <circle cx="20" cy="20" r="13" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="1.8" />
              <path d="M9 18 C12 11, 28 11, 31 18 Z" fill={c('#B45309', '#F1F5F9')} stroke={strokeColor} strokeWidth="1" />
              <path d="M14 19 Q18 23 22 19" stroke={strokeColor} strokeWidth="1.8" fill="none" strokeLinecap="round" />
            </g>
          </g>
        )}

        {svgType === 'p3_dog' && (
          <g transform="translate(60, 45)">
            <ellipse cx="50" cy="50" rx="32" ry="22" fill={c('#94A3B8')} stroke={strokeColor} strokeWidth="2.8" />
            <circle cx="25" cy="35" r="16" fill={c('#94A3B8')} stroke={strokeColor} strokeWidth="2.8" />
            <polygon points="10,34 2,28 2,44" fill={c('#EF4444', strokeColor)} stroke={strokeColor} strokeWidth="2" />
            <text x="-24" y="18" fontSize="16" fill={strokeColor} fontWeight="bold">WOOF!</text>
          </g>
        )}

        {svgType === 'p3_frog' && (
          <g transform="translate(65, 45)">
            <ellipse cx="45" cy="65" rx="38" ry="14" fill={c('#64748B')} stroke={strokeColor} strokeWidth="2" />
            <ellipse cx="45" cy="45" rx="24" ry="16" fill={c('#4ADE80')} stroke={strokeColor} strokeWidth="2.5" />
            <circle cx="36" cy="30" r="7" fill="#FFFFFF" stroke={strokeColor} strokeWidth="1.8" />
            <circle cx="36" cy="30" r="3" fill={strokeColor} />
            <circle cx="54" cy="30" r="7" fill="#FFFFFF" stroke={strokeColor} strokeWidth="1.8" />
            <circle cx="54" cy="30" r="3" fill={strokeColor} />
          </g>
        )}

        {svgType === 'p3_owl' && (
          <g transform="translate(65, 30)">
            <rect x="0" y="10" width="85" height="95" rx="12" fill={c('#78350F')} stroke={strokeColor} strokeWidth="2.5" />
            <ellipse cx="42" cy="58" rx="26" ry="32" fill={c('#451A03', '#F1F5F9')} stroke={strokeColor} strokeWidth="1" />
            <circle cx="42" cy="54" r="17" fill={c('#E2E8F0')} stroke={strokeColor} strokeWidth="1.8" />
            <text x="26" y="32" fontSize="15" fill={strokeColor} fontWeight="bold">Zzz</text>
          </g>
        )}

        {/* ========================================================================= */}
        {/* PAGE 4: Emma walks past a warm red house on the hill.                     */}
        {/* ========================================================================= */}
        {svgType === 'p4_correct' && (
          <g>
            <circle cx="28" cy="26" r="12" fill={c('#FDE047')} stroke={strokeColor} strokeWidth="1.8" />
            <path d="M0 115 Q100 88 220 115 L220 160 L0 160 Z" fill={c('url(#grass-soft-color)', '#F8FAFC')} stroke={strokeColor} strokeWidth="2" />

            {/* TARGET OBJECT: Warm Red House Roof & Door (NO COLOR in lineart mode!) */}
            <g className={targetHighlight} transform="translate(105, 36)">
              <rect x="52" y="2" width="12" height="22" fill={c('#94A3B8')} stroke={strokeColor} strokeWidth="1.8" />
              <circle cx="58" cy="-5" r="4.5" fill={c('#CBD5E1')} opacity="0.8" stroke={strokeColor} strokeWidth={isLineArt ? 1 : 0} />

              <polygon
                points="38,10 -10,48 86,48"
                fill={objectFill}
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="2.8"
                style={{ transition: 'fill 0.4s ease' }}
              />

              <rect
                x="0"
                y="48"
                width="76"
                height="50"
                rx="3"
                fill={c('#FFFBEB')}
                stroke={strokeColor}
                strokeWidth="2.4"
              />

              <rect x="28" y="64" width="20" height="34" rx="3" fill={objectFill} stroke={strokeColor} strokeWidth="2.2" />
              <circle cx="43" cy="80" r="2" fill={c('#FDE047', strokeColor)} stroke={strokeColor} strokeWidth="1" />
              <rect x="8" y="58" width="14" height="14" rx="2" fill={c('#BAE6FD')} stroke={strokeColor} strokeWidth="1.8" />
              <rect x="54" y="58" width="14" height="14" rx="2" fill={c('#BAE6FD')} stroke={strokeColor} strokeWidth="1.8" />
            </g>

            {/* Emma strolling */}
            <g transform="translate(35, 82)">
              <circle cx="16" cy="14" r="10" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="1.8" />
              <path d="M8 12 C10 6, 22 6, 24 12 Z" fill={c('#B45309', '#F1F5F9')} stroke={strokeColor} strokeWidth="1" />
              <circle cx="13" cy="13" r="2" fill={strokeColor} />
              <circle cx="19" cy="13" r="2" fill={strokeColor} />
              <path d="M12 24 L7 44 L25 44 L20 24 Z" fill={c('#F472B6')} stroke={strokeColor} strokeWidth="1.8" />
              <line x1="10" y1="44" x2="5" y2="58" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
              <line x1="18" y1="44" x2="23" y2="58" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </g>
        )}

        {svgType === 'p4_city' && (
          <g transform="translate(35, 20)">
            <rect x="15" y="30" width="38" height="95" fill={c('#94A3B8')} stroke={strokeColor} strokeWidth="2" />
            <rect x="60" y="10" width="44" height="115" fill={c('#CBD5E1')} stroke={strokeColor} strokeWidth="2" />
            <rect x="110" y="45" width="34" height="80" fill={c('#94A3B8')} stroke={strokeColor} strokeWidth="2" />
          </g>
        )}

        {svgType === 'p4_submarine' && (
          <g transform="translate(35, 45)">
            <ellipse cx="75" cy="45" rx="55" ry="24" fill={c('#FDE047')} stroke={strokeColor} strokeWidth="2.8" />
            <rect x="70" y="10" width="14" height="18" fill={c('#FDE047')} stroke={strokeColor} strokeWidth="2" />
          </g>
        )}

        {svgType === 'p4_kitchen' && (
          <g transform="translate(45, 45)">
            <rect x="10" y="55" width="110" height="10" rx="3" fill={c('#B45309')} stroke={strokeColor} strokeWidth="2" />
            <ellipse cx="65" cy="48" rx="20" ry="11" fill={c('#E2E8F0')} stroke={strokeColor} strokeWidth="2" />
          </g>
        )}

        {/* ========================================================================= */}
        {/* PAGE 5: She opens a heavy brown wooden gate.                              */}
        {/* ========================================================================= */}
        {svgType === 'p5_correct' && (
          <g>
            <rect x="25" y="25" width="30" height="115" rx="4" fill={c('#CBD5E1')} stroke={strokeColor} strokeWidth="2.8" />
            <rect x="155" y="25" width="30" height="115" rx="4" fill={c('#CBD5E1')} stroke={strokeColor} strokeWidth="2.8" />
            <rect x="55" y="35" width="100" height="105" fill={c('#DCFCE7', '#FFFFFF')} stroke={strokeColor} strokeWidth={isLineArt ? 1 : 0} />

            {/* TARGET OBJECT: Heavy Brown Wooden Gate (NO COLOR in lineart mode!) */}
            <g className={targetHighlight} transform="translate(56, 36)">
              <rect
                x="2"
                y="5"
                width="46"
                height="95"
                rx="4"
                fill={objectFill}
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="2.8"
                style={{ transition: 'fill 0.4s ease' }}
              />
              <path
                d="M50 5 L94 16 L94 104 L50 98 Z"
                fill={objectFill}
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="2.8"
                style={{ transition: 'fill 0.4s ease' }}
              />
              <line x1="16" y1="5" x2="16" y2="100" stroke={c('#713F12', strokeColor)} strokeWidth="1.6" opacity="0.6" />
              <line x1="32" y1="5" x2="32" y2="100" stroke={c('#713F12', strokeColor)} strokeWidth="1.6" opacity="0.6" />
              <rect x="2" y="22" width="46" height="7" fill={c('#475569')} stroke={strokeColor} strokeWidth="1.6" />
              <rect x="2" y="74" width="46" height="7" fill={c('#475569')} stroke={strokeColor} strokeWidth="1.6" />
              <circle cx="38" cy="54" r="6" fill="none" stroke={c('#FDE047', strokeColor)} strokeWidth="2.5" />
            </g>

            {/* Emma pushing gate */}
            <g transform="translate(32, 60)">
              <circle cx="16" cy="16" r="11" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="1.8" />
              <path d="M8 14 C10 8, 22 8, 24 14 Z" fill={c('#B45309', '#F1F5F9')} stroke={strokeColor} strokeWidth="1" />
              <line x1="20" y1="30" x2="38" y2="28" stroke={c('#FED7AA', strokeColor)} strokeWidth="5" strokeLinecap="round" />
            </g>
          </g>
        )}

        {svgType === 'p5_window' && (
          <g transform="translate(65, 30)">
            <rect x="10" y="10" width="75" height="80" rx="4" fill={c('#BAE6FD')} stroke={strokeColor} strokeWidth="3" />
            <line x1="47" y1="10" x2="47" y2="90" stroke={strokeColor} strokeWidth="2.5" />
            <line x1="10" y1="50" x2="85" y2="50" stroke={strokeColor} strokeWidth="2.5" />
          </g>
        )}

        {svgType === 'p5_bridge' && (
          <g transform="translate(35, 45)">
            <path d="M10 60 Q75 78 140 60" stroke={c('#78350F', strokeColor)} strokeWidth="7" fill="none" />
            <path d="M10 38 Q75 56 140 38" stroke={c('#78350F', strokeColor)} strokeWidth="3.5" fill="none" />
          </g>
        )}

        {svgType === 'p5_chair' && (
          <g transform="translate(70, 40)">
            <rect x="25" y="15" width="32" height="32" rx="3" fill={c('#B45309')} stroke={strokeColor} strokeWidth="2.2" />
            <rect x="20" y="47" width="42" height="9" rx="2" fill={c('#92400E')} stroke={strokeColor} strokeWidth="2.2" />
          </g>
        )}

        {/* ========================================================================= */}
        {/* PAGE 6: Pretty purple flowers bloom in the garden.                        */}
        {/* ========================================================================= */}
        {svgType === 'p6_correct' && (
          <g>
            <path d="M0 115 Q110 100 220 115 L220 160 L0 160 Z" fill={c('url(#grass-soft-color)', '#F8FAFC')} stroke={strokeColor} strokeWidth="2" />

            {/* TARGET OBJECT: Pretty Purple Blooming Flowers (NO COLOR in lineart mode!) */}
            <g className={targetHighlight} transform="translate(70, 45)">
              <line x1="50" y1="35" x2="50" y2="85" stroke={c('#15803D', strokeColor)} strokeWidth="3.5" />
              <g transform="translate(50, 25)">
                <circle cx="-12" cy="0" r="11" fill={objectFill} stroke={strokeColor} strokeWidth="2.2" />
                <circle cx="12" cy="0" r="11" fill={objectFill} stroke={strokeColor} strokeWidth="2.2" />
                <circle cx="0" cy="-12" r="11" fill={objectFill} stroke={strokeColor} strokeWidth="2.2" />
                <circle cx="0" cy="12" r="11" fill={objectFill} stroke={strokeColor} strokeWidth="2.2" />
                <circle cx="0" cy="0" r="8" fill={c('#FDE047')} stroke={strokeColor} strokeWidth="1.8" />
              </g>

              <line x1="15" y1="52" x2="15" y2="85" stroke={c('#15803D', strokeColor)} strokeWidth="3" />
              <circle cx="15" cy="42" r="16" fill={objectFill} stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor} strokeWidth="2.6" />
              <circle cx="15" cy="42" r="6" fill={c('#FDE047')} stroke={strokeColor} strokeWidth="1.5" />

              <line x1="85" y1="48" x2="85" y2="85" stroke={c('#15803D', strokeColor)} strokeWidth="3" />
              <circle cx="85" cy="38" r="15" fill={objectFill} stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor} strokeWidth="2.6" />
              <circle cx="85" cy="38" r="5.5" fill={c('#FDE047')} stroke={strokeColor} strokeWidth="1.5" />
            </g>

            {/* Emma smelling flower */}
            <g transform="translate(25, 75)">
              <circle cx="18" cy="16" r="11" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="1.8" />
              <path d="M10 14 C12 8, 24 8, 26 14 Z" fill={c('#B45309', '#F1F5F9')} stroke={strokeColor} strokeWidth="1" />
            </g>
          </g>
        )}

        {svgType === 'p6_cactus' && (
          <g transform="translate(70, 30)">
            <path d="M40 90 L40 20 C40 10, 50 10, 50 20 L50 90 Z" fill={c('#86EFAC')} stroke={strokeColor} strokeWidth="2.8" />
            <path d="M40 50 L22 50 L22 35 C22 28, 30 28, 30 35 L30 45" fill="none" stroke={strokeColor} strokeWidth="5.5" strokeLinecap="round" />
            <path d="M50 60 L68 60 L68 45 C68 38, 60 38, 60 45 L60 55" fill="none" stroke={strokeColor} strokeWidth="5.5" strokeLinecap="round" />
          </g>
        )}

        {svgType === 'p6_cave' && (
          <g transform="translate(40, 20)">
            <path d="M10 105 Q75 12 140 105 Z" fill={c('#334155')} stroke={strokeColor} strokeWidth="3" />
            <ellipse cx="75" cy="100" rx="40" ry="28" fill={c('#0F172A', '#F1F5F9')} stroke={strokeColor} strokeWidth="1.5" />
          </g>
        )}

        {svgType === 'p6_vegetables' && (
          <g transform="translate(50, 40)">
            <rect x="0" y="50" width="120" height="40" fill={c('#78350F')} stroke={strokeColor} strokeWidth="2" />
            <polygon points="40,50 48,80 32,80" fill={c('#F97316')} stroke={strokeColor} strokeWidth="2" />
          </g>
        )}

        {/* ========================================================================= */}
        {/* PAGE 7: An old king sits on an orange chair.                              */}
        {/* ========================================================================= */}
        {svgType === 'p7_correct' && (
          <g>
            <rect x="15" y="10" width="22" height="140" fill={c('#E2E8F0')} stroke={strokeColor} strokeWidth="2" />
            <rect x="183" y="10" width="22" height="140" fill={c('#E2E8F0')} stroke={strokeColor} strokeWidth="2" />

            {/* TARGET OBJECT: Royal Orange Velvet Chair (NO COLOR in lineart mode!) */}
            <g className={targetHighlight} transform="translate(75, 38)">
              <path
                d="M10 5 C10 -18, 60 -18, 60 5 L60 68 L10 68 Z"
                fill={objectFill}
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="2.8"
                style={{ transition: 'fill 0.4s ease' }}
              />
              <path d="M16 5 C16 -10, 54 -10, 54 5" stroke={c('#FDE047', strokeColor)} strokeWidth="3.5" fill="none" />
              <rect
                x="4"
                y="62"
                width="62"
                height="18"
                rx="5"
                fill={objectFill}
                stroke={strokeColor}
                strokeWidth="2.2"
              />
              <line x1="12" y1="80" x2="12" y2="104" stroke={c('#B45309', strokeColor)} strokeWidth="4.5" />
              <line x1="58" y1="80" x2="58" y2="104" stroke={c('#B45309', strokeColor)} strokeWidth="4.5" />

              {/* King sitting on chair */}
              <g transform="translate(20, 16)">
                <path d="M6 30 L0 68 L32 68 L26 30 Z" fill={c('#DC2626')} stroke={strokeColor} strokeWidth="2.2" />
                <circle cx="16" cy="22" r="10" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="1.8" />
                <path d="M8 24 C8 38, 24 38, 24 24 Z" fill={c('#FFFFFF')} stroke={strokeColor} strokeWidth="1.6" />
                <path d="M12 21 Q14 18 16 21" stroke={strokeColor} strokeWidth="1.8" fill="none" />
                <path d="M18 21 Q20 18 22 21" stroke={strokeColor} strokeWidth="1.8" fill="none" />
              </g>
            </g>
          </g>
        )}

        {svgType === 'p7_baby' && (
          <g transform="translate(75, 40)">
            <circle cx="35" cy="30" r="18" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="2.2" />
            <path d="M25 48 L15 78 L55 78 L45 48 Z" fill={c('#93C5FD')} stroke={strokeColor} strokeWidth="2" />
            <rect x="62" y="62" width="18" height="18" fill={c('#EF4444')} stroke={strokeColor} strokeWidth="1.8" />
          </g>
        )}

        {svgType === 'p7_soldier' && (
          <g transform="translate(75, 30)">
            <circle cx="35" cy="26" r="13" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="2" />
            <rect x="22" y="39" width="26" height="50" fill={c('#475569')} stroke={strokeColor} strokeWidth="2" />
          </g>
        )}

        {svgType === 'p7_baker' && (
          <g transform="translate(75, 30)">
            <path d="M20 25 C15 5, 55 5, 50 25 Z" fill="#FFFFFF" stroke={strokeColor} strokeWidth="2" />
            <circle cx="35" cy="35" r="13" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="2" />
          </g>
        )}

        {/* ========================================================================= */}
        {/* PAGE 8: The kind king wears a bright golden crown.                        */}
        {/* ========================================================================= */}
        {svgType === 'p8_correct' && (
          <g transform="translate(50, 18)">
            <circle cx="60" cy="74" r="38" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="2.8" />
            <path d="M44 68 Q50 62 56 68" stroke={strokeColor} strokeWidth="2.8" fill="none" strokeLinecap="round" />
            <path d="M64 68 Q70 62 76 68" stroke={strokeColor} strokeWidth="2.8" fill="none" strokeLinecap="round" />
            <path d="M50 86 Q60 96 70 86" stroke={c('#991B1B', strokeColor)} strokeWidth="3.2" fill="none" strokeLinecap="round" />
            <path d="M34 78 C28 114, 92 114, 86 78 Z" fill="#FFFFFF" stroke={strokeColor} strokeWidth="2.2" />

            {/* TARGET OBJECT: Bright Golden Crown (NO COLOR in lineart mode!) */}
            <g className={targetHighlight} transform="translate(24, 12)">
              <polygon
                points="0,35 12,6 36,26 60,6 72,35"
                fill={objectFill}
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="3"
                style={{ transition: 'fill 0.4s ease' }}
              />
              <rect
                x="0"
                y="35"
                width="72"
                height="10"
                rx="2"
                fill={objectFill}
                stroke={strokeColor}
                strokeWidth="2.2"
              />
              <circle cx="12" cy="10" r="4.2" fill={c('#EF4444', '#FFFFFF')} stroke={strokeColor} strokeWidth="1.2" />
              <circle cx="36" cy="28" r="4.2" fill={c('#3B82F6', '#FFFFFF')} stroke={strokeColor} strokeWidth="1.2" />
              <circle cx="60" cy="10" r="4.2" fill={c('#10B981', '#FFFFFF')} stroke={strokeColor} strokeWidth="1.2" />
              <text x="76" y="12" fontSize="16" fill={c('#EAB308', strokeColor)}>✨</text>
            </g>
          </g>
        )}

        {svgType === 'p8_cowboy_hat' && (
          <g transform="translate(60, 40)">
            <ellipse cx="50" cy="45" rx="48" ry="14" fill={c('#B45309')} stroke={strokeColor} strokeWidth="2.8" />
            <path d="M30 45 C30 14, 70 14, 70 45 Z" fill={c('#92400E')} stroke={strokeColor} strokeWidth="2.5" />
          </g>
        )}

        {svgType === 'p8_swimming_cap' && (
          <g transform="translate(60, 40)">
            <path d="M25 45 C25 15, 75 15, 75 45 Z" fill={c('#06B6D4')} stroke={strokeColor} strokeWidth="2.8" />
          </g>
        )}

        {svgType === 'p8_winter_beanie' && (
          <g transform="translate(60, 35)">
            <circle cx="50" cy="14" r="9" fill={c('#F43F5E')} stroke={strokeColor} strokeWidth="2" />
            <path d="M25 55 C25 20, 75 20, 75 55 Z" fill={c('#E11D48')} stroke={strokeColor} strokeWidth="2.8" />
          </g>
        )}

        {/* ========================================================================= */}
        {/* PAGE 9: Emma shows the necklace to a sweet pink rabbit.                   */}
        {/* ========================================================================= */}
        {svgType === 'p9_correct' && (
          <g>
            <path d="M0 120 Q110 108 220 120 L220 160 L0 160 Z" fill={c('url(#grass-soft-color)', '#F8FAFC')} stroke={strokeColor} strokeWidth="2" />

            {/* Emma crouching holding necklace */}
            <g transform="translate(30, 60)">
              <circle cx="20" cy="20" r="13" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="1.8" />
              <path d="M10 18 C12 10, 28 10, 30 18 Z" fill={c('#B45309', '#F1F5F9')} stroke={strokeColor} strokeWidth="1" />
              <path d="M14 33 L6 62 L32 62 L26 33 Z" fill={c('#F472B6')} stroke={strokeColor} strokeWidth="2" />
              <line x1="26" y1="42" x2="55" y2="46" stroke={c('#FED7AA', strokeColor)} strokeWidth="5" strokeLinecap="round" />
              <circle cx="58" cy="50" r="5" fill={c('#3B82F6')} stroke={strokeColor} strokeWidth="1.5" />
            </g>

            {/* TARGET OBJECT: Sweet Pink Rabbit (NO COLOR in lineart mode!) */}
            <g className={targetHighlight} transform="translate(130, 52)">
              <ellipse
                cx="16"
                cy="10"
                rx="7"
                ry="22"
                fill={objectFill}
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="2.5"
                style={{ transition: 'fill 0.4s ease' }}
              />
              <ellipse cx="16" cy="12" rx="3.5" ry="14" fill={c('#FBCFE8', '#F1F5F9')} />

              <ellipse
                cx="34"
                cy="14"
                rx="7"
                ry="22"
                fill={objectFill}
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="2.5"
                style={{ transition: 'fill 0.4s ease' }}
              />
              <ellipse cx="34" cy="16" rx="3.5" ry="14" fill={c('#FBCFE8', '#F1F5F9')} />

              <circle
                cx="25"
                cy="36"
                r="18"
                fill={objectFill}
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="2.8"
                style={{ transition: 'fill 0.4s ease' }}
              />
              <circle cx="19" cy="34" r="3.2" fill={strokeColor} />
              <circle cx="20" cy="33" r="1.3" fill="#FFFFFF" />
              <circle cx="31" cy="34" r="3.2" fill={strokeColor} />
              <circle cx="32" cy="33" r="1.3" fill="#FFFFFF" />
              <polygon points="25,39 23,43 27,43" fill={c('#EF4444', strokeColor)} />

              <ellipse
                cx="25"
                cy="62"
                rx="19"
                ry="17"
                fill={objectFill}
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="2.8"
                style={{ transition: 'fill 0.4s ease' }}
              />
              <circle cx="42" cy="64" r="6" fill="#FFFFFF" stroke={strokeColor} strokeWidth="1.8" />
              <text x="40" y="28" fontSize="14" fill={c('#EC4899', strokeColor)}>♥</text>
            </g>
          </g>
        )}

        {svgType === 'p9_tiger' && (
          <g transform="translate(60, 40)">
            <circle cx="45" cy="40" r="28" fill={c('#F97316')} stroke={strokeColor} strokeWidth="2.8" />
            <polygon points="25,18 18,2 35,12" fill={c('#F97316')} stroke={strokeColor} strokeWidth="2" />
            <polygon points="65,18 72,2 55,12" fill={c('#F97316')} stroke={strokeColor} strokeWidth="2" />
          </g>
        )}

        {svgType === 'p9_dolphin' && (
          <g transform="translate(50, 45)">
            <path d="M10 65 Q65 8 120 52" stroke={c('#0284C7', strokeColor)} strokeWidth="7" fill="none" strokeLinecap="round" />
          </g>
        )}

        {svgType === 'p9_squirrel' && (
          <g transform="translate(70, 40)">
            <ellipse cx="40" cy="50" rx="20" ry="16" fill={c('#B45309')} stroke={strokeColor} strokeWidth="2.2" />
          </g>
        )}

        {/* ========================================================================= */}
        {/* PAGE 10: They follow a calm cyan river toward the castle.                 */}
        {/* ========================================================================= */}
        {svgType === 'p10_correct' && (
          <g>
            <g transform="translate(145, 14)">
              <rect x="18" y="22" width="34" height="45" fill={c('#E2E8F0')} stroke={strokeColor} strokeWidth="1.8" />
              <polygon points="12,22 35,0 58,22" fill={c('#3B82F6')} stroke={strokeColor} strokeWidth="1.8" />
            </g>

            <path d="M0 75 Q55 70 95 80 L0 160 Z" fill={c('url(#grass-soft-color)', '#F8FAFC')} />
            <path d="M125 80 Q165 70 220 75 L220 160 L155 160 Z" fill={c('url(#grass-soft-color)', '#F8FAFC')} />

            {/* TARGET OBJECT: Calm Cyan Winding River (NO COLOR in lineart mode!) */}
            <g className={targetHighlight}>
              <path
                d="M150 60 Q128 82 105 108 Q80 135 62 160 L155 160 Q145 130 152 98 Q162 76 165 60 Z"
                fill={objectFill}
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="2.8"
                style={{ transition: 'fill 0.4s ease' }}
              />
              <path d="M115 96 Q132 98 140 96" stroke={isLineArt ? strokeColor : '#FFFFFF'} strokeWidth="2.4" fill="none" opacity="0.85" />
            </g>

            <g transform="translate(25, 85)">
              <circle cx="16" cy="16" r="10" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="1.8" />
              <path d="M12 26 L6 48 L26 48 L20 26 Z" fill={c('#F472B6')} stroke={strokeColor} strokeWidth="1.8" />
              <line x1="20" y1="32" x2="38" y2="24" stroke={c('#FED7AA', strokeColor)} strokeWidth="4.5" strokeLinecap="round" />
            </g>
          </g>
        )}

        {svgType === 'p10_train' && (
          <g transform="translate(35, 45)">
            <rect x="20" y="20" width="80" height="45" rx="5" fill={c('#334155')} stroke={strokeColor} strokeWidth="2.8" />
          </g>
        )}

        {svgType === 'p10_airplane' && (
          <g transform="translate(45, 40)">
            <ellipse cx="65" cy="35" rx="50" ry="14" fill={c('#E2E8F0')} stroke={strokeColor} strokeWidth="2.8" />
          </g>
        )}

        {svgType === 'p10_dusty_road' && (
          <g transform="translate(35, 45)">
            <rect x="10" y="30" width="130" height="45" fill={c('#D7CCC8')} stroke={strokeColor} strokeWidth="2" />
          </g>
        )}

        {/* ========================================================================= */}
        {/* PAGE 11: A friendly white cat guides them safely inside.                  */}
        {/* ========================================================================= */}
        {svgType === 'p11_correct' && (
          <g>
            <rect x="0" y="0" width="220" height="160" fill={c('#F8FAFC', '#FFFFFF')} />
            <path d="M0 125 L220 125" stroke={strokeColor} strokeWidth="2" />
            <polygon points="55,160 165,160 135,125 85,125" fill={c('#FEE2E2', '#F8FAFC')} stroke={c('#DC2626', strokeColor)} strokeWidth="1.8" />

            {/* TARGET OBJECT: Friendly White Cat (NO COLOR in lineart mode!) */}
            <g className={targetHighlight} transform="translate(115, 80)">
              <ellipse
                cx="34"
                cy="34"
                rx="24"
                ry="16"
                fill={objectFill}
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="2.8"
                style={{ transition: 'fill 0.4s ease' }}
              />
              <circle
                cx="14"
                cy="24"
                r="15"
                fill={objectFill}
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="2.8"
                style={{ transition: 'fill 0.4s ease' }}
              />
              <polygon points="6,16 2,1 14,10" fill={objectFill} stroke={strokeColor} strokeWidth="2" />
              <polygon points="17,10 27,1 23,16" fill={objectFill} stroke={strokeColor} strokeWidth="2" />
              <circle cx="10" cy="22" r="2.2" fill={strokeColor} />
              <path d="M17 22 Q21 26 21 21" stroke={strokeColor} strokeWidth="1.8" fill="none" />
              <polygon points="14,26 12,28 16,28" fill={c('#F472B6', strokeColor)} />

              <path d="M10 33 Q18 36 24 33" stroke={c('#DC2626', strokeColor)} strokeWidth="3" fill="none" />
              <circle cx="17" cy="36" r="3" fill={c('#FDE047', '#FFFFFF')} stroke={strokeColor} strokeWidth="1" />
              <path
                d="M56 30 C72 16, 70 2, 60 8"
                fill="none"
                stroke={strokeColor}
                strokeWidth="4"
                strokeLinecap="round"
              />
              <text x="36" y="10" fontSize="14" fill={c('#EAB308', strokeColor)}>✨</text>
            </g>

            <g transform="translate(35, 72)">
              <circle cx="16" cy="16" r="10" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="1.8" />
              <path d="M8 14 C10 8, 22 8, 24 14 Z" fill={c('#B45309', '#F1F5F9')} stroke={strokeColor} strokeWidth="1" />
            </g>
          </g>
        )}

        {svgType === 'p11_spider' && (
          <g transform="translate(70, 30)">
            <line x1="40" y1="0" x2="40" y2="40" stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="40" cy="50" r="14" fill={strokeColor} strokeWidth="2.2" />
          </g>
        )}

        {svgType === 'p11_bear' && (
          <g transform="translate(70, 35)">
            <circle cx="40" cy="45" r="28" fill={c('#78350F')} stroke={strokeColor} strokeWidth="2.8" />
          </g>
        )}

        {svgType === 'p11_mouse' && (
          <g transform="translate(70, 50)">
            <ellipse cx="40" cy="40" rx="22" ry="14" fill={c('#94A3B8')} stroke={strokeColor} strokeWidth="2.2" />
          </g>
        )}

        {/* ========================================================================= */}
        {/* PAGE 12: The happy queen rewards Emma with a shiny red ribbon.            */}
        {/* ========================================================================= */}
        {svgType === 'p12_correct' && (
          <g>
            <rect x="0" y="0" width="220" height="160" fill={c('#FEF3C7', '#FFFFFF')} opacity={isLineArt ? 1 : 0.4} />
            <path d="M0 125 L220 125" stroke={strokeColor} strokeWidth="2" />

            {/* Happy Queen with crown */}
            <g transform="translate(30, 42)">
              <circle cx="22" cy="22" r="14" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="2" />
              <polygon points="12,12 17,-2 22,6 27,-2 32,12" fill={c('#FDE047')} stroke={strokeColor} strokeWidth="1.4" />
              <path d="M12 36 L0 80 L44 80 L32 36 Z" fill={c('#9333EA')} stroke={strokeColor} strokeWidth="2.2" />
              <line x1="30" y1="46" x2="62" y2="52" stroke={c('#FED7AA', strokeColor)} strokeWidth="5" strokeLinecap="round" />
            </g>

            {/* TARGET OBJECT: Shiny Red Ribbon Bow (NO COLOR in lineart mode!) */}
            <g className={targetHighlight} transform="translate(95, 52)">
              <path
                d="M18 18 C-8 0, -8 36, 18 18 Z"
                fill={objectFill}
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="2.8"
                style={{ transition: 'fill 0.4s ease' }}
              />
              <path
                d="M18 18 C44 0, 44 36, 18 18 Z"
                fill={objectFill}
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="2.8"
                style={{ transition: 'fill 0.4s ease' }}
              />
              <circle
                cx="18"
                cy="18"
                r="7.5"
                fill={objectFill}
                stroke={isHighlighted && !isLineArt ? '#F59E0B' : strokeColor}
                strokeWidth="2.4"
              />
              <path
                d="M14 24 L5 50 L15 45 L19 50 L18 24"
                fill={objectFill}
                stroke={strokeColor}
                strokeWidth="2.2"
              />
              <path
                d="M22 24 L31 50 L21 45 L17 50 L18 24"
                fill={objectFill}
                stroke={strokeColor}
                strokeWidth="2.2"
              />
              <text x="32" y="2" fontSize="16" fill={c('#EAB308', strokeColor)}>✨</text>
            </g>

            {/* Emma receiving ribbon */}
            <g transform="translate(150, 48)">
              <circle cx="20" cy="20" r="12" fill={c('#FED7AA')} stroke={strokeColor} strokeWidth="2" />
              <path d="M10 18 C13 10, 27 10, 30 18 Z" fill={c('#B45309', '#F1F5F9')} stroke={strokeColor} strokeWidth="1" />
              <path d="M14 32 L8 75 L32 75 L26 32 Z" fill={c('#F472B6')} stroke={strokeColor} strokeWidth="2.2" />
            </g>
          </g>
        )}

        {svgType === 'p12_umbrella' && (
          <g transform="translate(70, 40)">
            <path d="M15 45 C20 12, 65 12, 70 45 Z" fill={c('#94A3B8')} stroke={strokeColor} strokeWidth="2.8" />
            <line x1="42" y1="45" x2="42" y2="80" stroke={strokeColor} strokeWidth="3.5" />
          </g>
        )}

        {svgType === 'p12_plate' && (
          <g transform="translate(70, 45)">
            <ellipse cx="40" cy="40" rx="38" ry="22" fill="#FFFFFF" stroke={strokeColor} strokeWidth="2.8" />
          </g>
        )}

        {svgType === 'p12_birds' && (
          <g transform="translate(60, 40)">
            <path d="M20 20 Q30 10 40 20 Q50 10 60 20" stroke={strokeColor} strokeWidth="3.5" fill="none" />
            <path d="M50 40 Q60 30 70 40 Q80 30 90 40" stroke={strokeColor} strokeWidth="3.5" fill="none" />
          </g>
        )}
      </svg>
    </div>
  );
};
