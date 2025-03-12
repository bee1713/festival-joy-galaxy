
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Background: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Create background glow elements
    const colors = ['#FF5F9E', '#B76CFD', '#FFD166', '#06D6A0', '#118AB2'];
    const glows: HTMLDivElement[] = [];
    
    for (let i = 0; i < 5; i++) {
      const glow = document.createElement('div');
      glow.className = 'glow-effect';
      glow.style.backgroundColor = colors[i % colors.length];
      glow.style.width = `${200 + Math.random() * 300}px`;
      glow.style.height = glow.style.width;
      glow.style.left = `${Math.random() * width}px`;
      glow.style.top = `${Math.random() * height}px`;
      glow.style.opacity = '0.2';
      container.appendChild(glow);
      glows.push(glow);
    }
    
    // Animate the glow elements
    glows.forEach((glow) => {
      gsap.to(glow, {
        x: `+=${Math.random() * 100 - 50}`,
        y: `+=${Math.random() * 100 - 50}`,
        duration: 8 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      
      gsap.to(glow, {
        opacity: 0.1 + Math.random() * 0.3,
        duration: 4 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
    
    return () => {
      glows.forEach((glow) => {
        if (glow.parentNode) {
          glow.parentNode.removeChild(glow);
        }
      });
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden -z-10"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1603228254119-e6a4d095dc59?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFwcHklMjBob2xpfGVufDB8fDB8fHww')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Semi-transparent overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};

export default Background;
