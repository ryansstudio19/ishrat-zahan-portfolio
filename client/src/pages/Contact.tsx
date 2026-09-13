import { Building2, CircleCheck, Loader2, Mail, MapPin, Phone, Send, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import SubpageLayout from "@/components/SubpageLayout";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    };

    try {
      // 1. Submit to Cloud SQL PostgreSQL database via backend API
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit enquiry to server");
      }

      // 2. Synchronize to Firebase Firestore
      try {
        const inquiryDoc = doc(collection(db, "inquiries"));
        await setDoc(inquiryDoc, {
          ...payload,
          createdAt: serverTimestamp(),
        });
      } catch (fsErr) {
        console.warn("Firestore sync notification:", fsErr);
      }

      setSent(true);
      setMessage("");
      setSubject("");
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMsg(err.message || "An error occurred while submitting your enquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SubpageLayout
      eyebrow="04 / Contact"
      title={<>Make the next<br /><em>standard clear.</em></>}
      intro="For official communication, institutional collaboration or professional enquiries, please use the verified contact details below."
    >
      <section className="subpage-content section-padding">
        <div className="site-container contact-page-grid">
          <div>
            <p className="eyebrow">Official contact</p>
            <p className="contact-page-copy">
              Mst. Ishrat Zahan is available for official communication around public food systems, quality assurance, compliance and institutional practice.
            </p>
            <div className="contact-official">
              <div className="official-name">
                <ShieldCheck size={17} />
                <div>
                  <strong>Mst. Ishrat Zahan</strong>
                  <span>Upazila Controller Of Food</span>
                </div>
              </div>
              <div className="official-line">
                <Building2 size={16} />
                <span>Upazila Food Controller&apos;s Office<br />Gangni, Meherpur</span>
              </div>
              <div className="official-line">
                <Mail size={16} />
                <a href="mailto:ishratbipasha25@gmail.com">ishratbipasha25@gmail.com</a>
              </div>
              <div className="official-line">
                <Phone size={16} />
                <span><a href="tel:+8801712592469">01712-592469</a><small> / </small><a href="tel:+8802477793788">02477793788</a></span>
              </div>
              <div className="official-line">
                <MapPin size={16} />
                <span>Bangladesh · GMT +06:00</span>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={submit}>
            <div className="field-row">
              <label>
                <span>Name</span>
                <input
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label>
              <span>Subject</span>
              <input
                required
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What would you like to discuss?"
              />
            </label>
            <label>
              <span>Message</span>
              <textarea
                required
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="A few considered lines..."
              />
            </label>
            <button className="button button-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>Submitting... <Loader2 size={16} className="animate-spin" /></>
              ) : sent ? (
                <>Enquiry submitted <CircleCheck size={16} /></>
              ) : (
                <>Send enquiry <Send size={16} /></>
              )}
            </button>
            {sent && (
              <p className="form-success">
                <CircleCheck size={15} /> Thank you — your enquiry has been saved to the database.
              </p>
            )}
            {errorMsg && (
              <p className="text-red-400 text-sm mt-2">
                {errorMsg}
              </p>
            )}
          </form>
        </div>
      </section>
    </SubpageLayout>
  );
}
