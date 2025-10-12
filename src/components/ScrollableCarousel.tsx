"use client"
import { useState, useRef, useEffect, ReactNode } from 'react';

interface ScrollableCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemsToShowDesktop?: number;
  itemWidthDesktop?: string;
  ariaLabels: {
    prev: string;
    next: string;
    dot: string;
  };
}

export default function ScrollableCarousel<T>({
  items,
  renderItem,
  itemsToShowDesktop = 3,
  itemWidthDesktop = `calc(${100 / itemsToShowDesktop}% - 1.33rem)`,
  ariaLabels,
}: ScrollableCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
      const newIndex = Math.max(0, Math.min(index, items.length - (isMobile ? 1 : itemsToShowDesktop)));
      setCurrentIndex(newIndex);

      if (!isMobile) {
        const scrollAmount = newIndex * (containerRef.current.scrollWidth / items.length);
        containerRef.current.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  };

  const nextSlide = () => scrollToIndex(currentIndex + 1);
  const prevSlide = () => scrollToIndex(currentIndex - 1);

  const Arrow = ({ direction }: { direction: 'left' | 'right' }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-full h-full"
    >
      {direction === 'left' ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      )}
    </svg>
  );

  return (
    <div className="relative">
      {/* Mobile Buttons */}
      {currentIndex > 0 && (
        <button
          onClick={prevSlide}
          className="block md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg transition-all"
          aria-label={ariaLabels.prev}
        >
          <div className="w-5 h-5"><Arrow direction="left" /></div>
        </button>
      )}
      {currentIndex < items.length - 1 && (
        <button
          onClick={nextSlide}
          className="block md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg transition-all"
          aria-label={ariaLabels.next}
        >
          <div className="w-5 h-5"><Arrow direction="right" /></div>
        </button>
      )}

      {/* Desktop Buttons */}
      {currentIndex > 0 && (
        <button
          onClick={prevSlide}
          className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-blue-600 p-3 rounded-full shadow-lg transition-all"
          aria-label={ariaLabels.prev}
        >
          <div className="w-6 h-6"><Arrow direction="left" /></div>
        </button>
      )}
      {currentIndex < items.length - itemsToShowDesktop && (
        <button
          onClick={nextSlide}
          className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-blue-600 p-3 rounded-full shadow-lg transition-all"
          aria-label={ariaLabels.next}
        >
          <div className="w-6 h-6"><Arrow direction="right" /></div>
        </button>
      )}

      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="flex transition-transform duration-300 ease-in-out gap-8 px-4 pb-4 md:pb-0 md:overflow-x-hidden md:scroll-smooth md:snap-x md:snap-mandatory"
          style={isMobile ? { transform: `translateX(${-100 * currentIndex}%)` } : {}}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-none w-full snap-center touch-pan-y"
              style={!isMobile ? { width: itemWidthDesktop } : {}}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:flex justify-center mt-6 gap-2">
        {Array.from({ length: Math.max(1, items.length - itemsToShowDesktop + 1) }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? 'bg-blue-600 w-4' : 'bg-gray-300'
            }`}
            aria-label={`${ariaLabels.dot} ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
