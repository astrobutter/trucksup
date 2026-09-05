import styles from "./ServicePanel.module.scss";

type ServicePanelProps = {
  title: string;
  columns?: number;
  children: React.ReactNode;
};

export default function ServicePanel({ title, columns = 4, children }: ServicePanelProps) {
  return (
    <div className={`container ${styles.wrap}`}>
      <div className={styles.panel}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.grid} style={{ "--cols": columns } as React.CSSProperties}>
          {children}
        </div>
      </div>
    </div>
  );
}
