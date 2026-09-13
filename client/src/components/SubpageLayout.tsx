import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import AtmosphereBackground from "@/components/AtmosphereBackground";

type SubpageLayoutProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
};

export default function SubpageLayout({ eyebrow, title, intro, children }: SubpageLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#1a1a1a] font-sans">
      <header className={`relative z-50 flex items-center justify-between px-6 md:px-12 py-6 border-b border-[#e5e5e5] bg-[#FDFCF8]`}>
        <a className="inline-flex items-center gap-3 no-underline text-[#1a1a1a]" href="/" onClick={close} aria-label="Ishrat Zahan home">
          <span className="w-8 h-8 flex items-center justify-center border border-[#1a1a1a] font-serif text-sm">IZ</span>
          <span className="text-xs font-semibold tracking-widest uppercase">Ishrat Zahan</span>
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          <a href="/career" className="text-[11px] font-medium uppercase tracking-widest text-[#666] hover:text-[#1a1a1a] transition-colors">Career</a>
          <a href="/awards-certificates" className="text-[11px] font-medium uppercase tracking-widest text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 transition-colors">Awards &amp; Certificates</a>
          <a href="/expertise" className="text-[11px] font-medium uppercase tracking-widest text-[#666] hover:text-[#1a1a1a] transition-colors">Expertise</a>
          <a href="/contact" className="text-[11px] font-medium uppercase tracking-widest text-[#666] hover:text-[#1a1a1a] transition-colors">Contact</a>
        </nav>

        <button className="md:hidden w-10 h-10 flex items-center justify-center border border-[#e5e5e5] text-[#1a1a1a]" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {menuOpen && (
          <nav className="absolute top-full left-0 right-0 bg-[#FDFCF8] border-b border-[#e5e5e5] flex flex-col p-6 shadow-xl" aria-label="Mobile navigation">
            <a href="/career" className="flex items-center justify-between py-4 text-sm font-medium uppercase tracking-widest text-[#1a1a1a] border-b border-[#e5e5e5]" onClick={close}>Career <ArrowUpRight size={16} /></a>
            <a href="/awards-certificates" className="flex items-center justify-between py-4 text-sm font-medium uppercase tracking-widest text-[#1a1a1a] border-b border-[#e5e5e5]" onClick={close}>Awards &amp; Certificates <ArrowUpRight size={16} /></a>
            <a href="/expertise" className="flex items-center justify-between py-4 text-sm font-medium uppercase tracking-widest text-[#1a1a1a] border-b border-[#e5e5e5]" onClick={close}>Expertise <ArrowUpRight size={16} /></a>
            <a href="/contact" className="flex items-center justify-between py-4 text-sm font-medium uppercase tracking-widest text-[#1a1a1a]" onClick={close}>Contact <ArrowUpRight size={16} /></a>
          </nav>
        )}
      </header>

      <main className="pb-24">
        <section className="relative overflow-hidden px-6 md:px-12 pt-16 md:pt-24 pb-12">
          <AtmosphereBackground className="opacity-50" density="quiet" />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FDFCF8]"
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="max-w-3xl">
              {eyebrow && <p className="text-[#666] uppercase tracking-widest text-[11px] font-bold mb-4">{eyebrow}</p>}
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-tight mb-6">{title}</h1>
              {intro && <p className="text-lg text-[#444] leading-relaxed max-w-2xl">{intro}</p>}
            </div>
          </div>
        </section>
        
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      <footer className="border-t border-[#e5e5e5] px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-[#1a1a1a] bg-[#FDFCF8]">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 flex items-center justify-center border border-[#1a1a1a] font-serif text-sm">IZ</span>
          <span className="text-xs font-semibold tracking-widest uppercase">Mst. Ishrat Zahan</span>
        </div>
        <p className="text-[11px] tracking-widest uppercase text-[#666]">Public Administration · Food Safety · Quality Assurance</p>
        <a href="/" className="text-[11px] font-medium tracking-widest uppercase hover:underline inline-flex items-center gap-1">Back home <ArrowUpRight size={14} /></a>
      </footer>
    </div>
  );
}
