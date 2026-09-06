import { CircleCheck, Mail, MapPin, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import SubpageLayout from "@/components/SubpageLayout";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return <SubpageLayout eyebrow="04 / Contact" title={<>Make the next<br /><em>standard clear.</em></>} intro="For advisory conversations, institutional collaboration or professional enquiries, leave a considered note.">
    <section className="subpage-content section-padding"><div className="site-container contact-page-grid"><div><p className="eyebrow">Open to thoughtful exchange</p><p className="contact-page-copy">A direct line for professional conversations around public food systems, quality assurance, compliance and institutional practice.</p><div className="contact-details"><a href="mailto:ishrat.zahan@example.com"><Mail size={16} />ishrat.zahan@example.com</a><span><MapPin size={16} />Bangladesh · GMT +06:00</span></div></div><form className="contact-form" onSubmit={submit}><div className="field-row"><label><span>Name</span><input required name="name" placeholder="Your name" /></label><label><span>Email</span><input required type="email" name="email" placeholder="you@example.com" /></label></div><label><span>Subject</span><input required name="subject" placeholder="What would you like to discuss?" /></label><label><span>Message</span><textarea required name="message" rows={6} placeholder="A few considered lines..." /></label><button className="button button-primary" type="submit">{sent ? "Message ready to send" : "Send enquiry"} {sent ? <CircleCheck size={16} /> : <Send size={16} />}</button>{sent && <p className="form-success"><CircleCheck size={15} />Thank you — your enquiry is captured in this demo flow.</p>}</form></div></section>
  </SubpageLayout>;
}
