
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

type HoliWishProps = {
  wish: string;
  x: number;
  y: number;
};

const HoliWish: React.FC<HoliWishProps> = ({ wish, x, y }) => {
  const wishRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (wishRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(wishRef.current, 
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }
      );
      
      tl.to(wishRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.8,
        delay: 2,
        ease: 'power2.in',
      });
    }
  }, []);
  
  const fontSize = Math.max(16, Math.min(28, Math.floor(wish.length > 20 ? 400 / wish.length : 28)));
  
  return (
    <div 
      ref={wishRef}
      className="wish-text absolute z-20 p-3 rounded-lg glass-panel text-white"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)',
        fontSize: `${fontSize}px`,
        maxWidth: '280px',
      }}
    >
      {wish}
    </div>
  );
};

export default HoliWish;
