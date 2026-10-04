import React from 'react';

/**
 * Skeleton — base shimmer block.
 * Usage: <Skeleton className="h-6 w-48 rounded-xl" />
 */
export const Skeleton = ({ className = '' }) => (
  <div
    className={`relative overflow-hidden bg-slate-200 ${className}`}
    aria-hidden="true"
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
  </div>
);

/** Text line skeleton */
export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2.5 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className={`h-3.5 rounded-full ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
      />
    ))}
  </div>
);

/** Card skeleton */
export const SkeletonCard = ({ className = '' }) => (
  <div className={`bg-white rounded-3xl border border-slate-100 p-6 space-y-4 ${className}`}>
    <Skeleton className="w-12 h-12 rounded-2xl" />
    <Skeleton className="h-5 w-1/2 rounded-xl" />
    <SkeletonText lines={3} />
    <Skeleton className="h-10 w-32 rounded-xl mt-2" />
  </div>
);

/** Hero skeleton */
export const SkeletonHero = () => (
  <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-7 space-y-5">
        <Skeleton className="h-7 w-44 rounded-full" />
        <div className="space-y-3">
          <Skeleton className="h-12 w-full rounded-2xl" />
          <Skeleton className="h-12 w-5/6 rounded-2xl" />
          <Skeleton className="h-12 w-4/6 rounded-2xl" />
        </div>
        <Skeleton className="h-5 w-60 rounded-xl" />
        <SkeletonText lines={2} />
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-12 w-44 rounded-2xl" />
          <Skeleton className="h-12 w-44 rounded-2xl" />
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-5">
        <Skeleton className="h-80 w-full rounded-3xl" />
      </div>
    </div>
  </div>
);

/** Section header skeleton */
export const SkeletonSectionHeader = ({ centered = true }) => (
  <div className={`space-y-3 mb-12 ${centered ? 'text-center max-w-xl mx-auto' : 'max-w-xl'}`}>
    <Skeleton className="h-6 w-32 rounded-full mx-auto" />
    <Skeleton className="h-8 w-3/4 rounded-xl mx-auto" />
    <Skeleton className="h-4 w-5/6 rounded-xl mx-auto" />
  </div>
);

/** Grid of cards skeleton */
export const SkeletonGrid = ({ cols = 3, count = 6 }) => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 ${
    cols === 4 ? 'lg:grid-cols-4' : cols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
  } gap-6`}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

/** Full page loader with skeleton */
export const PageSkeleton = ({ variant = 'default' }) => {
  if (variant === 'hero') {
    return (
      <div className="animate-[fadeIn_0.3s_ease-out]">
        <SkeletonHero />
        <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <SkeletonSectionHeader />
          <SkeletonGrid cols={3} count={3} />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-[fadeIn_0.3s_ease-out]">
      <SkeletonSectionHeader />
      <SkeletonGrid cols={3} count={6} />
    </div>
  );
};
