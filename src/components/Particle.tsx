
import React, { useRef, useEffect } from 'react';
import { ParticleOptions, animateParticle } from '../utils/animations';
import gsap from 'gsap';

type ParticleProps = {
  options: ParticleOptions;
};

const Particle: React.FC<ParticleProps> = ({ options }) => {
  const particleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (particleRef.current) {
      const tl = gsap.timeline();
      
      tl.to(particleRef.current, {
        x: `+=${options.velocity.x * 100}`,
        y: `+=${options.velocity.y * 100}`,
        duration: options.lifetime,
        ease: 'power2.out',
        opacity: 0,
        scale: 0.5,
      });
    }
  }, [options]);
  
  return (
    <div 
      ref={particleRef}
      className="color-particle"
      style={{
        width: `${options.size}px`,
        height: `${options.size}px`,
        backgroundColor: options.color,
        left: `${options.x}px`,
        top: `${options.y}px`,
      }}
    />
  );
};

export default Particle;
