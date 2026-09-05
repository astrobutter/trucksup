"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "../lib/gsap";
import styles from "./RoadStrip.module.scss";

export default function RoadStrip() {
  const roadRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  const laneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const road = roadRef.current;
    const truck = truckRef.current;
    const lane = laneRef.current;
    if (!road || !truck || !lane) return;
    const { gsap } = getGsap();

    const width = road.offsetWidth;
    const truckTween = gsap.to(truck, {
      x: width + 300,
      duration: 6,
      ease: "none",
      repeat: -1,
    });

    const laneTween = gsap.to(lane, {
      x: -100,
      duration: 1.2,
      ease: "none",
      repeat: -1,
    });

    // Pause both loops while off-screen so they don't keep compositing
    // forever as the user scrolls deep into the page.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          truckTween.play();
          laneTween.play();
        } else {
          truckTween.pause();
          laneTween.pause();
        }
      },
      { threshold: 0 }
    );
    observer.observe(road);

    return () => {
      observer.disconnect();
      truckTween.kill();
      laneTween.kill();
    };
  }, []);

  return (
    <div className={styles.road} ref={roadRef} aria-hidden="true">
      <div className={`${styles.edge} ${styles.edgeTop}`} />
      <div className={styles.laneLine} ref={laneRef}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div className={styles.dash} key={i} />
        ))}
      </div>
      <div className={`${styles.edge} ${styles.edgeBottom}`} />
      <div className={styles.truck} ref={truckRef}>
        <svg
          className={styles.truckSvg}
          viewBox="0 0 220 90"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" y="25" width="140" height="40" rx="4" fill="#f4f4f4" />
          <rect x="140" y="10" width="55" height="55" rx="4" fill="#e2e2e2" />
          <rect x="150" y="20" width="30" height="20" rx="2" fill="#8fb8e0" />
          <circle cx="35" cy="70" r="14" fill="#1f2430" />
          <circle cx="35" cy="70" r="6" fill="#9aa3b2" />
          <circle cx="105" cy="70" r="14" fill="#1f2430" />
          <circle cx="105" cy="70" r="6" fill="#9aa3b2" />
          <circle cx="170" cy="70" r="14" fill="#1f2430" />
          <circle cx="170" cy="70" r="6" fill="#9aa3b2" />
        </svg>
      </div>
    </div>
  );
}
