"use client";
import { useEffect, useRef } from "react";
export function Reveal({
  children,
  kind = "mask",
  className = "",
}: {
  children: React.ReactNode;
  kind?: "mask" | "line" | "depth";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    node.dataset.motion = "ready";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.motion = "visible";
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} data-reveal={kind} className={className}>
      {children}
    </div>
  );
}
