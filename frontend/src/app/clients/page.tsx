import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animations/FadeIn";
import { siteApi } from "@/lib/site-api";
import ClientsContent from "./ClientsContent";

// Clients are managed in the admin panel.
export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const clients = await siteApi.clients();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-transparent pt-20">
        
        {/* PREMIUM HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 lg:py-32">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
          </div>

          <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10 text-center">
            <FadeIn className="max-w-4xl mx-auto mb-16">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                Trusted by Top Educational Institutions <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-teal-400">Across India</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                We take pride in partnering with the nation&apos;s most forward-thinking schools to deploy state-of-the-art STEM, Robotics, and AI laboratories.
              </p>
            </FadeIn>

            {/* INTEGRATED METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x divide-gray-700/50 text-center mx-auto max-w-5xl border-t border-gray-700/50 pt-12">
              {[
                { value: "300+", label: "Partner Schools" },
                { value: "1.5 Lakh+", label: "Students Impacted" },
                { value: "50+", label: "Cities Reached" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</h3>
                  <p className="text-gray-400 font-medium text-sm md:text-base uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ClientsContent clients={clients} />

        {/* FULL WIDTH CALL TO ACTION */}
        <section className="py-24 px-4 md:px-8 lg:px-16 bg-transparent">
          <div className="w-full mx-auto max-w-6xl">
             <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-12 md:p-20 text-center shadow-2xl">
               <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
               <div className="absolute right-0 bottom-0 w-96 h-96 bg-orange-500/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
               
               <div className="relative z-10 max-w-3xl mx-auto">
                 <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Join the Next Generation of Educational Leaders</h2>
                 <p className="text-xl text-gray-300 mb-10">
                   Transform your school&apos;s curriculum with our custom-built ATL, Robotics, and STEM laboratories today.
                 </p>
                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                   <a href="/contact" className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all">
                     Partner With Us
                   </a>
                   <a href="/programs" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-md transition-all border border-white/10">
                     Explore Programs
                   </a>
                 </div>
               </div>
             </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
