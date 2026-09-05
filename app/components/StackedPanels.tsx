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
    // Measure every card's natural height once, up front, so ScrollTrigger's
    // pin "end" is a fixed number. A function-based end (`() => next.offsetHeight`)
    // gets re-read on every ScrollTrigger refresh; because pinning itself
    // shifts layout, that can retrigger GSAP's resize observer and thrash.
    const heights = cards.map((c) => c.offsetHeight);
    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      const overlay = card.querySelector<HTMLElement>(`.${styles.overlay}`);
      const setOpacity = overlay ? gsap.quickSetter(overlay, "opacity") : null;
      // Once this card is fully covered, hide it outright. Cards have
      // different heights, so a shorter later card (e.g. Smart Fuel) won't
      // fully overlap a taller earlier one (e.g. FASTag) that's just sitting
      // behind it in normal flow at a lower z-index — its excess height
      // would otherwise peek out from behind. Visibility (not opacity/display)
      // keeps GSAP's own layout/pin math for this element unaffected.
      let hidden = false;

      const st = ScrollTrigger.create({
        trigger: card,
        start: `top ${topOffset}`,
        end: `+=${heights[i + 1]}`,
        pin: true,
        pinType: "fixed",
        pinSpacing: false,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: false,
        onUpdate: (self) => {
          setOpacity?.(self.progress * 0.55);
          const shouldHide = self.progress >= 1;
          if (shouldHide !== hidden) {
            hidden = shouldHide;
            card.style.visibility = shouldHide ? "hidden" : "visible";
          }
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
