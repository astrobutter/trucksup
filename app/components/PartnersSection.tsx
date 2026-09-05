import Reveal from "./Reveal";
import styles from "./PartnersSection.module.scss";

const PARTNERS = [
  "IndianOil",
  "HPCL",
  "Jio-BP",
  "IDFC First Bank",
  "LivQuik",
  "HDFC Bank",
  "AU Small Finance Bank",
  "SF",
  "Shriram Finance",
  "IndoStar Capital",
  "Partner",
];

const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function PartnersSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal from="up">
          <h2 className={`sectionLabel ${styles.title}`}>Our Partners</h2>
        </Reveal>
        <Reveal from="scale">
          <div className={styles.row}>
            {PARTNERS.map((name) => (
              <div className={styles.logo} key={name} title={name}>
                <img
                  src={`/images/partner-${slugify(name)}.svg`}
                  alt={`${name} logo`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
