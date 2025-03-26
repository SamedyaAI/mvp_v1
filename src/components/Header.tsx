import React from 'react';

export function Header() {
  return (
    <>
      <div className="bg-rose-700 text-white p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          Low-dose Rituximab Therapy in Resistant Idiopathic Membranous Nephropathy
        </h1>
      </div>
      <div className="bg-rose-50 p-4 flex items-center gap-3">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
        </svg>
        <span className="text-xl">Single-center Experience Study (2015-2016)</span>
      </div>
    </>
  );
}