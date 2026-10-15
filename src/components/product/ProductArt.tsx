import { useId } from 'react';
import type { ArtKind } from '@/lib/types';
import { getColorway } from '@/data/colors';

/**
 * Illustrated stand-in used until real product photography exists.
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

const METAL = '#A3A8AD';

/**
 * A 90° jig hook, drawn point-up the way a jig rides: the line-tie eye stands up out of the
 * top of the head, the shank runs straight back, then a round bend turns up into a point with a barb.
 * (x0, y) is where the shank leaves the head; the bend is centred at (xb, y - r).
 */
function hookParts(x0: number, y: number, xb: number, r: number, wire: string) {
  const top = y - 2 * r;
  const tipX = xb - r * 1.5;
  const tipY = top + r * 0.34;
  // Where the round wire of the point leg ends and the filed point begins.
  const ex = tipX + 12;
  const ey = tipY - 0.9;
  const shank = `M${x0} ${y} L${xb} ${y}`;
  const bend = `M${xb - 1} ${y} A${r} ${r} 0 0 0 ${xb} ${top} L${ex} ${ey}`;
  // Point and barb as one shape: top edge tapers to the tip, the barb flares back on the inside.
  const point = `M${ex} ${ey - 3} L${tipX} ${tipY} L${tipX + 13} ${tipY + 7} L${tipX + 11} ${tipY + 2.4} L${ex + 1} ${ey + 3} Z`;
  return {
    shank: (
      <>
        <path d={shank} fill="none" stroke={wire} strokeWidth="6" strokeLinecap="round" />
        <path d={shank} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.6" strokeLinecap="round" transform="translate(0 -1.6)" />
      </>
    ),
    bend: (
      <>
        <path d={bend} fill="none" stroke={wire} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d={`M${xb + r * 0.7} ${y - r * 1.7} A${r} ${r} 0 0 1 ${xb + r} ${y - r}`}
          fill="none"
          stroke="rgba(255,255,255,.55)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d={point} fill={wire} stroke={wire} strokeWidth="0.8" strokeLinejoin="round" />
      </>
    ),
  };
}

/** Line-tie eye standing up out of the top of a jig head. */
function hookEye(cx: number, headTop: number, wire: string) {
  const cy = headTop - 9;
  return (
    <>
      <path d={`M${cx} ${headTop + 4} L${cx} ${cy + 7}`} stroke={wire} strokeWidth="5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="7.5" fill="none" stroke={wire} strokeWidth="4.5" />
      <path d={`M${cx - 5} ${cy - 4.5} A7.5 7.5 0 0 1 ${cx + 3} ${cy - 7}`} fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.4" strokeLinecap="round" />
    </>
  );
}

export function ProductArt({ kind, color, className, angle, title }: Props) {
  const uid = useId().replace(/:/g, '');
  const cw: { primary: string; secondary: string; flake?: string; tail?: string } = getColorway(color) ?? { primary: '#C9F025', secondary: '#FF4F9E' };
  const p = cw.primary;
  const s = cw.secondary;
  const id = (n: string) => `${n}-${uid}`;
  const rot = angle ?? (kind === 'box' ? 0 : -22);

  const lam = `url(#${id('lam')})`;
  const wire = `url(#${id('wire')})`;
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

    case 'jig-head': {
      const hook = hookParts(166, 200, 300, 26, wire);
      body = (
        <g>
          {hookEye(134, 164, wire)}
          {hook.shank}
          {hook.bend}
          <rect x="160" y="192" width="20" height="16" rx="4" fill={p} />
          <rect x="160" y="192" width="20" height="16" rx="4" fill={shade} />
          <circle cx="134" cy="200" r="36" fill={p} />
          <circle cx="134" cy="200" r="36" fill={shade} />
          <ellipse cx="122" cy="186" rx="11" ry="7" fill="rgba(255,255,255,.4)" />
          <circle cx="122" cy="204" r="10" fill="#FFD21F" stroke="rgba(0,0,0,.25)" strokeWidth="1.5" />
          <circle cx="120" cy="204" r="5" fill="#111" />
        </g>
      );
      break;
    }

    case 'hair-jig': {
      const hook = hookParts(150, 210, 344, 24, wire);
      const strands = Array.from({ length: 34 }).map((_, i) => {
        const t = i / 33;
        const y0 = 188 + t * 26;
        const y1 = 160 + t * 82;
        const x1 = 280 + Math.sin(i * 1.7) * 12;
        return (
          <path
            key={i}
            d={`M146 ${y0} Q220 ${y0 + (y1 - y0) * 0.3} ${x1} ${y1}`}
            fill="none"
            stroke={t < 0.5 ? p : s}
            strokeWidth={5.5 - Math.abs(t - 0.5) * 3}
            strokeLinecap="round"
          />
        );
      });
      body = (
        <g>
          {hookEye(112, 170, wire)}
          {hook.shank}
          {strands}
          {hook.bend}
          <rect x="136" y="184" width="18" height="34" rx="5" fill="#222" />
          <circle cx="112" cy="200" r="30" fill={p} />
          <circle cx="112" cy="200" r="30" fill={shade} />
          <ellipse cx="102" cy="188" rx="9" ry="6" fill="rgba(255,255,255,.4)" />
          <circle cx="102" cy="203" r="8.5" fill="#FFD21F" stroke="rgba(0,0,0,.25)" strokeWidth="1.5" />
          <circle cx="100" cy="203" r="4.2" fill="#111" />
        </g>
      );
      break;
    }

    case 'box': {
      const mini = [p, s, '#FF7A1A', '#A9DDF3', '#C9F025', '#FF4F9E', '#F6F2E7'];
      body = (
        <g>
          {/* lid */}
          <path d="M84 176 L110 96 L290 96 L316 176 Z" fill="#2B2D27" />
          <path d="M96 170 L118 104 L282 104 L304 170 Z" fill="#33352E" />
          {/* baits poking out */}
          {mini.map((c, i) => {
            const x = 104 + i * 30;
            const h = 52 + ((i * 37) % 26);
            return (
              <g key={i} transform={`rotate(${(i % 2 ? 6 : -6) + (i - 3) * 2} ${x + 9} 200)`}>
                <rect x={x} y={200 - h} width="20" height={h + 20} rx="10" fill={c} />
                <rect x={x} y={200 - h} width="20" height={h + 20} rx="10" fill={shade} />
              </g>
            );
          })}
          {/* jig heads */}
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={128 + i * 72} cy={176} r="11" fill={['#D7262E', '#C9F025', '#FF5FA2'][i]} stroke="rgba(0,0,0,.2)" />
          ))}
          {/* box body */}
          <path d="M70 180 L330 180 L320 318 L80 318 Z" fill="#1F201C" />
          <path d="M70 180 L330 180 L328 200 L72 200 Z" fill="#2B2D27" />
          <path d="M75 236 L325 236 L322 272 L78 272 Z" fill="#8DBB2C" />
          <path d="M75 236 L325 236 L325 241 L75 241 Z" fill="rgba(0,0,0,.15)" />
        </g>
      );
      break;
    }
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
        {/* brushed-steel wire; user space so straight strokes (zero-height boxes) still render */}
        <linearGradient id={id('wire')} gradientUnits="userSpaceOnUse" x1="0" y1="130" x2="0" y2="215">
          <stop offset="0" stopColor="#E4E7EA" />
          <stop offset="0.45" stopColor={METAL} />
          <stop offset="1" stopColor="#5E646A" />
        </linearGradient>
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
