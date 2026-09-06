import { ArrowUpRight, ChevronRight, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

type SubpageLayoutProps = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  children: ReactNode;
};

export default function SubpageLayout({ eyebrow, title, intro, children }: SubpageLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <div className="site-shell subpage-shell">
      <div className="grain" aria-hidden="true" />
      <header className={`site-header ${menuOpen ? "menu-is-open" : ""}`}>
        <a className="brand" href="/" onClick={close} aria-label="Ishrat Zahan home">
          <span className="brand-mark">IZ</span><span className="brand-name">Ishrat Zahan</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="/career">Career</a><a href="/awards-certificates">Awards &amp; certificates</a><a href="/expertise">Expertise</a><a href="/contact">Contact</a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
        {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><a href="/career" onClick={close}>Career <ArrowUpRight size={15} /></a><a href="/awards-certificates" onClick={close}>Awards &amp; certificates <ArrowUpRight size={15} /></a><a href="/expertise" onClick={close}>Expertise <ArrowUpRight size={15} /></a><a href="/contact" onClick={close}>Contact <ArrowUpRight size={15} /></a></nav>}
      </header>

      <main>
        <section className="subpage-hero section-padding">
          <div className="site-container subpage-hero-inner">
            <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="subpage-intro">{intro}</p></div>
            <div className="subpage-index"><span>IZ / 2026</span><ChevronRight size={17} /><span>Selected record</span></div>
          </div>
        </section>
        {children}
      </main>

      <footer className="site-footer"><div className="site-container footer-inner"><div className="footer-brand"><span className="brand-mark">IZ</span><span>Mst. Ishrat Zahan</span></div><p>Public administration · Food safety · Quality assurance</p><a href="/">Back home <ArrowUpRight size={14} /></a></div></footer>
    </div>
  );
}
