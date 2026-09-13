import React, { useEffect, useState } from "react";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  FileText,
  CheckCircle2,
  Calendar,
  MapPin,
  Building,
  LayoutGrid,
  List,
  X,
} from "lucide-react";
import SubpageLayout from "@/components/SubpageLayout";
import CertificateDocument from "@/components/CertificateDocument";
import TiltCard from "@/components/TiltCard";
import { CERTIFICATES } from "@/data/certificates";

type FilterKey = "all" | "training" | "government" | "academic" | "recognition";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All Records" },
  { key: "training", label: "Food Safety & International" },
  { key: "government", label: "Public Service & Audit" },
  { key: "academic", label: "Academic Degrees" },
  { key: "recognition", label: "Awards & Honours" },
];

export default function AwardsCertificates() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredRecords = CERTIFICATES.filter((rec) => {
    if (filter === "all") return true;
    return rec.filterGroup === filter;
  });

  const activeRecord = activeIndex === null ? null : filteredRecords[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((index) => (index === null ? 0 : (index + 1) % filteredRecords.length));
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) =>
          index === null ? filteredRecords.length - 1 : (index - 1 + filteredRecords.length) % filteredRecords.length
        );
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, filteredRecords.length]);

  return (
    <SubpageLayout
      eyebrow="Records & Archives"
      title={
        <>
          A Record of Earned Trust.
        </>
      }
      intro="Official archive of academic degrees, international food safety credentials, technical certifications, public administrative commendations, and professional honours earned by Mst. Ishrat Zahan."
    >
      <section className="pb-12">
        {/* Top Filter Bar & View Toggle */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between pb-8 border-b border-[#e5e5e5] mb-10">
          <div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map(({ key, label }) => {
                const count = key === "all" ? CERTIFICATES.length : CERTIFICATES.filter((r) => r.filterGroup === key).length;
                return (
                  <button
                    key={key}
                    onClick={() => { setFilter(key); setActiveIndex(null); }}
                    className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-widest transition-all border ${
                      filter === key
                        ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                        : "bg-white text-[#666] border-[#e5e5e5] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                    }`}
                  >
                    {label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* View Toggle */}
            <div className="flex items-center bg-white border border-[#e5e5e5] rounded-lg p-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-[11px] tracking-widest uppercase transition-all ${
                  viewMode === "grid"
                    ? "bg-[#f5f5f5] text-[#1a1a1a] font-semibold"
                    : "text-[#666] hover:text-[#1a1a1a]"
                }`}
                aria-label="Grid View"
              >
                <LayoutGrid size={14} />
                <span>Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-[11px] tracking-widest uppercase transition-all ${
                  viewMode === "table"
                    ? "bg-[#f5f5f5] text-[#1a1a1a] font-semibold"
                    : "text-[#666] hover:text-[#1a1a1a]"
                }`}
                aria-label="Register List View"
              >
                <List size={14} />
                <span>List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Certificates Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecords.map((record, index) => {
              const scanUrl = record.defaultImage || null;
              return (
                <div
                  key={record.id}
                  className="flex flex-col group"
                >
                  {/* Scanned Certificate Preview Frame */}
                  <TiltCard
                    onClick={() => setActiveIndex(index)}
                    className="w-full h-64 mb-6 rounded-lg overflow-hidden cursor-pointer relative bg-white border border-[#e5e5e5] group-hover:border-[#1a1a1a] transition-colors shadow-sm"
                    title="Click to view full credential dossier"
                    role="button"
                    ariaLabel={`View ${record.title}`}
                  >
                    <CertificateDocument
                      record={record}
                      scanUrl={scanUrl}
                    />
                  </TiltCard>

                  {/* Certificate Identification, Title, Issuer & Description */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#1a1a1a]">
                          {record.code}
                        </span>
                        <span className="text-[10px] tracking-widest uppercase text-[#666]">
                          {record.year}
                        </span>
                      </div>

                      <h2
                        onClick={() => setActiveIndex(index)}
                        className="text-xl font-serif font-bold text-[#1a1a1a] leading-snug mb-3 hover:underline cursor-pointer"
                      >
                        {record.title}
                      </h2>

                      <p className="text-sm text-[#444] leading-relaxed mb-4 line-clamp-2">
                        {record.purpose}
                      </p>

                      <div className="text-[11px] text-[#666] uppercase tracking-widest flex items-center gap-2">
                        <Building size={14} className="shrink-0" />
                        <span className="truncate">{record.issuer}</span>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#e5e5e5] flex items-center justify-between">
                      <button
                        onClick={() => setActiveIndex(index)}
                        className="inline-flex items-center gap-2 text-[#1a1a1a] hover:underline text-[11px] uppercase tracking-widest font-semibold"
                      >
                        <FileCheck2 size={14} />
                        <span>View Record</span>
                      </button>

                      <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#2d7a5d] font-semibold">
                        <CheckCircle2 size={14} /> Active
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Official Register Table View */}
        {viewMode === "table" && (
          <div className="overflow-x-auto rounded-lg border border-[#e5e5e5] bg-white shadow-sm">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#e5e5e5] text-[#666] text-[11px] uppercase tracking-widest bg-[#fdfcf8]">
                  <th className="py-4 px-6 font-semibold w-24">ID</th>
                  <th className="py-4 px-6 font-semibold w-[30%]">Title</th>
                  <th className="py-4 px-6 font-semibold w-[35%]">Description</th>
                  <th className="py-4 px-6 font-semibold w-[25%]">Issuer & Date</th>
                  <th className="py-4 px-6 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e5e5]">
                {filteredRecords.map((record, index) => {
                  return (
                    <tr
                      key={record.id}
                      className="hover:bg-[#fdfcf8] transition-colors cursor-pointer group"
                      onClick={() => setActiveIndex(index)}
                    >
                      <td className="py-6 px-6 text-[11px] font-bold tracking-widest uppercase text-[#1a1a1a]">
                        {record.code}
                      </td>
                      <td className="py-6 px-6">
                        <span className="text-[10px] uppercase tracking-widest text-[#666] block mb-1">
                          {record.shortTitle}
                        </span>
                        <strong className="font-serif text-base text-[#1a1a1a] group-hover:underline block leading-snug">
                          {record.title}
                        </strong>
                      </td>
                      <td className="py-6 px-6 text-[#444] leading-relaxed">
                        <p className="line-clamp-2">{record.purpose}</p>
                      </td>
                      <td className="py-6 px-6 text-[#666]">
                        <span className="block text-[#1a1a1a] font-medium leading-snug">{record.issuer}</span>
                        <span className="text-[11px] uppercase tracking-widest block mt-1">
                          {record.year} · {record.date}
                        </span>
                      </td>
                      <td className="py-6 px-6 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveIndex(index);
                          }}
                          className="px-4 py-2 rounded-md border border-[#e5e5e5] text-[#1a1a1a] hover:border-[#1a1a1a] text-[10px] uppercase tracking-widest inline-flex items-center gap-2 transition-all bg-white"
                        >
                          <FileCheck2 size={14} />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Information & Verification Note */}
        <div className="mt-16 p-6 md:p-8 rounded-lg border border-[#e5e5e5] bg-white flex flex-col md:flex-row items-start gap-6 shadow-sm">
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
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-[#f5f5f5] border border-[#e5e5e5] text-[#1a1a1a] hover:bg-white flex items-center justify-center transition-all z-20 shadow-sm"
              onClick={() => setActiveIndex(null)}
              aria-label="Close certificate lightbox"
            >
              <X size={20} />
            </button>

            <button
              className="absolute top-1/2 left-4 sm:left-6 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-[#e5e5e5] text-[#1a1a1a] hover:bg-[#f5f5f5] flex items-center justify-center transition-all z-20 shadow-md"
              onClick={() =>
                setActiveIndex((activeIndex - 1 + filteredRecords.length) % filteredRecords.length)
              }
              aria-label="Previous certificate"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className="absolute top-1/2 right-4 sm:right-6 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-[#e5e5e5] text-[#1a1a1a] hover:bg-[#f5f5f5] flex items-center justify-center transition-all z-20 shadow-md"
              onClick={() => setActiveIndex((activeIndex + 1) % filteredRecords.length)}
              aria-label="Next certificate"
            >
              <ChevronRight size={24} />
            </button>

            {/* Left: Certificate Visual / Scanned Document (flex 1) */}
            <div className="flex-1 bg-[#fdfcf8] p-8 md:p-12 lg:p-16 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[#e5e5e5]">
              <div className="w-full max-w-2xl aspect-[4/3] rounded-lg overflow-hidden bg-white shadow-md relative">
                <CertificateDocument
                  record={activeRecord}
                  scanUrl={activeRecord.defaultImage || null}
                  isEnlarged
                />
              </div>
            </div>

            {/* Right: Certificate Dossier Details (w-96) */}
            <div className="w-full lg:w-[420px] bg-white p-8 md:p-10 flex flex-col h-full max-h-[85vh] overflow-y-auto">
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
