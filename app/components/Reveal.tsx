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

    // Safety net: GSAP's tween progress runs on requestAnimationFrame, which
    // browsers can pause entirely for a backgrounded tab (e.g. a link opened
    // in a background tab, or a mobile browser suspending it). If that
    // happens after the ScrollTrigger fires but before the tween finishes,
    // content set to opacity:0 as the "from" state would stay invisible
    // forever. A plain window.setTimeout doesn't depend on rAF, so it fires
    // regardless and forces the final visible state. It's armed on `onStart`
    // rather than on mount, so it doesn't prematurely reveal content still
    // waiting to be scrolled into view. `onStart` must be passed inline here
    // (not attached via .eventCallback after creation) because if the
    // ScrollTrigger threshold is already satisfied at creation time, GSAP
    // can fire onStart synchronously during gsap.from() itself - attaching
    // it afterward would miss that call and the fallback would never arm.
    let fallback: number | undefined;
    const revealMs = (duration + stagger * targets.length) * 1000 + 1200;
    const tween = gsap.from(targets, {
      ...fromVars,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
      onStart: () => {
        fallback = window.setTimeout(() => {
          gsap.set(targets, { clearProps: "opacity,transform" });
        }, revealMs);
      },
      onComplete: () => window.clearTimeout(fallback),
    });

    return () => {
      window.clearTimeout(fallback);
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
