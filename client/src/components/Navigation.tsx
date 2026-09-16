import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Compass, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/career", label: "Career" },
    { href: "/awards-certificates", label: "Credentials" },
    { href: "/expertise", label: "Expertise" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-8 md:px-12 py-5 pointer-events-none">
      {/* Luxury Glass masthead */}
      <div className="bg-[#faf8f5]/90 backdrop-blur-xl border border-[#ebe5dc] shadow-lg shadow-black/[0.03] rounded-full px-5 sm:px-7 py-3 flex items-center justify-between mx-auto max-w-7xl pointer-events-auto transition-all duration-300">
        <Link href="/" className="inline-flex items-center gap-3 no-underline text-[#121615] group" aria-label="Home">
          <img 
            src="/logo.png" 
            alt="Mst. Ishrat Zahan Logo" 
            className="w-8 h-8 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#121615] leading-tight">
              Ishrat Zahan
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#7a827e] hidden sm:block uppercase">
              BCS (Food) · Public Administration
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 lg:gap-8" aria-label="Primary navigation">
          {links.map(link => {
            const isActive = location === link.href;
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={`text-[11px] uppercase tracking-[0.18em] transition-all relative py-1 ${
                  isActive 
                    ? 'text-[#121615] font-bold' 
                    : 'text-[#616864] hover:text-[#121615] font-medium'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span 
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#1d4a38] rounded-full" 
                  />
                )}
              </Link>
            );
          })}

          <div className="h-4 w-[1px] bg-[#e2dcce]" />

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('replay-intro'))}
            title="Replay Cinematic Dossier Intro"
            className="text-[10px] uppercase tracking-[0.16em] font-semibold px-3.5 py-1.5 border border-[#d6cfc0] bg-white/80 hover:bg-[#121615] hover:text-white hover:border-[#121615] transition-all duration-300 rounded-full flex items-center gap-2 text-[#464c48] shadow-xs cursor-pointer group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d7a5d] group-hover:bg-[#4ade80] animate-pulse" />
            <span>Intro</span>
          </button>
        </nav>

        <button 
          className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-[#121615] hover:bg-[#eae4d8] transition-colors" 
          onClick={() => setIsOpen(!isOpen)} 
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -10, scale: 0.98 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="absolute top-[76px] left-4 right-4 bg-[#faf8f5]/98 backdrop-blur-2xl border border-[#ebe5dc] rounded-2xl flex flex-col p-6 shadow-2xl md:hidden pointer-events-auto"
          >
            {links.map(link => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`flex items-center justify-between py-3.5 text-xs font-semibold uppercase tracking-widest border-b border-[#eee8dc] last:border-0 ${
                  location === link.href ? 'text-[#1d4a38] font-bold' : 'text-[#2a2e2c]'
                }`} 
                onClick={() => setIsOpen(false)}
              >
                <span>{link.label}</span>
                <span className="text-[10px] text-[#999] font-mono">→</span>
              </Link>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                window.dispatchEvent(new CustomEvent('replay-intro'));
              }}
              className="mt-4 flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-widest font-bold bg-[#121615] text-[#fbfaf7] rounded-xl shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#2d7a5d] animate-pulse" />
              Replay Dossier Intro
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
