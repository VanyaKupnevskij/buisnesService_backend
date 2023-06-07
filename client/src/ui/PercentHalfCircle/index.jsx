import styles from './style.module.scss';

function PercentHalfCircle({ className, value }) {
  const _className = `${styles.root} ${className || ''}`;

  return (
    <div className={_className}>
      <div className={styles.progress_circle} style={{ '--value': value }}></div>
      <span className={styles.label1}>0 %</span>
      <span className={styles.label2}>100 %</span>
    </div>
  );
}

export default PercentHalfCircle;
