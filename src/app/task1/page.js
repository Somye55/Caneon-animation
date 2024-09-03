"use client"
import { useState, useEffect } from 'react';

export default function SemiCircleAnimation() {
  const [active, setActive] = useState('A');
  const [dashOffset, setDashOffset] = useState(314); // Initial value, total length of half circle

  const handleClick = (point) => {
    setActive(point);
  };

  useEffect(() => {
    let newDashOffset;
    switch (active) {
      case 'A':
        newDashOffset = 314; // Full arc, starting at A
        break;
      case 'B':
        newDashOffset = 157; // Halfway arc, from A to B
        break;
      case 'C':
        newDashOffset = 0;   // Full arc completed, from A to C
        break;
      default:
        newDashOffset = 314;
    }

    setDashOffset(newDashOffset);
  }, [active]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="relative w-64 h-32">
        {/* Static Semicircle */}
        <svg className="absolute top-0 left-0 w-full h-full">
          <path
            d="M 200 100 A 100 100 0 0 0 0 100"
            stroke="gray"
            strokeWidth="4"
            fill="transparent"
          />
        </svg>

        {/* Transition Line Over the Semicircle */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <path
            d="M 200 100 A 100 100 0 0 0 0 100"
            stroke="blue"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray="314"
            strokeDashoffset={dashOffset}
            className="transition-all duration-700 ease-in-out"
          />
        </svg>

        {/* Point A at the bottom right */}
        <div className="absolute bottom-0 right-10 transform translate-x-1/2 translate-y-1/2">
          <button
            className={`w-8 h-8 rounded-full ${active === 'A' ? 'bg-yellow-400' : 'bg-gray-400'}`}
            onClick={() => handleClick('A')}
          >
            A
          </button>
        </div>

        {/* Point B at the top middle */}
        <div className="absolute top-0 left-[38%] transform -translate-x-1/2 -translate-y-1/2">
          <button
            className={`w-8 h-8 rounded-full ${active === 'B' ? 'bg-yellow-400' : 'bg-gray-400'}`}
            onClick={() => handleClick('B')}
          >
            B
          </button>
        </div>

        {/* Point C at the bottom left */}
        <div className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2">
          <button
            className={`w-8 h-8 rounded-full ${active === 'C' ? 'bg-yellow-400' : 'bg-gray-400'}`}
            onClick={() => handleClick('C')}
          >
            C
          </button>
        </div>
      </div>
    </div>
  );
}
