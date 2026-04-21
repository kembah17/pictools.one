"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { tools } from "@/lib/tools-data";

export default function Header() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = () => {
    setDark(!dark);
    if (!dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="bg-surface dark:bg-surface-dark border-b border-border dark:border-border-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <span className="text-2xl">🖼️</span>
            <span>PicTools<span className="text-secondary">.one</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="px-3 py-2 text-sm font-medium text-text dark:text-text-dark hover:text-primary dark:hover:text-primary-light rounded-md hover:bg-surface-alt dark:hover:bg-surface-dark-alt transition-colors"
              >
                <span className="mr-1">{tool.icon}</span>
                {tool.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              className="relative w-14 h-7 rounded-full bg-surface-alt dark:bg-surface-dark-alt border border-border dark:border-border-dark transition-colors"
              aria-label="Toggle dark mode"
            >
              <span
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-primary shadow-md transition-transform duration-300 flex items-center justify-center text-xs ${
                  dark ? "translate-x-7" : "translate-x-0.5"
                }`}
              >
                {dark ? "🌙" : "☀️"}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md text-text dark:text-text-dark hover:bg-surface-alt dark:hover:bg-surface-dark-alt"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-border dark:border-border-dark pt-2">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-text dark:text-text-dark hover:text-primary dark:hover:text-primary-light rounded-md hover:bg-surface-alt dark:hover:bg-surface-dark-alt"
              >
                <span className="mr-2">{tool.icon}</span>
                {tool.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
