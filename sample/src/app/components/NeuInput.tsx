import React from 'react';

interface NeuInputProps {
  icon: React.ReactNode;
  type?: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

export function NeuInput({
  icon,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  rightIcon,
  onRightIconClick,
}: NeuInputProps) {
  return (
    <div 
      className="rounded-2xl px-4 py-3 flex items-center gap-3"
      style={{
        background: '#FDECEC',
        boxShadow: 'inset 4px 4px 8px #e8d4d4, inset -4px -4px 8px #ffffff',
      }}
    >
      <div style={{ color: '#B0A0A0' }}>{icon}</div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className="flex-1 bg-transparent outline-none placeholder:text-[#B0A0A0]"
        style={{ color: '#333333' }}
      />
      {rightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          className="focus:outline-none"
          style={{ color: '#B0A0A0' }}
        >
          {rightIcon}
        </button>
      )}
    </div>
  );
}