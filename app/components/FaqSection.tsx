"use client";

import { useRef, useState } from "react";
import { getGsap } from "../lib/gsap";
import Reveal from "./Reveal";
import styles from "./FaqSection.module.scss";

const CATEGORIES = [
  {
    name: "Getting Started",
    questions: [
      {
        q: "How do I sign up?",
        a: "Click Sign Up For Free on the homepage, enter your phone number and basic fleet details, verify the OTP, and your TrucksUp Max account is ready.",
      },
      {
        q: "What do I need to sign up?",
        a: "You just need an active mobile number and your fleet or company name to get started. Vehicle and KYC documents can be added afterwards.",
      },
      {
        q: "Is there a fee to create a profile?",
        a: "No, creating a TrucksUp Max profile is completely free. You only pay for the specific services you choose to activate.",
      },
      {
        q: "I already have a TrucksUp or TU App account. Do I need to sign up again?",
        a: "No. Log in with the same credentials you use on the TrucksUp or TU App, and your fleet data will already be linked.",
      },
      {
        q: "How quickly can I onboard my fleet?",
        a: "Most fleet owners are fully onboarded within a day. Bulk vehicle uploads and verification are handled automatically to speed things up.",
      },
      {
        q: "Is there a minimum fleet size?",
        a: "There is no minimum. TrucksUp Max works the same way whether you manage a single truck or a fleet of thousands.",
      },
      {
        q: "Do I need to manage multiple apps?",
        a: "No, TrucksUp Max brings FASTag, fuel, tracking, verification, insurance and loads into one single dashboard.",
      },
    ],
  },
  { name: "KYC and Verification", questions: placeholderQuestions("KYC and Verification") },
  { name: "Fee and Payments", questions: placeholderQuestions("Fee and Payments") },
  { name: "Smart Fuel", questions: placeholderQuestions("Smart Fuel") },
  { name: "FASTag", questions: placeholderQuestions("FASTag") },
  { name: "TU Kawach", questions: placeholderQuestions("TU Kawach") },
  { name: "Team and Access", questions: placeholderQuestions("Team and Access") },
  { name: "Security", questions: placeholderQuestions("Security") },
  { name: "For Large Fleets and Enterprises", questions: placeholderQuestions("large fleets and enterprises") },
  { name: "Load Board", questions: placeholderQuestions("Load Board") },
  { name: "What's Next", questions: placeholderQuestions("what's next") },
];

function placeholderQuestions(topic: string) {
  return [
    {
      q: `What should I know about ${topic}?`,
      a: `Our support team can walk you through everything related to ${topic}. Reach out via 24x7 Support and we'll get you sorted.`,
    },
  ];
}

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    const icon = iconRef.current;
    if (!outer || !inner || !icon) return;
    const { gsap } = getGsap();
    const next = !open;
    setOpen(next);

    const targetHeight = next ? inner.offsetHeight : 0;

    // Safety net: this height/rotate tween runs on GSAP's requestAnimationFrame
    // ticker, which browsers can pause entirely for a backgrounded tab. Without
    // this, clicking a question while rAF is stalled would flip `open` but the
    // panel would stay visually collapsed (height stuck at its starting value)
    // forever. A native timer forces the end state regardless of rAF.
    const fallback = window.setTimeout(() => {
      gsap.set(outer, { height: targetHeight });
      gsap.set(icon, { rotate: next ? 45 : 0 });
    }, 600);

    gsap.to(outer, {
      height: targetHeight,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => window.clearTimeout(fallback),
    });
    gsap.to(icon, {
      rotate: next ? 45 : 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  return (
    <div className={styles.item}>
      <button className={styles.question} onClick={toggle} aria-expanded={open}>
        <span>{q}</span>
        <div className={styles.iconWrap} ref={iconRef}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </button>
      <div className={styles.answerOuter} ref={outerRef}>
        <div className={styles.answerInner} ref={innerRef}>
          {a}
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className={styles.section} id="faqs">
      <div className="container">
        <Reveal className={styles.head} from="up">
          <h2 className="sectionLabel">Got Questions?</h2>
          <p className="sectionSub">We are here to answer</p>
        </Reveal>

        <div className={styles.layout}>
          <div className={styles.categories}>
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.name}
                className={`${styles.categoryBtn} ${i === activeCategory ? styles.categoryActive : ""}`}
                onClick={() => setActiveCategory(i)}
              >
                {cat.name}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            ))}
          </div>

          <div className={styles.questions}>
            {CATEGORIES[activeCategory].questions.map((item) => (
              <AccordionItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
