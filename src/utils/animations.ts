
import gsap from 'gsap';

export type ParticleOptions = {
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
};

export const createParticle = (options: ParticleOptions): HTMLDivElement => {
  const particle = document.createElement('div');
  particle.className = 'color-particle';
  particle.style.width = `${options.size}px`;
  particle.style.height = `${options.size}px`;
  particle.style.backgroundColor = options.color;
  particle.style.left = `${options.x}px`;
  particle.style.top = `${options.y}px`;
  
  return particle;
};

export const animateParticle = (
  particle: HTMLDivElement, 
  options: ParticleOptions
): gsap.core.Timeline => {
  const tl = gsap.timeline();
  
  tl.to(particle, {
    x: `+=${options.velocity.x * 100}`,
    y: `+=${options.velocity.y * 100}`,
    duration: options.lifetime,
    ease: 'power2.out',
    opacity: 0,
    scale: 0.5,
    onComplete: () => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }
  });
  
  return tl;
};

export const animateWish = (
  element: HTMLElement,
  delay: number = 0
): gsap.core.Timeline => {
  const tl = gsap.timeline({ delay });
  
  tl.fromTo(element, 
    { opacity: 0, scale: 0.8, y: 20 },
    { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }
  );
  
  tl.to(element, {
    opacity: 0,
    y: -30,
    duration: 0.8,
    delay: 2,
    ease: 'power2.in',
    onComplete: () => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  });
  
  return tl;
};

export const getRandomColor = (): string => {
  const colors = [
    '#FF5F9E', // pink
    '#B76CFD', // purple
    '#FFD166', // yellow
    '#06D6A0', // green
    '#118AB2', // blue
    '#FF9E00'  // orange
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
};
