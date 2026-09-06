import { Check, Languages, Sparkles } from "lucide-react";
import SubpageLayout from "@/components/SubpageLayout";

const skills = ["Food safety compliance", "Quality assurance management", "Public-sector administration", "Inspection & audit readiness", "HACCP implementation", "Stakeholder coordination", "Training & capacity building", "Documentation & reporting"];

export default function Expertise() {
  return <SubpageLayout eyebrow="03 / Expertise & languages" title={<>The details<br /><em>between.</em></>} intro="Quality is rarely one grand gesture. It is the habit of seeing the gap, naming the risk and improving the system around it.">
    <section className="subpage-content section-padding"><div className="site-container expertise-page-grid"><div><p className="eyebrow">Core practice</p><div className="expertise-page-list">{skills.map((skill, index) => <div key={skill}><span>0{index + 1}</span><strong>{skill}</strong><Check size={15} /></div>)}</div></div><aside className="language-page-card"><div className="language-icon"><Languages size={22} /></div><p className="eyebrow">Language status</p><div className="language-row"><div><strong>English</strong><span>Professional working proficiency</span></div><Check size={18} /></div><div className="language-row"><div><strong>German</strong><span>Learning / academic pathway</span></div><Check size={18} /></div><div className="language-note"><Sparkles size={15} />Communication that makes standards usable.</div></aside></div></section>
  </SubpageLayout>;
}
