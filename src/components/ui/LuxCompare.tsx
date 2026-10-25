import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMaximize2 } from 'react-icons/fi';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { luxLevels } from '../../data/finalProject';
import ImageWithFallback from './ImageWithFallback';

interface LuxCompareProps {
  /** Called with the index into debugGallery when a frame is tapped */
  onOpen: (index: number) => void;
}

const DBG = '/final-project/debug/';

/**
 * Debug HUD viewer: pick a light level and compare what the infrared Pi camera and a
 * standard RGB webcam see, with the FaceMesh overlay and live EAR/MAR readout burned in.
 */
export default function LuxCompare({ onOpen }: LuxCompareProps) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const lux = luxLevels[step];

  const panels = [
    { key: 'ir', label: 'Infrared Pi camera', src: `${DBG}ir-${lux}.webp`, ratio: 'aspect-[4/3]', gi: step * 2 },
    { key: 'rgb', label: 'Standard RGB webcam', src: `${DBG}rgb-${lux}.webp`, ratio: 'aspect-[1280/750]', gi: step * 2 + 1 },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-8">
      <div className="mb-6">
        <label htmlFor="lux-range" className="mb-3 flex items-baseline justify-between text-sm">
          <span className="font-semibold text-white">Light level</span>
          <span className="text-2xl font-bold text-teal-300">
            {lux} <span className="text-sm font-medium text-gray-400">lux</span>
          </span>
        </label>
        <input
          id="lux-range"
          type="range"
          min={0}
          max={luxLevels.length - 1}
          step={1}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          aria-valuetext={`${lux} lux`}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-teal-300"
        />
        <div className="mt-2 flex justify-between px-0.5 text-xs text-gray-500">
          {luxLevels.map((l, i) => (
            <button
              key={l}
              onClick={() => setStep(i)}
              className={`rounded px-1 transition-colors hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${i === step ? 'font-semibold text-teal-300' : ''}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid items-start gap-4 md:grid-cols-2">
        {panels.map((p) => (
          <figure key={p.key}>
            <figcaption className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">{p.label}</figcaption>
            <button
              onClick={() => onOpen(p.gi)}
              aria-label={`Enlarge: ${p.label} at ${lux} lux`}
              className={`group relative block w-full overflow-hidden rounded-xl border border-white/10 bg-black ${p.ratio} focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400`}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={p.src}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduced ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <ImageWithFallback src={p.src} alt={`${p.label} at ${lux} lux with debug HUD`} className="h-full w-full object-cover" loading="lazy" />
                </motion.div>
              </AnimatePresence>
              <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <FiMaximize2 className="h-4 w-4" />
              </span>
            </button>
          </figure>
        ))}
      </div>

      <p className="mt-5 max-w-3xl text-sm leading-relaxed text-gray-300">
        {lux === 0
          ? 'At 0 lux the RGB webcam sees an empty black frame, so the mesh floats with nothing to lock onto and the readout is meaningless. The infrared camera still sees the face and tracks it.'
          : 'The HUD draws the FaceMesh, colours the eyes, labels eye and mouth state and prints live EAR and MAR values, so every detection can be checked against the video frame by frame.'}
      </p>
    </div>
  );
}
