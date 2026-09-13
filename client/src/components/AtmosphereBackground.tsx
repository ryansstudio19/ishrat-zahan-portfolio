import { useEffect, useRef } from "react";
import * as THREE from "three";

interface AtmosphereBackgroundProps {
  className?: string;
  /** Overall density of floating nodes. Lower this on smaller/quieter sections. */
  density?: "normal" | "quiet";
}

/**
 * A subtle, professional 3D "atmosphere" rendered behind hero content.
 *
 * Design intent: a soft field of drifting institutional "nodes" connected by
 * thin constellation lines — evoking verified records, networks and systems —
 * rendered in the site's own palette (ink, emerald, gold) at low opacity so it
 * reads as ambience rather than decoration. Pure vanilla three.js (no extra
 * dependencies), transparent canvas, capped pixel ratio, pauses when off-screen
 * or when the tab is hidden, and respects prefers-reduced-motion.
 */
export default function AtmosphereBackground({ className = "", density = "normal" }: AtmosphereBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isNarrow = container.clientWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 17);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    // Lighting — soft studio setup so the nodes read as gently lit solids.
    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const key = new THREE.DirectionalLight(0xffffff, 0.85);
    key.position.set(6, 9, 10);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x2d7a5d, 0.35);
    rim.position.set(-8, -5, -6);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

    const baseCount = density === "quiet" ? 26 : 46;
    const NODE_COUNT = isNarrow ? Math.round(baseCount * 0.55) : baseCount;

    const PALETTE: { color: number; weight: number }[] = [
      { color: 0x1a1a1a, weight: 0.6 },
      { color: 0x2d7a5d, weight: 0.24 },
      { color: 0xc9a227, weight: 0.16 },
    ];
    function pickColor() {
      const r = Math.random();
      let acc = 0;
      for (const p of PALETTE) {
        acc += p.weight;
        if (r <= acc) return p.color;
      }
      return PALETTE[0].color;
    }

    const geometry = new THREE.IcosahedronGeometry(0.34, 0);
    const nodes: THREE.Mesh[] = [];
    const materials: THREE.Material[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const material = new THREE.MeshStandardMaterial({
        color: pickColor(),
        roughness: 0.55,
        metalness: 0.12,
        transparent: true,
        opacity: 0.82,
      });
      materials.push(material);

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set((Math.random() - 0.5) * 19, (Math.random() - 0.5) * 10.5, (Math.random() - 0.5) * 9);
      const scale = 0.45 + Math.random() * 1.05;
      mesh.scale.setScalar(scale);
      mesh.userData.speed = 0.05 + Math.random() * 0.12;
      mesh.userData.offset = Math.random() * Math.PI * 2;
      mesh.userData.baseY = mesh.position.y;
      group.add(mesh);
      nodes.push(mesh);
    }

    // Constellation lines between nearby nodes.
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x1a1a1a, transparent: true, opacity: 0.1 });
    const linePositions: number[] = [];
    const linkDistance = isNarrow ? 3.6 : 4.4;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].position.distanceTo(nodes[j].position) < linkDistance) {
          linePositions.push(nodes[i].position.x, nodes[i].position.y, nodes[i].position.z);
          linePositions.push(nodes[j].position.x, nodes[j].position.y, nodes[j].position.z);
        }
      }
    }
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lines);

    function resize() {
      if (!container) return;
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Gentle pointer parallax — subtle depth cue, never distracting.
    let targetRotY = 0;
    let targetRotX = 0;
    function onPointerMove(event: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      targetRotY = nx * 0.3;
      targetRotX = ny * -0.18;
    }
    if (!prefersReducedMotion) {
      container.addEventListener("pointermove", onPointerMove);
    }

    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.01 }
    );
    visibilityObserver.observe(container);

    function onDocVisibility() {
      isVisible = isVisible && !document.hidden;
    }
    document.addEventListener("visibilitychange", onDocVisibility);

    let rafId = 0;
    const clock = new THREE.Clock();

    function renderFrame() {
      renderer.render(scene, camera);
    }

    if (prefersReducedMotion) {
      // Render a single calm frame and stop — no animation loop at all.
      renderFrame();
    } else {
      const animate = () => {
        rafId = requestAnimationFrame(animate);
        if (document.hidden || !isVisible) return;
        const t = clock.getElapsedTime();

        group.rotation.y += (targetRotY - group.rotation.y) * 0.025 + 0.0006;
        group.rotation.x += (targetRotX - group.rotation.x) * 0.025;

        nodes.forEach((n) => {
          const { speed, offset, baseY } = n.userData as { speed: number; offset: number; baseY: number };
          n.position.y = baseY + Math.sin(t * speed + offset) * 0.45;
          n.rotation.x += 0.0018;
          n.rotation.y += 0.0026;
        });

        renderFrame();
      };
      animate();
    }

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onDocVisibility);
      container.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [density]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    />
  );
}
