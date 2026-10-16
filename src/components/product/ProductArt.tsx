import { useId } from 'react';
import type { ArtKind } from '@/lib/types';
import { getColorway } from '@/data/colors';

/**
 * Illustrated stand-in for products without a photo, and decoration (hero, color wall).
 * Deliberately stylized (flat vector) so it is never mistaken for a photo of an actual Bear Creek product.
 * Colors are driven by the selected colorway, so swatch changes are reflected immediately.
 */

interface Props {
  kind: ArtKind;
  color?: string; // colorway id
  className?: string;
  /** Rotation in degrees. Defaults to a diagonal "laid on the bench" angle. */
  angle?: number;
  title?: string;
}

export function ProductArt({ kind, color, className, angle, title }: Props) {
  const uid = useId().replace(/:/g, '');
  const cw: { primary: string; secondary: string; flake?: string; tail?: string } = getColorway(color) ?? { primary: '#C9F025', secondary: '#FF4F9E' };
  const p = cw.primary;
  const s = cw.secondary;
  const id = (n: string) => `${n}-${uid}`;
  const rot = angle ?? -22;

  const lam = `url(#${id('lam')})`;
  const shade = `url(#${id('shade')})`;
  const flake = cw.flake ? `url(#${id('flake')})` : undefined;

  // Where the dipped tail color starts, in the art's x coordinates (baits point left to right).
  const tailFrom: Partial<Record<ArtKind, number>> = { shad: 262, 'split-tail': 252, 'stick-worm': 300 };
  const tailX = cw.tail ? tailFrom[kind] : undefined;
  const tailFill = tailX !== undefined ? `url(#${id('tail')})` : undefined;
  const tailColor = cw.tail ?? s;

  /** Paints a shape in layers: laminate color, flake, dipped tail, then soft shading. */
  const layered = (d: string) => (
    <>
      <path d={d} fill={lam} />
      {flake && <path d={d} fill={flake} />}
      {tailFill && <path d={d} fill={tailFill} />}
      <path d={d} fill={shade} />
    </>
  );

  let body: React.ReactNode = null;

  switch (kind) {
    case 'shad':
      body = (
        <g>
          {layered(
            'M64 200 C64 174 92 160 128 160 C176 160 236 178 288 194 C298 186 310 172 322 168 C332 165 338 172 336 184 L332 200 L336 216 C338 228 332 235 322 232 C310 228 298 214 288 206 C236 222 176 240 128 240 C92 240 64 226 64 200 Z',
          )}
          <path d="M106 172 Q118 200 106 228" fill="none" stroke="rgba(0,0,0,.14)" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
      break;

    case 'split-tail':
      body = (
        <g>
          {layered(
            'M60 200 C60 182 82 174 110 174 C172 174 232 186 272 194 L346 174 C353 172 356 179 350 183 L290 200 L350 217 C356 221 353 228 346 226 L272 206 C232 214 172 226 110 226 C82 226 60 218 60 200 Z',
          )}
          <path d="M100 180 Q110 200 100 220" fill="none" stroke="rgba(0,0,0,.14)" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
      break;

    case 'grub':
      body = (
        <g>
          <path d="M226 200 C276 198 318 214 326 246" fill="none" stroke={tailColor} strokeWidth="24" strokeLinecap="round" />
          <path d="M326 246 C334 282 300 302 280 288 C268 280 272 262 288 262" fill="none" stroke={tailColor} strokeWidth="14" strokeLinecap="round" />
          {layered('M60 200 C60 184 74 174 92 174 L232 176 C246 177 252 188 252 200 C252 212 246 223 232 224 L92 226 C74 226 60 216 60 200 Z')}
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M${122 + i * 13} 177 Q${126 + i * 13} 200 ${122 + i * 13} 223`}
              fill="none"
              stroke="rgba(0,0,0,.16)"
              strokeWidth="2.5"
            />
          ))}
        </g>
      );
      break;

    case 'tube':
      body = (
        <g>
          {Array.from({ length: 8 }).map((_, i) => {
            const y = 178 + i * 6.3;
            const d = i % 2 ? 8 : -8;
            return (
              <path
                key={i}
                d={`M200 ${y} C246 ${y + d} 286 ${y - d} ${330 + (i % 3) * 8} ${y + d * 0.6 + (i - 3.5) * 5}`}
                fill="none"
                stroke={cw.tail ?? (i % 2 ? s : p)}
                strokeWidth="7"
                strokeLinecap="round"
              />
            );
          })}
          {layered('M70 200 C70 180 82 170 102 170 L214 170 L214 230 L102 230 C82 230 70 220 70 200 Z')}
        </g>
      );
      break;

    case 'stick-worm':
      body = (
        <g>
          {layered('M44 200 C44 187 56 182 76 182 L322 187 C344 188 356 194 356 200 C356 206 344 212 322 213 L76 218 C56 218 44 213 44 200 Z')}
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${176 + i * 9} 185 L${176 + i * 9} 215`} stroke="rgba(0,0,0,.12)" strokeWidth="2.5" />
          ))}
        </g>
      );
      break;

    case 'craw':
      body = (
        <g>
          {/* antennae */}
          <path d="M132 192 C100 170 70 160 30 160" fill="none" stroke={p} strokeWidth="3" strokeLinecap="round" />
          <path d="M132 208 C100 230 70 240 30 242" fill="none" stroke={p} strokeWidth="3" strokeLinecap="round" />
          {/* arms */}
          <path d="M160 184 C138 166 118 156 96 150" fill="none" stroke={p} strokeWidth="13" strokeLinecap="round" />
          <path d="M160 216 C138 234 118 244 96 250" fill="none" stroke={p} strokeWidth="13" strokeLinecap="round" />
          {layered('M100 150 C82 128 50 120 34 132 C30 136 34 142 42 142 L72 140 L44 152 C38 156 42 162 50 162 C70 164 90 160 100 150 Z')}
          {layered('M100 250 C82 272 50 280 34 268 C30 264 34 258 42 258 L72 260 L44 248 C38 244 42 238 50 238 C70 236 90 240 100 250 Z')}
          {/* tail fan */}
          {layered('M318 200 L350 176 C358 172 364 178 360 186 L352 200 L360 214 C364 222 358 228 350 224 Z')}
          {/* abdomen segments */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>{layered(`M${246 + i * 18} ${178 + i * 3} L${268 + i * 18} ${180 + i * 3} L${268 + i * 18} ${220 - i * 3} L${246 + i * 18} ${222 - i * 3} Z`)}</g>
          ))}
          {/* carapace */}
          {layered('M128 200 C128 180 160 168 200 168 C232 168 252 180 252 200 C252 220 232 232 200 232 C160 232 128 220 128 200 Z')}
          <circle cx="146" cy="190" r="4" fill="#111" />
          <circle cx="146" cy="210" r="4" fill="#111" />
        </g>
      );
      break;

  }

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <linearGradient id={id('lam')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p} />
          <stop offset="0.5" stopColor={p} />
          <stop offset="0.5" stopColor={s} />
          <stop offset="1" stopColor={s} />
        </linearGradient>
        {tailX !== undefined && (
          <linearGradient id={id('tail')} gradientUnits="userSpaceOnUse" x1={tailX - 6} y1="0" x2={tailX + 6} y2="0">
            <stop offset="0" stopColor={tailColor} stopOpacity="0" />
            <stop offset="1" stopColor={tailColor} />
          </linearGradient>
        )}
        <linearGradient id={id('shade')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.38" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.75" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
        {cw.flake && (
          <pattern id={id('flake')} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="4" r="1.3" fill={cw.flake} />
            <circle cx="11" cy="9" r="1.1" fill={cw.flake} />
            <circle cx="6" cy="13" r="0.9" fill={cw.flake} />
          </pattern>
        )}
        <filter id={id('shadow')} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#000" floodOpacity="0.18" />
        </filter>
      </defs>
      <g filter={`url(#${id('shadow')})`} transform={`rotate(${rot} 200 200)`}>
        {body}
      </g>
    </svg>
  );
}
