import { ArrowUpRight, ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type SubpageLayoutProps = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  children: ReactNode;
};

function RouteCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    let raf = 0;
    const move = (event: PointerEvent) => { x = event.clientX; y = event.clientY; document.documentElement.classList.add("cursor-is-visible"); };
    const enter = () => document.documentElement.classList.add("cursor-is-hovering");
    const leave = () => document.documentElement.classList.remove("cursor-is-hovering");
    const tick = () => { ringX += (x - ringX) * .13; ringY += (y - ringY) * .13; dot.style.transform = `translate3d(${x}px,${y}px,0)`; ring.style.transform = `translate3d(${ringX}px,${ringY}px,0)`; raf = requestAnimationFrame(tick); };
    window.addEventListener("pointermove", move, { passive: true });
    document.querySelectorAll<HTMLElement>("a, button, input, textarea").forEach((element) => { element.addEventListener("pointerenter", enter); element.addEventListener("pointerleave", leave); });
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", move); document.documentElement.classList.remove("cursor-is-visible", "cursor-is-hovering"); document.querySelectorAll<HTMLElement>("a, button, input, textarea").forEach((element) => { element.removeEventListener("pointerenter", enter); element.removeEventListener("pointerleave", leave); }); };
  }, []);

  return <><div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" /><div ref={ringRef} className="custom-cursor-ring" aria-hidden="true"><span /></div></>;
}

export default function SubpageLayout({ eyebrow, title, intro, children }: SubpageLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <div className="site-shell subpage-shell">
      <RouteCursor />
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
