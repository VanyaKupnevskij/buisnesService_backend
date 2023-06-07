import { useEffect, useState } from 'react';
import styles from './style.module.scss';

function DatePicker({ style, className, name, label, min, max, value = '', onChange = () => {} }) {
  const _className = `${styles.root} ${className}`;
  const [date, setDate] = useState(value);

  useEffect(() => {
    setDate(value);
  }, []);

  function handleChange(newDate) {
    setDate(newDate);
    onChange(newDate);
  }

  return (
    <div style={style} className={_className}>
      <input
        className={styles.input}
        type="date"
        min={min}
        max={max}
        value={date}
        onChange={(e) => handleChange(e.target.value)}
        id={name}
        name={name}
      />
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
    </div>
  );
}

export default DatePicker;
