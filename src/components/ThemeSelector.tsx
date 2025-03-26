import React from 'react';
import { themes } from '../types/theme';
import { SwatchIcon } from '@heroicons/react/24/outline';

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (themeName: string) => void;
}

export function ThemeSelector({ selectedTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <SwatchIcon className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-800">Select Theme</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => onThemeChange(theme.name)}
            className={`p-3 rounded-lg border transition-all ${
              selectedTheme === theme.name
                ? 'border-2 border-blue-500 shadow-md'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full"
                style={{ background: theme.colors.primary }}
              />
              <span className="font-medium">{theme.name}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{theme.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}