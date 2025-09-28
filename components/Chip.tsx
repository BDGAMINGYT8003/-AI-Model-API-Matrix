
import React from 'react';

interface ChipProps {
  text: string;
  colorClass: string;
}

export const Chip: React.FC<ChipProps> = ({ text, colorClass }) => {
  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${colorClass}`}>
      {text}
    </span>
  );
};
