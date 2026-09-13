import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  ShieldCheck,
  Wheat,
  X,
  Loader2,
  FileCheck2,
} from "lucide-react";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AtmosphereBackground from "@/components/AtmosphereBackground";
import TiltCard from "@/components/TiltCard";

const credentials = [
  {
    id: "strengthening-institutional-capacity-bim-adb",
    code: "HACCP",
    title: "Hazard Analysis & Critical Control Points",
    issuer: "Food safety systems",
    detail: "Risk-led controls for safe, auditable food operations.",
    icon: ShieldCheck,
  },
  {
    id: "usda-food-safety-haccp-inspection",
    code: "USDA",
    title: "USDA Food Safety Training",
    issuer: "United States Department of Agriculture",
    detail: "International training in compliance, hygiene and inspection practice.",
    icon: Wheat,
  },
  {
    id: "risk-based-food-inspection-system-bfsa-fao",
    code: "UN / FAO",
    title: "Food & Agriculture Training",
    issuer: "United Nations / FAO learning track",
    detail: "Global perspective on resilient food systems and public value.",
    icon: Award,
  },
  {
    id: "master-of-science-degree",
    code: "ANABIN H+",
    title: "Academic Verification",
    issuer: "German higher-education recognition",
    detail: "MSc credentials verified through the Anabin H+ institution listing.",
    icon: GraduationCap,
  },
];

const expertise = [
  "Food safety compliance",
  "Quality assurance management",
  "Public-sector administration",
  "Inspection & audit readiness",
  "HACCP implementation",
  "Stakeholder coordination",
  "Training & capacity building",
  "Documentation & reporting",
];

