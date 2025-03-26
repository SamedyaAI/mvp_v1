import React from 'react';
import { DocumentTextIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export function Header() {
  return (
    <>
      <div className="bg-rose-700 text-white p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center flex items-center justify-center gap-3">
          <DocumentTextIcon className="w-8 h-8" />
          Belatacept Treatment in Late-onset Liver Transplant Rejection
        </h1>
      </div>
      <div className="bg-rose-50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AcademicCapIcon className="w-8 h-8 text-rose-700" />
          <span className="text-xl">Case Study: 20-year-old Female Patient</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-rose-700 text-white rounded-full text-sm">4+ Years Follow-up</span>
          <span className="px-3 py-1 bg-rose-600 text-white rounded-full text-sm">Liver Transplant</span>
        </div>
      </div>
    </>
  );
}