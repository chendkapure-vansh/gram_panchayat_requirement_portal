import React, { useState } from 'react';
import { Package } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'auto';
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'square',
}) => {
  const { isMarathi } = useLanguage();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const containerClasses = aspectRatio === 'square'
    ? 'aspect-square w-full bg-white border border-slate-200 rounded p-2 flex items-center justify-center overflow-hidden relative'
    : 'w-full bg-white border border-slate-200 rounded p-2 flex items-center justify-center overflow-hidden relative';

  if (!src || hasError) {
    return (
      <div className={`${containerClasses} ${className} bg-slate-50 text-slate-400 select-none`}>
        <div className="flex flex-col items-center justify-center text-center p-3">
          <Package className="w-8 h-8 text-slate-300 mb-1.5 stroke-[1.5]" />
          <span className="text-[11px] font-medium text-slate-400 leading-tight">
            {isMarathi ? 'फोटो लवकरच उपलब्ध' : 'Image coming soon'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${containerClasses} ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center">
          <Package className="w-6 h-6 text-slate-300 stroke-[1.5]" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`w-full h-full object-contain transition-opacity duration-200 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};

