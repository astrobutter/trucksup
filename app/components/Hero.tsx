"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "../lib/gsap";
import MarqueeStrip from "./MarqueeStrip";
import RoadStrip from "./RoadStrip";
import styles from "./Hero.module.scss";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.17 2.1 15.89 2 14.54 2 11.72 2 9.75 3.73 9.75 6.9V9.5H6.5v4h3.25V22h4.25v-8.5Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.6 7.2s-.21-1.5-.86-2.16c-.82-.87-1.74-.87-2.16-.92C15.6 4 12 4 12 4h-.01s-3.6 0-6.58.12c-.42.05-1.34.05-2.16.92C2.6 5.7 2.4 7.2 2.4 7.2S2.2 8.95 2.2 10.7v1.6c0 1.75.2 3.5.2 3.5s.2 1.5.85 2.16c.82.87 1.9.84 2.38.93C7.4 19.98 12 20 12 20s3.6-.01 6.58-.13c.42-.05 1.34-.05 2.16-.92.65-.66.86-2.16.86-2.16s.2-1.75.2-3.5v-1.6c0-1.75-.2-3.5-.2-3.5ZM9.95 14.5v-5.4l4.9 2.71-4.9 2.69Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.4A1.96 1.96 0 1 0 5.25 7.3a1.96 1.96 0 0 0 0-3.9ZM20.4 20h-3.37v-6.06c0-1.44-.03-3.3-2.01-3.3-2.02 0-2.33 1.57-2.33 3.2V20H9.32V8.5h3.24v1.57h.05c.45-.85 1.56-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18V20Z" />
      </svg>
    ),
  },
];

export default function Hero() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    let fallback: number | undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(`.${styles.line1}`, { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" })
        .from(`.${styles.line2}`, { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.45")
        .from(`.${styles.actions} > *`, { y: 20, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" }, "-=0.3")
        .from(`.${styles.socialBtn}`, { y: 16, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.3")
        .from(`.${styles.imageWrap}`, { opacity: 0, scale: 0.94, duration: 0.9, ease: "power3.out" }, "-=0.7");

      // Safety net: this whole entrance relies on requestAnimationFrame to
      // progress, which browsers can pause entirely for a backgrounded tab
      // (e.g. a link opened in a background tab). If that happens, every
      // element the timeline starts from opacity:0 would stay invisible
      // forever — including the headline, CTAs and hero image. A native
      // timer doesn't depend on rAF, so it fires regardless and forces the
      // final visible state no matter what GSAP's ticker is doing.
      fallback = window.setTimeout(() => {
        gsap.set(
          [
            `.${styles.line1}`,
            `.${styles.line2}`,
            `.${styles.actions} > *`,
            `.${styles.socialBtn}`,
            `.${styles.imageWrap}`,
          ],
          { clearProps: "opacity,transform" }
        );
      }, 4000);
      tl.eventCallback("onComplete", () => window.clearTimeout(fallback));
    }, scope);
    return () => {
      window.clearTimeout(fallback);
      ctx.revert();
    };
  }, []);

  return (
    <section className={styles.hero} id="home" ref={scope}>
      <div className={styles.glow} />
      <div className={styles.dots} />
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <h1 className={styles.headline}>
            <span className={styles.line1}>Let your fleet</span>
            <span className={styles.line2}>
              Make the m<span className={styles.oIcon} />
              ve
            </span>
          </h1>
          <div className={styles.actions}>
            <button className={styles.btnPrimary}>Sign Up For Free</button>
            <button className={styles.btnSecondary}>Login</button>
          </div>
          <div className={styles.socials}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className={styles.socialBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.imageWrap}>
          <img
            src="/images/hero-driver-trucks.svg"
            alt="TrucksUp brand ambassador standing arms crossed in front of a lineup of five branded fleet trucks"
            width={900}
            height={700}
          />
        </div>
      </div>
      <MarqueeStrip />
      <RoadStrip />
    </section>
  );
}
