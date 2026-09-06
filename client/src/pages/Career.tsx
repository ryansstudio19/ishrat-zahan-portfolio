import { ArrowUpRight, BriefcaseBusiness, GraduationCap, MapPin } from "lucide-react";
import SubpageLayout from "@/components/SubpageLayout";

const timeline = [
  { period: "Present", role: "Senior public administration & quality assurance", org: "Department of Food · Ministry of Food", location: "Gangni, Meherpur, Bangladesh", copy: "Leading operational quality, compliance documentation and field-facing coordination in a public food system.", icon: BriefcaseBusiness },
  { period: "Academic foundation", role: "Master of Science", org: "Islamic University", location: "Kushtia, Bangladesh", copy: "A research-led foundation in disciplined analysis, institutional systems and accountable decision-making.", icon: GraduationCap },
];

export default function Career() {
  return <SubpageLayout eyebrow="01 / Career record" title={<>Work that moves<br /><em>with accountability.</em></>} intro="A concise view of the institutions, responsibilities and places that shape Ishrat’s public-service practice.">
    <section className="subpage-content section-padding"><div className="site-container career-page-grid"><div className="career-side-note"><p className="eyebrow">The working principle</p><p>Every operational detail is a promise to the public. Strong systems are made visible through the quality of their everyday decisions.</p></div><div className="career-page-timeline">{timeline.map((item, index) => { const Icon = item.icon; return <article className="career-page-item" key={item.role}><div className="career-page-marker"><span>0{index + 1}</span><Icon size={18} /></div><div><p className="eyebrow">{item.period}</p><h2>{item.role}</h2><p className="career-org">{item.org}</p><p className="career-page-copy">{item.copy}</p><p className="career-page-location"><MapPin size={14} />{item.location}</p></div></article>; })}<div className="career-page-cta"><span>Want the complete professional record?</span><a href="/cv-placeholder.pdf" download>Download CV <ArrowUpRight size={15} /></a></div></div></div></section>
  </SubpageLayout>;
}
