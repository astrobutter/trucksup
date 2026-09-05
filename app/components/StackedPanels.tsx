"use client";

import { Children, useEffect, useRef } from "react";
import { getGsap } from "../lib/gsap";
import styles from "./StackedPanels.module.scss";

type StackedPanelsProps = {
  children: React.ReactNode;
  ids?: string[];
  topOffset?: number;
};

export default function StackedPanels({ children, ids = [], topOffset = 100 }: StackedPanelsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);

  useEffect(() => {
    if (window.innerWidth < 900) return;
    const container = containerRef.current;
    if (!container) return;
    const { gsap, ScrollTrigger } = getGsap();

    const cards = Array.from(container.querySelectorAll<HTMLElement>(`.${styles.card}`));
    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      const next = cards[i + 1];
      const overlay = card.querySelector<HTMLElement>(`.${styles.overlay}`);
      const setScale = gsap.quickSetter(card, "scale");
      const setOpacity = overlay ? gsap.quickSetter(overlay, "opacity") : null;

      const st = ScrollTrigger.create({
        trigger: card,
        start: `top ${topOffset}`,
        end: () => `+=${next.offsetHeight}`,
        pin: true,
        pinSpacing: false,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScale(1 - self.progress * 0.05);
          setOpacity?.(self.progress * 0.55);
        },
      });
      triggers.push(st);
    });

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshId);
      triggers.forEach((t) => t.kill());
    };
  }, [items.length, topOffset]);

  return (
    <div className={styles.stack} ref={containerRef}>
      {items.map((child, i) => (
        <div className={styles.card} key={i} id={ids[i]} style={{ zIndex: i + 1 }}>
          {child}
          <div className={styles.overlay} />
        </div>
      ))}
    </div>
  );
}
