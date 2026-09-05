"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap } from "../lib/gsap";
import styles from "./Header.module.scss";

const NAV_ITEMS = [
  { label: "Home", href: "#home", active: true },
  { label: "Services", href: "#services" },
  { label: "24x7 Support", href: "#support" },
  { label: "FAQs", href: "#faqs" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const onScroll = () => {
      const heroBottom = hero.getBoundingClientRect().bottom;
      setScrolled(heroBottom <= 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = actionsRef.current;
    if (!el) return;
    const { gsap } = getGsap();

    if (firstRun.current) {
      gsap.set(el, scrolled ? { autoAlpha: 1, y: 0 } : { autoAlpha: 0, y: -10 });
      firstRun.current = false;
      return;
    }

    gsap.to(el, {
      autoAlpha: scrolled ? 1 : 0,
      y: scrolled ? 0 : -10,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [scrolled]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.logo}>
          <svg
            className={styles.logoMark}
            viewBox="0 0 42 44"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect x="1" y="1" width="40" height="14" rx="3" fill="#fb3e44" />
            <path
              d="M14 1h14v18.5c0 2-.7 3.6-2.2 5.4C24 27.5 21.6 29.5 21 30c-.6-.5-3-2.5-4.8-5.1C14.7 23.1 14 21.5 14 19.5V1Z"
              fill="#fff"
            />
          </svg>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>
              TRUCKS<span>UP</span>
            </span>
            <span className={styles.logoSub}>Ab apni chalao</span>
          </div>
        </div>
        <nav>
          <ul className={styles.nav}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className={item.active ? styles.active : ""}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.navActions} ref={actionsRef}>
          <button className={styles.navBtnPrimary}>Sign Up For Free</button>
          <button className={styles.navBtnSecondary}>Login</button>
        </div>
      </div>
    </header>
  );
}
