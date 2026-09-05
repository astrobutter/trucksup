import Reveal from "./Reveal";
import styles from "./SpotlightSection.module.scss";

const ARTICLES = [
  {
    source: "ET BrandEquity",
    date: "Jul 27, 2026",
    headline: (
      <>
        TrucksUp appoints <strong>Ajay Devgn</strong> as its new brand ambassador
      </>
    ),
    image: "/images/spotlight-1.svg",
    alt: "TrucksUp brand ambassador Ajay Devgn posing with a TrucksUp team member",
  },
  {
    source: "ET LegalWorld",
    date: "May 1, 2026",
    headline: <>TrucksUp partners with Lawyered&rsquo;s &lsquo;Road Smart Partner&rsquo; network</>,
    image: "/images/spotlight-2.svg",
    alt: "Two representatives shaking hands and exchanging a partnership plaque in front of a TrucksUp branded backdrop",
  },
  {
    source: "TrucksDekho",
    date: "Mar 25, 2026",
    headline: (
      <>
        TrucksUp Signs MoU With NHAI To Improve Safety, Efficiency, And Overall User Experience Of
        Truck Fleet Operations
      </>
    ),
    image: "/images/spotlight-3.svg",
    alt: "Officials exchanging signed documents at a formal MoU signing ceremony",
  },
];

export default function SpotlightSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal className={styles.head} from="up">
          <h2 className="sectionLabel">In the Spotlight</h2>
          <p className="sectionSub">Our work, stories, and milestones making an impact in the news.</p>
        </Reveal>

        <Reveal className={styles.grid} from="up" stagger={0.15}>
          {ARTICLES.map((a) => (
            <article className={styles.card} key={a.source}>
              <div className={styles.imageFrame}>
                <img src={a.image} alt={a.alt} loading="lazy" />
              </div>
              <div className={styles.body}>
                <div className={styles.meta}>
                  <span className={styles.source}>{a.source}</span>
                  <span className={styles.date}>{a.date}</span>
                </div>
                <p className={styles.headline}>{a.headline}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
