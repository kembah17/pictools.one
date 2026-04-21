import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — PicTools.one",
  description:
    "Privacy policy for PicTools.one. All image processing happens 100% in your browser. No files are uploaded to any server.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-text-light dark:text-text-dark-muted">Last updated: April 2026</p>

      <div className="mt-6 space-y-6 text-text-light dark:text-text-dark-muted leading-relaxed">
        <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-xl p-5">
          <p className="font-semibold text-text dark:text-text-dark">
            🔒 TL;DR: Your images never leave your device. All processing happens 100% in your browser.
            We do not upload, store, or have access to any files you use with our tools.
          </p>
        </div>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">1. Client-Side Processing</h2>
        <p>
          PicTools.one is designed with privacy as a core principle. All image processing — including resizing,
          compressing, cropping, converting, and encoding — happens entirely within your web browser using
          client-side JavaScript and the HTML5 Canvas API. Your files are never transmitted to any server.
        </p>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">2. Information We Do Not Collect</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>We do not collect, store, or process any images or files you use with our tools</li>
          <li>We do not collect personal information such as names, email addresses, or phone numbers</li>
          <li>We do not require account creation or registration</li>
          <li>We do not use cookies for tracking purposes</li>
        </ul>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">3. Analytics</h2>
        <p>
          We may use privacy-respecting analytics services (such as Google Analytics) to understand how visitors
          use our site. This data is aggregated and anonymized. It includes information such as page views,
          browser type, device type, and approximate geographic location. No personal data or file content is
          included in analytics.
        </p>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">4. Advertising</h2>
        <p>
          We display advertisements through third-party ad networks to support the free operation of our tools.
          These ad networks may use cookies and similar technologies to serve relevant ads. You can manage your
          ad preferences through your browser settings or through the ad network&apos;s opt-out mechanisms.
        </p>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">5. Third-Party Links</h2>
        <p>
          Our site may contain links to third-party websites. We are not responsible for the privacy practices
          of these external sites. We encourage you to review their privacy policies.
        </p>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">6. Data Security</h2>
        <p>
          Since all file processing occurs locally in your browser, your data security is inherently protected.
          Files are processed in memory and are not persisted beyond your browser session. When you close the
          tab or navigate away, all processed data is automatically cleared from memory.
        </p>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">7. Children&apos;s Privacy</h2>
        <p>
          Our tools are available to users of all ages. We do not knowingly collect personal information from
          children under 13. Since we do not collect personal information from any users, this is inherently
          compliant with COPPA and similar regulations.
        </p>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">8. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Any changes will be posted on this page with
          an updated revision date. Your continued use of the site after changes constitutes acceptance of
          the updated policy.
        </p>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">9. Contact</h2>
        <p>
          If you have questions about this privacy policy, please contact us at{" "}
          <a href="mailto:hello@pictools.one" className="text-primary hover:text-primary-dark underline">hello@pictools.one</a>.
        </p>
      </div>
    </div>
  );
}
