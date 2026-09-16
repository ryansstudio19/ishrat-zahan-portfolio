import { Check, Languages, Sparkles, ShieldCheck, Microscope, Factory, Truck, Flame, FileCheck, Award, Globe, BookOpen } from "lucide-react";
import SubpageLayout from "@/components/SubpageLayout";
import { motion } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import { Link } from "wouter";

const coreCompetencies = [
  {
    title: "Public Administration & Governance",
    subtitle: "15+ Years Senior Civil Service",
    desc: "Directing statutory food operations, public grain distribution registries, ministerial gazettes, and inter-agency state coordination.",
    icon: ShieldCheck,
    tag: "Core Mandate"
  },
  {
    title: "Supply Chain & Reserve Logistics",
    subtitle: "Macro-Level Grain Depots (LSD)",
    desc: "Procurement, strategic multi-metric-ton grain inventory, safe storage schedules, and regional dispatch stability.",
    icon: Truck,
    tag: "Logistics"
  },
  {
    title: "Food Microbiology & Lab Audits",
    subtitle: "MSc Scientific Foundation",
    desc: "Microbiological verification, contamination vectors, moisture content testing, and scientific laboratory reporting.",
    icon: Microscope,
    tag: "Science"
  },
  {
    title: "HACCP Regulatory Enforcement",
    subtitle: "USDA FAS Certified Practices",
    desc: "Hazard Analysis Critical Control Points inspection, preventive controls, critical limits verification, and audit trail generation.",
    icon: FileCheck,
    tag: "International Standards"
  },
  {
    title: "Chemical Preservation Oversight",
    subtitle: "Pest Management & Vector Control",
    desc: "Statutory fumigation protocols, safe chemical application regimens, residual limits compliance, and long-term grain preservation.",
    icon: Flame,
    tag: "Compliance"
  },
  {
    title: "Commercial Milling Plant Audits",
    subtitle: "Industrial Processing Integrity",
    desc: "Structural hygienic audits across automatic and semi-automatic rice/grain mills under the Food Safety Act 2013.",
    icon: Factory,
    tag: "Industrial Quality"
  },
];

