import Reveal from "./Reveal";
import styles from "./ScaleSection.module.scss";

const ROWS = [
  {
    title: "Reduce Cost",
    description:
      "See exactly where your fleet is spending money: vehicle by vehicle, expense by expense. Catch overspending early and stop losses before they add up.",
    image: "/images/scale-reduce-cost.svg",
    alt: "Stack of coins beside a declining green arrow chart representing cost reduction",
    reverse: false,
  },
  {
    title: "Save Time on the Road",
    description:
      "Cut down on manual stops and delays. Payments and approvals happen automatically, so your vehicles keep moving instead of waiting.",
    image: "/images/scale-save-time.svg",
    alt: "Loaded truck driving fast on a highway representing time saved on the road",
    reverse: true,
  },
  {
    title: "Better Cash Flow",
    description:
      "All your fleet expenses in one place: no more checking multiple accounts or apps to know what's been spent.",
    image: "/images/scale-cash-flow.svg",
    alt: "Fanned Indian rupee banknotes representing better cash flow",
    reverse: false,
  },
  {
    title: "Complete Peace of Mind",
    description: "Know where your vehicles are 24/7 with real-time tracking and driver verification.",
    image: "/images/scale-peace-of-mind.svg",
    alt: "Convoy of loaded trucks parked in a row representing complete peace of mind",
    reverse: true,
  },
];

export default function ScaleSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal className={styles.head} from="up">
          <h2 className="sectionLabel">Built for Fleets at Scale</h2>
          <p className="sectionSub">
            Whether you manage 50 vehicles or 5,000, TrucksUp Max handles it the same way: with one
            dashboard and full control.
          </p>
        </Reveal>

        <div className={styles.rows}>
          {ROWS.map((row) => (
            <Reveal
              key={row.title}
              className={`${styles.row} ${row.reverse ? styles.reverse : ""}`}
              from={row.reverse ? "right" : "left"}
            >
              <div className={styles.imageCol}>
                <div className={styles.imageFrame}>
                  <img src={row.image} alt={row.alt} loading="lazy" />
                </div>
              </div>
              <div className={styles.textCol}>
                <h3 className={styles.rowTitle}>{row.title}</h3>
                <p className={styles.rowDesc}>{row.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
