import Link from "next/link";
import { tools, articles } from "@/lib/tools-data";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-footer-bg)', color: 'var(--color-footer-text)' }} className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-xl font-bold" style={{ color: 'var(--color-footer-link)' }}>
              🖼️ PicTools<span style={{ color: 'var(--color-footer-muted)' }}>.one</span>
            </Link>
            <p className="mt-3 text-sm" style={{ color: 'var(--color-footer-muted)' }}>
              Free online image tools. All processing happens in your browser — your files never leave your device.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--color-footer-text)' }}>Image Tools</h3>
            <ul className="space-y-2">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--color-footer-muted)' }}
                  >
                    {tool.icon} {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--color-footer-text)' }}>Guides</h3>
            <ul className="space-y-2">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/${article.slug}`}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--color-footer-muted)' }}
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--color-footer-text)' }}>Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm transition-colors" style={{ color: 'var(--color-footer-muted)' }}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm transition-colors" style={{ color: 'var(--color-footer-muted)' }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm transition-colors" style={{ color: 'var(--color-footer-muted)' }}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 text-center text-sm" style={{ borderTop: '1px solid var(--color-footer-border)' }}>
          <p style={{ color: 'var(--color-footer-muted)' }}>© {new Date().getFullYear()} PicTools.one — All rights reserved.</p>
          <p className="mt-1" style={{ color: 'var(--color-footer-muted)' }}>🔒 100% client-side processing. Your images never leave your device.</p>
        </div>
      </div>
    </footer>
  );
}