const career = [
  {
    period: "Present",
    role: "Senior public administration & quality assurance",
    organization: "Department of Food · Ministry of Food",
    location: "Gangni, Meherpur, Bangladesh",
    copy: "Leading operational quality, compliance documentation and field-facing coordination in a public food system.",
  },
  {
    period: "Academic foundation",
    role: "Master of Science",
    organization: "Islamic University",
    location: "Kushtia, Bangladesh",
    copy: "A research-led foundation in disciplined analysis, institutional systems and accountable decision-making.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  
  const close = () => setMenuOpen(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setFormStatus("submitting");
    try {
      const contactRef = doc(collection(db, "contact_submissions"));
      await setDoc(contactRef, {
        name,
        email,
        subject: subject || "General Inquiry",
        message,
        timestamp: serverTimestamp(),
      });
      setFormStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setTimeout(() => setFormStatus("idle"), 6000);
    } catch (err) {
      console.error(err);
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#1a1a1a] font-sans selection:bg-[#1a1a1a] selection:text-white">
      {/* Header */}
      <header className={`relative z-50 flex items-center justify-between px-6 md:px-12 py-6 border-b border-[#e5e5e5] bg-[#FDFCF8]`}>
        <a className="inline-flex items-center gap-3 no-underline text-[#1a1a1a]" href="/" onClick={close} aria-label="Ishrat Zahan home">
          <span className="w-8 h-8 flex items-center justify-center border border-[#1a1a1a] font-serif text-sm">IZ</span>
          <span className="text-xs font-semibold tracking-widest uppercase">Ishrat Zahan</span>
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          <a href="#career" className="text-[11px] font-medium uppercase tracking-widest text-[#666] hover:text-[#1a1a1a] transition-colors">Career</a>
          <a href="/awards-certificates" className="text-[11px] font-medium uppercase tracking-widest text-[#666] hover:text-[#1a1a1a] transition-colors">Awards &amp; Certificates</a>
          <a href="#expertise" className="text-[11px] font-medium uppercase tracking-widest text-[#666] hover:text-[#1a1a1a] transition-colors">Expertise</a>
          <a href="#contact" className="text-[11px] font-medium uppercase tracking-widest text-[#666] hover:text-[#1a1a1a] transition-colors">Contact</a>
        </nav>

        <button className="md:hidden w-10 h-10 flex items-center justify-center border border-[#e5e5e5] text-[#1a1a1a]" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {menuOpen && (
          <nav className="absolute top-full left-0 right-0 bg-[#FDFCF8] border-b border-[#e5e5e5] flex flex-col p-6 shadow-xl" aria-label="Mobile navigation">
            <a href="#career" className="flex items-center justify-between py-4 text-sm font-medium uppercase tracking-widest text-[#1a1a1a] border-b border-[#e5e5e5]" onClick={close}>Career <ArrowUpRight size={16} /></a>
            <a href="/awards-certificates" className="flex items-center justify-between py-4 text-sm font-medium uppercase tracking-widest text-[#1a1a1a] border-b border-[#e5e5e5]" onClick={close}>Awards &amp; Certificates <ArrowUpRight size={16} /></a>
            <a href="#expertise" className="flex items-center justify-between py-4 text-sm font-medium uppercase tracking-widest text-[#1a1a1a] border-b border-[#e5e5e5]" onClick={close}>Expertise <ArrowUpRight size={16} /></a>
            <a href="#contact" className="flex items-center justify-between py-4 text-sm font-medium uppercase tracking-widest text-[#1a1a1a]" onClick={close}>Contact <ArrowUpRight size={16} /></a>
          </nav>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 md:px-12 pt-24 pb-20 md:pt-32 md:pb-32 border-b border-[#e5e5e5]">
          <AtmosphereBackground className="opacity-70" />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FDFCF8]"
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-3/5">
              <p className="text-[11px] tracking-widest uppercase text-[#666] font-bold mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#2d7a5d] inline-block"></span>
                Official Portfolio
              </p>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-[#1a1a1a] leading-tight mb-8">
                Public Administration &<br />
                <span className="text-[#666] italic">Quality Assurance.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-[#444] leading-relaxed max-w-2xl mb-10">
                Bridging government policy with field-level execution. Specializing in public sector food safety, regulatory compliance, and transparent administrative operations in Bangladesh.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <a href="#contact" className="px-6 py-3 bg-[#1a1a1a] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#333] transition-colors">
                  Contact Now
                </a>
                <a href="/awards-certificates" className="px-6 py-3 border border-[#1a1a1a] text-[#1a1a1a] text-xs uppercase tracking-widest font-semibold hover:bg-[#f5f5f5] transition-colors">
                  View Credentials
                </a>
              </div>
            </div>
            
            <div className="lg:w-2/5 w-full flex justify-center lg:justify-end">
              <TiltCard
                className="relative w-full max-w-sm aspect-[3/4] bg-white border border-[#e5e5e5] p-3 shadow-xl"
                maxTilt={6}
                liftDepth={20}
              >
                <div className="w-full h-full bg-[#f5f5f5] overflow-hidden relative">
                  <img src="/storage/ishrat-zahan-portrait_7e992ace.jpg" alt="Mst. Ishrat Zahan" className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 right-4 bg-white px-3 py-1.5 text-[9px] uppercase tracking-widest font-bold border border-[#e5e5e5] shadow-sm">
                    Verified Portrait
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* Career & Expertise */}
        <section id="career" className="px-6 md:px-12 py-24 border-b border-[#e5e5e5]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="text-[11px] tracking-widest uppercase text-[#1a1a1a] font-bold border-b border-[#e5e5e5] pb-4 mb-10">
                Career Trajectory
              </h2>
              
              <div className="space-y-12">
                {career.map((role, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="shrink-0 w-8 h-8 flex items-center justify-center border border-[#1a1a1a] rounded-full">
                      {i === 0 ? <BriefcaseBusiness size={14} /> : <GraduationCap size={14} />}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#666] block mb-1">
                        {role.period}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-[#1a1a1a] mb-2">{role.role}</h3>
                      <p className="text-sm font-semibold uppercase tracking-widest text-[#1a1a1a] mb-1">{role.organization}</p>
                      <p className="text-xs text-[#666] flex items-center gap-1 mb-4"><MapPin size={12} /> {role.location}</p>
                      <p className="text-[#444] leading-relaxed text-sm">{role.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 id="expertise" className="text-[11px] tracking-widest uppercase text-[#1a1a1a] font-bold border-b border-[#e5e5e5] pb-4 mb-10">
                Core Expertise
              </h2>
              <div className="flex flex-wrap gap-3">
                {expertise.map((skill, i) => (
                  <span key={i} className="px-4 py-2 border border-[#e5e5e5] bg-white text-[#1a1a1a] text-xs font-medium rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Credentials */}
        <section className="px-6 md:px-12 py-24 bg-white border-b border-[#e5e5e5]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 border-b border-[#e5e5e5] pb-8">
              <div>
                <h2 className="text-[11px] tracking-widest uppercase text-[#666] font-bold mb-3">
                  Credential Archive
                </h2>
                <p className="text-3xl font-serif font-bold text-[#1a1a1a]">
                  Featured Certifications
                </p>
              </div>
              
              <a href="/awards-certificates" className="text-[11px] uppercase tracking-widest font-bold text-[#1a1a1a] border border-[#1a1a1a] px-5 py-2.5 hover:bg-[#1a1a1a] hover:text-white transition-colors inline-flex items-center gap-2">
                <span>View Full Register</span> <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {credentials.map((cred) => {
                const Icon = cred.icon;
                return (
                  <TiltCard
                    key={cred.id}
                    className="border border-[#e5e5e5] bg-[#FDFCF8] p-6 hover:shadow-lg transition-shadow group flex flex-col h-full"
                    liftDepth={12}
                    maxTilt={7}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 border border-[#e5e5e5] bg-white flex items-center justify-center rounded-full shrink-0">
                        <Icon size={16} className="text-[#1a1a1a]" />
                      </div>
                      <span className="text-[9px] uppercase tracking-widest font-bold text-[#666] bg-[#e5e5e5]/50 px-2 py-1 rounded">
                        {cred.code}
                      </span>
                    </div>
                    
                    <h3 className="font-serif font-bold text-lg text-[#1a1a1a] mb-2">{cred.title}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-[#666] font-semibold mb-4">{cred.issuer}</p>
                    <p className="text-sm text-[#444] leading-relaxed mb-6 flex-1">{cred.detail}</p>
                    
                    <a href="/awards-certificates" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a] group-hover:underline mt-auto">
                      <FileCheck2 size={14} /> Verify Record
                      <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="px-6 md:px-12 py-24 bg-[#FDFCF8]">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-[11px] tracking-widest uppercase text-[#666] font-bold mb-3">
              Official Correspondence
            </h2>
            <p className="text-3xl md:text-4xl font-serif font-bold text-[#1a1a1a]">
              Direct Inquiries
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto bg-white border border-[#e5e5e5] p-8 md:p-12 shadow-sm">
            {formStatus === "success" ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#f5f5f5] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} className="text-[#2d7a5d]" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#1a1a1a] mb-2">Message Received</h3>
                <p className="text-[#444] text-sm">Your correspondence has been securely logged. We will review and respond accordingly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[11px] tracking-widest uppercase font-bold text-[#1a1a1a] mb-2">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#fdfcf8] border border-[#e5e5e5] px-4 py-3 text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[11px] tracking-widest uppercase font-bold text-[#1a1a1a] mb-2">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#fdfcf8] border border-[#e5e5e5] px-4 py-3 text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
                      placeholder="e.g. email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[11px] tracking-widest uppercase font-bold text-[#1a1a1a] mb-2">Subject Matter</label>
                  <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#fdfcf8] border border-[#e5e5e5] px-4 py-3 text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
                    placeholder="Brief subject of inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] tracking-widest uppercase font-bold text-[#1a1a1a] mb-2">Official Message</label>
                  <textarea
                    id="message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full bg-[#fdfcf8] border border-[#e5e5e5] px-4 py-3 text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none"
                    placeholder="Please provide full details..."
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
                  <p className="text-[10px] uppercase tracking-widest text-[#666] max-w-[200px]">All submissions are securely logged.</p>
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="bg-[#1a1a1a] text-white px-8 py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-black transition-colors disabled:opacity-70 flex items-center gap-2"
                  >
                    {formStatus === "submitting" ? (
                      <><Loader2 size={16} className="animate-spin" /> Processing...</>
                    ) : (
                      <>Submit Inquiry <ArrowUpRight size={16} /></>
                    )}
                  </button>
                </div>
                
                {formStatus === "error" && (
                  <p className="text-red-600 text-xs text-center font-medium mt-4">System error: Unable to submit. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e5e5e5] px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-[#1a1a1a] bg-white">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 flex items-center justify-center border border-[#1a1a1a] font-serif text-sm">IZ</span>
          <span className="text-xs font-semibold tracking-widest uppercase">Mst. Ishrat Zahan</span>
        </div>
        <p className="text-[11px] tracking-widest uppercase text-[#666]">Public Administration · Food Safety · Quality Assurance</p>
        <div className="text-[11px] tracking-widest uppercase text-[#666]">
          © {new Date().getFullYear()} Official Portfolio
        </div>
      </footer>
    </div>
  );
}
