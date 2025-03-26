import React from 'react';
import { DocumentTextIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export function Header() {
  return (
    <>
      <div className="bg-rose-700 text-white p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center flex items-center justify-center gap-3">
          <DocumentTextIcon className="w-8 h-8" />
          Low-dose Rituximab Therapy in Resistant Idiopathic Membranous Nephropathy
        </h1>
      </div>
      <div className="bg-rose-50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AcademicCapIcon className="w-8 h-8 text-rose-700" />
          <span className="text-xl">Single-center Experience Study (2015-2016)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-rose-700 text-white rounded-full text-sm">Clinical Study</span>
          <span className="px-3 py-1 bg-rose-600 text-white rounded-full text-sm">Nephrology</span>
        </div>
      </div>
    </>
  );
}