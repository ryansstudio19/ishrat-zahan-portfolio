import { useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  /** Max tilt in degrees. Keep small for a subtle, professional feel. */
  maxTilt?: number;
  /** How far the card lifts toward the viewer on hover, in px. */
  liftDepth?: number;
  glare?: boolean;
  role?: string;
  ariaLabel?: string;
  title?: string;
}

const prefersReducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * A real, pointer-driven 3D tilt card: rotates in perspective toward the
 * cursor (mouse) or a dragging finger (touch), lifts slightly toward the
 * viewer on hover, and shows a soft moving highlight — all built on
 * framer-motion, which is already a project dependency. Tap/press gets its
 * own subtle scale feedback so touch users get an equivalent animation.
 *
 * Deliberately renders as a SINGLE element carrying the caller's className
 * (border, padding, background, flex layout, etc.) so it drops into existing
 * flex/grid layouts without changing how children are arranged.
 */
export default function TiltCard({
  children,
  className = "",
  onClick,
  maxTilt = 9,
  liftDepth = 16,
  glare = true,
  role,
  ariaLabel,
  title,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const glareOpacity = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), springConfig);
  const glareBackground = useTransform([px, py], ([gx, gy]: number[]) =>
    `radial-gradient(circle at ${gx * 100}% ${gy * 100}%, rgba(255,255,255,0.45), rgba(255,255,255,0) 55%)`
  );

  function updateFromPoint(clientX: number, clientY: number) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set(Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1));
    py.set(Math.min(Math.max((clientY - rect.top) / rect.height, 0), 1));
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
  }

  if (prefersReducedMotion) {
    return (
      <div className={`relative ${className}`} onClick={onClick} role={role} aria-label={ariaLabel} title={title}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
      title={title}
      onPointerMove={(e: ReactPointerEvent<HTMLDivElement>) => updateFromPoint(e.clientX, e.clientY)}
      onPointerEnter={(e: ReactPointerEvent<HTMLDivElement>) => {
        const fine = e.pointerType === "mouse";
        setIsFinePointer(fine);
        if (fine) glareOpacity.set(1);
      }}
      onPointerLeave={reset}
      onPointerUp={reset}
      onPointerCancel={reset}
      whileHover={{ scale: 1.02, z: liftDepth }}
      whileTap={{ scale: 0.975, z: liftDepth * 0.4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        touchAction: "manipulation",
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}

      {glare && isFinePointer && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBackground, opacity: glareOpacity, mixBlendMode: "overlay" }}
        />
      )}
    </motion.div>
  );
}
