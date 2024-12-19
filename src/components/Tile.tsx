import React from 'react';

interface TileProps {
  value: number;
}

const Tile: React.FC<TileProps> = ({ value }) => {
  const getBgColor = () => {
    if (value === 0) return 'bg-gray-300';
    const hue = Math.min(255, 200 + value * 2);
    return `bg-[#${hue.toString(16)}cc99]`;
  };

  return (
    <div className={`w-20 h-20 flex items-center justify-center text-3xl text-serif text-white font-bold }`}>
      {value !== 0 ? value : ''}
    </div>
  );
};

export default Tile;

