import Link from "next/link";
import { tools, articles } from "@/lib/tools-data";

export default function Footer() {
  return (
    <footer className="bg-surface dark:bg-surface-dark border-t border-border dark:border-border-dark mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-xl font-bold text-primary">
              🖼️ PicTools<span className="text-secondary">.one</span>
            </Link>
            <p className="mt-3 text-sm text-text-light dark:text-text-dark-muted">
              Free online image tools. All processing happens in your browser — your files never leave your device.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-text dark:text-text-dark mb-3">Image Tools</h3>
            <ul className="space-y-2">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    className="text-sm text-text-light dark:text-text-dark-muted hover:text-primary dark:hover:text-primary-light transition-colors"
                  >
                    {tool.icon} {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text dark:text-text-dark mb-3">Guides</h3>
            <ul className="space-y-2">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/${article.slug}`}
                    className="text-sm text-text-light dark:text-text-dark-muted hover:text-primary dark:hover:text-primary-light transition-colors"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text dark:text-text-dark mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-text-light dark:text-text-dark-muted hover:text-primary dark:hover:text-primary-light transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-text-light dark:text-text-dark-muted hover:text-primary dark:hover:text-primary-light transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-text-light dark:text-text-dark-muted hover:text-primary dark:hover:text-primary-light transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border dark:border-border-dark text-center text-sm text-text-light dark:text-text-dark-muted">
          <p>© {new Date().getFullYear()} PicTools.one — All rights reserved.</p>
          <p className="mt-1">🔒 100% client-side processing. Your images never leave your device.</p>
        </div>
      </div>
    </footer>
  );
}
