import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Carousel.css'

interface CarouselProps {
  images: string[]
  interval?: number
}

export function Carousel({ images, interval = 3000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)
    return () => clearInterval(timer)
  }, [images.length, interval])

  // Scroll to active index
  useEffect(() => {
    if (trackRef.current) {
      const scrollWidth = trackRef.current.scrollWidth
      const itemWidth = scrollWidth / images.length
      trackRef.current.scrollTo({
        left: currentIndex * itemWidth,
        behavior: 'smooth'
      })
    }
  }, [currentIndex, images.length])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <div className="carousel-wrapper">
      <div className="carousel-track" ref={trackRef}>
        {images.map((src, i) => (
          <div key={i} className="carousel-slide">
            <img 
              src={src} 
              alt={`Slide ${i + 1}`} 
              className="carousel-img" 
              loading={i === 0 ? 'eager' : 'lazy'} 
            />
          </div>
        ))}
      </div>
      
      <button className="carousel-btn carousel-btn--prev" onClick={handlePrev} aria-label="Previous">
        <ChevronLeft size={24} />
      </button>
      <button className="carousel-btn carousel-btn--next" onClick={handleNext} aria-label="Next">
        <ChevronRight size={24} />
      </button>
      
      <div className="carousel-dots">
        {images.map((_, i) => (
          <button 
            key={i} 
            className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
