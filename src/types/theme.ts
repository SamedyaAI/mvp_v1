export interface Theme {
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    surface: string;
  };
  gradients: {
    header: string;
    card: string;
    flow: string;
  };
}

export const themes: Theme[] = [
  {
    name: 'Modern Medical',
    description: 'Clean and professional with calming blue tones',
    colors: {
      primary: '#0ea5e9',
      secondary: '#0891b2',
      accent: '#0284c7',
      background: '#f0f9ff',
      text: '#0f172a',
      surface: '#ffffff'
    },
    gradients: {
      header: 'from-[#0ea5e9] to-[#0284c7]',
      card: 'from-white to-[#f0f9ff]',
      flow: 'from-[#e0f2fe] to-white'
    }
  },
  {
    name: 'Clinical Precision',
    description: 'Sharp and focused with emerald accents',
    colors: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#065f46',
      background: '#ecfdf5',
      text: '#064e3b',
      surface: '#ffffff'
    },
    gradients: {
      header: 'from-[#059669] to-[#047857]',
      card: 'from-white to-[#ecfdf5]',
      flow: 'from-[#d1fae5] to-white'
    }
  },
  {
    name: 'Research Lab',
    description: 'Scientific and analytical with purple highlights',
    colors: {
      primary: '#7c3aed',
      secondary: '#6d28d9',
      accent: '#5b21b6',
      background: '#f5f3ff',
      text: '#2e1065',
      surface: '#ffffff'
    },
    gradients: {
      header: 'from-[#7c3aed] to-[#6d28d9]',
      card: 'from-white to-[#f5f3ff]',
      flow: 'from-[#ede9fe] to-white'
    }
  },
  {
    name: 'Healthcare Heart',
    description: 'Warm and caring with rose accents',
    colors: {
      primary: '#e11d48',
      secondary: '#be123c',
      accent: '#9f1239',
      background: '#fff1f2',
      text: '#881337',
      surface: '#ffffff'
    },
    gradients: {
      header: 'from-[#e11d48] to-[#be123c]',
      card: 'from-white to-[#fff1f2]',
      flow: 'from-[#ffe4e6] to-white'
    }
  },
  {
    name: 'Surgical Suite',
    description: 'Precise and sterile with slate undertones',
    colors: {
      primary: '#475569',
      secondary: '#334155',
      accent: '#1e293b',
      background: '#f8fafc',
      text: '#0f172a',
      surface: '#ffffff'
    },
    gradients: {
      header: 'from-[#475569] to-[#334155]',
      card: 'from-white to-[#f8fafc]',
      flow: 'from-[#e2e8f0] to-white'
    }
  }
];