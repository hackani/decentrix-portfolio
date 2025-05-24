"use client"
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface ScrollableTeamProps {
  members: TeamMember[];
}

export default function ScrollableTeam({ members }: ScrollableTeamProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const newIndex = Math.max(0, Math.min(index, members.length - (isMobile ? 1 : 4)));
      setCurrentIndex(newIndex);
      
      if (!isMobile) {
        // Desktop behavior - scroll
        const scrollAmount = newIndex * (containerRef.current.offsetWidth / 4);
        containerRef.current.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
      // Mobile uses transform in the CSS
    }
  };

  const nextSlide = () => scrollToIndex(currentIndex + 1);
  const prevSlide = () => scrollToIndex(currentIndex - 1);

  return (
    <div className="relative">
      {/* Mobile Navigation Buttons */}
      {currentIndex > 0 && (
        <button
          onClick={prevSlide}
          className="block md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg transition-all"
          aria-label="Previous team members"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      )}
      
      {currentIndex < members.length - 1 && (
        <button
          onClick={nextSlide}
          className="block md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg transition-all"
          aria-label="Next team members"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      )}

      {/* Desktop Navigation Buttons */}
      {currentIndex > 0 && (
        <button
          onClick={prevSlide}
          className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-blue-600 p-3 rounded-full shadow-lg transition-all"
          aria-label="Previous team members"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      )}
      
      {currentIndex < members.length - 4 && (
        <button
          onClick={nextSlide}
          className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-blue-600 p-3 rounded-full shadow-lg transition-all"
          aria-label="Next team members"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      )}

      {/* Team Members Container */}
      <div className="overflow-hidden">
        <div 
          ref={containerRef}
          className="flex transition-transform duration-300 ease-in-out gap-8 px-4 pb-4 md:pb-0 md:overflow-x-hidden md:scroll-smooth md:snap-x md:snap-mandatory"
          style={isMobile ? {
            transform: `translateX(${-100 * currentIndex}%)`,
          } : {}}
        >
          {members.map((member, index) => (
            <motion.div
              key={index}
              className="flex-none w-full md:w-[calc(25%-1.5rem)] snap-center text-center touch-pan-y"
              style={isMobile ? {
                width: '100%',
                flexShrink: 0
              } : {}}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative w-48 h-48 mx-auto mb-4 group overflow-hidden rounded-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="hidden md:flex justify-center mt-6 gap-2">
        {Array.from({ length: Math.max(1, members.length - 3) }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? 'bg-blue-600 w-4' : 'bg-gray-300'
            }`}
            aria-label={`Go to team member set ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 