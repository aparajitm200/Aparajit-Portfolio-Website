import { useState, useEffect, type ReactNode } from 'react'

interface MasonryProps {
  children: ReactNode[]
  gap?: string
}

export function Masonry({ children, gap = 'var(--space-8)' }: MasonryProps) {
  const [columnsCount, setColumnsCount] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setColumnsCount(1)
      } else if (width < 1024) {
        setColumnsCount(2)
      } else {
        setColumnsCount(3)
      }
    }
    
    // Initial calculation
    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Create column arrays
  const columns: ReactNode[][] = Array.from({ length: columnsCount }, () => [])
  
  // Distribute children left-to-right across columns
  children.forEach((child, i) => {
    columns[i % columnsCount].push(child)
  })

  return (
    <div 
      style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${columnsCount}, 1fr)`, 
        gap 
      }}
    >
      {columns.map((col, i) => (
        <div 
          key={i} 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap 
          }}
        >
          {col}
        </div>
      ))}
    </div>
  )
}
