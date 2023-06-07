import styles from './style.module.scss';
import panelGlobalStyle from '../panelGlobalStyle.module.scss';

import PercentHalfCircle from '../../ui/PercentHalfCircle';
import useAnimationGrowNumber from '../animationGrowNumber.hook';

function NumericPercent({ title, value = 0, duration = 800, startDelay = 500, countStep = 40 }) {
  const classNameValue =
    styles.value +
    ' ' +
    (value < 30 ? styles.value_bad : value > 70 ? styles.value_good : styles.value_normal);
  const classNameRoot = `${styles.root} ${panelGlobalStyle.panel}`;
  const { animNumber } = useAnimationGrowNumber({ value, duration, startDelay, countStep });

  return (
    <div className={classNameRoot}>
      <h6 className={styles.title}>{title}</h6>
      <b
        className={classNameValue}
        style={{ '--start-delay': startDelay + 'ms', '--duration': duration * 1.63 + 'ms' }}>
        {animNumber ? animNumber.toFixed(0) : 0} %
      </b>
      <PercentHalfCircle className={styles.percent} value={animNumber} />
    </div>
  );
}

export default NumericPercent;
