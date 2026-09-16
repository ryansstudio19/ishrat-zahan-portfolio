import { ArrowUpRight, BriefcaseBusiness, GraduationCap, MapPin, ShieldCheck, CheckCircle2, Globe, Building2, Layers, AlertCircle } from "lucide-react";
import SubpageLayout from "@/components/SubpageLayout";
import { motion } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import { Link } from "wouter";

const timeline = [
  { 
    period: "2023 – Present", 
    role: "Upazila Controller of Food (UCF) · First-Class Senior Official", 
    org: "Department of Food · Ministry of Food, Government of Bangladesh", 
    location: "Gangni, Meherpur, Bangladesh", 
    dutyPill: "Current Executive Appointment",
    summary: "Senior administrative head governing regional food security, public grain reserves, and multi-facility compliance across industrial grain processing operations.",
    duties: [
      "Directing regional public food grain procurement, storage, and strategic preservation logistics across LSD (Local Supply Depot) facilities.",
      "Enforcing national food safety legislation and executing structural quality control audits across commercial milling plants.",
      "Managing chemical preservation frameworks, fumigation protocols, and microbiological report compliance vectors.",
      "Heading administrative crisis mitigation workflows to secure regional food safety and macro distribution stability during market shocks."
    ],
    icon: BriefcaseBusiness 
  },
  { 
    period: "Previous Executive Postings", 
    role: "Upazila Controller of Food & Technical Food Inspector", 
    org: "Directorate General of Food · Khulna & Regional Divisions", 
    location: "Harinakundu, Jhenaidah & Regional Supply Depots, Bangladesh", 
    dutyPill: "Field Operations & Audit Enforcement",
    summary: "Led district-level statutory grain inspections, moisture verification audits, and computerized external audit management operations across municipal food reserves.",
    duties: [
      "Conducted physical quality audits, grading tests, and laboratory moisture analysis conforming to DG Food specifications.",
      "Integrated 'External Audit Management Software' (Khulna Division) to streamline procurement and inventory transparency.",
      "Received official commendation from Upazila Administration for impeccable public governance and election duty logistics (2024)."
    ],
    icon: Building2 
  },
  { 
    period: "Postgraduate Academic Foundation", 
    role: "Master of Science (MSc) · Applied Food and Nutrition Technology", 
    org: "Islamic University (IU), Kushtia · German ANABIN (KMK) 'H+' Verified", 
    location: "Kushtia, Bangladesh", 
    dutyPill: "Full European Master's Equivalence",
    summary: "Rigorous scientific education in nutritional biochemistry, food microbiology, industrial food preservation, and quality audit standards.",
    duties: [
      "Official 'H+' rating in German ANABIN (KMK) database, establishing full structural equivalence to a German/European university Master's degree.",
      "Specialized in food microbiology, chemical preservation techniques, post-harvest grain technology, and Hazard Analysis Critical Control Points (HACCP)."
    ],
    icon: GraduationCap 
  },
];

