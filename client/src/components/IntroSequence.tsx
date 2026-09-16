import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

const PHASES = [
  { threshold: 0, text: "INITIALIZING REPOSITORY ARCHIVE" },
  { threshold: 22, text: "COMPILING REGULATORY & QA FRAMEWORKS" },
  { threshold: 48, text: "CALIBRATING 3D PERSPECTIVE MATRICES" },
  { threshold: 74, text: "SYNCHRONIZING STATUTORY CREDENTIALS" },
  { threshold: 92, text: "FINALIZING ATMOSPHERIC RENDERING" },
  { threshold: 100, text: "CLEARANCE GRANTED · WELCOME" },
];

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [statusText, setStatusText] = useState(PHASES[0].text);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Canvas ambient particle field for the intro
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate 3D perspective particles
    const particleCount = 70;
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * width * 1.5,
      y: (Math.random() - 0.5) * height * 1.5,
      z: Math.random() * 1000 + 100,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? 'rgba(255, 255, 255,' : 'rgba(45, 122, 93,',
    }));

    const render = () => {
      ctx.fillStyle = 'rgba(15, 20, 20, 0.25)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 400;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.z -= 2.2;
        if (p.z <= 10) {
          p.z = 1000;
          p.x = (Math.random() - 0.5) * width * 1.5;
          p.y = (Math.random() - 0.5) * height * 1.5;
        }

        const k = fov / p.z;
        const px = cx + p.x * k;
        const py = cy + p.y * k;
        const radius = Math.max(0.6, p.size * k);
        const alpha = Math.min(1, (1000 - p.z) / 800) * 0.7;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${alpha})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // 0 to 100 Counter Simulation
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    let current = 0;
    const interval = setInterval(() => {
      // Nonlinear progress step to feel organic
      const remaining = 100 - current;
      const step = Math.max(0.7, Math.min(remaining * 0.12, Math.random() * 3.5 + 1.2));
      current = Math.min(100, current + step);
      setProgress(Math.floor(current));

      // Update Phase text
      const currentPhase = [...PHASES].reverse().find(p => current >= p.threshold);
      if (currentPhase) {
        setStatusText(currentPhase.text);
      }

      if (current >= 100) {
        clearInterval(interval);
        setIsCompleted(true);
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    }, 38);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  const formattedCount = String(progress).padStart(2, '0');

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-[#0c1010] text-[#f7f7f3] flex flex-col justify-between overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        transition: {
          duration: 0.95,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
    >
      {/* 3D Dynamic Starfield / Depth Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-40"
      />

      {/* Subtle radial ambient atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(45,122,93,0.18)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(201,162,39,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 w-full px-8 py-8 md:px-16 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 flex items-center justify-center border border-white/30 font-serif text-sm tracking-tighter text-white">
            IZ
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] tracking-[0.28em] uppercase font-bold text-white/90">
              Mst. Ishrat Zahan
            </span>
            <span className="text-[8px] tracking-[0.2em] uppercase text-white/50">
              Bangladesh Civil Service · Dossier
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d7a5d] animate-pulse" />
            <span>Interactive 3D Engine</span>
          </div>

          <button
            onClick={handleSkip}
            className="group px-4 py-2 text-[9px] uppercase tracking-[0.2em] font-bold border border-white/20 bg-white/5 hover:bg-white hover:text-[#0c1010] transition-all duration-300 rounded-sm flex items-center gap-2"
          >
            <span>Skip Intro</span>
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </header>

      {/* Central Hero Reveal */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto w-full">
        {/* Monogram / Seal Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 relative"
        >
          <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center relative backdrop-blur-sm bg-white/[0.02]">
            <ShieldCheck size={28} className="text-[#2d7a5d]" />
            {/* Spinning decorative ring */}
            <div className="absolute inset-0 rounded-full border-t border-[#c9a227] animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </motion.div>

        {/* Title Stagger */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.05]"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            Mst. Ishrat Zahan
          </motion.h1>
        </div>

        {/* Subtitle / Department */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/60 mb-10"
        >
          <span>Department of Food</span>
          <span className="w-1 h-1 rounded-full bg-[#c9a227]" />
          <span>Ministry of Food</span>
          <span className="w-1 h-1 rounded-full bg-[#2d7a5d]" />
          <span>Quality Assurance</span>
        </motion.div>

        {/* Central Giant Counter (0 to 100) */}
        <div className="relative flex items-baseline justify-center gap-1 font-mono tracking-tight my-2">
          <span className="font-serif text-6xl sm:text-8xl md:text-9xl font-light text-white tracking-tighter tabular-nums drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            {formattedCount}
          </span>
          <span className="font-mono text-xl sm:text-2xl text-[#2d7a5d] font-semibold">
            %
          </span>
        </div>

        {/* Dynamic Telemetry Status */}
        <motion.div
          key={statusText}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-[10px] uppercase tracking-[0.24em] text-white/70 flex items-center justify-center gap-2 mt-4 font-mono h-6"
        >
          <Sparkles size={11} className="text-[#c9a227]" />
          <span>{statusText}</span>
        </motion.div>
      </main>

      {/* Bottom Precision Progress Bar & Telemetry */}
      <footer className="relative z-10 w-full px-8 md:px-16 pb-8 pt-4 border-t border-white/10 bg-[#0c1010]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          {/* Progress track */}
          <div className="w-full h-[3px] bg-white/15 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#2d7a5d] via-[#c9a227] to-white rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
            {/* Glowing laser head */}
            <motion.div
              className="absolute top-[-2px] bottom-[-2px] w-6 bg-white blur-[2px] rounded-full"
              style={{ left: `calc(${progress}% - 12px)` }}
            />
          </div>

          <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.22em] text-white/50 font-mono">
            <div className="flex items-center gap-3">
              <span>LAT: 23.8103° N</span>
              <span>LON: 90.4125° E</span>
              <span className="hidden md:inline">BANGLADESH</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white/80 font-bold">STATE:</span>
              <span className={isCompleted ? "text-emerald-400 font-bold" : "text-amber-300"}>
                {isCompleted ? "SYNCHRONIZED" : "STREAMING 3D ASSETS"}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
