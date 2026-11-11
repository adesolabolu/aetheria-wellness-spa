import React, { useState } from 'react';

interface ArchivalImageProps {
  src: string;
  alt: string;
  className?: string;
  codeLabel?: string;
}

export const ArchivalImage: React.FC<ArchivalImageProps> = ({
  src,
  alt,
  className = '',
  codeLabel
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-vintage-paper text-brand-primary p-8 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-4 opacity-50"
        >
          <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1" />
          <path
            d="M24 8C24 8 16 18 16 26C16 30.4183 19.5817 34 24 34C28.4183 34 32 30.4183 32 26C32 18 24 8 24 8Z"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line x1="24" y1="14" x2="24" y2="38" stroke="currentColor" strokeWidth="1" />
        </svg>
        {codeLabel && (
          <span className="font-body text-[10px] uppercase tracking-widest opacity-60 mb-1">
            {codeLabel}
          </span>
        )}
        <span className="font-primary text-lg italic">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
