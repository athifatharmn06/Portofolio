import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  loading?: 'lazy' | 'eager';
}

const ImageWithFallback = ({
  src,
  alt,
  className = '',
  placeholderClassName = '',
  loading,
}: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 ${className} ${placeholderClassName}`}
      >
        <span className="text-sm text-gray-600 dark:text-gray-300 text-center px-4 leading-snug">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setHasError(true)}
    />
  );
};

export default ImageWithFallback;
