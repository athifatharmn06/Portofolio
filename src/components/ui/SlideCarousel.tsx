import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import ImageWithFallback from './ImageWithFallback';

export interface Slide {
  url: string;
  caption: string;
  /** Show the whole image on a light backdrop (drawings, schematics) instead of cropping it */
  contain?: boolean;
}

interface SlideCarouselProps {
  slides: Slide[];
  /** Called with the current index when the image is tapped */
  onOpen?: (index: number) => void;
  className?: string;
}

const SWIPE = 60;

/** Image carousel with previous/next arrows, dots, swipe and arrow-key support. */
export default function SlideCarousel({ slides, onOpen, className = '' }: SlideCarouselProps) {
  const reduced = useReducedMotion();
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const total = slides.length;

  const go = useCallback(
    (delta: number) => setState(([i]) => [(i + delta + total) % total, delta]),
    [total]
  );
  const jump = (to: number) => setState(([i]) => [to, to > i ? 1 : -1]);

  const slide = slides[index];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a1020] ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Prototype photos and drawings"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      <div className="relative aspect-[4/3] w-full">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={slide.url}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: reduced ? 0 : d >= 0 ? '40%' : '-40%', opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: reduced ? 0 : d >= 0 ? '-40%' : '40%', opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduced ? 0.15 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            drag={total > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE) go(1);
              else if (info.offset.x > SWIPE) go(-1);
            }}
            onTap={() => onOpen?.(index)}
            className={`absolute inset-0 cursor-pointer ${slide.contain ? 'bg-white' : ''}`}
          >
            <ImageWithFallback
              src={slide.url}
              alt={slide.caption}
              className={`h-full w-full select-none ${slide.contain ? 'object-contain p-2' : 'object-cover'}`}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </motion.div>
        </AnimatePresence>

        {onOpen && (
          <button
            onClick={() => onOpen(index)}
            aria-label="Enlarge this image"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-md transition-opacity focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 group-hover:opacity-100"
          >
            <FiMaximize2 className="h-4 w-4" />
          </button>
        )}

        {total > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      <div className="flex min-h-[4.25rem] items-start justify-between gap-4 bg-[#0a1020] px-4 pt-3">
        <p className="text-xs leading-relaxed text-gray-300">{slide.caption}</p>
        <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
          {index + 1} / {total}
        </span>
      </div>

      {total > 1 && (
        <div className="flex items-center justify-center gap-1.5 bg-[#0a1020] py-3" role="tablist" aria-label="Choose image">
          {slides.map((s, i) => (
            <button
              key={s.url}
              role="tab"
              aria-selected={i === index}
              aria-label={`Show image ${i + 1}`}
              onClick={() => jump(i)}
              className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
                i === index ? 'w-6 bg-teal-300' : 'w-1.5 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
