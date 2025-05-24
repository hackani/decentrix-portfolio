"use client"
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

interface Shape {
  id: number;
  type: 'circle' | 'square';
  size: number;
  color: string;
}

export default function FloatingShapes() {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 800, height: 600 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial dimensions
    updateDimensions();

    // Add event listener for window resize
    window.addEventListener('resize', updateDimensions);

    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Don't render anything on server-side
  if (!isClient) return null;

  const shapes: Shape[] = Array(20).fill(null).map((_, index) => ({
    id: index,
    type: Math.random() > 0.5 ? 'circle' : 'square',
    size: Math.random() * 40 + 20,
    color: `hsl(${Math.random() * 360}, 70%, 70%)`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          initial={{ 
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            scale: 0,
            opacity: 0
          }}
          animate={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            scale: 1,
            opacity: 0.3
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          style={{
            width: shape.size,
            height: shape.size,
            borderRadius: shape.type === 'circle' ? '50%' : '20%',
            background: shape.color,
          }}
        />
      ))}
    </div>
  );
} 