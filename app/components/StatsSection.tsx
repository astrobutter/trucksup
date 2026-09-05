"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "../lib/gsap";
import styles from "./StatsSection.module.scss";

const STATS = [
  { value: 50000, suffix: "K+", divisor: 1000, decimals: 0, label: "Vehicles Managed" },
  { value: 15, suffix: "%", divisor: 1, decimals: 0, label: "Cost Reduction" },
  { value: 7000, suffix: "K+", divisor: 1000, decimals: 0, label: "Satisfied Fleet Owners" },
  { value: 4.7, suffix: "", divisor: 1, decimals: 1, label: "Experience Rating" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const { gsap, ScrollTrigger } = getGsap();

    const values = section.querySelectorAll<HTMLElement>(`.${styles.value}`);
    const triggers: ScrollTrigger[] = [];

    const fallbacks: number[] = [];

    values.forEach((el, i) => {
      const stat = STATS[i];
      const counter = { n: 0 };
      const finalText = () => stat.value.toFixed(stat.decimals) + stat.suffix;
      const tween = gsap.to(counter, {
        n: stat.value / stat.divisor,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = counter.n.toFixed(stat.decimals) + stat.suffix;
        },
        onStart: () => {
          // Safety net: this counter's progress depends on requestAnimationFrame,
          // which can be paused entirely for a backgrounded tab. Without this,
          // the stat would stay stuck at "0" forever instead of its real value.
          const id = window.setTimeout(() => {
            el.textContent = finalText();
          }, 2500);
          fallbacks.push(id);
          tween.eventCallback("onComplete", () => window.clearTimeout(id));
        },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => {
      fallbacks.forEach((id) => window.clearTimeout(id));
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={`container ${styles.grid}`}>
        {STATS.map((stat) => (
          <div className={styles.stat} key={stat.label}>
            <div className={styles.value}>0{stat.suffix}</div>
            <div className={styles.label}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
