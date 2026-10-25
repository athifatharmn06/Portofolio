import { FaPython, FaMicrochip, FaCloud, FaBrain, FaReact, FaBolt } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Ring {
  size: string;
  duration: number;
  reverse?: boolean;
  chips: { icon: IconType; angle: number; color: string; label: string }[];
}

const RINGS: Ring[] = [
  {
    size: '92%',
    duration: 38,
    chips: [
      { icon: FaMicrochip, angle: 20, color: '#38bdf8', label: 'Embedded' },
      { icon: FaCloud, angle: 200, color: '#a78bfa', label: 'Cloud' },
    ],
  },
  {
    size: '122%',
    duration: 60,
    reverse: true,
    chips: [
      { icon: FaPython, angle: 70, color: '#facc15', label: 'Python' },
      { icon: FaBrain, angle: 190, color: '#f472b6', label: 'AI' },
      { icon: FaReact, angle: 300, color: '#2dd4bf', label: 'Web' },
      { icon: FaBolt, angle: 120, color: '#fb923c', label: 'Power' },
    ],
  },
];

/** Dashed orbits with glass chips circling the portrait. Decorative only. */
export default function OrbitRings() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex" aria-hidden="true">
      {RINGS.map((ring, ri) => (
        <div
          key={ri}
          className="absolute aspect-square rounded-full border border-dashed border-white/10"
          style={{
            width: ring.size,
            animation: reduced ? undefined : `spin ${ring.duration}s linear infinite ${ring.reverse ? 'reverse' : ''}`,
          }}
        >
          {ring.chips.map((chip) => {
            const rad = (chip.angle * Math.PI) / 180;
            const left = 50 + 50 * Math.cos(rad);
            const top = 50 + 50 * Math.sin(rad);
            const Icon = chip.icon;
            return (
              <span
                key={chip.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                {/* Counter-rotate so the chip stays upright while its ring turns */}
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-md"
                  style={{
                    boxShadow: `0 0 22px ${chip.color}40`,
                    animation: reduced
                      ? undefined
                      : `spin ${ring.duration}s linear infinite ${ring.reverse ? '' : 'reverse'}`,
                  }}
                >
                  <Icon size={18} style={{ color: chip.color }} />
                </span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
