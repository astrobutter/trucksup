import Reveal from "./Reveal";
import styles from "./ServicePanel.module.scss";

type ServicePanelProps = {
  title: string;
  columns?: number;
  children: React.ReactNode;
};

export default function ServicePanel({ title, columns = 4, children }: ServicePanelProps) {
  return (
    <Reveal className={`container ${styles.wrap}`} from="up">
      <div className={styles.panel}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.grid} style={{ "--cols": columns } as React.CSSProperties}>
          {children}
        </div>
      </div>
    </Reveal>
  );
}
