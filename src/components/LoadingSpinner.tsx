import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-rose-200 border-t-rose-600"></div>
      <p className="mt-4 text-lg text-rose-700">Creating your visual abstract...</p>
      <p className="text-sm text-rose-500">This may take a few moments</p>
    </div>
  );
}