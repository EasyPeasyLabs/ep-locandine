import React from 'react';

export const Logo = ({ className = "w-24 h-24" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Lemon Body */}
    <ellipse cx="100" cy="120" rx="60" ry="70" fill="#FFEB3B" stroke="#FBC02D" strokeWidth="3" />
    
    {/* Face */}
    <circle cx="80" cy="110" r="5" fill="#333" />
    <circle cx="120" cy="110" r="5" fill="#333" />
    <path d="M 85 130 Q 100 145 115 130" stroke="#333" strokeWidth="3" fill="none" />
    
    {/* Arms */}
    <path d="M 45 110 Q 20 100 30 80" stroke="#FBC02D" strokeWidth="4" fill="none" />
    <path d="M 155 110 Q 180 100 170 80" stroke="#FBC02D" strokeWidth="4" fill="none" />

    {/* Legs */}
    <path d="M 80 180 L 80 200" stroke="#FBC02D" strokeWidth="4" fill="none" />
    <path d="M 120 180 L 120 200" stroke="#FBC02D" strokeWidth="4" fill="none" />
    
    {/* Union Jack Top Hat */}
    <rect x="70" y="40" width="60" height="50" fill="#00247D" />
    <rect x="60" y="85" width="80" height="10" fill="#00247D" />
    
    {/* Union Jack Pattern (Simplified) */}
    <path d="M 70 40 L 130 90" stroke="white" strokeWidth="5" />
    <path d="M 130 40 L 70 90" stroke="white" strokeWidth="5" />
    <path d="M 100 40 L 100 90" stroke="white" strokeWidth="8" />
    <path d="M 70 65 L 130 65" stroke="white" strokeWidth="8" />
    
    <path d="M 100 40 L 100 90" stroke="#CF142B" strokeWidth="4" />
    <path d="M 70 65 L 130 65" stroke="#CF142B" strokeWidth="4" />
    <path d="M 70 40 L 130 90" stroke="#CF142B" strokeWidth="2" />
    <path d="M 130 40 L 70 90" stroke="#CF142B" strokeWidth="2" />
  </svg>
);
