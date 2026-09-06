import { useEffect, useState } from "react";
import { Award, ChevronLeft, ChevronRight, FileCheck2, GraduationCap, ShieldCheck, UploadCloud, Wheat, X } from "lucide-react";
import SubpageLayout from "@/components/SubpageLayout";

type RecordItem = { code: string; type: string; title: string; issuer: string; icon: typeof Award; tone: string; image?: string };

const records: RecordItem[] = [
  { code: "01", type: "Food safety", title: "HACCP certification", issuer: "Hazard Analysis & Critical Control Points", icon: ShieldCheck, tone: "gold" },
  { code: "02", type: "International training", title: "USDA Food Safety Training", issuer: "United States Department of Agriculture", icon: Wheat, tone: "emerald" },
  { code: "03", type: "Global learning", title: "UN / FAO training record", issuer: "United Nations / Food and Agriculture Organization", icon: Award, tone: "gold" },
  { code: "04", type: "Academic verification", title: "Anabin H+ verification", issuer: "German higher-education recognition", icon: GraduationCap, tone: "emerald" },
  { code: "05", type: "Academic degree", title: "MSc academic record", issuer: "Islamic University", icon: GraduationCap, tone: "gold" },
  { code: "06", type: "Awards archive", title: "Additional recognition", issuer: "Reserved for future award upload", icon: Award, tone: "emerald" },
];

export default function AwardsCertificates() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeRecord = activeIndex === null ? null : records[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((index) => index === null ? 0 : (index + 1) % records.length);
      if (event.key === "ArrowLeft") setActiveIndex((index) => index === null ? records.length - 1 : (index - 1 + records.length) % records.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); };
  }, [activeIndex]);

  return <SubpageLayout eyebrow="02 / Awards & certificates" title={<>A record of<br /><em>earned trust.</em></>} intro="A growing archive of certifications, academic verification and professional recognition. Each card opens into a lightbox ready for the official scan.">
    <section className="subpage-content section-padding"><div className="site-container">
      <div className="archive-toolbar"><p className="eyebrow">Credential archive / 06 records</p><span>Click any record to enlarge</span></div>
      <div className="archive-grid">{records.map((record, index) => { const Icon = record.icon; return <button className={`archive-card archive-${record.tone}`} key={record.code} onClick={() => setActiveIndex(index)} aria-label={`Open ${record.title}`}><div className="archive-card-top"><span>{record.code}</span><Icon size={19} /></div><div className="certificate-placeholder">{record.image ? <img src={record.image} alt={`${record.title} certificate`} /> : <><UploadCloud size={23} /><span>Certificate image<br />placeholder</span></>}</div><p className="archive-type">{record.type}</p><h2>{record.title}</h2><p>{record.issuer}</p><span className="archive-upload"><FileCheck2 size={14} /> {record.image ? "Open certificate" : "Ready for upload"}</span></button>; })}</div>
      <div className="archive-note"><FileCheck2 size={18} /><div><strong>Gallery slot ready</strong><p>To add a scan, place its storage path in the matching <code>image</code> field. The lightbox supports click, Escape, and arrow-key navigation.</p></div></div>
    </div></section>
    {activeRecord && activeIndex !== null && <div className="lightbox-backdrop" role="presentation" onClick={() => setActiveIndex(null)}><div className="lightbox-dialog" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" onClick={(event) => event.stopPropagation()}><button className="lightbox-close" onClick={() => setActiveIndex(null)} aria-label="Close certificate lightbox"><X size={19} /></button><button className="lightbox-arrow lightbox-prev" onClick={() => setActiveIndex((activeIndex - 1 + records.length) % records.length)} aria-label="Previous certificate"><ChevronLeft size={20} /></button><div className="lightbox-media">{activeRecord.image ? <img src={activeRecord.image} alt={`${activeRecord.title} enlarged certificate`} /> : <div className="lightbox-placeholder"><UploadCloud size={32} /><span>Upload the official scan<br />to activate this preview</span></div>}</div><button className="lightbox-arrow lightbox-next" onClick={() => setActiveIndex((activeIndex + 1) % records.length)} aria-label="Next certificate"><ChevronRight size={20} /></button><div className="lightbox-caption"><span>{activeRecord.code} / {activeRecord.type}</span><h2 id="lightbox-title">{activeRecord.title}</h2><p>{activeRecord.issuer}</p></div></div></div>}
  </SubpageLayout>;
}
