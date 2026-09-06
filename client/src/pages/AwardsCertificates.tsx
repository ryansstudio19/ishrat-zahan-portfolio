import { Award, FileCheck2, GraduationCap, ShieldCheck, UploadCloud, Wheat } from "lucide-react";
import SubpageLayout from "@/components/SubpageLayout";

const records = [
  { code: "01", type: "Food safety", title: "HACCP certification", issuer: "Hazard Analysis & Critical Control Points", icon: ShieldCheck, tone: "gold" },
  { code: "02", type: "International training", title: "USDA Food Safety Training", issuer: "United States Department of Agriculture", icon: Wheat, tone: "emerald" },
  { code: "03", type: "Global learning", title: "UN / FAO training record", issuer: "United Nations / Food and Agriculture Organization", icon: Award, tone: "gold" },
  { code: "04", type: "Academic verification", title: "Anabin H+ verification", issuer: "German higher-education recognition", icon: GraduationCap, tone: "emerald" },
  { code: "05", type: "Academic degree", title: "MSc academic record", issuer: "Islamic University", icon: GraduationCap, tone: "gold" },
  { code: "06", type: "Awards archive", title: "Additional recognition", issuer: "Reserved for future award upload", icon: Award, tone: "emerald" },
];

export default function AwardsCertificates() {
  return <SubpageLayout eyebrow="02 / Awards & certificates" title={<>A record of<br /><em>earned trust.</em></>} intro="A growing archive of certifications, academic verification and professional recognition. Each card is ready to become a lightbox for the official scan.">
    <section className="subpage-content section-padding"><div className="site-container">
      <div className="archive-toolbar"><p className="eyebrow">Credential archive / 06 records</p><span>Scanned documents will be added here</span></div>
      <div className="archive-grid">{records.map((record) => { const Icon = record.icon; return <article className={`archive-card archive-${record.tone}`} key={record.code}><div className="archive-card-top"><span>{record.code}</span><Icon size={19} /></div><div className="certificate-placeholder"><UploadCloud size={23} /><span>Certificate image<br />placeholder</span></div><p className="archive-type">{record.type}</p><h2>{record.title}</h2><p>{record.issuer}</p><button className="archive-upload"><FileCheck2 size={14} /> Ready for upload</button></article>; })}</div>
      <div className="archive-note"><FileCheck2 size={18} /><div><strong>Gallery slot ready</strong><p>Upload JPG, PNG or PDF scans later. The page structure is already prepared for a responsive gallery and document lightbox.</p></div></div>
    </div></section>
  </SubpageLayout>;
}