export default function Expertise() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <SubpageLayout 
      eyebrow="03 / Core Competencies & Linguistic Capabilities" 
      title={<>Scientific Rigor &amp;<br /><em>Administrative Authority.</em></>} 
      intro="Technical expertise bridging the gap between state-level policy execution, statutory enforcement, and international quality assurance frameworks." 
    >
      <section className="py-12 md:py-20">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Core Competencies Grid */}
          <motion.div variants={fadeUp} className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#e5ded4]">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1d4a38] font-mono">
                Key Fields of Expertise
              </p>
              <span className="text-xs text-[#717a75] font-mono">6 Core Pillars</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coreCompetencies.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    variants={fadeUp}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    key={item.title} 
                    className="bg-white border border-[#e5ded4] p-5 rounded-xl hover:border-[#121615] hover:shadow-lg transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-[#1d4a38] bg-[#1d4a38]/10 px-2 py-0.5 rounded-full">
                          {item.tag}
                        </span>
                        <span className="text-[10px] text-[#717a75] font-mono">
                          0{index + 1}
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-[#f5f2eb] flex items-center justify-center text-[#1d4a38] shrink-0 mt-0.5 group-hover:bg-[#121615] group-hover:text-white transition-colors">
                          <Icon size={16} />
                        </div>
                        <div>
                          <strong className="text-sm font-serif text-[#121615] block leading-snug">{item.title}</strong>
                          <span className="text-[11px] text-[#717a75] block mt-0.5">{item.subtitle}</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#4a524e] leading-relaxed font-light mt-2">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#f5f2eb] flex items-center justify-between text-[11px] text-[#717a75]">
                      <span>Verified Standard</span>
                      <Check size={14} className="text-[#1d4a38]" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Recruiter / Immigration Board Evaluation Summary */}
            <div className="p-6 bg-[#fbf9f6] border border-[#e5ded4] rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-[#1d4a38] text-[10px] uppercase tracking-[0.2em] font-mono font-bold">
                <Award size={14} />
                <span>International Recruiter &amp; Immigration Alignment</span>
              </div>
              <h4 className="font-serif text-lg text-[#121615]">
                Cross-Border Qualification &amp; Recognition
              </h4>
              <p className="text-xs text-[#4a524e] leading-relaxed font-light">
                Her academic MSc degree holds verified <strong>'H+' status</strong> in Germany’s KMK/ANABIN registry, qualifying directly for European academic equivalence and standard labor market entry paths including the <strong>EU Blue Card (Germany)</strong> and <strong>Critical Skills Employment Permit (Ireland)</strong>.
              </p>
            </div>
          </motion.div>

          {/* Languages & International Positioning Column */}
          <motion.aside variants={fadeUp} className="lg:col-span-5 space-y-6">
            <div className="bg-[#121615] text-white p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-xl">
              <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
                <Languages size={180} />
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 border border-white/20 bg-white/5 rounded-xl flex items-center justify-center">
                    <Languages size={20} className="text-[#c5a059]" />
                  </div>
                  <span className="text-[9px] uppercase tracking-widest font-mono text-[#a0aba5]">
                    Linguistic Capabilities
                  </span>
                </div>
                
                <div>
                  <h3 className="font-serif text-2xl text-white">Multilingual Command</h3>
                  <p className="text-xs text-[#a0aba5] font-light mt-1">
                    Equipped for high-level state governance, international inspection audits, and European institutional transition.
                  </p>
                </div>
                
                <div className="space-y-4 pt-2">
                  {/* Bengali */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-base font-serif text-white">Bengali (Bangla)</strong>
                      <span className="text-[10px] bg-[#1d4a38] text-[#34d399] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                        Native / Mother Tongue
                      </span>
                    </div>
                    <p className="text-xs text-[#b2beb8] font-light">
                      Fluent in high-level public administration drafting, statutory legal frameworks, and executive governance.
                    </p>
                  </div>

                  {/* English */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-base font-serif text-white">English</strong>
                      <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                        Full Professional &amp; Academic
                      </span>
                    </div>
                    <p className="text-xs text-[#b2beb8] font-light">
                      Capable of directing international compliance audits, technical documentation, and global inter-agency reporting.
                    </p>
                  </div>
                  
                  {/* German */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-base font-serif text-white">German (Deutsch)</strong>
                      <span className="text-[10px] bg-[#c5a059]/20 text-[#c5a059] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                        Active Mastery Track
                      </span>
                    </div>
                    <p className="text-xs text-[#b2beb8] font-light">
                      Actively mastering a structured professional fluency track targeting immediate European regulatory &amp; enterprise positioning.
                    </p>
                  </div>
                </div>
                
                <div className="pt-3 flex items-start gap-2.5 text-xs text-[#a0aba5] border-t border-white/10 font-light">
                  <Sparkles size={14} className="text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Bridging local public-sector administrative mastery with global scientific compliance standards.</span>
                </div>
              </div>
            </div>

            {/* Direct Link to Verified Documentation */}
            <div className="p-6 bg-white border border-[#e5ded4] rounded-2xl flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#121615] block font-serif">Official Credentials Vault</span>
                <span className="text-[11px] text-[#717a75]">Inspect ANABIN status, USDA, &amp; FAO certificates.</span>
              </div>
              <Link href="/awards-certificates" className="px-4 py-2 bg-[#121615] text-white text-[10px] uppercase tracking-wider font-bold rounded-full hover:bg-[#1d4a38] transition-colors shrink-0">
                View Vault
              </Link>
            </div>
          </motion.aside>
        </motion.div>
      </section>
    </SubpageLayout>
  );
}

