import React from 'react';
import { CheckCircleIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

export function Conclusion() {
  return (
    <div className="bg-rose-700 text-white p-6">
      <div className="flex items-center justify-center gap-4">
        <CheckCircleIcon className="w-8 h-8" />
        <p className="text-center text-xl font-semibold">
          Belatacept effectively manages chronic rejection in liver transplant patients
        </p>
        <ArrowTrendingUpIcon className="w-8 h-8" />
      </div>
      <div className="mt-3 flex justify-center gap-4">
        <span className="px-3 py-1 bg-rose-600 rounded-full text-sm">4+ Years Rejection-Free</span>
        <span className="px-3 py-1 bg-rose-600 rounded-full text-sm">Normalized Liver Function</span>
        <span className="px-3 py-1 bg-rose-600 rounded-full text-sm">Reduced DSA Levels</span>
      </div>
    </div>
  );
}