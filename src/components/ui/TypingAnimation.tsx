import { useState, useEffect, useCallback } from 'react';

interface TypingAnimationProps {
  roles: string[];
  typingSpeed?: number;   // ms per character (default ~80)
  pauseDuration?: number; // ms to hold each role (default 3000)
}

type Phase = 'typing' | 'pausing' | 'deleting';

/**
 * Typing animation component that cycles through professional roles.
 *
 * - Simulates character-by-character typing and deletion
 * - Configurable typing speed and pause duration (2000–4000ms)
 * - Repeats cycle continuously
 * - Includes a blinking cursor effect
 */
export default function TypingAnimation({
  roles,
  typingSpeed = 80,
  pauseDuration = 3000,
}: TypingAnimationProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState<Phase>('typing');

  const currentRole = roles[roleIndex] ?? '';

  const advanceToNextRole = useCallback(() => {
    setRoleIndex((prev) => (prev + 1) % roles.length);
    setPhase('typing');
  }, [roles.length]);

  useEffect(() => {
    if (roles.length === 0) return;

    let timeout: ReturnType<typeof setTimeout>;

    switch (phase) {
      case 'typing': {
        if (displayedText.length < currentRole.length) {
          timeout = setTimeout(() => {
            setDisplayedText(currentRole.slice(0, displayedText.length + 1));
          }, typingSpeed);
        } else {
          // Finished typing, pause before deleting
          setPhase('pausing');
        }
        break;
      }

      case 'pausing': {
        timeout = setTimeout(() => {
          setPhase('deleting');
        }, pauseDuration);
        break;
      }

      case 'deleting': {
        if (displayedText.length > 0) {
          timeout = setTimeout(() => {
            setDisplayedText(displayedText.slice(0, -1));
          }, typingSpeed / 2); // Delete slightly faster than typing
        } else {
          // Finished deleting, move to next role
          advanceToNextRole();
        }
        break;
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, phase, currentRole, typingSpeed, pauseDuration, roles.length, advanceToNextRole]);

  if (roles.length === 0) return null;

  return (
    <span className="inline-flex items-baseline" aria-label={currentRole} role="text">
      <span>{displayedText}</span>
      <span
        className="ml-0.5 inline-block h-[1.1em] w-[2px] bg-current animate-blink"
        aria-hidden="true"
      />
    </span>
  );
}
