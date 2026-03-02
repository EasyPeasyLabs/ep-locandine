import React from 'react';

interface ShapeRendererProps {
  type: string;
  color: string;
}

export const ShapeRenderer: React.FC<ShapeRendererProps> = ({ type, color }) => {
  switch (type) {
    case 'circle':
      return <div className="w-full h-full rounded-full" style={{ backgroundColor: color }} />;
    case 'square':
      return <div className="w-full h-full" style={{ backgroundColor: color }} />;
    case 'rounded-square':
      return <div className="w-full h-full rounded-2xl" style={{ backgroundColor: color }} />;
    case 'triangle':
      return <div className="w-full h-full" style={{ backgroundColor: color, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />;
    case 'star':
      return <div className="w-full h-full" style={{ backgroundColor: color, clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />;
    case 'hexagon':
      return <div className="w-full h-full" style={{ backgroundColor: color, clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }} />;
    case 'pentagon':
      return <div className="w-full h-full" style={{ backgroundColor: color, clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />;
    default:
      return <div className="w-full h-full" style={{ backgroundColor: color }} />;
  }
};
