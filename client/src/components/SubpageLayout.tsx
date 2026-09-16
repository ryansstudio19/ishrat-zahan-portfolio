import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import AtmosphereBackground from "@/components/AtmosphereBackground";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

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
    <div className="min-h-screen bg-[#FDFCF8] text-[#1a1a1a] font-sans selection:bg-[#1a1a1a] selection:text-white">
      <header className={`relative z-50 flex items-center justify-between px-6 md:px-12 py-6 border-b border-[#e5e5e5] bg-[#FDFCF8]`}>
        <Link className="inline-flex items-center gap-3 no-underline text-[#1a1a1a] group" href="/" onClick={close} aria-label="Ishrat Zahan home">
          <span className="w-8 h-8 flex items-center justify-center border border-[#1a1a1a] font-serif text-sm group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors duration-300">IZ</span>
          <span className="text-xs font-semibold tracking-widest uppercase">Ishrat Zahan</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          <Link href="/career" className="text-[11px] font-medium uppercase tracking-widest text-[#666] hover:text-[#1a1a1a] transition-colors relative group">
            Career
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#1a1a1a] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/awards-certificates" className="text-[11px] font-medium uppercase tracking-widest text-[#666] hover:text-[#1a1a1a] transition-colors relative group">
            Credentials
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#1a1a1a] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/expertise" className="text-[11px] font-medium uppercase tracking-widest text-[#666] hover:text-[#1a1a1a] transition-colors relative group">
            Expertise
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#1a1a1a] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/about" className="text-[11px] font-medium uppercase tracking-widest text-[#666] hover:text-[#1a1a1a] transition-colors relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#1a1a1a] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/contact" className="text-[11px] font-medium uppercase tracking-widest text-[#666] hover:text-[#1a1a1a] transition-colors relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#1a1a1a] transition-all group-hover:w-full"></span>
          </Link>
        </nav>

        <button className="md:hidden w-10 h-10 flex items-center justify-center border border-[#e5e5e5] text-[#1a1a1a]" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-[#FDFCF8] border-b border-[#e5e5e5] flex flex-col p-6 shadow-xl" aria-label="Mobile navigation"
            >
              <Link href="/career" className="flex items-center justify-between py-4 text-sm font-medium uppercase tracking-widest text-[#1a1a1a] border-b border-[#e5e5e5]" onClick={close}>Career <ArrowUpRight size={16} /></Link>
              <Link href="/awards-certificates" className="flex items-center justify-between py-4 text-sm font-medium uppercase tracking-widest text-[#1a1a1a] border-b border-[#e5e5e5]" onClick={close}>Credentials <ArrowUpRight size={16} /></Link>
              <Link href="/expertise" className="flex items-center justify-between py-4 text-sm font-medium uppercase tracking-widest text-[#1a1a1a] border-b border-[#e5e5e5]" onClick={close}>Expertise <ArrowUpRight size={16} /></Link>
              <Link href="/about" className="flex items-center justify-between py-4 text-sm font-medium uppercase tracking-widest text-[#1a1a1a] border-b border-[#e5e5e5]" onClick={close}>About <ArrowUpRight size={16} /></Link>
              <Link href="/contact" className="flex items-center justify-between py-4 text-sm font-medium uppercase tracking-widest text-[#1a1a1a]" onClick={close}>Contact <ArrowUpRight size={16} /></Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="pb-24">
        <section className="relative overflow-hidden px-6 md:px-12 pt-16 md:pt-24 pb-12">
          <AtmosphereBackground className="opacity-50" density="quiet" />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FDFCF8]"
            aria-hidden="true"
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 max-w-7xl mx-auto"
          >
            <div className="max-w-3xl">
              {eyebrow && <p className="text-[#666] uppercase tracking-widest text-[11px] font-bold mb-4 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2d7a5d] inline-block"></span>{eyebrow}</p>}
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-tight mb-6">{title}</h1>
              {intro && <p className="text-lg text-[#444] leading-relaxed max-w-2xl">{intro}</p>}
            </div>
          </motion.div>
        </section>
        
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      <footer className="border-t border-[#e5e5e5] px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-[#1a1a1a] bg-[#FDFCF8]">
        <div className="flex items-center gap-3 group">
          <span className="w-8 h-8 flex items-center justify-center border border-[#1a1a1a] font-serif text-sm group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors duration-300">IZ</span>
          <span className="text-xs font-semibold tracking-widest uppercase">Mst. Ishrat Zahan</span>
        </div>
        <div className="text-[11px] tracking-widest uppercase text-[#666] text-center">
          © {new Date().getFullYear()} Mst. Ishrat Zahan — Bangladesh Civil Service
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('replay-intro'))}
            className="text-[11px] font-medium tracking-widest uppercase text-[#666] hover:text-[#1a1a1a] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d7a5d] animate-pulse" />
            Replay Intro
          </button>
          <Link href="/" className="text-[11px] font-medium tracking-widest uppercase group flex items-center gap-1 hover:text-[#666] transition-colors">
            Back home <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
