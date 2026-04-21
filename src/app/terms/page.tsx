import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — PicTools.one",
  description:
    "Terms of service for PicTools.one. Free online image tools with 100% client-side processing.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-text dark:text-text-dark">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-text-light dark:text-text-dark-muted">Last updated: April 2026</p>

      <div className="mt-6 space-y-6 text-text-light dark:text-text-dark-muted leading-relaxed">
        <h2 className="text-xl font-bold text-text dark:text-text-dark">1. Acceptance of Terms</h2>
        <p>
          By accessing and using PicTools.one (&quot;the Service&quot;), you agree to be bound by these Terms of Service.
          If you do not agree to these terms, please do not use the Service.
        </p>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">2. Description of Service</h2>
        <p>
          PicTools.one provides free online image processing tools including image resizing, compression, cropping,
          format conversion, bulk resizing, and Base64 encoding/decoding. All processing occurs entirely within
          your web browser. No files are uploaded to our servers.
        </p>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">3. Use of Service</h2>
        <p>You agree to use the Service only for lawful purposes. You may not:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Use the Service to process illegal or harmful content</li>
          <li>Attempt to interfere with or disrupt the Service</li>
          <li>Use automated systems to access the Service in a manner that exceeds reasonable use</li>
          <li>Reverse engineer or attempt to extract the source code of the Service</li>
        </ul>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">4. Intellectual Property</h2>
        <p>
          You retain all rights to the images and files you process using our tools. We do not claim any
          ownership or rights over your content. The Service itself, including its design, code, and content,
          is protected by copyright and other intellectual property laws.
        </p>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">5. Disclaimer of Warranties</h2>
        <p>
          The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or
          implied. We do not guarantee that the Service will be uninterrupted, error-free, or that the results
          obtained from using the Service will be accurate or reliable.
        </p>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">6. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, PicTools.one shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages, including but not limited to loss of data, loss of profits,
          or business interruption, arising from your use of the Service.
        </p>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">7. Advertising</h2>
        <p>
          The Service is supported by advertising. By using the Service, you agree to the display of advertisements.
          We strive to ensure ads are non-intrusive and do not interfere with the functionality of our tools.
        </p>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">8. Modifications</h2>
        <p>
          We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
          We may also update these Terms of Service from time to time. Continued use of the Service after
          changes constitutes acceptance of the modified terms.
        </p>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">9. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with applicable laws, without regard
          to conflict of law principles.
        </p>

        <h2 className="text-xl font-bold text-text dark:text-text-dark">10. Contact</h2>
        <p>
          For questions about these Terms of Service, please contact us at{" "}
          <a href="mailto:hello@pictools.one" className="text-primary hover:text-primary-dark underline">hello@pictools.one</a>.
        </p>
      </div>
    </div>
  );
}
