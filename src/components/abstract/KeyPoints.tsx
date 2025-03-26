import React from 'react';
import { LightBulbIcon } from '@heroicons/react/24/outline';

interface KeyPointsProps {
  title: string;
  points: string[];
}

export function KeyPoints({ title, points }: KeyPointsProps) {
  return (
    <div className="bg-rose-50 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-rose-800 mb-4 flex items-center gap-2">
        <LightBulbIcon className="w-6 h-6" />
        {title}
      </h2>
      
      <div className="grid gap-3">
        {points.map((point, index) => (
          <div key={index} className="bg-white p-3 rounded-lg shadow-sm flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              {index + 1}
            </div>
            <p>{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
}