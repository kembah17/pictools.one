import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-extrabold text-primary">404</h1>
      <p className="mt-4 text-xl text-text dark:text-text-dark">Page not found</p>
      <p className="mt-2 text-text-light dark:text-text-dark-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block mt-8 px-6 py-3 bg-primary text-surface font-semibold rounded-lg hover:bg-primary-dark transition-colors"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
