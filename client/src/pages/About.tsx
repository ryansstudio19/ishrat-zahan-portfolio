import SubpageLayout from "@/components/SubpageLayout";
import { ArrowUpRight, MapPin, Award, ShieldCheck, GraduationCap, Globe, CheckCircle2, Building, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import { Link } from "wouter";

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  return (
    <SubpageLayout 
      eyebrow="Official Profile & Dossier" 
      title={<>Strategic Leader in Public Administration <br /><span className="text-[#666] italic">&amp; Global Food Safety Compliance</span></>} 
      intro="Senior Public Administrator, Food Safety Compliance Expert, and Quality Assurance Manager with 15+ years of senior-tier leadership in the Government of Bangladesh." 
    >
      <section className="py-12 md:py-20">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Portrait & Official Credentials Column with 3D Tilt */}
          <motion.div variants={fadeUp} className="lg:col-span-5 space-y-8">
            <TiltCard maxTilt={8} liftDepth={20} className="bg-white border border-[#e5ded4] p-4 sm:p-5 w-full shadow-2xl shadow-black/10 rounded-2xl">
              <div className="w-full aspect-[3/4] bg-[#f5f2eb] rounded-xl overflow-hidden relative group">
                <img 
                  src="/ishrat-jahan-portrait.jpg" 
                  alt="Mst. Ishrat Zahan - Senior Public Administrator & Food Safety Compliance Expert" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-95 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold text-white shadow-sm pointer-events-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                  First-Class Senior Official
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-[#dfd7ca] px-3.5 py-2 rounded-lg text-[10px] uppercase tracking-widest font-bold shadow-sm pointer-events-none text-[#121615] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-[#1d4a38]" />
                    Gangni, Meherpur
                  </span>
                  <span className="font-mono text-[9px] text-[#717a75]">BCS (Food)</span>
                </div>
              </div>

              {/* Dossier Quick Keypoints */}
              <div className="mt-4 pt-3 border-t border-[#eee7dc] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#717a75] font-mono text-[10px] uppercase">Service Length</span>
                  <span className="font-bold text-[#121615]">15+ Years Dedicated Service</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#717a75] font-mono text-[10px] uppercase">Current Role</span>
                  <span className="font-bold text-[#121615]">Upazila Controller of Food (UCF)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#717a75] font-mono text-[10px] uppercase">ANABIN Status</span>
                  <span className="font-bold text-[#1d4a38] flex items-center gap-1">
                    <CheckCircle2 size={12} /> H+ European Equivalence
                  </span>
                </div>
              </div>
            </TiltCard>

            {/* Quick Accreditation Box */}
            <div className="p-6 bg-[#fcfbfa] border border-[#e8e2d8] rounded-2xl space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1d4a38] flex items-center gap-1.5">
                <Award size={14} />
                Global Accreditations &amp; Standards
              </p>
              <div className="space-y-3 text-xs text-[#4a524e]">
                <div className="p-3 bg-white border border-[#eee7dc] rounded-xl">
                  <strong className="text-[#121615] block font-semibold">German ANABIN (KMK) 'H+' Classification</strong>
                  <span className="text-[11px] text-[#717a75]">Official full structural equivalence to a German/European Master's Degree.</span>
                </div>
                <div className="p-3 bg-white border border-[#eee7dc] rounded-xl">
                  <strong className="text-[#121615] block font-semibold">USDA Foreign Agricultural Service</strong>
                  <span className="text-[11px] text-[#717a75]">Professional Certificate in Food Safety, HACCP, and Inspectional Practices.</span>
                </div>
                <div className="p-3 bg-white border border-[#eee7dc] rounded-xl">
                  <strong className="text-[#121615] block font-semibold">UN FAO Frameworks (IFS-B)</strong>
                  <span className="text-[11px] text-[#717a75]">Risk-based food inspection, institutional quality tracking, and hazard analysis.</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Detailed Executive Narrative Area */}
          <motion.div variants={fadeUp} className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#1d4a38] block mb-2 font-mono">
                Executive Biography &amp; Professional Statement
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#121615] leading-tight">
                Strategic Leader in Public Administration &amp; Global Food Safety Compliance
              </h2>
            </div>
            
            {/* The Official Text from Part 1 */}
            <div className="space-y-6 text-base sm:text-lg text-[#3a403d] leading-relaxed font-light">
              <p className="border-l-2 border-[#1d4a38] pl-5 italic text-[#262c29] bg-[#fbf9f6] py-3 rounded-r-lg">
                "Mst. Ishrat Zahan is a distinguished Senior Public Administrator and Food Safety Compliance Expert with over 15 years of impactful leadership within the Government of Bangladesh. Currently serving as the Upazila Controller of Food (UCF) under the Ministry of Food, she orchestrates macro-level public food supply chain logistics, enforces rigorous regulatory compliance, and oversees strict quality assurance frameworks for industrial milling and regional distribution infrastructures."
              </p>
              
              <p>
                With an advanced scientific foundation consisting of a <strong>Master of Science (MSc) in Applied Food and Nutrition Technology</strong>—officially verified with a premium <strong>'H+' status in the German ANABIN (KMK) database</strong>—her technical expertise bridges the gap between state-level policy execution and international quality control standards.
              </p>

              <p>
                Her operational capabilities are further augmented by elite global training credentials from the <strong>United States Department of Agriculture (USDA)</strong> and the <strong>United Nations Food and Agriculture Organization (FAO)</strong>. As a native Bengali administrator with global competencies, she is currently architecting her transition into international regulatory ecosystems, bringing world-class crisis mitigation, quality auditing, and food safety governance to foreign enterprise and public infrastructure networks.
              </p>
            </div>

            {/* Strategic Global Transition Roadmap (Part 2 Data) */}
            <div className="p-6 sm:p-8 bg-gradient-to-br from-[#121615] to-[#1c2422] text-[#fbfaf7] rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-[#c5a059] text-[10px] uppercase tracking-[0.22em] font-mono">
                <Globe size={14} />
                <span>Global Transition Roadmap · Late 2027 / Early 2028</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-white">
                European Enterprise &amp; Regulatory Positioning
              </h3>
              <p className="text-sm text-[#b2beb8] leading-relaxed font-light">
                Transitioning 15+ years of senior administrative rigor and certified HACCP compliance into European quality assurance and regulatory environments:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
                    Germany (EU Blue Card)
                  </div>
                  <p className="text-[11px] text-[#a0aba5] leading-normal font-light">
                    Leveraging ANABIN H+ verified scientific qualification alongside active German professional fluency to integrate into German food technology and statutory regulatory bodies.
                  </p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#34d399]" />
                    Ireland (Critical Skills Permit)
                  </div>
                  <p className="text-[11px] text-[#a0aba5] leading-normal font-light">
                    Targeting Ireland’s globally renowned agri-food safety and biopharma quality auditing sectors through full professional English proficiency.
                  </p>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[#93a099] border-t border-white/10 flex items-center gap-2">
                <Sparkles size={13} className="text-[#c5a059] shrink-0" />
                <span>Ecosystem synergy synced with family academic advancement in Edexcel A-Levels computing and science disciplines.</span>
              </div>
            </div>

            {/* Direct Official Contact Channels */}
            <div className="pt-6 border-t border-[#e5ded4] flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest font-bold text-[#717a75] mb-2 font-mono">Official Email</p>
                <a href="mailto:ishratbipasha25@gmail.com" className="text-[#121615] font-serif text-lg hover:text-[#1d4a38] transition-colors block">
                  ishratbipasha25@gmail.com
                </a>
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest font-bold text-[#717a75] mb-2 font-mono">Government Contact</p>
                <p className="text-[#121615] font-serif text-lg">
                  <a href="tel:+8801712592469" className="hover:text-[#1d4a38] transition-colors">+880 1712-592469</a>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-[#121615] text-[#fbfaf7] text-[11px] uppercase tracking-[0.18em] font-bold rounded-full hover:bg-[#1d4a38] transition-all group shadow-md">
                <span>Official Correspondence</span> 
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link href="/awards-certificates" className="inline-flex items-center gap-2.5 px-7 py-4 bg-white border border-[#ded7cb] text-[#121615] text-[11px] uppercase tracking-[0.18em] font-bold rounded-full hover:border-[#121615] transition-all shadow-xs">
                <span>Inspect ANABIN H+ &amp; Credentials</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </SubpageLayout>
  );
}

