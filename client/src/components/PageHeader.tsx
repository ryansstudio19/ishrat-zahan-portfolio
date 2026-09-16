import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
}

export default function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-24 pb-12 glass-panel rounded-3xl p-8 md:p-12 mb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 max-w-3xl"
      >
        {eyebrow && (
          <p className="text-text-muted uppercase tracking-widest text-[11px] font-bold mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-main leading-tight mb-6">
          {title}
        </h1>
        {intro && (
          <p className="text-lg text-text-muted leading-relaxed max-w-2xl">
            {intro}
          </p>
        )}
      </motion.div>
    </section>
  );
}
