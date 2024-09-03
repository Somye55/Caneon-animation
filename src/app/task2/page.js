"use client"
import { useEffect, useRef } from 'react';

export default function BouncingIcons() {
  const boxRef = useRef(null);
  const iconRefs = useRef([]);

  useEffect(() => {
    const box = boxRef.current;
    const icons = iconRefs.current;

    const positions = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 380,
      y: Math.random() * 380,
      dx: Math.random() * 2 - 1,
      dy: Math.random() * 2 - 1,
    }));

    const moveIcons = () => {
      icons.forEach((icon, i) => {
        const pos = positions[i];
        pos.x += pos.dx;
        pos.y += pos.dy;

        if (pos.x <= 0 || pos.x >= 380) pos.dx *= -1;
        if (pos.y <= 0 || pos.y >= 380) pos.dy *= -1;

        icon.style.left = `${pos.x}px`;
        icon.style.top = `${pos.y}px`;

        icons.forEach((otherIcon, j) => {
          if (i !== j && detectCollision(pos, positions[j])) {
            pos.dx *= -1;
            pos.dy *= -1;
            positions[j].dx *= -1;
            positions[j].dy *= -1;
          }
        });
      });

      requestAnimationFrame(moveIcons);
    };

    moveIcons();
  }, []);

  const detectCollision = (icon1, icon2) => {
    const dx = icon1.x - icon2.x;
    const dy = icon1.y - icon2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 20;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div
        ref={boxRef}
        className="relative w-96 h-96 border-2 border-gray-800 overflow-hidden"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => el && (iconRefs.current[i] = el)}
            className="absolute w-5 h-5 bg-blue-500 rounded-full"
            style={{ top: 0, left: 0 }}
          />
        ))}
      </div>
    </div>
  );
}
