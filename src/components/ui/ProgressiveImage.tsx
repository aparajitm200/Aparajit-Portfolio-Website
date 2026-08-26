import { useState, useEffect } from 'react'
import './ProgressiveImage.css'

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  className?: string
  aspectRatio?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
}

export function ProgressiveImage({
  src,
  alt,
  className = '',
  aspectRatio,
  objectFit = 'cover',
  style,
  ...props
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Reset state if src changes
  useEffect(() => {
    setLoaded(false)
    setError(false)
  }, [src])

  const handleLoad = () => {
    setLoaded(true)
  }

  const handleError = () => {
    setError(true)
    setLoaded(true) // So we don't show skeleton forever on error
  }

  return (
    <div
      className={`progressive-image-wrapper ${className} ${loaded ? 'is-loaded' : 'is-loading'}`}
      style={{
        aspectRatio,
        ...style
      }}
    >
      {/* The Skeleton / Shimmer background */}
      {!loaded && !error && (
        <div className="progressive-image-skeleton" aria-hidden="true" />
      )}

      {/* The actual image */}
      {!error ? (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`progressive-image-img ${loaded ? 'fade-in' : ''}`}
          style={{ objectFit }}
          {...props}
        />
      ) : (
        <div className="progressive-image-error">
          <span className="t-micro text-muted">{alt || 'Image Error'}</span>
        </div>
      )}
    </div>
  )
}
