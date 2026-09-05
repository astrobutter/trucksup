"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "../lib/gsap";
import styles from "./MarqueeStrip.module.scss";

const ITEMS = [
  "FASTag",
  "Smart Fuel",
  "Vehicle Tracking",
  "Vehicle Verification",
  "DL Verification",
  "Safety 360",
  "Insurance",
  "Add Loads",
];

function Set() {
  return (
    <div className={styles.set}>
      {ITEMS.map((item) => (
        <span className={styles.item} key={item}>
          {item} <span className={styles.dot}>•</span>
        </span>
      ))}
    </div>
  );
}

export default function MarqueeStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const { gsap } = getGsap();
    const distance = el.scrollWidth / 2;

    const tween = gsap.to(el, {
      x: -distance,
      duration: distance / 55,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div className={styles.strip}>
      <div className={styles.track} ref={trackRef}>
        <Set />
        <Set />
      </div>
    </div>
  );
}
