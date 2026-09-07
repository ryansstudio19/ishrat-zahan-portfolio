import { Building2, CircleCheck, Mail, MapPin, Phone, Send, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import SubpageLayout from "@/components/SubpageLayout";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };

  return <SubpageLayout eyebrow="04 / Contact" title={<>Make the next<br /><em>standard clear.</em></>} intro="For official communication, institutional collaboration or professional enquiries, please use the verified contact details below.">
    <section className="subpage-content section-padding">
      <div className="site-container contact-page-grid">
        <div>
          <p className="eyebrow">Official contact</p>
          <p className="contact-page-copy">Mst. Ishrat Jahan is available for official communication around public food systems, quality assurance, compliance and institutional practice.</p>
          <div className="contact-official">
            <div className="official-name"><ShieldCheck size={17} /><div><strong>Mst. Ishrat Jahan</strong><span>Upazila Controller Of Food</span></div></div>
            <div className="official-line"><Building2 size={16} /><span>Upazila Food Controller&apos;s Office<br />Gangni, Meherpur</span></div>
            <div className="official-line"><Mail size={16} /><a href="mailto:ishratbipasha25@gmail.com">ishratbipasha25@gmail.com</a></div>
            <div className="official-line"><Phone size={16} /><span><a href="tel:+8801712592469">01712-592469</a><small> / </small><a href="tel:+8802477793788">02477793788</a></span></div>
            <div className="official-line"><MapPin size={16} /><span>Bangladesh · GMT +06:00</span></div>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <div className="field-row"><label><span>Name</span><input required name="name" placeholder="Your name" /></label><label><span>Email</span><input required type="email" name="email" placeholder="you@example.com" /></label></div>
          <label><span>Subject</span><input required name="subject" placeholder="What would you like to discuss?" /></label>
          <label><span>Message</span><textarea required name="message" rows={6} placeholder="A few considered lines..." /></label>
          <button className="button button-primary" type="submit">{sent ? "Message ready to send" : "Send enquiry"} {sent ? <CircleCheck size={16} /> : <Send size={16} />}</button>
          {sent && <p className="form-success"><CircleCheck size={15} />Thank you — your enquiry is captured in this demo flow.</p>}
        </form>
      </div>
    </section>
  </SubpageLayout>;
}
