import styles from './style.module.scss';
import panelGlobalStyle from '../panelGlobalStyle.module.scss';
import { COLORS } from '../../styles/variablesJs';

import DatePicker from '../../ui/DatePicker';
import Button from '../../ui/Button';

import CanvasJSReact from '@canvasjs/react-charts';

let CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Graphic({
  className,
  title = '',
  dataPointsIncome = [],
  dataPointsCosts = [],
  onChangeStartDate = () => {},
  onChangeEndDate = () => {},
  onApplyFilter = () => {},
  startDateValue,
  endDateValue,
}) {
  const classNameRoot = `${styles.root} ${panelGlobalStyle.panel} ${className}`;

  const options = {
    animationEnabled: true,
    backgroundColor: 'transparent',
    title: {
      text: title,
      fontColor: COLORS.black_color,
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: 26,
    },
    axisX: {
      valueFormatString: 'YY.MMM.DD',

      labelFontFamily: 'Montserrat',
      labelFontColor: COLORS.black_color,

      tickColor: COLORS.gray_color,

      lineColor: COLORS.gray_color,
      lineThickness: 2,
    },
    axisY: {
      title: 'Ціна (у грн)',
      titleFontColor: COLORS.black_color,
      titleFontFamily: 'Montserrat',

      labelFontFamily: 'Montserrat',
      labelFontColor: COLORS.black_color,

      tickColor: COLORS.gray_color,

      lineColor: COLORS.gray_color,
      lineThickness: 2,

      gridColor: COLORS.gray_color,
    },
    legend: {
      fontColor: COLORS.black_color,
      fontFamily: 'Montserrat',
      fontWeight: 400,
    },
    toolTip: {
      backgroundColor: COLORS.panel_color,

      fontColor: COLORS.black_color,
      fontWeight: 500,
      fontFamily: 'Montserrat',

      cornerRadius: 7,
    },
    data: [
      {
        yValueFormatString: '#,### грн',
        xValueFormatString: 'YY.MMM.DD',
        showInLegend: true,
        legendText: 'Прибутки',
        type: 'spline',
        color: COLORS.primary_dark2_color,
        dataPoints: dataPointsIncome,
      },
      {
        yValueFormatString: '#,### грн',
        xValueFormatString: 'YY.MMM.DD',
        showInLegend: true,
        legendText: 'Витрати',
        type: 'spline',
        color: COLORS.red_color,
        dataPoints: dataPointsCosts,
      },
    ],
  };
  return (
    <div className={classNameRoot}>
      <div className={styles.top_controls}>
        <DatePicker
          init={new Date(Date.now())}
          name={'start_date'}
          onChange={onChangeStartDate}
          label={'З'}
          value={startDateValue}
        />
        <DatePicker
          init={new Date(Date.now())}
          name={'end_date'}
          onChange={onChangeEndDate}
          label={'До'}
          value={endDateValue}
        />
        <Button style={{ marginLeft: 'auto' }} onClick={onApplyFilter}>
          Застосувати
        </Button>
      </div>

      <CanvasJSChart options={options} />
    </div>
  );
}

export default Graphic;
