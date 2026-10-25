import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ANIMATION_DURATIONS } from '../../lib/constants';
import ImageWithFallback from './ImageWithFallback';
import type { ProjectData } from '../../types';

interface GalleryModalProps {
  project: ProjectData;
  onClose: () => void;
}

const GalleryModal = ({ project, onClose }: GalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const photos = project.photos;
  const totalPhotos = photos.length;

  // Prevent body scroll while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Navigate with circular wrap-around
  const navigateTo = useCallback(
    (index: number) => {
      const wrappedIndex = ((index % totalPhotos) + totalPhotos) % totalPhotos;
      setDirection(wrappedIndex > currentIndex ? 1 : -1);
      setCurrentIndex(wrappedIndex);
    },
    [currentIndex, totalPhotos]
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalPhotos);
  }, [totalPhotos]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  }, [totalPhotos]);

  // Keyboard navigation via custom hook
  useKeyboardNavigation({
    isActive: true,
    totalItems: totalPhotos,
    onNavigate: navigateTo,
    onClose,
  });

  // Preload adjacent images
  useEffect(() => {
    if (totalPhotos <= 1) return;

    const prevIndex = (currentIndex - 1 + totalPhotos) % totalPhotos;
    const nextIndex = (currentIndex + 1) % totalPhotos;

    const preloadImage = (url: string) => {
      const img = new Image();
      img.src = url;
    };

    preloadImage(photos[prevIndex].url);
    preloadImage(photos[nextIndex].url);
  }, [currentIndex, totalPhotos, photos]);

  // Touch/swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) >= 50) {
      if (touchDeltaX.current > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Animation variants
  const transitionDuration = prefersReducedMotion
    ? ANIMATION_DURATIONS.REDUCED_MOTION_MAX / 1000
    : ANIMATION_DURATIONS.GALLERY_TRANSITION / 1000;

  const overlayVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: transitionDuration, ease: 'easeOut' as const },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: transitionDuration, ease: 'easeIn' as const },
    },
  };

  const imageVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir > 0 ? 80 : -80,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: transitionDuration, ease: 'easeOut' as const },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir > 0 ? -80 : 80,
      transition: { duration: transitionDuration, ease: 'easeIn' as const },
    }),
  };

  const currentPhoto = photos[currentIndex];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery for ${project.title}`}
    >
      {/* Modal content container */}
      <div
        ref={modalContentRef}
        className="relative flex flex-col items-center w-full max-w-5xl mx-4 max-h-[90vh]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Close gallery"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Position indicator */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-black/50 text-white text-sm font-medium">
          {currentIndex + 1} / {totalPhotos}
        </div>

        {/* Main image area */}
        <div
          className="relative w-full flex-1 min-h-0 flex items-center justify-center overflow-hidden rounded-lg"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation arrows */}
          {totalPhotos > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Previous image"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Next image"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Animated image with crossfade/slide */}
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex flex-col items-center"
            >
              <ImageWithFallback
                src={currentPhoto.url}
                alt={currentPhoto.caption || `${project.title} screenshot ${currentIndex + 1}`}
                className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
              />
              {/* Caption and tools */}
              {(currentPhoto.caption || currentPhoto.tools) && (
                <div className="mt-3 text-center text-white/90 px-4">
                  {currentPhoto.caption && (
                    <p className="text-sm font-medium">{currentPhoto.caption}</p>
                  )}
                  {currentPhoto.tools && (
                    <p className="text-xs text-white/60 mt-1">{currentPhoto.tools}</p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail strip - hidden on mobile (<768px) */}
        {totalPhotos > 1 && (
          <div
            className="hidden md:flex mt-4 gap-2 overflow-x-auto max-w-full pb-2 px-2"
            role="tablist"
            aria-label="Image thumbnails"
          >
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  index === currentIndex
                    ? 'border-white opacity-100 scale-105'
                    : 'border-transparent opacity-60 hover:opacity-80'
                }`}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`View image ${index + 1}: ${photo.caption || ''}`}
              >
                <img
                  src={photo.url}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GalleryModal;
