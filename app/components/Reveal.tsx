"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "../lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
  from?: "up" | "left" | "right" | "fade" | "scale";
  as?: keyof JSX.IntrinsicElements;
};

export default function Reveal({
  children,
  className,
  y = 40,
  delay = 0,
  duration = 0.8,
  stagger = 0.12,
  from = "up",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = getGsap();

    const targets = el.children.length > 0 ? Array.from(el.children) : [el];

    const fromVars: gsap.TweenVars = { opacity: 0, duration, delay, stagger };
    if (from === "up") fromVars.y = y;
    if (from === "left") fromVars.x = -y;
    if (from === "right") fromVars.x = y;
    if (from === "scale") fromVars.scale = 0.9;

    const tween = gsap.from(targets, {
      ...fromVars,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, duration, stagger, y, from]);

  const Tag = as as any;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
