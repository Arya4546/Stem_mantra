import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | STEMmantra - STEM, Robotics & AI Education",
  description:
    "Read STEMmantra's Privacy Policy to understand how we collect, use, and protect your personal information when you use our STEM education services and website.",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="pt-32 pb-20 px-4">
          <div className="mx-auto px-4 md:px-8 lg:px-16">
            <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Privacy{" "}
              <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-sm text-gray-500 mb-10">
              Last updated: April 12, 2026
            </p>

            <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p>
                  STEMmantra (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), headquartered at C-104, 2nd Floor, Sector-10, Noida, Uttar Pradesh – 201301, India, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>www.stemmantra.com</strong>, use our STEM education services, or interact with us in any way.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">2.1 Personal Information</h3>
                <p>We may collect personally identifiable information that you voluntarily provide, including but not limited to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>Full name, email address, and phone number</li>
                  <li>School or organization name and designation</li>
                  <li>Postal address and city/state</li>
                  <li>Information submitted through our contact forms or demo request forms</li>
                  <li>Payment and billing information when purchasing our products or services</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-6">2.2 Automatically Collected Information</h3>
                <p>When you visit our website, we may automatically collect certain information, including:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>IP address, browser type, and operating system</li>
                  <li>Pages visited, time spent on pages, and referring URLs</li>
                  <li>Device information (screen size, device type)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <p>We use the collected information for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>To respond to your inquiries about our STEM, Robotics, and AI lab solutions</li>
                  <li>To process demo requests and schedule school consultations</li>
                  <li>To provide customer support and technical assistance</li>
                  <li>To send educational updates, program announcements, and newsletters (with your consent)</li>
                  <li>To improve our website, services, and user experience</li>
                  <li>To comply with legal obligations and protect our rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
                <p>
                  We do <strong>not</strong> sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li><strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating our website, conducting business, or servicing you (e.g., payment processors, email service providers)</li>
                  <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>Consent:</strong> With your explicit consent for any other purpose</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, and access controls. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
                <p>
                  Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device that help us analyze web traffic and customize our site. You can choose to accept or decline cookies through your browser settings. Disabling cookies may limit some features of the website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Links</h2>
                <p>
                  Our website may contain links to third-party websites (e.g., social media platforms, educational resources). We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children&apos;s Privacy</h2>
                <p>
                  Our services are primarily directed toward educational institutions (schools, colleges) and their administrators. We do not knowingly collect personal information directly from children under 13 years of age. If we become aware that we have collected personal data from a child without parental consent, we will take steps to delete that information promptly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Your Rights</h2>
                <p>Depending on your jurisdiction, you may have the following rights:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>Right to access and obtain a copy of your personal data</li>
                  <li>Right to rectification of inaccurate or incomplete data</li>
                  <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
                  <li>Right to restrict or object to processing</li>
                  <li>Right to data portability</li>
                  <li>Right to withdraw consent at any time</li>
                </ul>
                <p className="mt-3">To exercise any of these rights, please contact us at <a href="mailto:sales@stemmantra.com" className="text-orange-600 font-semibold hover:underline">sales@stemmantra.com</a>.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
                <p>
                  We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically to stay informed about how we protect your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
                <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
                <div className="bg-gray-50 rounded-xl p-6 mt-4 border border-gray-100">
                  <p><strong>STEMmantra</strong></p>
                  <p>C-104, 2nd Floor, Sector-10, Noida, UP – 201301</p>
                  <p>Email: <a href="mailto:sales@stemmantra.com" className="text-orange-600 font-semibold hover:underline">sales@stemmantra.com</a></p>
                  <p>Phone: <a href="tel:+916356631515" className="text-orange-600 font-semibold hover:underline">+91-6356631515</a></p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
