import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | STEMmantra - STEM, Robotics & AI Education",
  description:
    "Review STEMmantra's Terms of Service governing the use of our website, STEM education programs, lab setup services, teacher training, and related offerings.",
  robots: { index: true, follow: true },
};

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="pt-32 pb-20 px-4">
          <div className="mx-auto px-4 md:px-8 lg:px-16">
            <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold mb-4">
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Terms of{" "}
              <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            <p className="text-sm text-gray-500 mb-10">
              Last updated: April 12, 2026
            </p>

            <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the STEMmantra website (<strong>www.stemmantra.com</strong>) and our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website or services. These terms apply to all visitors, users, schools, educators, and institutions who access or use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Services</h2>
                <p>STEMmantra provides the following education technology services:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li><strong>Lab Setup & Installation:</strong> Turnkey solutions for Robotics (STEAMVERSE), STEM/STEAM (INNOVERSE), AI & Coding, and Atal Tinkering Labs (ATL) in K-12 schools</li>
                  <li><strong>Curriculum & Content:</strong> NEP 2020 & NCF 2023 aligned curriculum, lesson plans, student workbooks, and digital learning materials</li>
                  <li><strong>Teacher Training:</strong> Comprehensive educator training and certification programs</li>
                  <li><strong>Equipment & Kits:</strong> Supply of robotics kits, electronics components, 3D printers, micro-controllers, and related lab equipment</li>
                  <li><strong>Ongoing Support:</strong> Year-round technical support, maintenance, and lab management assistance</li>
                  <li><strong>Competition Preparation:</strong> Mentorship and training for national and international STEM competitions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Obligations</h2>
                <p>When using our website and services, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>Provide accurate and complete information in all forms and communications</li>
                  <li>Use our services only for lawful educational purposes</li>
                  <li>Not reproduce, distribute, or create derivative works from our proprietary curriculum, course materials, or website content without prior written permission</li>
                  <li>Not attempt to gain unauthorized access to our systems or other users&apos; accounts</li>
                  <li>Not upload or transmit viruses, malware, or any harmful code</li>
                  <li>Comply with all applicable local, state, and national laws and regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property</h2>
                <p>
                  All content on the STEMmantra website — including but not limited to text, graphics, logos, images, videos, curriculum documents, software, and brand names — is the property of STEMmantra or its licensors and is protected by Indian and international copyright, trademark, and intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our content or intellectual property without explicit written consent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Service Agreements & Contracts</h2>
                <p>
                  Lab setup, equipment supply, curriculum licensing, and training services are governed by individual service agreements or contracts executed between STEMmantra and the partner school/institution. These agreements may include specific terms related to pricing, delivery timelines, payment schedules, warranty periods, and scope of work. In case of any conflict between these Terms of Service and a signed service agreement, the service agreement shall prevail.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payment Terms</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All prices are quoted in Indian Rupees (INR) unless otherwise specified</li>
                  <li>Applicable taxes (GST) will be charged as per prevailing government regulations</li>
                  <li>Payment terms are as specified in the respective service agreement or purchase order</li>
                  <li>Late payments may attract interest charges as specified in the agreement</li>
                  <li>STEMmantra reserves the right to suspend services in case of non-payment beyond the agreed credit period</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Warranties & Disclaimers</h2>
                <p>
                  STEMmantra strives to provide high-quality products and services. Equipment warranties are as specified in individual product documentation and service agreements. Our website and its content are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by applicable law, STEMmantra, its directors, employees, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, goodwill, or other intangible losses resulting from your use or inability to use our services or website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
                <p>
                  We may terminate or suspend your access to our website and services at any time, without prior notice, for conduct that we believe violates these Terms of Service, is harmful to other users, or is otherwise objectionable. Upon termination, your right to use our services will immediately cease.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law & Jurisdiction</h2>
                <p>
                  These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in <strong>Noida / Gautam Buddh Nagar, Uttar Pradesh, India</strong>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to These Terms</h2>
                <p>
                  STEMmantra reserves the right to modify these Terms of Service at any time. Updated terms will be posted on this page with a revised &quot;Last updated&quot; date. Your continued use of our website and services after any changes constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
                <p>For any questions regarding these Terms of Service, please reach out to us:</p>
                <div className="bg-gray-50 rounded-xl p-6 mt-4 border border-gray-100">
                  <p><strong>STEMmantra</strong></p>
                  <p>C-104, 2nd Floor, Sector-10, Noida, UP – 201301</p>
                  <p>Email: <a href="mailto:sales@stemmantra.com" className="text-orange-600 font-semibold hover:underline">sales@stemmantra.com</a></p>
                  <p>Phone: <a href="tel:+916356631515" className="text-orange-600 font-semibold hover:underline">+91-6356631515</a> | <a href="tel:01203101774" className="text-orange-600 font-semibold hover:underline">0120-3101774</a></p>
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
