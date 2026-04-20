import React from 'react';

interface NeuCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}

export function NeuCard({ children, className = '', padding = 'p-6' }: NeuCardProps) {
  return (
    <div 
      className={`rounded-3xl ${padding} ${className}`}
      style={{
        background: '#FDECEC',
        boxShadow: '8px 8px 16px #e8d4d4, -8px -8px 16px #ffffff',
      }}
    >
      {children}
    </div>
  );
}