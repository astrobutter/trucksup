"use client";

import { useEffect, useState } from "react";
import styles from "./SectionDock.module.scss";

const STOPS = [
  {
    id: "tu-kawach",
    label: "TU Kawach",
    icon: <path d="M12 3 5 5.5v5c0 5 3 8.5 7 10 4-1.5 7-5 7-10v-5L12 3Z" />,
  },
  {
    id: "fastag",
    label: "FASTag",
    icon: (
      <>
        <rect x="3.5" y="6" width="17" height="12" rx="2" />
        <path d="M3.5 10h17" />
      </>
    ),
  },
  {
    id: "smart-fuel",
    label: "Smart Fuel",
    icon: (
      <path d="M6 21V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v15M6 21h8M6 13h6m6-6 2 2v4.5a1.5 1.5 0 0 1-3 0V11l-2-2" />
    ),
  },
  {
    id: "load-board",
    label: "Load Board",
    icon: <path d="M6 3h9l3 3v15H6V3Zm3 8h6m-6 4h6" />,
  },
];

export default function SectionDock() {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const elements = STOPS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (elements.length === 0) return;

    // Scroll-spy via getBoundingClientRect on scroll, mirroring Header's own
    // scroll-position check. IntersectionObserver callbacks can be throttled
    // or deferred by the browser (e.g. for a backgrounded tab), so we don't
    // rely on it for something users see update live.
    const line = 160;

    const compute = () => {
      let current: HTMLElement | null = null;
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line) {
          current = el;
        }
      }
      setActive(current?.id ?? null);
      setVisible(current !== null);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <div className={`${styles.dock} ${visible ? styles.visible : ""}`}>
      {STOPS.map((stop, i) => (
        <div key={stop.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {i > 0 && (
            <>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </>
          )}
          <a
            href={`#${stop.id}`}
            aria-label={stop.label}
            className={`${styles.btn} ${active === stop.id ? styles.btnActive : ""}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {stop.icon}
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
}
