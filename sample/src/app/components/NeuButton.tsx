import React from 'react';

interface NeuButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export function NeuButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  fullWidth = true,
  icon,
}: NeuButtonProps) {
  const getStyle = () => {
    if (variant === 'primary') {
      return {
        background: 'linear-gradient(135deg, #FF8FA3 0%, #FFB3C1 100%)',
        boxShadow: '6px 6px 12px #e8d4d4, -6px -6px 12px #ffffff',
        color: '#ffffff',
      };
    }
    return {
      background: 'linear-gradient(135deg, #FF6F91 0%, #FF8FA3 100%)',
      boxShadow: '6px 6px 12px #e8d4d4, -6px -6px 12px #ffffff',
      color: '#ffffff',
    };
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${fullWidth ? 'w-full' : ''} rounded-2xl py-4 px-6 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] font-semibold`}
      style={getStyle()}
    >
      {children}
      {icon && icon}
    </button>
  );
}