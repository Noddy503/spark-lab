import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ToggleSwitch({ 
  checked, 
  onChange, 
  disabled = false, 
  size = 'md' 
}: ToggleSwitchProps) {
  const sizeClasses = {
    sm: {
      container: 'w-8 h-4',
      circle: 'w-3 h-3',
      translate: 'translate-x-4'
    },
    md: {
      container: 'w-11 h-6',
      circle: 'w-5 h-5',
      translate: 'translate-x-5'
    },
    lg: {
      container: 'w-14 h-7',
      circle: 'w-6 h-6',
      translate: 'translate-x-7'
    }
  };

  const { container, circle, translate } = sizeClasses[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex items-center
        ${container}
        rounded-full
        transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${checked 
          ? 'bg-blue-600 hover:bg-blue-700' 
          : 'bg-gray-300 hover:bg-gray-400'
        }
      `}
    >
      <span
        className={`
          ${circle}
          bg-white
          rounded-full
          shadow-lg
          transform transition-transform duration-200 ease-in-out
          ${checked ? translate : 'translate-x-0.5'}
        `}
      />
    </button>
  );
}
