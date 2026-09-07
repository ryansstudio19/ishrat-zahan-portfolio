import { useEffect, useRef, useState, type FormEvent } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleCheck,
  Download,
  ExternalLink,
  FileCheck2,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Menu,
  Quote,
  Send,
  ShieldCheck,
  Sparkles,
  Wheat,
  X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const credentials = [
  {
    code: "HACCP",
    title: "Hazard Analysis & Critical Control Points",
    issuer: "Food safety systems",
    detail: "Risk-led controls for safe, auditable food operations.",
    icon: ShieldCheck,
    tone: "gold",
  },
  {
    code: "USDA",
    title: "USDA Food Safety Training",
    issuer: "United States Department of Agriculture",
    detail: "International training in compliance, hygiene and inspection practice.",
    icon: Wheat,
    tone: "emerald",
  },
  {
    code: "UN / FAO",
    title: "Food & Agriculture Training",
    issuer: "United Nations / FAO learning track",
    detail: "Global perspective on resilient food systems and public value.",
    icon: Award,
    tone: "gold",
  },
  {
    code: "ANABIN H+",
    title: "Academic Verification",
    issuer: "German higher-education recognition",
    detail: "MSc credentials verified through the Anabin H+ institution listing.",
    icon: GraduationCap,
    tone: "emerald",
  },
];

const expertise = [
  "Food safety compliance",
  "Quality assurance management",
  "Public-sector administration",
  "Inspection & audit readiness",
  "HACCP implementation",
  "Stakeholder coordination",
  "Training & capacity building",
  "Documentation & reporting",
];

const career = [
  {
    period: "Present",
    role: "Senior public administration & quality assurance",
    organization: "Department of Food · Ministry of Food",
    location: "Gangni, Meherpur, Bangladesh",
    copy: "Leading operational quality, compliance documentation and field-facing coordination in a public food system.",
  },
  {
    period: "Academic foundation",
    role: "Master of Science",
    organization: "Islamic University",
    location: "Kushtia, Bangladesh",
    copy: "A research-led foundation in disciplined analysis, institutional systems and accountable decision-making.",
  },
];

function CredentialScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0, 8.4);

    const isSmallViewport = window.matchMedia("(max-width: 680px)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isSmallViewport && !isCoarsePointer, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmallViewport || isCoarsePointer ? 1 : 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    root.rotation.set(-0.06, 0.02, -0.08);
    scene.add(root);

    scene.add(new THREE.AmbientLight(0x8b9b96, 1.3));
    const warmLight = new THREE.PointLight(0xd3a85b, 6, 14);
    warmLight.position.set(3.2, 2.8, 4.8);
    scene.add(warmLight);
    const greenLight = new THREE.PointLight(0x3b8f71, 5, 12);
    greenLight.position.set(-3.5, -2.2, 2.5);
    scene.add(greenLight);

    const bronze = new THREE.MeshStandardMaterial({
      color: 0x9f7b3d,
      metalness: 0.84,
      roughness: 0.25,
      emissive: 0x2c1904,
      emissiveIntensity: 0.18,
    });
    const deepBronze = new THREE.MeshStandardMaterial({
      color: 0x4a351d,
      metalness: 0.76,
      roughness: 0.32,
      emissive: 0x120a03,
      emissiveIntensity: 0.25,
    });

    const medallion = new THREE.Mesh(new THREE.CylinderGeometry(1.48, 1.48, 0.18, 96), bronze);
    medallion.rotation.x = Math.PI / 2;
    root.add(medallion);

    const innerDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.2, 0.12, 96),
      new THREE.MeshStandardMaterial({ color: 0x122c28, metalness: 0.55, roughness: 0.38, emissive: 0x09201b, emissiveIntensity: 0.22 }),
    );
    innerDisc.rotation.x = Math.PI / 2;
    innerDisc.position.z = 0.12;
    root.add(innerDisc);

    const sealTextureCanvas = document.createElement("canvas");
    sealTextureCanvas.width = 512;
    sealTextureCanvas.height = 512;
    const ctx = sealTextureCanvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 512, 512);
      ctx.strokeStyle = "rgba(231, 194, 119, .76)";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(256, 256, 190, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(256, 256, 166, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#e7c277";
      ctx.textAlign = "center";
      ctx.font = "600 148px Georgia, serif";
      ctx.fillText("IZ", 256, 300);
      ctx.font = "600 18px Arial, sans-serif";
      ctx.letterSpacing = "5px";
      ctx.fillText("PUBLIC SERVICE", 256, 130);
      ctx.font = "500 15px Arial, sans-serif";
      ctx.fillText("FOOD · QUALITY · TRUST", 256, 404);
    }
    const sealTexture = new THREE.CanvasTexture(sealTextureCanvas);
    sealTexture.colorSpace = THREE.SRGBColorSpace;
    const seal = new THREE.Mesh(
      new THREE.PlaneGeometry(2.35, 2.35),
      new THREE.MeshBasicMaterial({ map: sealTexture, transparent: true, opacity: 0.96, depthWrite: false }),
    );
    seal.position.z = 0.24;
    root.add(seal);

    const ringSegments = isSmallViewport || isCoarsePointer ? 72 : 144;
    const outerRing = new THREE.Mesh(new THREE.TorusGeometry(1.82, 0.024, 8, ringSegments), deepBronze);
    root.add(outerRing);
    const innerRing = new THREE.Mesh(new THREE.TorusGeometry(1.36, 0.012, 6, isSmallViewport || isCoarsePointer ? 64 : 128), new THREE.MeshBasicMaterial({ color: 0xe7c277, transparent: true, opacity: 0.75 }));
    innerRing.position.z = 0.16;
    root.add(innerRing);

    const ringGroups: THREE.Group[] = [];
    const ringTints = [0xd3a85b, 0x69b597, 0xe7c277, 0x4c9577];
    const ringTilts = [
      [0.28, 0.14, 0.1],
      [-0.4, 0.24, -0.18],
      [0.16, -0.48, 0.28],
      [-0.2, -0.2, -0.5],
    ];
    const ringSpeeds = [0.32, -0.21, 0.14, -0.27];

    ringTilts.forEach((tilt, index) => {
      const group = new THREE.Group();
      group.rotation.set(tilt[0], tilt[1], tilt[2]);
      const radius = 2.07 + index * 0.16;
      const ringMaterial = new THREE.MeshBasicMaterial({ color: ringTints[index], transparent: true, opacity: 0.58 });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, index % 2 === 0 ? 0.016 : 0.01, 6, isSmallViewport || isCoarsePointer ? 72 : 160), ringMaterial);
      group.add(ring);

      const node = new THREE.Mesh(
        new THREE.SphereGeometry(index === 0 ? 0.075 : 0.055, isSmallViewport || isCoarsePointer ? 8 : 16, isSmallViewport || isCoarsePointer ? 8 : 16),
        new THREE.MeshBasicMaterial({ color: ringTints[index], transparent: true, opacity: 0.95 }),
      );
      node.position.set(radius, 0, 0);
      group.add(node);

      const nodeGlow = new THREE.Mesh(
        new THREE.SphereGeometry(index === 0 ? 0.15 : 0.12, isSmallViewport || isCoarsePointer ? 8 : 16, isSmallViewport || isCoarsePointer ? 8 : 16),
        new THREE.MeshBasicMaterial({ color: ringTints[index], transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending }),
      );
      nodeGlow.position.copy(node.position);
      group.add(nodeGlow);
      group.userData.speed = ringSpeeds[index];
      ringGroups.push(group);
      root.add(group);
    });

    const particleCount = isSmallViewport || isCoarsePointer ? 56 : 240;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      const radius = 3.2 + Math.random() * 3.4;
      const angle = Math.random() * Math.PI * 2;
      particlePositions[i3] = Math.cos(angle) * radius;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 7.2;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 4.4 - 1.4;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0xc49b55, size: 0.025, transparent: true, opacity: 0.55, depthWrite: false }),
    );
    scene.add(particles);

    let pointerX = 0;
    let pointerY = 0;
    const handlePointer = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!isCoarsePointer) window.addEventListener("pointermove", handlePointer, { passive: true });

    const resize = () => {
      const width = mount.clientWidth || window.innerWidth;
      const height = mount.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const scrollTrigger = reducedMotion ? null : ScrollTrigger.create({
      start: 0,
      end: "max",
      scrub: true,
      onUpdate: ({ progress }) => {
        root.position.y = -progress * 0.75;
        root.position.x = progress * 0.42;
        root.rotation.z = -0.08 + progress * 0.72;
        root.rotation.x = -0.06 + progress * 0.18;
        root.scale.setScalar(1 - progress * 0.22);
        const opacity = 0.96 - progress * 0.48;
        root.traverse((object) => {
          const material = (object as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined;
          if (Array.isArray(material)) material.forEach((item) => (item.opacity = opacity));
          else if (material && "opacity" in material) material.opacity = opacity;
        });
        particles.material.opacity = 0.55 - progress * 0.24;
      },
    });

    let animationFrame = 0;
    let isPageVisible = document.visibilityState === "visible";
    let isSceneVisible = true;
    let frameSkip = 0;
    const handleVisibility = () => { isPageVisible = document.visibilityState === "visible"; };
    const sceneObserver = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => { isSceneVisible = entry.isIntersecting; }) : null;
    sceneObserver?.observe(mount);
    document.addEventListener("visibilitychange", handleVisibility);
    const clock = new THREE.Clock();
    const animate = () => {
      if (!isPageVisible || !isSceneVisible) {
        animationFrame = window.requestAnimationFrame(animate);
        return;
      }
      if ((isSmallViewport || isCoarsePointer) && frameSkip++ % 2 === 1) {
        animationFrame = window.requestAnimationFrame(animate);
        return;
      }
      const elapsed = clock.getElapsedTime();
      if (!reducedMotion) {
        ringGroups.forEach((group) => {
          group.rotation.z += (group.userData.speed as number) * 0.004;
          group.rotation.y += (group.userData.speed as number) * 0.0017;
        });
        outerRing.rotation.z -= 0.0012;
        innerRing.rotation.z += 0.0018;
        particles.rotation.y = elapsed * 0.018;
        particles.position.y = Math.sin(elapsed * 0.18) * 0.04;
        root.rotation.y += (pointerX * 0.12 - root.rotation.y) * 0.035;
        root.rotation.x += (-pointerY * 0.07 - root.rotation.x) * 0.035;
      }
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", handlePointer);
      document.removeEventListener("visibilitychange", handleVisibility);
      sceneObserver?.disconnect();
      window.removeEventListener("resize", resize);
      scrollTrigger?.kill();
      sealTexture.dispose();
      particleGeometry.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="scene-mount" aria-label="Animated credential seal with orbiting certification rings" role="img" />;
}

/**
 * Lightweight canvas atmosphere: isolated from the main Three.js seal so it can
 * run as a low-cost background layer and remain safe around responsive content.
 */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const pointer = { x: -1000, y: -1000, active: false };
    const particles: Array<{ x: number; y: number; z: number; vx: number; vy: number; size: number; hue: number }> = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, width < 680 || isCoarsePointer ? 1 : 1.5);
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const targetCount = width < 680 ? 32 : 105;
      particles.length = 0;
      for (let i = 0; i < targetCount; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: 0.35 + Math.random() * 0.9,
          vx: (Math.random() - 0.5) * 0.11,
          vy: (Math.random() - 0.5) * 0.11,
          size: 0.55 + Math.random() * 1.3,
          hue: Math.random() > 0.7 ? 42 : 158,
        });
      }
    };

    const handlePointer = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };
    const clearPointer = () => { pointer.active = false; };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    if (!isCoarsePointer) {
      window.addEventListener("pointermove", handlePointer, { passive: true });
      window.addEventListener("pointerleave", clearPointer, { passive: true });
    }

    let renderTick = 0;
    let pageVisible = document.visibilityState === "visible";
    const handleVisibility = () => { pageVisible = document.visibilityState === "visible"; };
    document.addEventListener("visibilitychange", handleVisibility);
    const render = (time: number) => {
      if (!pageVisible || (width < 680 && renderTick++ % 2 === 1)) {
        frame = window.requestAnimationFrame(render);
        return;
      }
      context.clearRect(0, 0, width, height);
      const t = time * 0.00035;
      particles.forEach((particle) => {
        if (!reducedMotion) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (pointer.active && distance < 190) {
            const force = (1 - distance / 190) * 0.018;
            particle.vx += (dx / Math.max(distance, 1)) * force;
            particle.vy += (dy / Math.max(distance, 1)) * force;
          }
          particle.vx += Math.sin(t + particle.y * 0.006) * 0.0007;
          particle.vy += Math.cos(t + particle.x * 0.005) * 0.0007;
          particle.vx *= 0.993;
          particle.vy *= 0.993;
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < -20) particle.x = width + 20;
          if (particle.x > width + 20) particle.x = -20;
          if (particle.y < -20) particle.y = height + 20;
          if (particle.y > height + 20) particle.y = -20;
        }
        const alpha = 0.16 + particle.z * 0.15;
        const glow = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 8);
        glow.addColorStop(0, `hsla(${particle.hue}, 74%, 62%, ${alpha})`);
        glow.addColorStop(1, `hsla(${particle.hue}, 74%, 62%, 0)`);
        context.fillStyle = glow;
        context.fillRect(particle.x - particle.size * 8, particle.y - particle.size * 8, particle.size * 16, particle.size * 16);
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size * particle.z, 0, Math.PI * 2);
        context.fillStyle = `hsla(${particle.hue}, 78%, 70%, ${alpha + 0.1})`;
        context.fill();
      });
      frame = window.requestAnimationFrame(render);
    };
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("pointerleave", clearPointer);
    };
  }, []);

  return <canvas ref={canvasRef} id="3d-particles-bg" aria-hidden="true" />;
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let frame = 0;

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      document.documentElement.classList.add("cursor-is-visible");
    };
    const leave = () => document.documentElement.classList.remove("cursor-is-visible");
    const enterInteractive = () => document.documentElement.classList.add("cursor-is-hovering");
    const leaveInteractive = () => document.documentElement.classList.remove("cursor-is-hovering");

    const animate = () => {
      ringX += (targetX - ringX) * 0.13;
      ringY += (targetY - ringY) * 0.13;
      cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", leave, { passive: true });
    document.querySelectorAll<HTMLElement>("a, button, input, textarea, [data-cursor]").forEach((element) => {
      element.addEventListener("pointerenter", enterInteractive, { passive: true });
      element.addEventListener("pointerleave", leaveInteractive, { passive: true });
    });
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("cursor-is-visible", "cursor-is-hovering");
      document.querySelectorAll<HTMLElement>("a, button, input, textarea, [data-cursor]").forEach((element) => {
        element.removeEventListener("pointerenter", enterInteractive);
        element.removeEventListener("pointerleave", leaveInteractive);
      });
    };
  }, []);

  return <><div ref={cursorRef} className="custom-cursor-dot" aria-hidden="true" /><div ref={ringRef} className="custom-cursor-ring" aria-hidden="true"><span /></div></>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState<number | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [introProgress, setIntroProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const introDuration = reducedMotion ? 450 : 3600;
    const introStart = performance.now();
    let progressFrame = 0;
    const updateProgress = (now: number) => {
      const rawProgress = Math.min((now - introStart) / introDuration, 1);
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
      setIntroProgress(Math.round(easedProgress * 100));
      if (rawProgress < 1) progressFrame = window.requestAnimationFrame(updateProgress);
      else setIntroComplete(true);
    };
    progressFrame = window.requestAnimationFrame(updateProgress);
    if (reducedMotion || !heroRef.current) return () => {
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(progressFrame);
    };
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-reveal", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.09, ease: "power3.out", delay: 0.18 });
      gsap.fromTo(".hero-side-note", { x: 16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.6 });
    }, heroRef);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(progressFrame);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!introComplete) return;
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introComplete]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(true);
  };

  const introStatus = introProgress < 35 ? "Initializing archive" : introProgress < 75 ? "Mapping credentials" : "Opening experience";

  return (
    <div className={`site-shell ${introComplete ? "" : "intro-active"}`}>
      <div className="grain" aria-hidden="true" />
      <div className={`intro-loader ${introComplete ? "is-complete" : ""}`} aria-hidden={introComplete}>
        <div className="intro-loader-top"><span className="brand-mark">IZ</span><span className="intro-loader-meta">ISH / 001 — PORTFOLIO SYSTEM</span><span className="intro-top-status"><i />Live / Bangladesh</span></div>
        <div className="intro-loader-center">
          <div className="intro-kicker"><span>Senior public administrator</span><span>Food safety &amp; quality assurance</span></div>
          <div className="intro-loader-title"><span className="intro-title-line">Mst. Ishrat</span><span className="intro-title-line intro-title-accent">Zahan</span></div>
          <div className="intro-loader-rule" />
          <p className="intro-loader-subtitle">A considered record of<br /><em>public trust.</em></p>
          <div className="intro-orbit" aria-hidden="true"><span className="intro-orbit-ring intro-orbit-ring-one" /><span className="intro-orbit-ring intro-orbit-ring-two" /><span className="intro-orbit-ring intro-orbit-ring-three" /><span className="intro-orbit-node intro-node-one" /><span className="intro-orbit-node intro-node-two" /><strong>IZ</strong></div>
        </div>
        <div className="intro-loader-bottom"><div className="intro-loader-status"><span>Preparing portfolio</span><span className="intro-status-detail">{introStatus}</span></div><span className="intro-progress"><i style={{ transform: `scaleX(${introProgress / 100})` }} /></span><strong className="intro-counter">{String(introProgress).padStart(2, "0")}<small>%</small></strong></div>
      </div>
      <ParticleField />
      <div className="ambient-orb ambient-orb-one" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-two" aria-hidden="true" />
      <div className="ambient-grid" aria-hidden="true" />
      <div className="scene-portal" aria-hidden="true"><CredentialScene /></div>

      <header className={`site-header ${menuOpen ? "menu-is-open" : ""}`}>
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)} aria-label="Ishrat Zahan home">
          <span className="brand-mark">IZ</span>
          <span className="brand-name">Ishrat Zahan</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="/career">Career</a>
          <a href="/awards-certificates">Awards &amp; certificates</a>
          <a href="/expertise">Expertise</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="header-actions">
          <span className="availability"><span className="status-dot" /> Available for advisory work</span>
          <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="/career" onClick={() => setMenuOpen(false)}>Career <ArrowUpRight size={15} /></a>
            <a href="/awards-certificates" onClick={() => setMenuOpen(false)}>Awards &amp; certificates <ArrowUpRight size={15} /></a>
            <a href="/expertise" onClick={() => setMenuOpen(false)}>Expertise <ArrowUpRight size={15} /></a>
            <a href="/contact" onClick={() => setMenuOpen(false)}>Contact <ArrowUpRight size={15} /></a>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero-section" ref={heroRef}>
          <div className="hero-grid site-container">
            <div className="hero-copy">
              <p className="eyebrow hero-reveal">Public administration · Food safety · Quality assurance</p>
              <h1 className="hero-title hero-reveal">A disciplined career,<br /><em>in service of trust.</em></h1>
              <p className="hero-description hero-reveal">Mst. Ishrat Zahan is a senior public administrator and food safety professional building resilient systems where evidence, compliance and human responsibility meet.</p>
              <div className="hero-actions hero-reveal">
                <button className="button button-primary" onClick={() => scrollTo("career")}>Explore the record <ArrowDownRight size={16} /></button>
                <a className="text-link" href="/cv-placeholder.pdf" download>Download CV <Download size={15} /></a>
              </div>
              <div className="hero-metrics hero-reveal">
                <div><strong>01</strong><span>Public food system</span></div>
                <div><strong>04</strong><span>Verified credentials</span></div>
                <div><strong>02</strong><span>Working languages</span></div>
              </div>
            </div>
            <div className="hero-aside hero-side-note">
              <div className="photo-slot photo-slot-hero">
                <img className="portrait-image portrait-hero-image" src="/manus-storage/ishrat-zahan-portrait_7e992ace.jpg" alt="Mst. Ishrat Zahan standing outdoors" />
                <div className="portrait-overlay"><span>MST. ISHRAT ZAHAN</span><strong>Public service<br />with purpose</strong></div>
                <span className="slot-corner slot-corner-tl" /><span className="slot-corner slot-corner-br" />
              </div>
              <div className="hero-caption"><span className="caption-line" /><span>Gangni · Meherpur<br />Bangladesh</span><MapPin size={15} /></div>
            </div>
          </div>
        </section>

        <section className="intro-section section-padding" id="career">
          <div className="site-container section-grid">
            <div className="section-label"><span className="section-number">01</span><span>Career record</span></div>
            <div className="section-body">
              <div className="section-heading-row">
                <div><p className="eyebrow">A public system, seen from the inside</p><h2>Work that moves<br /><em>with accountability.</em></h2></div>
                <p className="section-lead">Every operational detail is a promise to the public. Ishrat’s work connects field realities to clear standards, stronger documentation and food systems people can trust.</p>
              </div>
              <div className="career-list">
                {career.map((item, index) => (
                  <article className="career-item" key={item.role}>
                    <div className="career-index">0{index + 1}</div>
                    <div className="career-period">{item.period}</div>
                    <div className="career-main"><h3>{item.role}</h3><p className="career-org">{item.organization}</p><p>{item.copy}</p></div>
                    <div className="career-location"><MapPin size={14} />{item.location}</div>
                  </article>
                ))}
              </div>
              <div className="about-strip">
                <div className="photo-slot photo-slot-about"><img className="portrait-image portrait-about-image" src="/manus-storage/ishrat-zahan-portrait_7e992ace.jpg" alt="Portrait of Mst. Ishrat Zahan" /><div className="portrait-overlay"><span>ABOUT / PORTRAIT</span></div></div>
                <div><p className="eyebrow">A considered practice</p><p className="about-copy">Her approach is deliberately connective: translate standards into daily behavior, make compliance legible, and leave every institution stronger than it was found.</p></div>
                <div className="quote-mark"><Quote size={30} /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="credentials-section section-padding" id="credentials">
          <div className="site-container section-grid">
            <div className="section-label"><span className="section-number">02</span><span>Credential atlas</span></div>
            <div className="section-body">
              <div className="section-heading-row credentials-heading"><div><p className="eyebrow">The orbit of verified practice</p><h2>Proof, not<br /><em>performance.</em></h2></div><p className="section-lead">Four rings. Four distinct signals of rigor. Hover, or tap, each credential to open its place in the record.</p></div>
              <div className="credential-grid">
                {credentials.map((credential, index) => {
                  const Icon = credential.icon;
                  return <button className={`credential-card credential-${credential.tone}`} key={credential.code} onClick={() => setActiveCertificate(index)} aria-label={`Open ${credential.code} credential detail`}>
                    <div className="credential-top"><span className="credential-code">{credential.code}</span><Icon size={19} /></div>
                    <h3>{credential.title}</h3>
                    <p className="credential-issuer">{credential.issuer}</p>
                    <p className="credential-detail">{credential.detail}</p>
                    <span className="credential-open">View record <ArrowUpRight size={14} /></span>
                  </button>;
                })}
              </div>
              <div className="certificate-gallery-slot"><div><FileCheck2 size={18} /><span>Certificate gallery slot</span></div><p>Ready for scanned USDA, UN / FAO, Anabin and MSc documents.</p><span className="gallery-status">Awaiting uploads</span></div>
            </div>
          </div>
        </section>

        <section className="expertise-section section-padding" id="expertise">
          <div className="site-container section-grid">
            <div className="section-label"><span className="section-number">03</span><span>Expertise / languages</span></div>
            <div className="section-body">
              <div className="section-heading-row"><div><p className="eyebrow">A practical intelligence</p><h2>Built for the<br /><em>details between.</em></h2></div><p className="section-lead">Quality is rarely one grand gesture. It is the habit of seeing the gap, naming the risk and improving the system around it.</p></div>
              <div className="expertise-layout">
                <div className="expertise-list">{expertise.map((item, index) => <div className="expertise-item" key={item}><span>0{index + 1}</span><span>{item}</span><ArrowUpRight size={16} /></div>)}</div>
                <div className="language-panel"><div className="language-icon"><Languages size={22} /></div><p className="eyebrow">Language status</p><div className="language-row"><div><strong>English</strong><span>Professional working proficiency</span></div><CircleCheck size={18} /></div><div className="language-row"><div><strong>German</strong><span>Learning / academic pathway</span></div><CircleCheck size={18} /></div><div className="language-note"><Sparkles size={15} />Communication that makes standards usable.</div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section section-padding" id="contact">
          <div className="site-container section-grid">
            <div className="section-label"><span className="section-number">04</span><span>Contact</span></div>
            <div className="section-body contact-layout">
              <div className="contact-copy"><p className="eyebrow">Open to thoughtful exchange</p><h2>Let’s make the<br /><em>next standard clear.</em></h2><p>For advisory conversations, institutional collaboration or professional enquiries, leave a note. This form is a ready-to-connect placeholder for your preferred email workflow.</p><div className="contact-details"><a href="mailto:ishrat.zahan@example.com"><Mail size={16} />ishrat.zahan@example.com</a><span><MapPin size={16} />Bangladesh · GMT +06:00</span></div></div>
              <form className="contact-form" onSubmit={submitForm}><div className="field-row"><label><span>Name</span><input required name="name" placeholder="Your name" /></label><label><span>Email</span><input required type="email" name="email" placeholder="you@example.com" /></label></div><label><span>Subject</span><input required name="subject" placeholder="What would you like to discuss?" /></label><label><span>Message</span><textarea required name="message" rows={5} placeholder="A few considered lines..." /></label><button className="button button-primary" type="submit">{formSent ? "Message ready to send" : "Send enquiry"} {formSent ? <Check size={16} /> : <Send size={16} />}</button>{formSent && <p className="form-success"><CircleCheck size={15} />Thank you — your enquiry is captured in this demo flow.</p>}</form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="site-container footer-inner"><div className="footer-brand"><span className="brand-mark">IZ</span><span>Mst. Ishrat Zahan</span></div><p>Public administration · Food safety · Quality assurance</p><a href="#top">Back to top <ArrowUpRight size={14} /></a></div></footer>

      {activeCertificate !== null && <div className="modal-backdrop" role="presentation" onClick={() => setActiveCertificate(null)}><div className="credential-modal" role="dialog" aria-modal="true" aria-labelledby="credential-modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setActiveCertificate(null)} aria-label="Close credential detail"><X size={18} /></button><div className="modal-seal"><Award size={23} /></div><p className="eyebrow">Credential record · {credentials[activeCertificate].code}</p><h2 id="credential-modal-title">{credentials[activeCertificate].title}</h2><p className="modal-issuer">{credentials[activeCertificate].issuer}</p><p>{credentials[activeCertificate].detail} This certificate gallery is wired to receive the official scan when it is available.</p><div className="modal-placeholder"><FileCheck2 size={18} /><span>Certificate scan placeholder</span></div><button className="button button-secondary" onClick={() => setActiveCertificate(null)}>Close record</button></div></div>}
    </div>
  );
}
