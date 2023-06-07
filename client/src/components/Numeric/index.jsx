import styles from './style.module.scss';
import panelGlobalStyle from '../panelGlobalStyle.module.scss';
import useAnimationGrowNumber from '../animationGrowNumber.hook';

function Numeric({ title, value = 0, duration = 800, startDelay = 500, countStep = 40 }) {
  const classNameRoot = `${styles.root} ${panelGlobalStyle.panel}`;
  const { animNumber } = useAnimationGrowNumber({ value, duration, startDelay, countStep });

  return (
    <div className={classNameRoot}>
      <h6 className={styles.title}>{title}</h6>
      <b
        className={styles.value}
        style={{ '--start-delay': startDelay + 'ms', '--duration': duration * 1.63 + 'ms' }}>
        {animNumber.toFixed(0)}
      </b>
    </div>
  );
}

export default Numeric;
