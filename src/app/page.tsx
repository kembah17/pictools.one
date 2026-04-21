import Link from "next/link";
import { tools, articles } from "@/lib/tools-data";
import AdSlot from "@/components/ui/AdSlot";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="group bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}
            >
              <div className="text-4xl mb-3">{tool.icon}</div>
              <h2 className="text-lg font-bold text-text dark:text-text-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                {tool.name}
              </h2>
              <p className="mt-2 text-sm text-text-light dark:text-text-dark-muted">
                {tool.description}
              </p>
              <span className="inline-block mt-4 text-sm font-medium text-primary dark:text-primary-light group-hover:underline">
                Use Tool →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Ad Slot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <AdSlot />
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-text dark:text-text-dark">
          Why Use PicTools.one?
        </h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "🔒", title: "100% Private", desc: "Images are processed locally in your browser. Nothing is uploaded to any server." },
            { icon: "⚡", title: "Lightning Fast", desc: "No waiting for uploads or downloads. Processing starts instantly on your device." },
            { icon: "💰", title: "Completely Free", desc: "All tools are free to use with no limits, no watermarks, and no sign-up required." },
            { icon: "📱", title: "Works Everywhere", desc: "Use on desktop, tablet, or mobile. Works in any modern web browser." },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-5 text-center shadow-md"
              style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="font-semibold text-text dark:text-text-dark">{feature.title}</h3>
              <p className="mt-1 text-sm text-text-light dark:text-text-dark-muted">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-text dark:text-text-dark">
          Image Guides & Tutorials
        </h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/${article.slug}`}
              className="group bg-surface dark:bg-surface-dark-alt border border-border dark:border-border-dark rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-200"
              style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}
            >
              <h3 className="font-bold text-text dark:text-text-dark group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                {article.title}
              </h3>
              <p className="mt-2 text-sm text-text-light dark:text-text-dark-muted">
                {article.description}
              </p>
              <span className="inline-block mt-3 text-sm font-medium text-primary dark:text-primary-light group-hover:underline">
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
