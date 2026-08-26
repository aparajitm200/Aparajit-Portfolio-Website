import React from 'react'
import * as LucideIcons from 'lucide-react'

// --- Cinematic Overview ---
export function CinematicOverview({ title, description }: { title: string, description?: string }) {
  return (
    <section style={{ marginBottom: 'var(--space-24)', padding: 'var(--space-12) 0', borderTop: '1px solid var(--color-border)' }}>
      <h2 className="t-display-md" style={{ marginBottom: 'var(--space-6)', maxWidth: '20ch' }}>
        {title}
      </h2>
      {description && (
        <p className="t-body-lg" style={{ color: 'var(--color-text-muted)', maxWidth: '60ch', lineHeight: 'var(--leading-loose)' }}>
          {description}
        </p>
      )}
    </section>
  )
}

// --- Insight Quote ---
export function InsightQuote({ quote, author }: { quote: string, author?: string }) {
  return (
    <section style={{ marginBottom: 'var(--space-24)' }}>
      <div style={{
        background: 'var(--color-surface)',
        padding: 'var(--space-16)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <LucideIcons.Quote size={120} strokeWidth={1} style={{ position: 'absolute', top: -20, left: -20, color: 'var(--color-border)', opacity: 0.5, zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <blockquote className="t-heading-lg" style={{ fontStyle: 'italic', marginBottom: 'var(--space-6)', maxWidth: '30ch' }}>
            "{quote}"
          </blockquote>
          {author && <p className="t-meta" style={{ color: 'var(--color-text-subtle)' }}>— {author}</p>}
        </div>
      </div>
    </section>
  )
}

// --- Bento Stats ---
export type BentoItem = { iconName: keyof typeof LucideIcons, title: string, description: string }

export function BentoStats({ title, items }: { title: string, items: BentoItem[] }) {
  return (
    <section style={{ marginBottom: 'var(--space-24)' }}>
      <h2 className="t-heading-md" style={{ marginBottom: 'var(--space-8)' }}>{title}</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--space-6)'
      }}>
        {items.map((item, i) => {
          const Icon = LucideIcons[item.iconName] as React.ElementType
          return (
            <div key={i} style={{
              background: 'var(--color-surface)',
              padding: 'var(--space-8)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)'
            }}>
              {Icon && <div style={{ 
                width: 48, height: 48, borderRadius: 24, 
                background: 'var(--color-background)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--color-accent)'
              }}><Icon size={24} strokeWidth={1.5} /></div>}
              <h3 className="t-body-md" style={{ fontWeight: 500 }}>{item.title}</h3>
              <p className="t-meta" style={{ color: 'var(--color-text-muted)' }}>{item.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// --- Flow Steps ---
export type FlowStep = { step: string, title: string, description: string }

export function FlowSteps({ title, steps }: { title: string, steps: FlowStep[] }) {
  return (
    <section style={{ marginBottom: 'var(--space-24)' }}>
      <h2 className="t-heading-md" style={{ marginBottom: 'var(--space-12)' }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: 'var(--space-6)', position: 'relative' }}>
            {/* Timeline track line */}
            {i !== steps.length - 1 && (
              <div style={{
                position: 'absolute',
                left: 24,
                top: 48,
                bottom: -32,
                width: 2,
                background: 'var(--color-border)',
                zIndex: 0
              }} />
            )}
            
            <div style={{ 
              width: 48, height: 48, borderRadius: 24, 
              background: 'var(--color-text)', color: 'var(--color-background)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold', fontSize: '1.2rem', zIndex: 1, flexShrink: 0
            }}>
              {step.step}
            </div>
            
            <div style={{ paddingTop: 'var(--space-2)' }}>
              <h3 className="t-heading-sm" style={{ marginBottom: 'var(--space-2)' }}>{step.title}</h3>
              <p className="t-body-md" style={{ color: 'var(--color-text-muted)', maxWidth: '50ch' }}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// --- Design System ---
export type DesignSystemData = {
  colors: { hex: string, name: string }[]
  typography: { fontName: string, sample: string }[]
}

export function DesignSystemBlock({ title, data }: { title: string, data: DesignSystemData }) {
  return (
    <section style={{ marginBottom: 'var(--space-24)' }}>
      <h2 className="t-heading-lg" style={{ marginBottom: 'var(--space-8)' }}>{title}</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-16)' }}>
        
        {/* Colors */}
        <div>
          <h3 className="t-meta" style={{ color: 'var(--color-text-subtle)', marginBottom: 'var(--space-6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Color Palette
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            {data.colors.map((c, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div style={{
                  width: 80, height: 80, borderRadius: 'var(--radius-sm)',
                  background: c.hex,
                  border: '1px solid var(--color-border)'
                }} />
                <span className="t-micro">{c.name}</span>
                <span className="t-micro" style={{ color: 'var(--color-text-subtle)' }}>{c.hex}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div>
          <h3 className="t-meta" style={{ color: 'var(--color-text-subtle)', marginBottom: 'var(--space-6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Typography
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {data.typography.map((t, i) => (
              <div key={i}>
                <span className="t-micro" style={{ color: 'var(--color-text-subtle)', display: 'block', marginBottom: 'var(--space-2)' }}>
                  {t.fontName}
                </span>
                <p className="t-heading-md" style={{ fontFamily: t.fontName.toLowerCase().includes('serif') ? 'var(--font-serif)' : 'var(--font-sans)' }}>
                  {t.sample}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
