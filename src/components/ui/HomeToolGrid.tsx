'use client';
import { useState } from 'react';
import Link from 'next/link';
import { tools } from '@/lib/tools-data';

export default function HomeToolGrid() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
      {tools.map((tool) => (
        <Link
          key={tool.slug}
          href={`/${tool.slug}`}
          style={{
            display: 'block',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            textDecoration: 'none',
            backgroundColor: 'var(--color-bg-card)',
            border: hoveredSlug === tool.slug ? '2px solid var(--color-brand)' : '2px solid var(--color-border)',
            boxShadow: hoveredSlug === tool.slug ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
            transform: hoveredSlug === tool.slug ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={() => setHoveredSlug(tool.slug)}
          onMouseLeave={() => setHoveredSlug(null)}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{tool.icon}</div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: '0.5rem' }}>{tool.name}</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>{tool.description}</p>
        </Link>
      ))}
    </div>
  );
}