export default function Career() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <SubpageLayout 
      eyebrow="01 / Administrative Service Record" 
      title={<>15+ Years of Dedicated<br /><em>Senior-Tier Public Leadership.</em></>} 
      intro="Official record of public administration, supply chain logistics, statutory audits, and academic credentials across the Government of Bangladesh."
    >
      <section className="py-12 md:py-20">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Left Column - Core Competencies & Working Principles */}
          <motion.div variants={fadeUp} className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              <div className="bg-[#fbf9f6] border border-[#e8e2d8] p-6 rounded-2xl space-y-4">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1d4a38] font-mono">Service Overview</p>
                <h2 className="text-2xl font-serif text-[#121615] leading-snug">
                  Macro-level food security through auditable governance.
                </h2>
                <p className="text-xs text-[#525b56] leading-relaxed font-light">
                  Directing government grain reserves, enforcing food safety law, and conducting structural compliance audits across commercial milling plants.
                </p>
              </div>

              {/* 4 Pillars of Executive Duties */}
              <div className="bg-white border border-[#e8e2d8] p-6 rounded-2xl space-y-4 shadow-xs">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#717a75] font-mono">
                  Core Mandate Areas
                </p>
                <ul className="space-y-3 text-xs text-[#262c29]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-[#1d4a38] shrink-0 mt-0.5" />
                    <span><strong>Supply Chain Logistics:</strong> Regional grain procurement and strategic reserve storage.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-[#1d4a38] shrink-0 mt-0.5" />
                    <span><strong>Milling Audits:</strong> Enforcing national food safety laws across commercial processing mills.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-[#1d4a38] shrink-0 mt-0.5" />
                    <span><strong>Preservation Frameworks:</strong> Chemical preservation &amp; microbiological compliance vectors.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-[#1d4a38] shrink-0 mt-0.5" />
                    <span><strong>Crisis Mitigation:</strong> Regional stability workflows under supply shocks and market volatility.</span>
                  </li>
                </ul>
              </div>

              {/* European Blue Card & Critical Skills Box */}
              <div className="p-6 bg-[#121615] text-[#fbfaf7] rounded-2xl shadow-lg space-y-3">
                <div className="flex items-center gap-2 text-[#c5a059] text-[9px] uppercase tracking-widest font-mono">
                  <Globe size={13} />
                  <span>Target Era: Late 2027 / Early 2028</span>
                </div>
                <h4 className="font-serif text-lg text-white">Global Transition Pathway</h4>
                <p className="text-xs text-[#b2beb8] leading-relaxed font-light">
                  Architecting integration into European quality assurance ecosystems (Germany EU Blue Card / Ireland Critical Skills Employment Permit) backed by ANABIN H+ certified status and USDA/FAO credentials.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Timeline Cards */}
          <motion.div variants={fadeUp} className="lg:col-span-8 space-y-8 relative">
            <div className="space-y-8">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article variants={fadeUp} key={item.role}>
                    <TiltCard maxTilt={4} liftDepth={10} className="bg-white border border-[#e5ded4] p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-[#121615] transition-all">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#eee7dc]">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-widest font-bold text-[#121615] bg-[#f5f2eb] px-3 py-1 rounded-full font-mono">
                            {item.period}
                          </span>
                          <span className="text-[10px] uppercase tracking-widest font-bold text-[#1d4a38] bg-[#1d4a38]/10 px-2.5 py-0.5 rounded-full">
                            {item.dutyPill}
                          </span>
                        </div>
                        <span className="text-xs text-[#717a75] font-mono">
                          RECORD #{String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#f5f2eb] border border-[#e5ded4] flex items-center justify-center text-[#1d4a38] shrink-0 mt-1">
                          <Icon size={20} />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl sm:text-2xl text-[#121615]">{item.role}</h3>
                          <p className="text-xs font-bold text-[#717a75] uppercase tracking-wider mt-0.5">{item.org}</p>
                        </div>
                      </div>

                      <p className="text-[#4a524e] leading-relaxed text-sm mb-5 font-light">
                        {item.summary}
                      </p>

                      <div className="p-4 bg-[#fcfbfa] border border-[#eee7dc] rounded-xl mb-5">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-[#717a75] mb-2.5 font-mono">
                          Key Operational Responsibilities &amp; Outcomes
                        </p>
                        <ul className="space-y-2 text-xs text-[#333a36]">
                          {item.duties.map((duty, idx) => (
                            <li key={idx} className="flex items-start gap-2 font-light">
                              <span className="text-[#1d4a38] font-bold text-xs mt-0.5">·</span>
                              <span>{duty}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-[#717a75] uppercase tracking-widest font-medium pt-3 border-t border-[#f5f2eb]">
                        <MapPin size={13} className="text-[#1d4a38]" />
                        <span>{item.location}</span>
                      </div>
                    </TiltCard>
                  </motion.article>
                );
              })}
            </div>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left bg-[#fcfbfa] border border-[#e5ded4] p-6 sm:p-8 rounded-2xl shadow-xs">
              <div className="flex-1 space-y-1">
                <span className="text-sm text-[#121615] font-serif font-bold block">Need authenticated service ledgers and posting gazettes?</span>
                <p className="text-xs text-[#717a75]">Complete government service book extracts and verified credentials available upon official request.</p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#121615] text-white px-6 py-3.5 text-[11px] uppercase tracking-[0.16em] font-bold rounded-full hover:bg-[#1d4a38] transition-colors group shrink-0">
                <span>Request Dossier</span> 
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </SubpageLayout>
  );
}

