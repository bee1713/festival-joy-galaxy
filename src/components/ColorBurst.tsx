
import React, { useEffect, useState } from 'react';
import Particle from './Particle';
import HoliWish from './HoliWish';
import { getRandomColor } from '../utils/animations';
import { getRandomWish } from '../utils/wishes';

type ColorBurstProps = {
  x: number;
  y: number;
  particleCount?: number;
};

const ColorBurst: React.FC<ColorBurstProps> = ({ 
  x, 
  y, 
  particleCount = 30
}) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    velocity: {
      x: number;
      y: number;
    };
    gravity: number;
    friction: number;
    lifetime: number;
  }>>([]);
  
  const [wish, setWish] = useState<string | null>(null);
  
  useEffect(() => {
    const newParticles = [];
    
    // Create particles in a circular burst pattern
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = 1 + Math.random() * 3;
      const size = 5 + Math.random() * 20;
      
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        size,
        color: getRandomColor(),
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed
        },
        gravity: 0.1,
        friction: 0.98,
        lifetime: 0.5 + Math.random() * 1.5
      });
    }
    
    setParticles(newParticles);
    setWish(getRandomWish());
    
    // Clean up particles after animation
    const timer = setTimeout(() => {
      setParticles([]);
      setWish(null);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [x, y, particleCount]);
  
  return (
    <>
      {particles.map((particle) => (
        <Particle key={particle.id} options={particle} />
      ))}
      {wish && <HoliWish wish={wish} x={x} y={y} />}
    </>
  );
};

export default ColorBurst;
