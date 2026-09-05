"use client";

import { useEffect, useId, useRef, useState } from "react";
import { getGsap } from "../lib/gsap";
import Reveal from "./Reveal";
import styles from "./TestimonialsSection.module.scss";

const TESTIMONIALS = [
  {
    name: "Rajeev Chauhan",
    role: "Owner • 425 vehicles",
    avatar: "/images/testimonial-rajeev.svg",
    text: "Managing FASTag and fuel cards for 42 trucks used to mean juggling three different apps and constant follow-ups with drivers. With TrucksUp Max, I can see every vehicle's fuel spend and toll balance from my phone. Recharge dena, receipt nikalna, sab ek jagah se ho jata hai.",
    rating: 4.5,
  },
  {
    name: "S Kumar",
    role: "Director • 250 vehicles",
    avatar: "/images/testimonial-skumar.svg",
    text: "Vehicle verification and DL checks were the most time-consuming part of onboarding a new driver. Now it takes minutes, not days. Combined with real-time tracking, I know exactly where my trucks are and who's driving them - that peace of mind alone is worth it.",
    rating: 4.5,
  },
  {
    name: "Manjeet Singh",
    role: "Fleet Owner • 25 vehicles",
    avatar: "/images/testimonial-manjeet.svg",
    text: "Fuel cost was eating into our margins every month, and tracking it manually was a nightmare across IOCL, HPCL, and Jio-BP cards. TrucksUp Max brought all our fuel, FASTag, and safety data together. I finally have one number for total fleet spend instead of chasing five different reports.",
    rating: 4.5,
  },
];

const AUTOPLAY_MS = 5000;

function Star({ fill }: { fill: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill * 100}%`} stopColor="#f6b60b" />
          <stop offset={`${fill * 100}%`} stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        d="M12 2.5l2.9 6.2 6.7.7-5 4.6 1.4 6.7L12 17.6 6 20.7l1.4-6.7-5-4.6 6.7-.7L12 2.5Z"
        fill={`url(#${id})`}
        stroke="#f6b60b"
        strokeWidth="1"
      />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  const fills = Array.from({ length: 5 }, (_, i) => Math.max(0, Math.min(1, rating - i)));
  return (
    <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {fills.map((f, i) => (
        <Star key={i} fill={f} />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [offset, setOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef(false);
  const resumeTimeoutRef = useRef<number>();
  const rotatingRef = useRef(false);

  // The actual rotation is driven by setTimeout (real wall-clock time), not
  // GSAP's onComplete. GSAP's ticker runs on requestAnimationFrame, which
  // browsers can pause entirely for a backgrounded/hidden tab — if the state
  // change only happened inside onComplete, autoplay would silently stop
  // dead in that case. GSAP here is purely the visual fade; setTimeout
  // guarantees the carousel still advances even if that fade can't run.
  // `rotatingRef` ignores a new rotate() while one is already in flight, so
  // a rapid double-click (or several missed autoplay ticks firing back to
  // back after the tab is backgrounded) can't pile up out-of-order updates.
  const rotate = (dir: 1 | -1) => {
    if (rotatingRef.current) return;
    rotatingRef.current = true;

    const track = trackRef.current;
    const { gsap } = getGsap();

    if (track) {
      gsap.killTweensOf(track);
      gsap.to(track, { opacity: 0, x: dir * -24, duration: 0.25, ease: "power2.in" });
    }

    window.setTimeout(() => {
      setOffset((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
      rotatingRef.current = false;
      if (track) {
        gsap.fromTo(
          track,
          { opacity: 0, x: dir * 24 },
          { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
        );
      }
    }, 250);
  };

  // Manual interaction (arrows or dots) briefly suspends autoplay so it
  // doesn't yank the carousel away right after someone picks a card.
  const withManualPause = (fn: () => void) => () => {
    hoveredRef.current = true;
    fn();
    window.clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = window.setTimeout(() => {
      hoveredRef.current = false;
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Scroll-position check instead of IntersectionObserver: observer
    // callbacks can be deferred/throttled by the browser for backgrounded
    // tabs, which would silently stop autoplay forever.
    const isNearViewport = () => {
      const rect = section.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    };

    const interval = window.setInterval(() => {
      if (!hoveredRef.current && isNearViewport()) rotate(1);
    }, AUTOPLAY_MS);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(resumeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ordered = [...TESTIMONIALS.slice(offset), ...TESTIMONIALS.slice(0, offset)];

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className="container">
        <Reveal className={styles.head} from="up">
          <h2 className="sectionLabel">What our users say?</h2>
          <p className="sectionSub">The feedbacks help us improve and get better everyday.</p>
        </Reveal>

        <div
          className={styles.carousel}
          onMouseEnter={() => (hoveredRef.current = true)}
          onMouseLeave={() => (hoveredRef.current = false)}
        >
          <button
            className={styles.arrow}
            aria-label="Previous testimonial"
            onClick={withManualPause(() => rotate(-1))}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className={styles.track} ref={trackRef}>
            {ordered.map((t) => (
              <div className={styles.card} key={t.name}>
                <div className={styles.quote}>&rdquo;</div>
                <div className={styles.person}>
                  <div className={styles.avatar}>
                    <img src={t.avatar} alt={`Portrait of ${t.name}, ${t.role}`} loading="lazy" />
                  </div>
                  <div>
                    <div className={styles.name}>{t.name}</div>
                    <div className={styles.role}>{t.role}</div>
                  </div>
                </div>
                <p className={styles.text}>&ldquo;{t.text}&rdquo;</p>
                <Stars rating={t.rating} />
              </div>
            ))}
          </div>

          <button
            className={styles.arrow}
            aria-label="Next testimonial"
            onClick={withManualPause(() => rotate(1))}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div className={styles.dots}>
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              className={`${styles.dot} ${i === offset ? styles.dotActive : ""}`}
              aria-label={`Show testimonials starting from ${t.name}`}
              onClick={withManualPause(() => setOffset(i))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
