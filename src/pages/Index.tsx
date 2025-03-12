import React, { useState, useEffect } from 'react';
import ColorBurst from '../components/ColorBurst';
import Background from '../components/Background';
import HoliWish from '../components/HoliWish';
import gsap from 'gsap';
import { toast } from 'sonner';
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BurstPoint {
  id: number;
  x: number;
  y: number;
}

const Index = () => {
  const [burstPoints, setBurstPoints] = useState<BurstPoint[]>([]);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');

  useEffect(() => {
    // Show welcome toast
    toast('Welcome to Holi Color Festival!', {
      description: 'Click anywhere on the screen to create color bursts!',
      duration: 5000,
    });

    // Animate in the header
    const timeout = setTimeout(() => {
      setHeaderVisible(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newBurst = {
      id: Date.now(),
      x,
      y,
    };

    setBurstPoints((prev) => [...prev, newBurst]);

    // Clean up old burst points to prevent memory issues
    setTimeout(() => {
      setBurstPoints((prev) => prev.filter((burst) => burst.id !== newBurst.id));
    }, 3000);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (customMessage.trim()) {
      setDisplayMessage(customMessage);
      setCustomMessage('');
      toast.success('Message sent!');
    }
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <Background />
      
      {/* Header */}
      <div 
        className={`fixed top-0 left-0 right-0 p-6 text-center transition-opacity duration-1000 ${
          headerVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white text-shadow animate-float mb-2">
          Happy Holi Festival
        </h1>
        <p className="text-lg md:text-xl text-white/90 text-shadow animate-fade-in">
          Click anywhere to celebrate with colors
        </p>
      </div>
      
      {/* Color bursts */}
      {burstPoints.map((burst) => (
        <ColorBurst 
          key={burst.id}
          x={burst.x}
          y={burst.y}
          particleCount={30 + Math.floor(Math.random() * 20)}
        />
      ))}
      
      {/* Instructions Input with Send Button */}
      <div className="fixed bottom-6 left-0 right-0 text-center flex items-center justify-center gap-2">
        <Input
          type="text"
          value={customMessage}
          onChange={handleMessageChange}
          className="max-w-xs text-white bg-transparent border-white/20 glass-panel hover:border-white/40 transition-colors"
          placeholder="Enter your message"
        />
        <Button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent color burst on button click
            handleSendMessage();
          }}
          className="bg-transparent hover:bg-white/10 border border-white/20"
          size="icon"
        >
          <Send className="h-4 w-4 text-white" />
        </Button>
      </div>

      {/* Show the custom message as a Holi wish */}
      {displayMessage && (
        <HoliWish
          wish={displayMessage}
          x={window.innerWidth / 2}
          y={window.innerHeight - 100}
        />
      )}
    </div>
  );
};

export default Index;
