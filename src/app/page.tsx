import Link from "next/link";
import { articles } from "@/lib/tools-data";
import AdSlot from "@/components/ui/AdSlot";
import HomeToolGrid from "@/components/ui/HomeToolGrid";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-secondary text-surface py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Free Online Image Tools
          </h1>
          <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto text-surface/90">
            Resize, compress, crop, convert, and process images instantly in your browser.
            No uploads, no sign-ups — 100% private.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-surface/80">
            <span>🔒</span>
            <span>Your images never leave your device. All processing happens locally.</span>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <HomeToolGrid />
      </section>

      {/* Ad Slot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <AdSlot />
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center" style={{ color: 'var(--color-text-heading)' }}>
          Why Use PicTools.one?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {[
            { icon: "🔒", title: "100% Private", desc: "Images are processed locally in your browser. Nothing is uploaded to any server." },
            { icon: "⚡", title: "Lightning Fast", desc: "No waiting for uploads or downloads. Processing starts instantly on your device." },
            { icon: "💰", title: "Completely Free", desc: "All tools are free to use with no limits, no watermarks, and no sign-up required." },
            { icon: "📱", title: "Works Everywhere", desc: "Use on desktop, tablet, or mobile. Works in any modern web browser." },
          ].map((feature) => (
            <div
              key={feature.title}
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '2px solid var(--color-border)',
                borderRadius: '0.75rem',
                padding: '1.25rem',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
              <h3 className="font-semibold" style={{ color: 'var(--color-text-heading)' }}>{feature.title}</h3>
              <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center" style={{ color: 'var(--color-text-heading)' }}>
          Image Guides & Tutorials
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/${article.slug}`}
              style={{
                display: 'block',
                padding: '1.25rem',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                backgroundColor: 'var(--color-bg-card)',
                border: '2px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s ease',
              }}
            >
              <h3 className="font-bold" style={{ color: 'var(--color-text-heading)' }}>
                {article.title}
              </h3>
              <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {article.description}
              </p>
              <span style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-brand)' }}>
                Read Guide →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Ad Slot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <AdSlot />
      </section>
    </>
  );
}
