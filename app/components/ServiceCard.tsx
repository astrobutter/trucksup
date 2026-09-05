import styles from "./ServiceCard.module.scss";

type ServiceCardProps = {
  image: string;
  alt: string;
  title: string;
  description: string;
  eyebrow?: string;
};

export default function ServiceCard({ image, alt, title, description, eyebrow }: ServiceCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageFrame}>
        <img src={image} alt={alt} loading="lazy" />
      </div>
      <h4 className={styles.title}>{title}</h4>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <p className={styles.desc}>{description}</p>
    </div>
  );
}
