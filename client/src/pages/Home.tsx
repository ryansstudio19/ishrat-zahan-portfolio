import { motion } from "framer-motion";
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Award, 
  FileCheck2, 
  Scale, 
  Wheat, 
  Building2, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import AtmosphereBackground from "@/components/AtmosphereBackground";
import Navigation from "@/components/Navigation";
import TiltCard from "@/components/TiltCard";
import { Link } from "wouter";

const coreMandates = [
  {
    num: "01",
    title: "Statutory Food Quality Assurance",
    icon: ShieldCheck,
    desc: "Enforcing statutory chemical, moisture, and organoleptic testing protocols across grain depots to guarantee uncompromised public safety.",
    tag: "ISO & National Standards"
  },
  {
    num: "02",
    title: "Strategic Grain Reserves & Logistics",
    icon: Wheat,
    desc: "Overseeing procurement, multi-silo buffer warehousing, and transparent Open Market Sale (OMS) distribution to secure regional food stability.",
    tag: "Supply Chain Resilience"
  },
  {
    num: "03",
    title: "Regulatory Oversight & Enforcement",
    icon: Scale,
    desc: "Conducting anti-adulteration drives, legal inspections under the Pure Food regulations, and regular depot audits for statutory compliance.",
    tag: "Statutory Compliance"
  },
  {
    num: "04",
    title: "Transparent Public Governance",
    icon: Building2,
    desc: "Digitizing inventory reconciliation, strengthening farmer procurement systems, and upholding public accountability at every administrative tier.",
    tag: "Good Governance"
  }
];

