import styles from './style.module.scss';
import panelGlobalStyle from '../panelGlobalStyle.module.scss';
import { COLORS } from '../../styles/variablesJs';

import LittleGraphic from '../../ui/LittleGraphic';
import useAnimationGrowNumber from '../animationGrowNumber.hook';
import useFormatedPrice from '../formatedPrice.hook';

function NumericTotal({
  title,
  value = 0,
  percent = 0,
  graphData,
  widthGraph = 65,
  heightGraph = 60,
  duration = 800,
  startDelay = 500,
  countStep = 40,
  invertColor = false,
}) {
  const { animNumber } = useAnimationGrowNumber({ value, duration, startDelay, countStep });
  const valueFormated = useFormatedPrice(animNumber);
  const percentFormated =
    (percent > 0 ? 'Up to ' : 'Down to ') + (percent && percent.toFixed(1)) + ' %';
  const classNamePercent =
    styles.percent +
    ' ' +
    ((percent > 0) ^ invertColor ? styles.percent_green : styles.percent_red);
  const classNameRoot = `${styles.root} ${panelGlobalStyle.panel}`;

  return (
    <div className={classNameRoot}>
      <div className={styles.text_block}>
        <h6 className={styles.title}>{title}</h6>
        <b
          className={styles.value}
          style={{ '--start-delay': startDelay + 'ms', '--duration': duration * 1.63 + 'ms' }}>
          $ {valueFormated}
        </b>
        <p className={classNamePercent}>{percentFormated}</p>
      </div>
      <LittleGraphic
        className={styles.graphic}
        data={graphData}
        width={widthGraph}
        height={heightGraph}
        color={(percent > 0) ^ invertColor ? COLORS.green_color : COLORS.red_color}
      />
    </div>
  );
}

export default NumericTotal;
