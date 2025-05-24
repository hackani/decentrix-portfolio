"use client"
import { ReactNode } from 'react';

interface ParallaxSectionProps {
  image: string;
  height?: string;
  children: ReactNode;
}

export default function ParallaxSection({ 
  image, 
  height = "min-h-screen", 
  children 
}: ParallaxSectionProps) {
  return (
    <div className={`relative ${height} w-full overflow-hidden`}>
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
        style={{ 
          backgroundImage: `url(${image})`,
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Fixed Dark Overlay */}
      <div className="fixed inset-0 bg-black/50 -z-10" />

      {/* Scrollable Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 