const impactStats = [
  { value: "15+", label: "Years Statutory Service", sub: "Government of Bangladesh" },
  { value: "10K+", label: "Metric Tons Audited", sub: "Strategic grain reserves" },
  { value: "H+", label: "German ANABIN (KMK)", sub: "Full European Master's equiv." },
  { value: "USDA & FAO", label: "Global Credentials", sub: "HACCP & Inspectional certified" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#121615] relative overflow-x-hidden flex flex-col font-sans selection:bg-[#121615] selection:text-[#fbfaf7]">
      <Navigation />
      
      {/* Dynamic 3D constellation atmosphere canvas */}
      <AtmosphereBackground density="normal" className="fixed inset-0 z-0 pointer-events-none opacity-60" />

      {/* Decorative architectural grid lines */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#e8e2d7_1px,transparent_1px),linear-gradient(to_bottom,#e8e2d7_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* HERO SECTION */}
      <main className="relative z-10 flex-1 pt-28 sm:pt-32 pb-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto w-full">
        
        {/* Top Bureaucratic Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-[#e5ded4]/80 text-[10px] uppercase tracking-[0.22em] text-[#6b736e] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1d4a38] animate-pulse" />
            <span className="text-[#121615] font-semibold">Active Public Service</span>
            <span className="text-[#c5a059] font-bold">·</span>
            <span>BCS (Food) Cadre</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span>Dossier № 2026-IZ-GOV</span>
            <span className="text-[#c5a059]">|</span>
            <span>Meherpur Jurisdiction, Bangladesh</span>
          </div>
        </div>

        {/* Asymmetrical Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Authoritative Editorial Presentation */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 text-[10px] uppercase tracking-[0.2em] font-bold text-[#1d4a38] bg-[#f0ede6] border border-[#ded7cb] rounded-full shadow-xs"
            >
              <ShieldCheck size={13} className="text-[#1d4a38]" />
              <span>Senior Public Administrator · Food Safety Compliance Expert · Quality Assurance Manager</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-serif leading-[1.04] mb-6 tracking-tight text-[#121615]"
            >
              Mst. Ishrat Zahan
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-[#4a524e] mb-8 max-w-xl leading-relaxed font-light"
            >
              Distinguished Senior Public Administrator and Food Safety Compliance Expert with 15+ years of leadership in the Government of Bangladesh. Currently Upazila Controller of Food (UCF), Ministry of Food.
            </motion.p>
            
            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link 
                href="/career"
                className="group flex items-center justify-center gap-3 bg-[#121615] text-[#faf8f5] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.18em] rounded-full hover:bg-[#1d4a38] transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Examine Career Record</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link 
                href="/awards-certificates"
                className="group flex items-center justify-center gap-2.5 bg-white/90 backdrop-blur-sm text-[#121615] border border-[#d8d1c3] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.18em] rounded-full hover:bg-white hover:border-[#121615] transition-all duration-300 shadow-xs hover:-translate-y-0.5"
              >
                <FileCheck2 size={14} className="text-[#1d4a38]" />
                <span>Verified Credentials &amp; Audit</span>
              </Link>
            </motion.div>

            {/* Quote Pill / Executive Endorsement */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-10 p-4 border-l-2 border-[#1d4a38] bg-white/70 backdrop-blur-sm rounded-r-xl max-w-lg shadow-xs"
            >
              <p className="text-xs italic text-[#555d58] font-serif leading-relaxed">
                "Public food administration is not mere logistics; it is an oath of national health, market equilibrium, and ethical governance."
              </p>
              <p className="text-[9px] uppercase tracking-widest text-[#7c8580] mt-2 font-mono">
                — Official Directive · Directorate General of Food
              </p>
            </motion.div>
          </div>

          {/* Right Column: Ultra-Luxurious Archival Portrait Presentation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end relative mt-6 lg:mt-0"
          >
            {/* Ambient Radial Depth Light */}
            <div className="absolute inset-0 bg-radial from-[#ebd8b3]/40 via-transparent to-transparent blur-[70px] pointer-events-none transform translate-y-4" />
            
            {/* The 3D Archival Dossier Frame */}
            <TiltCard maxTilt={9} liftDepth={24} className="w-full max-w-md relative z-10 bg-[#fdfcf9] p-4 sm:p-5 border border-[#dfd7ca] shadow-2xl shadow-black/12 rounded-xl transition-shadow duration-500">
              {/* Outer Registry Crosshairs */}
              <span className="absolute top-2 left-2 text-[9px] font-mono text-[#a8a194] pointer-events-none select-none">+</span>
              <span className="absolute top-2 right-2 text-[9px] font-mono text-[#a8a194] pointer-events-none select-none">+</span>
              <span className="absolute bottom-2 left-2 text-[9px] font-mono text-[#a8a194] pointer-events-none select-none">+</span>
              <span className="absolute bottom-2 right-2 text-[9px] font-mono text-[#a8a194] pointer-events-none select-none">+</span>

              {/* Internal Framing Mat with subtle gold hairline */}
              <div className="p-1 rounded-lg border border-[#c5a059]/40 bg-gradient-to-b from-[#f9f6ef] to-[#f2ece0] shadow-inner">
                <div className="w-full aspect-[3/4] bg-[#eae4d8] rounded-md overflow-hidden relative group">
                  <img 
                    src="/ishrat-jahan-portrait.jpg" 
                    alt="Mst. Ishrat Zahan — Upazila Controller of Food" 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
                  />
                  
                  {/* Atmospheric Cinematic Lighting Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121615]/75 via-transparent to-[#121615]/20 opacity-80 group-hover:opacity-60 transition-opacity pointer-events-none" />

                  {/* Top Seal Stamp */}
                  <div className="absolute top-3 left-3 bg-[#121615]/85 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-[8px] uppercase tracking-[0.2em] font-bold text-white shadow-lg pointer-events-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] inline-block animate-pulse" />
                    Verified Official Dossier
                  </div>

                  {/* Top Right Serial */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded text-[8px] font-mono font-bold text-[#121615] border border-white/40 shadow-xs pointer-events-none">
                    BCS № 2026
                  </div>

                  {/* Bottom Geographic Chip */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-white/95 backdrop-blur-md border border-[#dfd7ca] p-2.5 rounded-lg shadow-lg pointer-events-none transform group-hover:-translate-y-1 transition-transform duration-500">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#1d4a38] text-white flex items-center justify-center text-[10px]">
                        <MapPin size={12} />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-[#121615]">Gangni Upazila</span>
                        <span className="text-[8px] text-[#6b736e] font-mono">Meherpur Division, BD</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-[#1d4a38] bg-[#eef7f2] px-2 py-0.5 rounded">
                      23.777° N
                    </span>
                  </div>
                </div>
              </div>

              {/* Dossier Lower Metadata Strip */}
              <div className="mt-3.5 pt-3 border-t border-[#ebe4d8] flex items-center justify-between text-[9px] uppercase tracking-widest text-[#666] font-mono">
                <span className="text-[#121615] font-bold flex items-center gap-1">
                  <Award size={11} className="text-[#c5a059]" /> Ministry of Food
                </span>
                <span className="text-[#7c8580]">Government of Bangladesh</span>
              </div>
            </TiltCard>
          </motion.div>
          
        </div>

        {/* METRICS STRIP: High-Impact Performance Ledger */}
        <motion.section 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mt-20 sm:mt-28 bg-white border border-[#e5ded4] rounded-2xl p-6 sm:p-10 shadow-xl shadow-black/[0.03]"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-[#eee7dc]">
            {impactStats.map((stat, idx) => (
              <div key={stat.label} className={`flex flex-col ${idx > 1 ? 'pt-4 sm:pt-0' : ''} ${idx !== 0 ? 'lg:pl-8' : ''}`}>
                <span className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#121615] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[11px] sm:text-xs uppercase tracking-wider font-bold text-[#1d4a38] mt-2">
                  {stat.label}
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#717a75] font-light mt-0.5">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CORE STATUTORY MANDATES SECTION */}
        <section className="mt-24 sm:mt-32">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-[#e5ded4]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#1d4a38] mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1d4a38]" />
                Institutional Core Competencies
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#121615] tracking-tight">
                Statutory Mandates &amp; Operations
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#666] max-w-md mt-4 sm:mt-0 font-light">
              Executive leadership grounded in regulatory enforcement, laboratory quality standards, and equitable grain distribution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {coreMandates.map((mandate, index) => {
              const Icon = mandate.icon;
              return (
                <motion.div
                  key={mandate.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-[#fdfcf9] border border-[#e5ded4] hover:border-[#121615] rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-11 h-11 rounded-lg bg-[#f0ede6] border border-[#ded7cb] flex items-center justify-center text-[#1d4a38] group-hover:bg-[#121615] group-hover:text-white transition-colors">
                        <Icon size={20} />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#a09a8f] group-hover:text-[#121615] transition-colors">
                        {mandate.num}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-[#121615] mb-3 group-hover:text-[#1d4a38] transition-colors">
                      {mandate.title}
                    </h3>
                    <p className="text-sm text-[#555d58] leading-relaxed font-light mb-6">
                      {mandate.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#ede7dc] flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold text-[#7c8580]">
                    <span>{mandate.tag}</span>
                    <span className="text-[#121615] group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CURATED DOSSIER QUICK-ACCESS */}
        <section className="mt-24 sm:mt-32 p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#121615] to-[#1c2422] text-[#faf8f5] shadow-2xl relative overflow-hidden">
          {/* Subtle gold line accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <span className="text-[10px] uppercase tracking-[0.24em] font-mono text-[#c5a059] mb-3 block">
                Official Verification Archive
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight mb-4">
                Review Certified Service History &amp; Credentials
              </h2>
              <p className="text-sm text-[#b2beb8] max-w-2xl font-light leading-relaxed">
                All career appointments, service gazettes, and academic credentials from Islamic University (IU) Kushtia—with official German ANABIN (KMK) 'H+' classification, USDA, and UN FAO training—are auditable online.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                href="/career"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#121615] px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#f0ede6] transition-all shadow-md"
              >
                <span>Career Timeline</span>
                <ChevronRight size={14} />
              </Link>
              <Link
                href="/awards-certificates"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
              >
                <span>Document Inspector</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* LUXURY EDITORIAL FOOTER */}
      <footer className="relative z-10 w-full border-t border-[#e5ded4] bg-[#f5f2eb] py-12 px-5 sm:px-8 md:px-12 text-[#6b736e]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#121615] text-white flex items-center justify-center font-serif text-xs font-semibold">
              IZ
            </span>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#121615]">
                Mst. Ishrat Zahan
              </span>
              <span className="text-[10px] font-mono text-[#8a928d]">
                BCS (Food) · Upazila Controller of Food, Gangni
              </span>
            </div>
          </div>

          <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-center">
            © {new Date().getFullYear()} Government of the People's Republic of Bangladesh
          </div>

          <div className="flex items-center gap-5 text-xs font-bold uppercase tracking-widest text-[#121615]">
            <Link href="/about" className="hover:text-[#1d4a38] transition-colors">About</Link>
            <Link href="/expertise" className="hover:text-[#1d4a38] transition-colors">Expertise</Link>
            <Link href="/contact" className="hover:text-[#1d4a38] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
