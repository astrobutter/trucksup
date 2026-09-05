import Reveal from "./Reveal";
import styles from "./CtaSection.module.scss";

const CHECKS = ["Free to get started", "Quick setup", "Dedicated support"];

export default function CtaSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal from="up">
          <h2 className={`sectionLabel ${styles.title}`}>Ready to Take Command of your Fleet?</h2>
          <p className={`sectionSub ${styles.sub}`}>
            Join 2,000+ fleet owners running smarter operations with TrucksUp Max. Set your account up
            in just a few steps.
          </p>
          <div className={styles.actions}>
            <button className={styles.btnPrimary}>Create Free Account</button>
            <span className={styles.or}>or</span>
            <button className={styles.btnSecondary}>Talk to Our Team</button>
          </div>
          <div className={styles.checks}>
            {CHECKS.map((c) => (
              <div className={styles.check} key={c}>
                <span className={styles.checkIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {c}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
