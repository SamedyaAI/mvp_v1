import React from 'react';
import { DocumentTextIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  title: string;
  studyType?: string;
  metadata?: {
    duration?: string;
    patientCount?: number;
    location?: string;
  };
}

export function Header({ title, studyType = 'Research Study', metadata }: HeaderProps) {
  return (
    <>
      <div className="bg-rose-700 text-white p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          {title}
        </h1>
      </div>
      
      <div className="bg-rose-50 p-4 flex items-center gap-3">
        <ClipboardDocumentIcon className="w-8 h-8 text-rose-700" />
        <div className="flex-1">
          <span className="text-xl">{studyType}</span>
          {metadata && (
            <div className="mt-1 flex items-center gap-4 text-sm text-rose-700">
              {metadata.patientCount && (
                <div className="flex items-center gap-2">
                  <DocumentTextIcon className="w-5 h-5" />
                  <span>{metadata.patientCount} Patients</span>
                </div>
              )}
              {metadata.duration && (
                <span>{metadata.duration}</span>
              )}
              {metadata.location && (
                <span>{metadata.location}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}