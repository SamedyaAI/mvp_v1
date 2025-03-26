import React from 'react';
import * as Icons from '@heroicons/react/24/outline';

interface MedicalIconProps {
  name: string;
  className?: string;
}

export function MedicalIcon({ name, className = "w-6 h-6" }: MedicalIconProps) {
  const Icon = (Icons as any)[`${name}Icon`] || Icons.DocumentTextIcon;
  return <Icon className={className} />;
}