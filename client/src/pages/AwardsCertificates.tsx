import { useState, useMemo } from "react";
import { ArrowUpRight, Search, FileCheck2, Building, Calendar, MapPin, Award, X, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import SubpageLayout from "@/components/SubpageLayout";
import { motion, AnimatePresence } from "framer-motion";
import CertificateDocument from "@/components/CertificateDocument";
import { CERTIFICATES, CertificateRecord } from "@/data/certificates";

export default function AwardsCertificates() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const categories = ["All", ...Array.from(new Set(CERTIFICATES.map(c => c.category)))];

  const filteredRecords = useMemo(() => {
    return CERTIFICATES.filter(record => {
      const matchesCategory = activeCategory === "All" || record.category === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        record.title.toLowerCase().includes(searchLower) ||
        record.issuer.toLowerCase().includes(searchLower) ||
        record.purpose.toLowerCase().includes(searchLower) ||
        record.code.toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const activeRecord = activeIndex !== null ? filteredRecords[activeIndex] : null;

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
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <SubpageLayout 
      eyebrow="04 / Credentials & audit" 
      title={<>Verified<br /><em>certifications.</em></>} 
      intro="An official archive of professional qualifications, statutory training, and commendations received in the line of duty."
    >
      <section className="py-12 md:py-24">
        {/* Controls: Search & Filter */}
        <motion.div 
          className="flex flex-col md:flex-row gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Category Tabs */}
          <div className="flex-1 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <div className="flex items-center gap-2 min-w-max">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors border ${
                    activeCategory === category 
                    ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' 
                    : 'bg-white text-[#666] border-[#e5e5e5] hover:bg-[#f5f5f5] hover:text-[#1a1a1a]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="w-full md:w-72 shrink-0 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" />
            <input 
              type="text" 
              placeholder="Search records, issuers, IDs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#e5e5e5] focus:border-[#1a1a1a] rounded-none py-2 pl-12 pr-4 text-sm text-[#1a1a1a] placeholder:text-[#999] outline-none transition-colors"
            />
          </div>
        </motion.div>

        {/* Results Info */}
        <div className="mb-8 text-[11px] font-bold text-[#666] uppercase tracking-widest flex items-center justify-between border-b border-[#e5e5e5] pb-4">
          <span>{filteredRecords.length} {filteredRecords.length === 1 ? 'Record' : 'Records'} Found</span>
          {activeCategory !== "All" && <span className="text-[#1a1a1a]">{activeCategory}</span>}
        </div>

        {/* Certificate Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          <AnimatePresence mode="popLayout">
            {filteredRecords.map((record, index) => (
              <motion.article 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 320, damping: 25 }}
                key={record.id} 
                className="group cursor-pointer bg-white border border-[#e5e5e5] hover:border-[#1a1a1a] shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
                onClick={() => setActiveIndex(index)}
              >
                {/* Visual Thumbnail Area */}
                <div className="aspect-[4/3] bg-[#fdfcf8] border-b border-[#e5e5e5] p-6 flex flex-col relative overflow-hidden">
                  <div className="flex items-start justify-between mb-auto relative z-10">
                    <span className="text-[10px] font-bold text-[#1a1a1a] bg-white px-2 py-1 border border-[#e5e5e5] shadow-sm uppercase tracking-widest">
                      {record.year}
                    </span>
                    <div className="w-8 h-8 bg-white border border-[#e5e5e5] flex items-center justify-center shadow-sm">
                      <Award size={14} className="text-[#1a1a1a]" />
                    </div>
                  </div>
                  
                  {/* We embed a miniature of the document component, non-interactive */}
                  <div className="relative z-10 mt-auto text-center">
                    <CertificateDocument 
                      record={record} 
                      scanUrl={record.defaultImage || null} 
                    />
                  </div>
                </div>
                
                {/* Text Content Area */}
                <div className="p-6 flex-1 flex flex-col">
                  <span className="inline-block mb-3 text-[10px] tracking-widest uppercase font-bold text-[#666]">
                    {record.shortTitle}
                  </span>
                  <h3 className="font-serif text-lg text-[#1a1a1a] leading-tight mb-4 group-hover:text-[#2d7a5d] transition-colors">
                    {record.title}
                  </h3>
                  <div className="mt-auto flex items-center gap-2 text-xs text-[#666] border-t border-[#f5f5f5] pt-4">
                    <Building size={14} className="shrink-0" />
                    <span className="truncate">{record.issuer}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Empty State */}
        {filteredRecords.length === 0 && (
          <div className="text-center py-24 bg-[#fdfcf8] border border-[#e5e5e5]">
            <div className="w-16 h-16 mx-auto bg-white border border-[#e5e5e5] flex items-center justify-center mb-4 text-[#666]">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-serif text-[#1a1a1a] mb-2">No records found</h3>
            <p className="text-[#666] text-sm">Try adjusting your search or category filter.</p>
          </div>
        )}

        {/* Verification Notice */}
        <div className="mt-16 p-8 border border-[#e5e5e5] bg-white flex flex-col md:flex-row items-start gap-6 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#fdfcf8] border border-[#e5e5e5] flex items-center justify-center shrink-0">
            <FileCheck2 size={24} className="text-[#1a1a1a]" />
          </div>
          <div className="text-[#444] leading-relaxed max-w-4xl">
            <h3 className="text-xl text-[#1a1a1a] font-serif font-bold mb-2">
              Authentic Verified Credential Archive
            </h3>
            <p className="text-sm">
              All {CERTIFICATES.length} records presented here represent authentic credentials, certificates and honours issued to <strong>Mst. Ishrat Zahan</strong> by the
              Government of Bangladesh, international agencies (USDA, ADB, FAO, USAID), the Bangladesh Food Safety Authority (BFSA), higher
              education institutions (Islamic University, Kushtia & BISE Rajshahi), and professional bodies (IUNAFT Alumni Association, Bangladesh Food Officers' Association). Click any card to examine the full record, zoom into details, and inspect the official documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox Dossier Modal */}
      {activeRecord && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[110] bg-[#1a1a1a]/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-y-auto"
          role="presentation"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close & Navigation */}
            <button
              className="absolute top-3 right-3 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f5f5f5]/90 backdrop-blur-sm border border-[#e5e5e5] text-[#1a1a1a] hover:bg-white flex items-center justify-center transition-all z-30 shadow-md cursor-pointer"
              onClick={() => setActiveIndex(null)}
              aria-label="Close certificate lightbox"
            >
              <X size={18} />
            </button>
            
            <button
              className="hidden sm:flex absolute top-1/2 left-4 sm:left-6 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm border border-[#e5e5e5] text-[#1a1a1a] hover:bg-[#f5f5f5] items-center justify-center transition-all z-20 shadow-md cursor-pointer"
              onClick={() =>
                setActiveIndex((activeIndex - 1 + filteredRecords.length) % filteredRecords.length)
              }
              aria-label="Previous certificate"
            >
              <ChevronLeft size={22} />
            </button>
            
            <button
              className="hidden sm:flex absolute top-1/2 right-4 sm:right-6 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm border border-[#e5e5e5] text-[#1a1a1a] hover:bg-[#f5f5f5] items-center justify-center transition-all z-20 shadow-md cursor-pointer"
              onClick={() => setActiveIndex((activeIndex + 1) % filteredRecords.length)}
              aria-label="Next certificate"
            >
              <ChevronRight size={22} />
            </button>

            {/* Mobile Previous/Next Navigation Floating Strip */}
            <div className="sm:hidden absolute bottom-3 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
              <button
                className="w-10 h-10 rounded-full bg-white/95 border border-[#ded7cb] text-[#121615] flex items-center justify-center shadow-lg pointer-events-auto active:scale-95"
                onClick={() =>
                  setActiveIndex((activeIndex - 1 + filteredRecords.length) % filteredRecords.length)
                }
                aria-label="Previous certificate"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-[10px] font-mono font-bold bg-[#121615]/80 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                {activeIndex + 1} / {filteredRecords.length}
              </span>
              <button
                className="w-10 h-10 rounded-full bg-white/95 border border-[#ded7cb] text-[#121615] flex items-center justify-center shadow-lg pointer-events-auto active:scale-95"
                onClick={() => setActiveIndex((activeIndex + 1) % filteredRecords.length)}
                aria-label="Next certificate"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Left: Certificate Visual / Scanned Document (flex 1) */}
            <div className="flex-1 bg-[#fdfcf8] p-4 sm:p-8 md:p-12 lg:p-16 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[#e5e5e5]">
              <div className="w-full max-w-2xl aspect-[4/3] rounded-lg overflow-hidden bg-white shadow-md relative">
                <CertificateDocument
                  record={activeRecord}
                  scanUrl={activeRecord.defaultImage || null}
                  isEnlarged
                />
              </div>
            </div>

            {/* Right: Certificate Dossier Details (w-96) */}
            <div className="w-full lg:w-[420px] bg-white p-5 sm:p-8 md:p-10 flex flex-col h-full max-h-[85vh] overflow-y-auto pb-16 sm:pb-8">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#1a1a1a]">
                    Record {activeRecord.code}
                  </span>
                  <span className="text-[11px] tracking-widest uppercase text-[#666]">
                    {activeRecord.year}
                  </span>
                </div>
                <span className="inline-block mb-3 text-[10px] tracking-widest uppercase font-semibold text-[#666]">
                  {activeRecord.shortTitle} · {activeRecord.category}
                </span>
                <h2
                  id="lightbox-title"
                  className="text-2xl md:text-3xl font-serif font-bold text-[#1a1a1a] leading-tight"
                >
                  {activeRecord.title}
                </h2>
              </div>

              {/* Purpose / Description Dossier */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-[#1a1a1a] mb-3">
                  <FileText size={16} />
                  <span>Purpose & Description</span>
                </div>
                <p className="text-sm text-[#444] leading-relaxed bg-[#fdfcf8] p-5 rounded-lg border border-[#e5e5e5]">
                  {activeRecord.purpose}
                </p>
              </div>

              {/* Metadata list */}
              <div className="space-y-6 text-sm text-[#444] border-t border-[#e5e5e5] pt-8">
                <div>
                  <strong className="text-[#1a1a1a] text-[11px] uppercase tracking-widest block mb-1">Issuing Authority</strong>
                  <span className="flex items-center gap-2"><Building size={16} className="text-[#666] shrink-0" /> {activeRecord.issuer}</span>
                </div>
                
                <div>
                  <strong className="text-[#1a1a1a] text-[11px] uppercase tracking-widest block mb-1">Date & Session</strong>
                  <span className="flex items-center gap-2"><Calendar size={16} className="text-[#666] shrink-0" /> {activeRecord.date}</span>
                </div>
                
                <div>
                  <strong className="text-[#1a1a1a] text-[11px] uppercase tracking-widest block mb-1">Venue / Jurisdiction</strong>
                  <span className="flex items-center gap-2"><MapPin size={16} className="text-[#666] shrink-0" /> {activeRecord.location}</span>
                </div>
                
                <div>
                  <strong className="text-[#1a1a1a] text-[11px] uppercase tracking-widest block mb-1">Source Record</strong>
                  <span className="flex items-center gap-2 break-all text-[12px] font-mono"><FileText size={16} className="text-[#666] shrink-0" /> {activeRecord.originalFilename}</span>
                </div>

                {activeRecord.regNumber && (
                  <div>
                    <strong className="text-[#1a1a1a] text-[11px] uppercase tracking-widest block mb-1">Reference Number</strong>
                    <span className="flex items-center gap-2 text-[12px] font-mono"><FileCheck2 size={16} className="text-[#666] shrink-0" /> {activeRecord.regNumber}</span>
                  </div>
                )}

                {activeRecord.signatures.length > 0 && (
                  <div>
                    <strong className="text-[#1a1a1a] text-[11px] uppercase tracking-widest block mb-2">Official Signatories</strong>
                    <ul className="space-y-2">
                      {activeRecord.signatures.map((sig, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Award size={16} className="text-[#666] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold block text-[#1a1a1a]">{sig.name}</span>
                            {sig.title && <span className="text-[#666] text-xs block">{sig.title}</span>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </SubpageLayout>
  );
}
