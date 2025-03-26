import React, { useState } from 'react';
import classNames from 'classnames';
import { DocumentTextIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface InputFormProps {
  onSubmit: (summary: string) => void;
  onReset: () => void;
  loading: boolean;
}

export function InputForm({ onSubmit, onReset, loading }: InputFormProps) {
  const [summary, setSummary] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (summary.trim()) {
      onSubmit(summary);
    }
  };

  const handleReset = () => {
    setSummary('');
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <DocumentTextIcon className="w-6 h-6 text-rose-600" />
          <h2 className="text-xl font-semibold text-gray-800">Enter Research Summary</h2>
        </div>
        {summary.trim() && (
          <button
            type="button"
            onClick={handleReset}
            className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Reset
          </button>
        )}
      </div>
      
      <div className="mb-4">
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
          placeholder="Paste your research summary here..."
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading || !summary.trim()}
        className={classNames(
          "w-full py-3 px-4 rounded-lg font-medium text-white transition-colors flex items-center justify-center gap-2",
          {
            "bg-rose-600 hover:bg-rose-700": !loading,
            "bg-rose-400 cursor-not-allowed": loading
          }
        )}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generating Visual Abstract...
          </>
        ) : (
          <>
            <DocumentTextIcon className="w-5 h-5" />
            Generate Visual Abstract
          </>
        )}
      </button>
    </form>
  );
}